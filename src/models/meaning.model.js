const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
    wordId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "word",
      required: true,
    },
    meaning: { 
      type: String, 
      required: true 
    },  
  },
  { versionKey: false, timestamps: true }
);


const wordData = mongoose.model("meaning", wordSchema);
module.exports = wordData;
