import jwt from "jsonwebtoken";

// Access token
export const generateAccessToken = (payload: any) => {
    const token = jwt.sign({ data: payload }, `${process.env.JWT_SECRET}`, { expiresIn: `10h` });
    return token;
};

export const verifyToken = (token: string): any => {
    try {
        const secret = `${process.env.JWT_SECRET}`;
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error: any) {
        console.log("Error while jwt token verification");

        return null;
    }
};

// Refresh token

export const generateRefreshToken = (payload: any) => {
    const token = jwt.sign({ data: payload }, `${process.env.JWT_SECRET}`, { expiresIn: `48h` });
    return token;
};

export const verifyRefreshToken = (token: string): any => {
    try {
        const secret = `${process.env.JWT_SECRET}`;
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        return null;
        console.log(error as Error);
    }
};

// Register token

export const generateRegsterToken = (payload: any) => {
    const token = jwt.sign({ data: payload }, `${process.env.JWT_SECRET}`, { expiresIn: `1h` });
    return token;
};

export const verifyRegisterToken = (token: string): any => {
    try {
        const secret = `${process.env.JWT_SECRET}`;
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error: any) {
        console.log("Error while jwt token verification");

        return null;
    }
};
