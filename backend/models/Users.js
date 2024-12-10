import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    info: {
        name: { type: String, required: false },
        age: { type: Number, required: false },
        nationality: { type: String, required: false },
        birthDate: { type: Date, required: false},
        gender: { type: String, required: false },
        phoneNumber: { type: Number, required: false }
    }
});

const User = mongoose.model("User", userSchema);

export default User;