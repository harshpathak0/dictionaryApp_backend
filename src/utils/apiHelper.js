const httpStatus = require("http-status");
const { model } = require("mongoose");

module.exports.successResponseGenerator = (statusCode, message, data = {}) => ({
    status: "Success",
    code: statusCode,
    message: message,
    data: data
});

module.exports.errorResponse = (statusCode, message, data = {}) => ({
    status: "Error",
    code: statusCode,
    message: message,
    data: data
});