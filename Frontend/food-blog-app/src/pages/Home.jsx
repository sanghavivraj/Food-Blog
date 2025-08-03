import React, { useState } from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Recipeitems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'
import RecipeDetails from '../components/RecipeDetails'

export default function Home() {
  const navigate = useNavigate()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const addRecipe = () => {
    let token = localStorage.getItem('token')
    if (token) {
      navigate('/addRecipe')
    } else {
      setIsLoginModalOpen(true)
    }
  }

  const openRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe)
    setIsRecipeModalOpen(true)
  }

  const closeRecipeDetails = () => {
    setIsRecipeModalOpen(false)
    setSelectedRecipe(null)
  }

  return (
    <>
      <section className='home'>
        <div className='left'>
          <h1>Share Your Culinary Creations</h1>
          <h5>
            Welcome to our vibrant community of food lovers! Share your best
            recipes and discover new ones from around the world. Whether you're
            a seasoned chef or a home cook, there's always something new to
            learn.
          </h5>
          <button onClick={addRecipe}>Share your recipe</button>
        </div>
        <div className='right'>
          <img src={foodRecipe} width='400px' height='300px'></img>
        </div>
      </section>
      <div className='bg'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
          <path
            fill='#d4f6e8'
            fillOpacity='1'
            d='M0,32L40,32C80,32,160,32,240,58.7C320,85,400,139,480,149.3C560,160,640,128,720,101.3C800,75,880,53,960,80C1040,107,1120,181,1200,213.3C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z'
          ></path>
        </svg>
      </div>
      {isLoginModalOpen && (
        <Modal onClose={() => setIsLoginModalOpen(false)}>
          <InputForm setIsOpen={() => setIsLoginModalOpen(false)} />
        </Modal>
      )}
      {isRecipeModalOpen && (
        <Modal onClose={closeRecipeDetails}>
          <RecipeDetails recipe={selectedRecipe} />
        </Modal>
      )}
      <div className='recipe'>
        <Recipeitems onRecipeClick={openRecipeDetails} /> {}
      </div>
    </>
  )
}
