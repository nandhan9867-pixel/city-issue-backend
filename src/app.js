// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const issueRoutes =
//   require("./routes/issueRoutes");
//  const dashboardRoutes =
// require("./routes/dashboardRoutes");

// const path = require("path");

// const authRoutes =
// require("./routes/authRoutes");

// const testRoutes =
// require("./routes/testRoutes");

// const app = express();

// app.use(express.json());

// // app.use(cors());

// // app.use(
// //   helmet({
// //     crossOriginResourcePolicy: false
// //   })
// // );
// app.use(helmet());

// app.use(morgan("dev"));

// app.use(
//   "/api/dashboard",
//   dashboardRoutes
// );

// app.use(
//   "/api/issues",
//   issueRoutes
// );

// app.use(
//   "/uploads",
//   express.static(
//     path.join(__dirname,"uploads")
//   )
// );

// app.use(
//   "/api/auth",
//   authRoutes
// );

// app.use(
//   "/api/test",
//   testRoutes
// );

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "City Issue Reporting API Running"
//   });
// });

// module.exports = app;






const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const authRoutes =
require("./routes/authRoutes");

const testRoutes =
require("./routes/testRoutes");

const issueRoutes =
require("./routes/issueRoutes");

const dashboardRoutes =
require("./routes/dashboardRoutes");

const app = express();

/*
====================================
MIDDLEWARE
====================================
*/

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

app.use(morgan("dev"));

/*
====================================
STATIC FILES
====================================
*/

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

/*
====================================
ROUTES
====================================
*/

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/test",
  testRoutes
);

app.use(
  "/api/issues",
  issueRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

/*
====================================
ROOT
====================================
*/

app.get("/", (req, res) => {

  res.json({
    success: true,
    message:
      "City Issue Reporting API Running"
  });

});

module.exports = app;