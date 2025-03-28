import express from "express";
import { AppDataSource } from "../src/config/db"; // Đảm bảo import database

const app = express();
app.use(express.json());

// Kết nối database
AppDataSource.initialize()
    .then(() => {
        console.log("✅ Kết nối SQL Server thành công!");
    })
    .catch((error) => console.log("❌ Lỗi kết nối database:", error));

app.listen(5000, () => {
    console.log("🔥 Server đang chạy trên cổng 5000");
});
