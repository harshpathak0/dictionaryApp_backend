const httpStatus = require("http-status");
const wordService = require("../../src/services/word.service");
const catchAsync = require("../../src/utils/catchAsync");
const { successResponseGenerator, errorResponse } = require("../../src/utils/apiHelper");

const getWord = catchAsync(async (req, res) => {
  try {
    const wordDoc = await wordService.getWord();
    res
      .send(successResponseGenerator(httpStatus.OK, "Word retrieved successfully", wordDoc));
  } catch (error) {
    res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .send(errorResponse(error.statusCode, error.message));
  }
});

const createWord = catchAsync(async (req, res) => {
  try {
    const newWord = await wordService.createWord(req.body);
    res
      .send(successResponseGenerator(httpStatus.CREATED, "Word created successfully", newWord));
  } catch (error) {
    res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .send(errorResponse(error.statusCode, error.message));
  }
});

// Create a meaning for a word
const createMeaning = catchAsync(async (req, res) => {
  try {
    const { wordId, meaning } = req.body;
    const newMeaning = await wordService.createMeaning(wordId, meaning);
    res
      .send(successResponseGenerator(httpStatus.OK, "Meaning created successfully", newMeaning));
  } catch (error) {
    console.error("Error: ", error);
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    res
      .status(statusCode)
      .send(errorResponse(statusCode, error.message));
  }
});

// Get or filter meanings for a word
const getMeaningsForWord = catchAsync(async (req, res) => {
  try {
    const wordId = req.params.wordId;
    const meanings = await wordService.getMeanings(wordId);
    res
      .send(successResponseGenerator(httpStatus.OK, "Meanings retrieved successfully", meanings));
  } catch (error) {
    res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .send(errorResponse(error.statusCode, error.message));
  }
});

// Edit a meaning for a word
const editMeaning = catchAsync(async (req, res) => {
  try {
    const { meaning } = req.body;
    const meaningId = req.params.meaningId;

    const { meaningDoc } = await wordService.editMeaning(meaningId, { meaning });

    res
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "Meaning updated successfully",
          meaningDoc
        )
      );
  } catch (error) {
    res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .send(errorResponse(error.statusCode, error.message));
  }
});

// Delete a meaning for a word
const deleteMeaning = catchAsync(async (req, res) => {
  try {
    const meaningId = req.params.meaningId;

    const deletedMeaning = await wordService.deleteMeaning(meaningId);

    res
      .send(successResponseGenerator(httpStatus.OK, "Meaning deleted successfully", deletedMeaning));
  } catch (error) {
    res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .send(errorResponse(error.statusCode, error.message));
  }
});


module.exports = {
  getWord,
  createWord,
  createMeaning,
  getMeaningsForWord,
  editMeaning,
  deleteMeaning,
};
