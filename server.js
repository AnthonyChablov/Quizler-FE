const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const quizRoute = require("./src/api/routes/quiz");
const directoryRoute = require("./src/api/routes/directory");

const port = parseInt(process.env.PORT) || 8080;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

let database_uri = process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connect(database_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1); // Terminate the application on database connection error
});

app.prepare().then(() => {
    const server = express();

    server.use(express.json()); // JSON body parser middleware

    server.get("/", (req, res) => {
        return app.render(req, res, "/", req.query);
    });

    // Route handlers
    server.use("/api/quizzes", quizRoute);
    server.use("/api/directory", directoryRoute);

    // server.get("/", (req, res) => {
    //  return app.render(req, res, "/", req.query);
    // });

    // Keep Next.js route handling in place
    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});