import React, { useState, useEffect } from 'react' //
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipe/${id}`)
        let res = response.data
        setRecipeData({
          Title: res.Title,
          Ingredients: res.Ingredients.join(','),
          Instructions: res.Instructions,
          Time: res.Time,
        })
      } catch (error) {
        console.error('Error fetching recipe for editing:', error)

        navigate('/')
      }
    }
    getData()
  }, [id, navigate])

  const onHandleChange = (e) => {
    let val
    if (e.target.name === 'Ingredients') {
      val = e.target.value.split(',').map((item) => item.trim())
    } else if (e.target.name === 'file') {
      val = e.target.files[0]
    } else {
      val = e.target.value
    }
    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }))
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('Title', recipeData.Title)
    formData.append('Time', recipeData.Time)

    formData.append('Ingredients', recipeData.Ingredients)
    formData.append('Instructions', recipeData.Instructions)
    if (recipeData.file) {
      formData.append('file', recipeData.file)
    }

    try {
      await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: 'bearer ' + localStorage.getItem('token'),
        },
      })
      alert('Recipe updated successfully!')
      navigate('/myRecipe')
    } catch (err) {
      console.error('Error updating recipe:', err)
      alert('Failed to update recipe. Please try again.')
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
              value={recipeData.Title || ''}
              onChange={onHandleChange}
            ></input>
          </div>
          <div className='form-control'>
            <label>Time</label>
            <input
              type='text'
              className='input'
              name='Time'
              value={recipeData.Time || ''}
              onChange={onHandleChange}
            ></input>
          </div>
          <div className='form-control'>
            <label>Ingredients</label>
            <textarea
              type='text'
              className='input-textarea'
              name='Ingredients'
              rows='5'
              value={recipeData.Ingredients || ''}
              onChange={onHandleChange}
            ></textarea>
          </div>
          <div className='form-control'>
            <label>Instructions</label>
            <textarea
              type='text'
              className='input-textarea'
              name='Instructions'
              rows='5'
              value={recipeData.Instructions || ''}
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
            ></input>
          </div>
          <button type='submit'>Edit Recipe</button>
        </form>
      </div>
    </>
  )
}
