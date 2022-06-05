const express = require("express");
const data = require("./data.json");
const app = express();

app.set("view engine", "pug");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { projects: data.projects });
});

app.get("/project/:id", (req, res, next) => {
  const project = data.projects.find(
    (project) => project.id === +req.params.id
  );

  if (project) {
    res.render("project", { project });
  } else {
    next();
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use((req, res, next) => {
  res.status(404).render("404", { message: "Page not found" });
});

app.listen(80, () => console.log("Running on localhost 80"));
