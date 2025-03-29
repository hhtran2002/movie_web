import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json()); // Middleware để parse JSON

// Kết nối database
createConnection()
    .then(() => {
        console.log("✅ Kết nối SQL Server thành công!");
    })
    .catch((error) => console.log("❌ Lỗi kết nối SQL Server:", error));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
