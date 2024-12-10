import mongoose from "mongoose";

const flightsSchema = new mongoose.Schema({
    departureCity: {
        type: String,
        required: true,
        unique: true,
    },
    arrivalCity: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
        unique: true,
    },
    departureTime: {
        type: String,
        required: true,
        unique: true,
    },
    arrivalTime: {
        type: String,
        required: true,
        unique: true,
    },
    flightNumber: {
        type: Number,
        required: true,
        unique: true,
    }
});

const Flight = mongoose.model("Flight", flightsSchema);

export default Flight;