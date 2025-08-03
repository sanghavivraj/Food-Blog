

import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({})
  const navigate = useNavigate()

  const onHandleChange = (e) => {
    let val =
      e.target.name === 'Ingredients'
        ? e.target.value.split(',')
        : e.target.name === 'file'
        ? e.target.files[0]
        : e.target.value
    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }))
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('Title', recipeData.Title)
    formData.append('Time', recipeData.Time)
    formData.append('Ingredients', recipeData.Ingredients)
    formData.append('Instructions', recipeData.Instructions)
    formData.append('file', recipeData.file)

    try {
      await axios.post('http://localhost:5000/recipe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: 'bearer ' + localStorage.getItem('token'),
        },
      })
      // Success alert
      alert('Recipe added successfully!')
      navigate('/')
    } catch (err) {
      console.error(err)
      // Error alert
      alert('Failed to add recipe. Please try again.')
    }
  }

  return (
    <>
      <div className='container'>
        <form className='form' onSubmit={onHandleSubmit}>
          <div className='form-control'>
            <label>Title</label>
            <input
              type='text'
              className='input'
              name='Title'
              onChange={onHandleChange}
            />
          </div>
          <div className='form-control'>
            <label>Time</label>
            <input
              type='text'
              className='input'
              name='Time'
              onChange={onHandleChange}
            />
          </div>
          <div className='form-control'>
            <label>Ingredients</label>
            <textarea
              className='input-textarea'
              name='Ingredients'
              rows='5'
              onChange={onHandleChange}
            ></textarea>
          </div>
          <div className='form-control'>
            <label>Instructions</label>
            <textarea
              className='input-textarea'
              name='Instructions'
              rows='5'
              onChange={onHandleChange}
            ></textarea>
          </div>
          <div className='form-control'>
            <label>Recipe Image</label>
            <input
              type='file'
              className='input'
              name='file'
              onChange={onHandleChange}
            />
          </div>
          <button type='submit'>Add Recipe</button>
        </form>
      </div>
    </>
  )
}
