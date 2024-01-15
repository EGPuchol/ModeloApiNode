// cors sistema de seguridad
//morgan
//jsonwebtoken

// llamar variables de entorno (librerías importadas)
require("dotenv").config();
const cors = require("cors");
const logger = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");

//componentes mios que voy a utilizar
const HTTPSTATUSCODE = require("./utils/httpStatusCode");

console.log(process.env);

/* INICIAR EXPRESS */
const express = require("express");

const connectMongo = require("./utils/db");
connectMongo();

const app = express();

app.use(mongoSanitize());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4200"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.set("secretKey", "nodeRestApi");

/* ROUTES */
const userRouter = require("./src/routes/user.routes");
const movieRouter = require("./src/routes/movie.routes");
const studioRouter = require("./src/routes/studio.routes");
app.use("/api/movies/", movieRouter);
app.use("/api/users/", userRouter);
app.use("/api/studios/", studioRouter);


// ruta de bienvenida
app.get("/", (request, response) => {
  response.status(200).json({
    message: "Welcome to server",
    app: "My App",
  });
});

// MANEJO DE ERRORES
app.use((request, response, next) => {
  let error = new Error();
  error.status = 404;
  error.message = HTTPSTATUSCODE[404];
  next(error);
});

app.use((error, request, response, next) => {
  return response.status(error.status || 500).json(error.message || "Unexpected error");
});

app.disable("x-powered-by");

/* DEFINIR EL PUERTO E INICIAR LA ESCUCHA */
app.listen(process.env.PORT, () => {
  console.log(`app running in port ${process.env.PORT}`);
});
