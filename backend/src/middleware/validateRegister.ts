import { body } from "express-validator";

export const validateRegister = [
    body("name").notEmpty().withMessage("Tên không được để trống"),
    body("email").isEmail().withMessage("Email không hợp lệ"),
    body("password").isLength({ min: 6 }).withMessage("Mật khẩu ít nhất 6 ký tự"),
    body("phone").notEmpty().withMessage("Số điện thoại không được để trống")
];
