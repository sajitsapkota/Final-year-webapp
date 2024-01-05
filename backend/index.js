
import { dbconnect } from "./src/config/dbconfig.js";
import express from "express";
import cors from "cors";
import mainrouter from "./src/routes/main.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(mainrouter);

dbconnect(); // Call the dbconnect function to establish the database connection

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
