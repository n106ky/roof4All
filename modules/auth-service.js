require("dotenv").config();

const bcrypt = require("bcryptjs"); //  used for hashing and comparing passwords securely
const mongoose = require("mongoose");

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
  loginHistory: [
    {
      dateTime: { type: Date },
      userAgent: { type: String }, // useful piece of information for security, analytics, and troubleshooting purposes
    },
  ],
  user_img: String,
  verified: { type: Boolean, default: false },
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
  guest_rating: { type: Number },
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
  host_rating: { type: Number },
  property: [{ type: ObjectId, ref: "Property" }],
});

let businessSchema = new Schema({
  user: { type: ObjectId, ref: "User" },
  companyName: { type: String },
  license_url: { type: String },
});

let User, Guest, Host, Business;

async function initialize() {
  try {
    const db = await connectToDatabase("auth-service");
    User = db.model("user", userSchema);
    Guest = db.model("guest", guestSchema);
    Host = db.model("host", hostSchema);
    Business = db.model("business", businessSchema);
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

async function verifyUser(userID) {
  try {
    
  } catch {

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

module.exports = {
  initialize,
  registerUser,
  checkUser,
  verifyUser,
  getUser,
};

//////

/*
function verifyBusinessAcc(userData) {
  return new Promise((resolve, reject) => {});
}

function verifyGuestAcc(userData) {
  return new Promise((resolve, reject) => {});
}

function veriftHostAcc(userData) {
  return new Promise((resolve, reject) => {});
}
*/
