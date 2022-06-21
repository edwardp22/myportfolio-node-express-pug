const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const data = require("./data.json");
// Extracting a list of all technologies to be used in the filter section
const technologiesList = [];
data.projects.forEach((project) => {
  project.technologies.forEach((tech) => {
    if (!technologiesList.some((techL) => techL === tech)) {
      technologiesList.push(tech);
    }
  });
});

app.set("view engine", "pug");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { projects: data.projects, technologiesList });
});

app.get("/project/:index", (req, res, next) => {
  const project = data.projects[req.params.index];

  if (project) {
    res.render("project", { project });
  } else {
    next();
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/type/:type", (req, res) => {
  const selected = req.params.type;

  const projects = data.projects.filter((project) =>
    project.technologies.some(
      (tech) => tech.toUpperCase() === selected.toUpperCase()
    )
  );

  res.render("index", { projects: projects, technologiesList, selected });
});

app.use((req, res, next) => {
  res.status(404).render("404", { message: "Page not found" });
});

app.listen(port, () => console.log("Running on localhost " + port));
