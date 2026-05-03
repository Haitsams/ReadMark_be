const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    url: {
        type: String,
        required: [true, "URL is required"],
        trim: true,
    },
    category: {
        type: String,
        trim: true,
        default: "Umum",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Bookmark", BookmarkSchema);