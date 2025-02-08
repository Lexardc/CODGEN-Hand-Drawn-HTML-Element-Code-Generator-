const mongoose = require("mongoose");

const ImageDetailsSchema = new mongoose.Schema(
  {
    image: String,
    imageUrl: String, // Add a field for the image URL
    userUUID: String, // Field to store user UUID
    chatUUID: String // Field to store chat UUID
  },
  {
    collection: "imagedetails",
  }
);
ImageDetailsSchema.index({ userId: 1, chatUUID: 1 });
mongoose.model("ImageDetails", ImageDetailsSchema);

module.exports = mongoose.model("ImageDetails");
