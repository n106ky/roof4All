// ======
// SETUP:
// ======
// npm i express

// .EJS:
// 2. npm i ejs

// MONGO DB:
// 3. npm i mongoose
// 4. npm i bcryptjs
// 5. npm i client-sessions
// 6. npm i dotenv

// sendGrid
// 7. Install the SendGrid API module: npm install “@sendgrid/mail”

const path = require("path");

// Set up dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "./config/keys.env" });

const authData = require("./modules/auth-service.js");

const express = require("express");
const clientSessions = require("client-sessions");
const session = require("express-session"); // For secure configurations
const app = express();
const HTTP_PORT = process.env.PORT || 6543;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // By including this middleware, your Express application can now properly receive and parse form data and append it to the req.body property, so you can work with the form data in your route handlers. Without this middleware, req.body would be undefined for URL-encoded form submissions.
app.use(express.static("public"));

app.use(
  session({
    // secret: process.env.SESSION_SECRET, // A secret key for signing the cookie
    secret: "SB9AO-DB5YS-QF5DS-NC6GD",
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    cookie: {
      httpOnly: true, // Prevents client side JS from reading the cookie
      secure: false, // true: Ensures the cookie is sent over HTTPS
      sameSite: "strict", // Ensures the cookie is sent only to your website
      maxAge: 1000 * 60 * 60 * 24, // Sets cookie expiry to one day (in milliseconds)
    },
  })
);

// USER LOGIN
app.use(
  clientSessions({
    cookieName: "session", // Name of the cookie
    // secret: process.env.CLIENT_SESSION_SECRET, // Secret key for signing the cookie
    secret: "DH3AJ-EJ2AN-OD0UD-VB8DE",
    duration: 2 * 60 * 1000, // Total duration of the session (2 minutes in this case)
    activeDuration: 3 * 60 * 1000, // Active duration extension (3 minutes in this case)
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session; // contains data like user information, preferences
  next(); //  If the user is logged in (i.e., req.session.user is set), it calls the next function to pass control to the next middleware or route handler. This means the user can continue to access the route that is protected by this middleware.
});

// Custom middleware, used to protect a route from unauthorized access:
function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}

// Setup a route to return the signup page
app.get("/register", (req, res) => {
  res.render("register", {
      title: "Sign-Up Page",
      validationSignUpMessage: {},
    values: {
         userName:"",
         email: "",
          password:""
      }   
  });
});


app.post("/register", (req, res) => {
  let { userName,email, password } = req.body;
  let validationSignUpPassed = true;
  let validationSignUpMessage = {};

  // validate userName (not null and not empty)
  if (typeof (userName) !== "string") {
      validationSignUpPassed = false;
      validationSignUpMessage.userName = "Please enter your user name";
  }
  else if (userName.trim().length === 0 || userName==="" || userName===null) {
      validationSignUpMessage.userName = "user name must contain at least 1 character";
      validationSignUpPassed = false;
  }
  if (typeof (email) !== "string") {
      validationSignUpPassed = false;
      validationSignUpMessage.email = "email is required";
  }
  else if (email.trim().length === 0 || email===null) {
      validationSignUpPassed = false;
      validationSignUpMessage.email = "email must contain at least 1 character";
  }
  
  
 
  if (password === null) {
      validationSignUpPassed = false;
      validationSignUpMessage.password = "password is required";
  }
  else if (password.trim().length === 0) {
      validationSignUpPassed = false;
      validationSignUpMessage.password = "password must contain at least 1 character";
  }
  // output
  if (validationSignUpPassed) {
      // set up email
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
      // construct an email structure
      const msg = {
      to: email,
      from:"naomiran1989@gmail.com",
      subject: "Welcome to register",
      html:
          `Hi, ${userName}, congratuate to become a member of ROOF4ALL<br>
           Your Email Address:${email}<br>`   
      };
// send the email
      sgMail.send(msg)
          .then(() => {
            res.send("Welcome to roof4all");
          })
          .catch(err => {
              console.log(err);
              res.render("register", {
                  title: "register page",
                  validationSignUpMessage,
                  values: req.body
              });
          });
  } else {
      res.render("register", {
          title: "register page",
          validationSignUpMessage,
          values: req.body
      });
  }
});

app.get("/emailSent", (req, res) => {
  res.render("emailSent");
});

app.get("/verification", (req, res) => {
  res.render("verification", { successMessage: null, errorMessage: null });
});


app.get("/login", (req, res) => {
  res.render("login", { errorMessage: null, userName: null });
});

app.post("/login", async (req, res) => {
  try {
    req.body.userAgent = req.get("User-Agent");
    const user = await authData.checkUser(req.body);

    req.session.user = {
      userID: user._id,
      userName: user.userName,
      email: user.email,
      loginHistory: user.loginHistory,
      userType: user.userType,
      verified: user.verified,
    };
    const userID = req.session.user.userID;
    // console.log("SESSION USER: ",  userID);
    const userDetails = await authData.getUser(userID);
    // console.log("LOGIN USER: ", userDetails);
    res.render("member", { user: userDetails });
  } catch (err) {
    res.render("login", { errorMessage: err, userName: req.body.userName });
  }
});

app.get("/register", (req, res) => {
  res.render("register", {
    successMessage: null,
    errorMessage: null,
    userName: null,
  });
});

app.get("/member", ensureLogin, async (req, res) => {
  try {
    const userID = req.session.userID;
    const userData = await authData.getUser(userID);
    res.render("member", { user: userData });
  } catch (err) {
    console.log(err);
    res.status(500).render("500", {
      message: `I'm sorry, but we've encountered the following error: ${err}`,
    });
  }
});

app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Could not logout.");
    }
    res.redirect("/home");
  });
});

/////// HOME
app.get("/", (req, res) => {
  res.render("home");
});

////////////////////////////////////////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
  res.status(404).render("404", { title: "404: Page Not Found" });
});

authData.initialize().then(() => {
  app.listen(HTTP_PORT, () =>
    console.log(`server listening on: http://localhost:${HTTP_PORT}`)
  );
});
