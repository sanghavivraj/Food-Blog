const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Ingredients: {
      type: Array,
      required: true,
    },
    Instructions: {
      type: String,
      required: true,
    },
    Time: {
      type: String,
    },
    CoverImage: {
      type: String,
    },
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recipe', recipeSchema)
