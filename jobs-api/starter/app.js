require("dotenv").config();
require("express-async-errors");

//extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

// swaggerDocs
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");

// setting up url for local and production environment
const { servers } = swaggerDoc;
let url = servers.map((item) => item.url)[0];
if (process.env.NODE_ENV === "local") {
  url = process.env.LOCAL_URL;
} else {
  url = process.env.PRODUCTION_URL;
}
swaggerDoc.servers[0].url = url;

//
const express = require("express");
const app = express();
const morgan = require("morgan");

// local imports
const connectDb = require("./db/connect");
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/error-handler");
const userAuthenticated = require("./middleware/authentication");
const jobRoutes = require("./routes/jobs");
const authRoutes = require("./routes/auth");

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// security middleware
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(helmet());
app.use(cors({ origin: "http://localhost", optionsSuccessStatus: 200 }));
app.use(xss());

// swagger docs route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// app routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", userAuthenticated, jobRoutes);

//
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
