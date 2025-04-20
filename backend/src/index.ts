import express from "express";
import cors from "cors"; // 👈 thêm dòng này
import "reflect-metadata";
import { AppDataSource } from "../src/config/db";
import authRoutes from "./routes/authRoutes";
import movieRoutes from "./routes/movieRoutes";
import adminRouter from "./routes/adminRouter";

const app = express();

// ✅ Thêm cấu hình CORS
app.use(cors({
    origin: "http://localhost:5173", // Cho phép frontend React truy cập
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use(express.json());

// Kết nối database
AppDataSource.initialize()
    .then(() => {
        console.log("✅ Kết nối SQL Server thành công!");
    })
    .catch((error) => console.log("❌ Lỗi kết nối SQL Server:", error));

// Định tuyến API
app.use("/api", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/admin", adminRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
