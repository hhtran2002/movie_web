import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

//Load biến môi trường
dotenv.config();

console.log("🔍 DB_USER:", process.env.DB_USER);

//Tạo DataSource để kết nối SQL Server
export const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.DB_HOST,
    port: Number( process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, //Tự động tạo bảng theo Entity
    logging: true, //kiểm tra log query
    entities: ["src/models/**/*.ts"],
    options: {
        encrypt: false, //Nếu SQL Server yêu cầu SSL thì đặt là true
        enableArithAbort: true,
    },
}
);

//Khởi tạo kết nối database
AppDataSource.initialize()
    .then(() =>{
        console.log("Kết nối SQL Server thành công!");
    })
    .catch((error) => console.log("Lỗi kết nối database: ", error));