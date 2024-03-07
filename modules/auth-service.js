require("dotenv").config();

const bcrypt = require("bcryptjs"); //  used for hashing and comparing passwords securely
const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema({
  userName: { type: String, unique: true },
  password: String,
  email: String,
  loginHistory: [
    {
      dateTime: { type: Date },
      userAgent: { type: String }, // useful piece of information for security, analytics, and troubleshooting purposes
    },
  ],
});

let User;

function initialize() {
  return new Promise(function (resolve, reject) {
    let db = mongoose.createConnection(process.env.MONGODB);
    db.on("error", (err) => {
      reject(err);
    });
    db.once("open", () => {
      User = db.model("users", userSchema);
      resolve();
      console.log(`Connection Successful: Connected to MongoDB.`);
    });
  });
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

module.exports = {
  initialize,
  registerUser,
  checkUser,
};
