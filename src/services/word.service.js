const Word = require("../models/word.model");
const Meaning = require("../models/meaning.model"); 

const wordService = {
  getWord: async () => {
    const wordDoc = await Word.find();
    if (!wordDoc) {
      const error = new Error("Word not found");
      error.statusCode = 404;
      throw error;
    }
    return wordDoc;
  },

  createWord: async (data) => {
    const existingWord = await Word.findOne({ word: data.word });
    if (existingWord) {
      const error = new Error("Word already exists");
      error.statusCode = 400;
      throw error;
    }
    const newWord = new Word(data);
    return await newWord.save();
  },

   // Create a new meaning for a word
    createMeaning: async (wordId, meaning) => {
    const word = await Word.findById(wordId);
    if (!word) {
      const error = new Error("Word not found");
      error.statusCode = httpStatus.NOT_FOUND;
      throw error;
    }
    
    const newMeaning = new Meaning({ wordId, meaning });
    return await newMeaning.save();
  },

  // Retrieve or filter meanings for a word
  getMeanings: async (wordId) => {
    const word = await Word.findById(wordId);
    if (!word) {
      const error = new Error("Word not found");
      error.statusCode = 404;
      throw error;
    }

    return await Meaning.find({ wordId });
  },

  // Edit a meaning for a word
  editMeaning: async (meaningId, body) => {
      const meaningDoc = await Meaning.findByIdAndUpdate(
        meaningId,
        { meaning: body.meaning },
        { new: true, runValidators: true }
      );
  
      if (!meaningDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, "Meaning not found");
      }
  
      return { meaningDoc };
    },

  // Delete a meaning for a word
  deleteMeaning: async (meaningId) => {
    const deletedMeaning = await Meaning.findByIdAndDelete(meaningId);
    
    if (!deletedMeaning) {
      throw new ApiError(httpStatus.NOT_FOUND, "Meaning not found");
    }
  
    return deletedMeaning;
  }
};

module.exports = wordService;
