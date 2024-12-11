import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
    departureCity: {
        type: String,
        required: true,
        unique: false,
    },
    arrivalCity: {
        type: String,
        required: false,
    },
    departureTime: {
        type: String,
        required: true,
        unique: false,
    },
    departureTime: {
        type: String,
        required: true,
        unique: false,
    },
    arrivalTime: {
        type: String,
        required: true,
        unique: false,
    },
    flightNumber: {
        type: Number,
        required: true,
        unique: true,
    }
});

const Flight = mongoose.model("Flight", flightSchema);

export default Flight;