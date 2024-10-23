const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
    word: { type: String, required: true, unique: true },
  },
  { versionKey: false, timestamps: true }
);


const wordData = mongoose.model("word", wordSchema);
module.exports = wordData;
