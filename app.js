const express = require("express");
const favicon = require("express-favicon");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const session = require("express-session");
const userSession = require("./middleware/user_session");
const app = express();
const myRoutes = require("./routers/index_routers");
const port = "3000";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "views")));

app.use(
  session({
    secret: "aboba",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  "/css/bootstrap.css",
  express.static(
    path.join(
      __dirname,
      "public/css/bootstrap-5.3.2/dist/css/bootstrap.min.css"
    )
  )
);


app.use(favicon(__dirname + "/public/favicon.png"));

app.use(userSession);
app.use(myRoutes);

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});

app.get("env") == "production";
if (app.get("env") == "production") {
  app.use((req, res, err) => {
    res.status(err.status);
    res.sendFile(err.message);
  });
}
//ERROR HANDLER
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).render('error', { title: 'Ошибка', message: error.message });
});
app.use((req, res, next) => {
  const error = new Error('Страница не найдена');
  error.statusCode = 404;
  next(error);
});

