const express = require("express");
const router = express.Router();
const Bookmark = require("../models/Bookmark");

router.post("/", async (req, res) => {
    try {
        const { title, url, category } = req.body;

        const bookmark = new Bookmark({ title, url, category });
        const saved = await bookmark.save();

        res.status(201).json(saved);
    } catch (err) {
        if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const bookmarks = await Bookmark.find().sort({ createdAt: -1 });

        res.status(200).json(bookmarks);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Bookmark.findByIdAndDelete(req.params.id);

        if (!deleted) {
        return res.status(404).json({ message: "Bookmark not found" });
        }

        res.status(200).json(deleted);
    } catch (err) {
        if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid bookmark ID" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;