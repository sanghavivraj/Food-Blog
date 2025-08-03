import React from 'react'
import { IoIosStopwatch } from 'react-icons/io'

export default function RecipeDetails({ recipe }) {
  if (!recipe) {
    return null
  }

  return (
    <div className='p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto'>
      <img
        src={`http://localhost:5000/images/${recipe.CoverImage}`}
        alt={recipe.Title}
        className='w-full h-64 object-cover rounded-lg mb-4'
      />
      <h2 className='text-3xl font-bold mb-2'>{recipe.Title}</h2>
      <div className='flex items-center text-gray-600 mb-4'>
        <IoIosStopwatch className='mr-2' />
        <span className='text-lg'>{recipe.Time}</span>
      </div>

      <div className='mb-4'>
        <h3 className='text-xl font-semibold mb-2'>Ingredients:</h3>
        <ul className='list-disc list-inside space-y-1'>
          {recipe.Ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className='text-xl font-semibold mb-2'>Instructions:</h3>
        <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
          {recipe.Instructions}
        </p>
      </div>
    </div>
  )
}
