const bcrypt = require("bcrypt");
const saltRounds = 10;
const { check, validationResult } = require("express-validator");

module.exports = function (app, pageData) {
  const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect("/login");
    } else {
      next();
    }
  };

  // Handle our routes
  app.get("/", function (req, res) {
    res.render("index.ejs", pageData);
  });
  app.get("/about", function (req, res) {
    res.render("about.ejs", pageData);
  });

  app.get("/logout", redirectLogin, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        // error, send an error message to the user.
        res.status(500).send("Error logging out. Please try again.");
      } else {
        //  no errors, send a success message and redirect to the home page.
        res.redirect("./");
      }
    });
  });

  app.get("/recipes", function (req, res) {
    res.render("recipes.ejs", pageData);
  });

  app.get("/login", function (req, res) {
    res.render("login.ejs", pageData);
  });

  app.post("/loggedin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Hashed password from the database for el username
    let sqlquery =
      "SELECT user_id, hashedPassword FROM users WHERE username = ?";
    db.query(sqlquery, [username], (err, result) => {
      if (err) {
        console.error("Error fetching user data:", err);
        return res.status(500).send("Error fetching user data");
      }
      if (result.length === 0) {
        // User not found
        return res.status(404).send("User not found");
      }

      const hashedPassword = result[0].hashedPassword;

      // Compare password
      bcrypt.compare(password, hashedPassword, function (err, passwordMatch) {
        if (err) {
          // Handle error
          return res.status(500).send("Error comparing passwords");
        } else if (passwordMatch) {
          // Passwords match
          req.session.userId = result[0].user_id; // Establece el userId en la sesión
          res.redirect("/dashboard");
        } else {
          // Passwords do not match
          res.status(401).send("Incorrect password");
        }
      });
    });
  });

  app.get("/register", function (req, res) {
    res.render("register.ejs", pageData);
  });

  app.post("/registered", [check("email").isEmail()], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.redirect("./register");
    } else {
      const plainPassword = req.body.password;
      // Hash the password using bcrypt
      bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
        if (err) {
          res.status(500).send("Error hashing password");
        } else {
          // Store the data in database
          let sqlquery =
            "INSERT INTO users (first_name, last_name, email, username, hashedPassword) VALUES (?, ?, ?, ?, ?)";
          let newpass = [
            req.sanitize(req.body.first),
            req.body.last,
            req.body.email,
            req.body.username,
            hashedPassword,
          ];

          db.query(sqlquery, newpass, (err, result) => {
            if (err) {
              console.error("Error saving user data:", err);
              res.status(500).send("Error saving user data");
            } else {
              res.render("login.ejs", pageData);
            }
          });
        }
      });
    }
  });

  app.get("/dashboard", redirectLogin, function (req, res) {
    const userId = req.session.userId;

    let sqlQuery = "SELECT * FROM recipes WHERE user_id = ?";
    db.query(sqlQuery, [userId], (err, recipes) => {
      if (err) {
        console.error("Error fetching recipes:", err);
        return res.status(500).send("Error fetching recipes");
      }
      const recipesWithExpansion = recipes.map((recipe) => ({
        ...recipe,
        expanded: 1,
      }));
      res.render("dashboard.ejs", {
        ...pageData,
        recipes: recipesWithExpansion,
      });
    });
  });

  app.get("/addrecipe", redirectLogin, function (req, res) {
    res.render("addrecipe.ejs", pageData);
  });

  app.post("/recipeadded", redirectLogin, function (req, res) {
    const userId = req.session.userId;

    //  check userId is a number
    if (isNaN(userId)) {
      console.error("Invalid User ID:", userId);
      return res.status(500).send("Invalid User ID");
    }

    const title = req.body.title;
    const description = req.body.description;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;

    // Insert the new recipe into the database
    let sqlQuery =
      "INSERT INTO recipes (user_id, title, description, ingredients, instructions) VALUES (?, ?, ?, ?, ?)";
    let recipeData = [userId, title, description, ingredients, instructions];

    db.query(sqlQuery, recipeData, (err, result) => {
      if (err) {
        console.error("Error adding recipe:", err);
        res.status(500).send("Error adding recipe");
      } else {
        res.redirect("/dashboard");
      }
    });
  });

  // delete recipe
  app.post("/deleterecipe/:recipeId", redirectLogin, function (req, res) {
    const userId = req.session.userId;
    const recipeId = req.params.recipeId;

    // Verify user has permit
    let sqlQuery = "DELETE FROM recipes WHERE recipe_id = ? AND user_id = ?";
    db.query(sqlQuery, [recipeId, userId], (err, result) => {
      if (err) {
        console.error("Error deleting recipe:", err);
        return res.status(500).send("Error deleting recipe");
      }

      console.log(`Recipe ${recipeId} deleted`);
      res.redirect("/dashboard");
    });
  });
};
