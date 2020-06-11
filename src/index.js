import "@babel/polyfill/noConflict";
import express from "express";
import compression from "compression";
import bodyParser from "body-Parser";
import React, { useImperativeHandle } from "react";
import cors from "cors";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import morgan from "morgan";
import helmet from "helmet";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import serialize from "serialize-javascript";
import { Provider } from "react-redux";
import { renderRoutes, matchRoutes } from "react-router-config";
import cookieParser from "cookie-parser";
import reducers from "./client/reducers";
import mongoose from "mongoose";
import Routes from "./client/Routes";
import index from "./routers/index";
import session from "express-session";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import multer from "multer";
import fs, { access } from "fs";
import path from "path";
import https from "https";

const app = express();
app.use(cookieParser());
const MONGODB_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-m4fqf.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true`;
const MongoDBStore = connectMongoDBSession(session);
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "picUrl");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const accessLogStream = fs.createWriteStream(path.join("src/", "access.log"), {
  flags: "a",
});
console.log(path.join(__dirname, "access.log"), "???");

app.use(cors());
// app.options("*", cors());
app.use(express.static("public"));
app.use("/picUrl", express.static("picUrl"));
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("picUrl")
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).send({ msg: message, data: data });
});
app.use("/", index);

app.get("*", (req, res, next) => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));
  // console.log(matchRoutes(Routes, req.path),"*******matchRoutes(Routes, req.path)********>");
  // console.log(req.path, "***************req.path****************>");
  // console.log(req.user, "***************req.user****************>");
  // console.log("******",store.getState(), "***************csrfToken****************>");

  const promises = matchRoutes(Routes, req.path).map(({ route, match }) => {
    // console.log(route, "****************route***************>");
    console.log(match, "***************match****************>", req.userId);
    // console.log(req.isLoggedIn, "***************req.isLoggedIn****************>");
    return route.loadedData
      ? route.loadedData(
          store,
          match.params._id,
          req.isLoggedIn,
          req.user,
          match.path.split("/")[1]
        )
      : Promise.resolve(null);
  });

  // console.log(promises, "***************promises****************>");
  Promise.all(promises).then((result) => {
    // console.log(
    //   result,
    //   "*************** Promise.all(promises)****************>"
    // );
    const context = {};
    const home = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.path}>
          <div>{renderRoutes(Routes)}</div>
        </StaticRouter>
      </Provider>
    );
    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.NotFound) {
      res.status(404);
    }
    res.send(
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="https://fonts.googleapis.com/css?family=Righteous&display=swap" rel="stylesheet" >
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
        <link href="/style.css" rel="stylesheet" type="text/css">
        <link rel="shortcut icon" href="/">
        <basehref="/">
        <script src="https://kit.fontawesome.com/a076d05399.js"></script>
        <title>server</title>
      </head>
        <body>
          <div id="root">${home}</div>
          <script>
            window.INITIAL_STATE =${serialize(store.getState())}
          </script>
          <script src="/bundle.js" charset="utf-8"></script>
        </body>
      </html>
      `
    );
  });
});

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    // const server=app.listen(3000, () => console.log("yesssssss"));
    const server = app.listen(process.env.PORT || 3000, () =>
      console.log("yesssssss")
    );
    const io = require("./soket").init(server);
    io.on("connection", (socket) => {
      console.log("client connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
