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

app.get("/:type", (req, res) => {
  const projects = data.projects.filter((project) =>
    project.technologies.some(
      (tech) => tech.toUpperCase() === req.params.type.toUpperCase()
    )
  );

  res.render("index", { projects: projects, technologiesList });
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

app.listen(port, () => console.log("Running on localhost " + port));
