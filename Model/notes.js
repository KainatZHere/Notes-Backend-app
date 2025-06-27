const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "users",
    },
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
    },
    categories: {
      type: String,
      enum: {
        values: ["food", "study", "movies"],
        message: "categories should be food,study,movies",
      },
    },
  },
  { timestamps: true }
);

const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;
