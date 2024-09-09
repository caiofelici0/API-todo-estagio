import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default";

export function generateToken(email: string) {
    return jwt.sign({ id: email }, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET_KEY);
}
