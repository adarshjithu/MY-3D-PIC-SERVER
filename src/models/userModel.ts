import mongoose from "mongoose";

// Define enum properly with string values
export enum AuthType {
    MOBILE = "mobile",
    GOOGLE = "google",
    EMAIL = "email",
}

export enum Roles {
    USER = "user",
    ADMIN = "admin",
}

// Define user schema
const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, minlength: 2 },
        lastName: { type: String, required: true },
        phoneNumber: { type: Number, required: false },
        countryCode: { type: Number, required: false },
        email: { type: String, required: true },
        country: { type: String },
        authType: {
            type: String,
            enum: Object.values(AuthType),
            required: true,
        },
        password: { type: String, required: false },
        image: { type: String },
        isActive: { type: Boolean, default: true },
        isBlocked: { type: Boolean, default: false },
        role: { type: String, enum: Object.values(Roles), default: "user" },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
