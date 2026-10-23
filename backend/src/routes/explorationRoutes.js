const express = require("express");
const Exploration = require("../models/Exploration");

const router = express.Router();

// GET all explorations
router.get("/", async (req, res) => {
  try {
    const explorations = await Exploration.find().sort({ updatedAt: -1 });
    res.json(explorations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET one exploration
router.get("/:id", async (req, res) => {
  try {
    const exploration = await Exploration.findById(req.params.id);

    if (!exploration) {
      return res.status(404).json({ message: "Exploration not found" });
    }

    res.json(exploration);
  } catch (error) {
    res.status(400).json({ message: "Invalid exploration ID" });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const { name, functionType, parameters } = req.body;

    if (
      !name?.trim() ||
      !parameters ||
      typeof parameters !== "object" ||
      Array.isArray(parameters)
    ) {
      return res
        .status(400)
        .json({ message: "Name and parameters are required" });
    }

    const allowedTypes = ["quadratic", "cubic", "exponential"];
    if (!allowedTypes.includes(functionType)) {
      return res.status(400).json({ message: "Invalid function type" });
    }

    const values = Object.values(parameters);
    if (
      values.length === 0 ||
      !values.every(
        (value) => typeof value === "number" && Number.isFinite(value),
      )
    ) {
      return res
        .status(400)
        .json({ message: "Parameters must be finite numbers" });
    }

    const exploration = await Exploration.create({
      name,
      functionType,
      parameters,
    });

    res.status(201).json(exploration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { name, functionType, parameters } = req.body;

    if (
      !name?.trim() ||
      !parameters ||
      typeof parameters !== "object" ||
      Array.isArray(parameters)
    ) {
      return res
        .status(400)
        .json({ message: "Name and parameters are required" });
    }

    if (!["quadratic", "cubic", "exponential"].includes(functionType)) {
      return res.status(400).json({ message: "Invalid function type" });
    }

    const values = Object.values(parameters);
    if (
      values.length === 0 ||
      !values.every(
        (value) => typeof value === "number" && Number.isFinite(value),
      )
    ) {
      return res
        .status(400)
        .json({ message: "Parameters must be finite numbers" });
    }

    const exploration = await Exploration.findByIdAndUpdate(
      req.params.id,
      { name, functionType, parameters },
      { new: true, runValidators: true },
    );

    if (!exploration) {
      return res.status(404).json({ message: "Exploration not found" });
    }

    res.json(exploration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const exploration = await Exploration.findByIdAndDelete(req.params.id);

    if (!exploration) {
      return res.status(404).json({ message: "Exploration not found" });
    }

    res.json({ message: "Exploration deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid exploration ID" });
  }
});

module.exports = router;
