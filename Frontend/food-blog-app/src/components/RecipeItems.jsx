import React, { useState, useEffect } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import foodRecipe1 from '../assets/foodRecipe1.png'
import { IoIosStopwatch } from 'react-icons/io'
import { IoIosHeart } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'

// Pass the onRecipeClick prop from the parent component
export default function RecipeItems({ onRecipeClick }) {
  const recipes = useLoaderData()
  const [allRecipes, setAllRecipes] = useState([])
  const [currentFavItems, setCurrentFavItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fav')) ?? []
    } catch (e) {
      console.error('Failed to parse fav from localStorage:', e)
      return []
    }
  })

  let path = window.location.pathname === '/myRecipe' ? true : false

  useEffect(() => {
    setAllRecipes(recipes)
  }, [recipes])

  useEffect(() => {
    localStorage.setItem('fav', JSON.stringify(currentFavItems))
  }, [currentFavItems])

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipe/${id}`)
      setAllRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== id)
      )
      setCurrentFavItems((prevFavItems) =>
        prevFavItems.filter((recipe) => recipe._id !== id)
      )
      alert('Recipe deleted successfully!')
    } catch (error) {
      console.error('Error deleting recipe:', error)
      alert('Failed to delete recipe. Please try again.')
    }
  }

  const favRecipe = (item) => {
    const isAlreadyFavorite = currentFavItems.some(
      (recipe) => recipe._id === item._id
    )

    let updatedFavItems
    if (isAlreadyFavorite) {
      updatedFavItems = currentFavItems.filter(
        (recipe) => recipe._id !== item._id
      )
    } else {
      updatedFavItems = [...currentFavItems, item]
    }
    setCurrentFavItems(updatedFavItems)
  }

  return (
    <>
      <div className='card-container'>
        {allRecipes?.map((item, index) => {
          const isCurrentItemFavorite = currentFavItems.some(
            (res) => res._id === item._id
          )

          return (
            // Add a click handler to the entire card
            <div
              key={index}
              className='card'
              onClick={() => onRecipeClick(item)} // This will open the modal
            >
              <img
                src={`http://localhost:5000/images/${item.CoverImage}`}
                width='120px'
                height='100px'
                alt={item.Title}
              ></img>
              <div className='card-body'>
                <div className='Title'>{item.Title} </div>
                <div className='Icons'>
                  <div className='Timer'>
                    <IoIosStopwatch />
                    {item.Time}
                  </div>
                  {!path ? (
                    // Stop event propagation to prevent the card's onClick from firing
                    <IoIosHeart
                      onClick={(e) => {
                        e.stopPropagation()
                        favRecipe(item)
                        alert(
                          isCurrentItemFavorite
                            ? 'Recipe removed from favorites!'
                            : 'Recipe added to favorites!'
                        )
                      }}
                      style={{
                        color: isCurrentItemFavorite ? 'red' : '',
                        cursor: 'pointer',
                      }}
                    />
                  ) : (
                    <div className='action'>
                      {/* Stop event propagation for the Link so it works correctly */}
                      <Link
                        to={`/editRecipe/${item._id}`}
                        className='editIcon'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaRegEdit />
                      </Link>
                      <MdDelete
                        // Stop event propagation for the delete button
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(item._id)
                        }}
                        className='deleteIcon'
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
