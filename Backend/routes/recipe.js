const express = require('express')
const {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
} = require('../controller/recipe_controller')
const verifyToken = require('../middleware/auth')
const router = express.Router()

router.get('/', getRecipes) //get all the
router.get('/:id', getRecipe) // get recip by id
router.post('/', upload.single('file'), verifyToken, addRecipe) // add recipe
router.put('/:id', upload.single('file'), editRecipe) //edit recipe
router.delete('/:id', deleteRecipe) // delete the recipe

module.exports = router
