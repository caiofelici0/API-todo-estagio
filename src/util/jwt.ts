import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default";

type DecodedToken = {
    id: number;
};

export function generateToken(userId: number) {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET_KEY) as DecodedToken;
}
