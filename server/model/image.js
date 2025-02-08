const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a Mongoose schema for your image data
const ImageSchema = new Schema({
  imageData: { type: Buffer } // Field to store binary image data
});
