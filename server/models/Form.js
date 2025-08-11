const mongoose = require('mongoose');
const { Schema } = mongoose;

const optionSchema = new Schema({
  id: String,
  text: String,
  image: String
});

const categorySchema = new Schema({
  id: String,
  name: String,
  options: [optionSchema]
});

const questionSchema = new Schema({
  type: { type: String, enum: ['categorize', 'cloze', 'comprehension'], required: true },
  questionText: String,
  questionImage: String,
  categories: [categorySchema],
  items: [{
    id: String,
    text: String,
    belongsTo: String
  }],
  clozeData: {
    text: String,
    blanks: [{
      id: String,
      correctAnswer: String
    }]
  },
  comprehensionData: {
    passage: String,
    questions: [{
      id: String,
      questionText: String,
      options: [optionSchema],
      correctAnswer: String
    }]
  }
});

const formSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  headerImage: String,
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Form', formSchema);