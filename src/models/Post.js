const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    pie: {
      type: String,
      required: true
    },
    imgPost: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Post", PostSchema);
