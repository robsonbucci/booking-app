import app from "./app";
import connectToDatabase from "./database";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || "3000";

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${PORT}`);
});
