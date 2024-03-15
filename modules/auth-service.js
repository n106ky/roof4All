require("dotenv").config();

const bcrypt = require("bcryptjs"); //  used for hashing and comparing passwords securely
const { connectToDatabase, mongoose } = require("./dbConnection");

let Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let userSchema = new Schema({
  userName: { type: String, unique: true },
  password: String,
  email: String,
  userType: {
    type: String,
    enum: ["guest", "host", "business", "admin"],
    default: "guest",
  },
  typeID: { type: ObjectId },
  loginHistory: [
    {
      dateTime: { type: Date },
      userAgent: { type: String }, // useful piece of information for security, analytics, and troubleshooting purposes
    },
  ],
  user_img: String,
  rating: { type: Number, default: 5 },
  verified: { type: Boolean, default: false },
  dashboard: {
    total_income: { type: Number, default: 0 },
    total_expenses: { type: Number, default: 0 },
    total_listed_spaces: { type: Number, default: 0 },
    total_guests: { type: Number, default: 0 },
  },
  rentedSpaces: [{ type: ObjectId, ref: "Property" }],
});

let guestSchema = new Schema({
  user: { type: ObjectId, ref: "User" },
  fname: { type: String },
  lname: { type: String },
  dob: { type: Date },
  gender: { type: String },
  employment_status: { type: String },
  purpose: { type: String },
  doc_type: { type: String },
  upload_doc: { type: String }, // change if have time
});

let hostSchema = new Schema({
  user: { type: ObjectId, ref: "User" },
  fname: { type: String },
  lname: { type: String },
  dob: { type: Date },
  gender: { type: String },
  employment_status: { type: String },
  purpose: { type: String },
  doc_type: { type: String },
  upload_doc: { type: String }, // change if have time
  property: [{ type: ObjectId, ref: "Property" }],
});

let employeeSchema = new Schema({
  user: { type: ObjectId, ref: "User" },
  fname: { type: String },
  lname: { type: String },
  dob: { type: Date },
  gender: { type: String },
  role: { type: String },
  // employer: { type: ObjectId, ref: "Business" },
  branch: { type: String },
  status: { type: Boolean, default: false }, // "Unallocated" vs "Allocated"
  assign_date: { type: Date },
});

let businessSchema = new Schema({
  user: { type: ObjectId, ref: "User" },
  fname: { type: String },
  lname: { type: String },
  dob: { type: Date },
  gender: { type: String },
  employment_title: { type: String },
  purpose: { type: String },
  companyName: { type: String },
  employees: [employeeSchema],
  doc_type: { type: String },
  upload_doc: { type: String }, // change if have time
  property: [{ type: ObjectId, ref: "Property" }],
});

let User, Guest, Host, Business, Employee;

// function initialize() {
//   return new Promise(function (resolve, reject) {
//     // let db = mongoose.createConnection(process.env.MONGODB);
//     let db = mongoose.createConnection(
//       "mongodb+srv://r4a_admin:kxGoJtwA8WdlNF6v@roof4all.cwys7ka.mongodb.net/?retryWrites=true&w=majority&appName=roof4all"
//     );
//     db.on("error", (err) => {
//       reject(err);
//     });
//     db.once("open", () => {
//       User = db.model("users", userSchema);
//       resolve();
//       console.log(`Connection Successful: Connected to MongoDB.`);
//     });
//   });
// }

async function initialize() {
  try {
    const db = await connectToDatabase("auth-service");
    User = db.model("User", userSchema);
    Guest = db.model("Guest", guestSchema);
    Host = db.model("Host", hostSchema);
    Business = db.model("Business", businessSchema);
    Employee = db.model("Employee", employeeSchema);
  } catch (error) {
    console.error("Service initialization failed", error);
    process.exit(1);
  }
}

function registerUser(userData) {
  return new Promise((resolve, reject) => {
    if (userData.password !== userData.password2) {
      reject("Passwords do not match");
      return;
    }
    bcrypt
      .hash(userData.password, 10) // 10-12 is good enough
      .then((hash) => {
        userData.password = hash;
        const newUser = new User(userData);
        return newUser.save();
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        if (err.code === 11000) {
          console.log(`Error:  ${err}`);
          reject("This username is already taken");
        } else {
          console.log(`Error:  ${err}`);
          reject(`There was an error creating the new user: ${err}`);
        }
      });
  });
}

function checkUser(userData) {
  return new Promise((resolve, reject) => {
    User.find({ userName: userData.userName })
      .then((users) => {
        if (users.length == 0) {
          reject(`Unable to find user: ${userData.userName}`);
        } else if (users.length > 1) {
          reject(
            `System error: Found more than one user with the same username`
          );
        }
        bcrypt
          .compare(userData.password, users[0].password)
          .then((result) => {
            if (!result) {
              reject(`Incorrect password: ${userData.userName}`);
            }
            if (users[0].loginHistory.length == 10) {
              users[0].loginHistory.pop();
            }
            users[0].loginHistory.unshift({
              dateTime: String(new Date()),
              userAgent: userData.userAgent,
            });
            User.updateOne(
              { userName: users[0].userName },
              { $set: { loginHistory: users[0].loginHistory } }
            )
              .then(() => {
                resolve(users[0]);
              })
              .catch((err) => {
                reject(`There was an error verifying the user: ${err}`);
              });
          })
          .catch((err) => {
            reject(`Error: ${err}`);
          });
      })
      .catch((err) => {
        reject(`Error: ${err} with user ${userData.userName}`);
      });
  });
}

async function verifyUser(userID, userData) {
  try {
    let user = await User.findOne({ _id: userID });
    if (!user) {
      console.error("User not found");
      return;
    }
    let verifiedUser;
    if (user.userType == "guest") {
      verifiedUser = new Guest(userData);
    } else if (user.userType == "host") {
      verifiedUser = new Host(userData);
    } else if (user.userType == "business") {
      verifiedUser = new Business(userData);
    }
    verifiedUser.user = userID;
    await verifiedUser.save();
    user.typeID = verifiedUser._id;
    user.verified = true;
    await user.save();
    console.log("Verification complete.");
    return verifiedUser;
  } catch (err) {
    console.error("An error occurred:", err);
    throw err;
  }
}

async function getUser(userID) {
  try {
    let user = await User.findOne({ _id: userID });
    return user;
  } catch (err) {
    console.error("Error finding user", err);
  }
}

async function getHost(hostID) {
  try {
    let host = await Host.findOne({ _id: hostID });
    return host;
  } catch (err) {
    console.error("Error finding host", err);
  }
}

module.exports = {
  initialize,
  registerUser,
  checkUser,
  verifyUser,
  getUser,
  getHost,
};
