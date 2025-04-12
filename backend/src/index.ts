import express from "express";
import "reflect-metadata";
import { AppDataSource } from "../src/config/db";
import authRoutes from "./routes/authRoutes";
import movieRoutes from "./routes/movieRoutes";

const app = express();
app.use(express.json());

// Kết nối database
AppDataSource.initialize()
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
