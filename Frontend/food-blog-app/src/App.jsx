import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'

const getAllRecipes = async () => {
  let allRecipes = []
  try {
    const res = await axios.get('http://localhost:5000/recipe')
    allRecipes = res.data
  } catch (error) {
    console.error('Error fetching all recipes:', error)
  }
  return allRecipes
}

const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem('fav'))
}

const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem('user'))

  if (!user || !user._id) {
    console.warn(
      "User not logged in or user ID not found. Cannot fetch 'My Recipes'."
    )
    return []
  }

  let allRecipes = await getAllRecipes()

  return allRecipes.filter((item) => item.createdBy === user._id)
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainNavigation />,
    children: [
      { path: '/', element: <Home />, loader: getAllRecipes },
      { path: '/myRecipe', element: <Home />, loader: getMyRecipes },
      { path: '/favRecipe', element: <Home />, loader: getFavRecipes },
      { path: '/addRecipe', element: <AddFoodRecipe /> },
      { path: '/editRecipe/:id', element: <EditRecipe /> },
    ],
  },
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </>
  )
}
