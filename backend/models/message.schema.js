const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderName: {
    type: String,
    minLength: [4, "Name Must Contain At Least 4 Characters!"],
  },
  email: { type: String, required: true },
  subject: {
    type: String,
    minLength: [4, "Subject Must Contain At Least 4 Characters!"],
  },
  message: {
    type: String,
    minLength: [4, "Message Must Contain At Least 4 Characters!"],
  },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);
