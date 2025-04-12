import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import authRoutes from "./routes/authRoutes";
import movieRoutes from "./routes/movieRoutes";
import dotenv from "dotenv";

// Load biến môi trường
dotenv.config();

// Kiểm tra biến môi trường
console.log("🔍 DB_HOST:", process.env.DB_HOST);
console.log("🔍 DB_PORT:", process.env.DB_PORT);
console.log("🔍 DB_USER:", process.env.DB_USER);
console.log("🔍 DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("🔍 DB_NAME:", process.env.DB_NAME);

const app = express();
app.use(express.json());

// Kết nối database
createConnection({
  type: "mssql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 1433,
  username: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "123",
  database: process.env.DB_NAME || "Movie",
  synchronize: true, // Tự động tạo bảng theo Entity
  logging: true,
  entities: ["src/entities/**/*.ts"], // Điều chỉnh nếu thực thể nằm ở nơi khác
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
})
  .then(() => {
    console.log("✅ Kết nối SQL Server thành công!");
  })
  .catch((error) => console.log("❌ Lỗi kết nối SQL Server:", error));

// Định tuyến API
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});