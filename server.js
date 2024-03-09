// ======
// SETUP:
// ======
// npm i express

// TO USE .EJS:
// 2. npm i ejs

// TO USE MONGO DB:
// 3. npm i mongoose
// 4. npm i bcryptjs
// 5. npm i client-sessions
// 6. npm i dotenv


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
    secret: process.env.SESSION_SECRET, // A secret key for signing the cookie
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
      secret: process.env.CLIENT_SESSION_SECRET, // Secret key for signing the cookie
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
  

  // HOME
app.get("/", (req, res) => {
  res.render("home");
});


  app.get("/login", (req, res) => {
    res.render("login", { errorMessage: null, userName: null });
  });
  
  app.post("/login", (req, res) => {
    req.body.userAgent = req.get("User-Agent");
  
    authData
      .checkUser(req.body)
      .then((user) => {
        req.session.user = {
          userName: user.userName,
          email: user.email,
          loginHistory: user.loginHistory,
        };
        res.redirect("/");
      })
      .catch((err) => {
        res.render("login", { errorMessage: err, userName: req.body.userName });
      });
  });
  
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
          successMessage: "Successfully registered! Redirecting to login in 3s...",
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
  
  app.get("/logout", (req, res) => {
    req.session.reset();
    res.redirect("/");
  });
  
  app.get("/userHistory", ensureLogin, (req, res) => {
    res.render("userHistory");
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
