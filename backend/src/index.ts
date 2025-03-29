import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import authRoutes from "./routes/authRoutes";
import movieRoutes from "./routes/movieRoutes"; // Import tuyến đường phim

const app = express();
app.use(express.json()); // Middleware để parse JSON

// Kết nối database
createConnection()
    .then(() => {
        console.log("✅ Kết nối SQL Server thành công!");
    })
    .catch((error) => console.log("❌ Lỗi kết nối SQL Server:", error));

// Định tuyến API
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes); // 🔥 Thêm dòng này để API hoạt động

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
