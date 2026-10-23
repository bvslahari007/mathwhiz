const mongoose = require("mongoose");

const explorationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    functionType: {
      type: String,
      required: true,
      enum: ["quadratic", "cubic", "exponential"],
    },
    parameters: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Exploration", explorationSchema);
