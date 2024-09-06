import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/utils/db.js";
import userRoute from "./src/routes/user.route.js";
import companyRoute from "./src/routes/company.route.js";
import jobRoute from "./src/routes/job.route.js";
import ApplicationRoute from "./src/routes/application.route.js";
dotenv.config({});
const app = express();
// middleware
const corsOptions = {
  origin: "https//localhost:5132",
  Credentials: true,
};

app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieparser());
app.use("api/v1/users", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("api/v1/jobs", jobRoute);
app.use("/api/v1/application", ApplicationRoute);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listing at  port${PORT}`);
});
