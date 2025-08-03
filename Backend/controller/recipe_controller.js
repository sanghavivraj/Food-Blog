const Recipes = require('../modles/recipe_modles')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
  },
})

const upload = multer({ storage: storage })

const getRecipes = async (req, res) => {
  const recipes = await Recipes.find()
  return res.json(recipes)
}
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id)
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }
    return res.json(recipe)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}
const addRecipe = async (req, res) => {
  console.log(req.user)

  try {
    const { Title, Ingredients, Instructions, Time } = req.body

    if (!Title || !Ingredients || !Instructions) {
      return res
        .status(400)
        .json({ message: 'required fields cannot be empty' })
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Recipe image is required' })
    }

    // Convert Ingredients to array if it's a string
    let ingredientsArr = Ingredients
    if (typeof Ingredients === 'string') {
      ingredientsArr = Ingredients.split(',').map((i) => i.trim())
    }

    const newRecipe = await Recipes.create({
      Title,
      Ingredients: ingredientsArr,
      Instructions,
      Time,
      CoverImage: req.file.filename,
      createdBy: req.user.id,
    })
    return res.json(newRecipe)
  } catch (error) {
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message })
    }
  }
}
const editRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id
    const { Title, Ingredients, Instructions, Time } = req.body

    let updateFields = {
      Title,
      Instructions,
      Time,
    }

    if (Ingredients) {
      updateFields.Ingredients =
        typeof Ingredients === 'string'
          ? Ingredients.split(',').map((i) => i.trim())
          : Ingredients
    }

    if (req.file) {
      updateFields.CoverImage = req.file.filename
    }

    const updatedRecipe = await Recipes.findByIdAndUpdate(
      recipeId,
      updateFields,
      { new: true, runValidators: true }
    )

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    return res.json(updatedRecipe)
  } catch (error) {
    console.error('Error editing recipe:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}
const deleteRecipe = async (req, res) => {
  try {
    const result = await Recipes.deleteOne({ _id: req.params.id })

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    res.json({ Status: 'Ok', message: 'Recipe deleted successfully' })
  } catch (err) {
    console.error('Error deleting recipe:', err)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message })
  }
}

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
}
