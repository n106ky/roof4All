/*
======
SETUP:
======
npm i express
npm i moment
npm i ejs
npm i mongoose
npm i bcryptjs
npm i client-sessions
npm i dotenv
*/

/* 
TO DO LIST
==========
Bugs fix:
1. password
2. dob
3. options in verification
4. turn to another page after verication
5. list properties: start day, end day
6. home page writing
7. list - mutiple img urls
----------
Functions to implement:
1. get listing done.
2. render listing to page.
3. search engine
4. dashboard "Recent Activities" (databse base)
*/

const authData = require("./modules/auth-service.js");
const listData = require("./modules/list-service.js");

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

async function ensureHostVerified(req, res, next) {
  console.log(req.session.user);
  if (!req.session.user) {
    res.redirect("/login");
  }
  const user = await authData.getUser(req.session.user.userID);
  console.log("USER", user);
  if (user.userType != "host" || user.verified == false) {
    res.status(403).render("403", {
      message: `ERROR: You need to be a verified host to post property`,
    });
  } else {
    next();
  }
}

app.get("/register", (req, res) => {
  res.render("register", {
    successMessage: null,
    errorMessage: null,
    userName: null,
  });
});

app.post("/register", (req, res) => {
  authData
    .registerUser(req.body)
    .then(() => {
      res.render("register", {
        successMessage:
          "Successfully registered! Sending comfirmation email...",
        errorMessage: null,
        userName: req.body.userName,
      });
    })
    .catch((err) => {
      console.log("reqbody in Register: ", req.body);
      res.render("register", {
        successMessage: null,
        errorMessage: err,
        userName: req.body.userName,
      });
    });
});

app.get("/emailSent", (req, res) => {
  res.render("emailSent");
});

app.get("/verification", ensureLogin, (req, res) => {
  res.render("verification", { successMessage: null, errorMessage: null });
});

app.post("/verification", ensureLogin, (req, res) => {
  const userID = req.session.user.userID;
  authData
    .verifyUser(userID, req.body)
    .then(() => {
      res.render("verification", {
        successMessage: "Successfully verified",
        errorMessage: null,
        userName: req.body.userName,
      });
    })
    .catch((err) => {
      console.log("reqbody in Individual Verification: ", req.body);
      res.render("verification", {
        successMessage: null,
        errorMessage: err,
        userName: req.body.userName,
      });
    });
});

app.get("/verificationBusAcc", ensureLogin, (req, res) => {
  res.render("verificationBusAcc", {
    successMessage: null,
    errorMessage: null,
  });
});

app.post("/verificationBusAcc", ensureLogin, (req, res) => {
  const userID = req.session.user.userID;
  authData
    .verifyUser(userID, req.body)
    .then(() => {
      res.render("verificationBusAcc", {
        successMessage: "Successfully verified",
        errorMessage: null,
        userName: req.body.userName,
      });
    })
    .catch((err) => {
      console.log("reqbody in Business verification: ", req.body);
      res.render("verificationBusAcc", {
        successMessage: null,
        errorMessage: err,
        userName: req.body.userName,
      });
    });
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
    const userData = await authData.getUser(userID);
    const properties = await listData.getHostProperties(userID);
    res.render("dashboard", { user: userData, prop: properties });
  } catch (err) {
    res.render("login", { errorMessage: err, userName: req.body.userName });
  }
});

app.get("/dashboard", ensureLogin, async (req, res) => {
  try {
    const userID = req.session.user.userID;
    const userData = await authData.getUser(userID);
    const properties = await listData.getHostProperties(userID);
    res.render("dashboard", { user: userData, prop: properties });
  } catch (err) {
    console.log(err);
    res.status(500).render("500", {
      message: `I'm sorry, but we've encountered the following error: ${err}`,
    });
  }
});

app.get("/mylistings", ensureLogin, async(req,res)=>{
  try{
    const userID = req.session.user.userID;
    const userData = await authData.getUser(userID);
    const properties = await listData.getHostProperties(userID);
    res.render("mylistings", { user: userData, prop: properties });
  }
  catch(err){
    res.status(500).render("500", {
      message: `I'm sorry, but we've encountered the following error: ${err}`,
    });
  }
})

app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Could not logout.");
    }
    res.redirect("/");
  });
});

////// HOST FUNCTIONS
app.get("/postProperty", ensureHostVerified, (req, res) => {
  res.render("postProperty");
});

app.post("/postProperty", (req, res) => {
  try {
    const userID = req.session.user.userID;
    const prop = listData.postProperty(userID, req.body);
    res.render("home", {
      // postProperty
      // successMessage:
      //   "Successfully listed",
      // errorMessage: null,
      // userName: req.body.userName,
    });
  } catch (err) {
    console.log("reqbody in postProperty: ", req.body);
    res.render("home", {
      // successMessage: null,
      // errorMessage: err,
      // userName: req.body.userName,
    });
  }
});

////// HOME
app.get("/", (req, res) => {
  res.render("home");
});

////////////////////////////////////////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
  res.status(404).render("404", { title: "404: Page Not Found" });
});

Promise.all([authData.initialize(), listData.initialize()])
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on: http://localhost:${HTTP_PORT}`);
    });
  })
  .catch((error) => {
    console.error("Initialization failed", error);
    process.exit(1);
  });
