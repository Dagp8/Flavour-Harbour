module.exports = function (app, pageData) {
  // Handle our routes
  app.get("/", function (req, res) {
    res.render("index.ejs", pageData);
  });
  app.get("/about", function (req, res) {
    res.render("about.ejs", pageData);
  });
  app.get("/recipes", function (req, res) {
    res.render("recipes.ejs", pageData);
  });
};
