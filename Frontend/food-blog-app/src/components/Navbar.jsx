import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  let token = localStorage.getItem('token')
  const [isLogin, setIsLogin] = useState(token ? false : true)
  let user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    setIsLogin(token ? false : true)
  }, [token])

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setIsLogin(true)
    } else {
      setIsOpen(true)
    }
  }
  return (
    <>
      <header>
        <h2>Food Blog</h2>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            {isLogin ? (
              <span
                onClick={() => setIsOpen(true)}
                style={{ cursor: 'pointer' }}
              >
                My Recipe
              </span>
            ) : (
              <NavLink to='/myRecipe'>My Recipe</NavLink>
            )}
          </li>
          <li>
            {isLogin ? (
              <span
                onClick={() => setIsOpen(true)}
                style={{ cursor: 'pointer' }}
              >
                Favourites
              </span>
            ) : (
              <NavLink to='/favRecipe'>Favourites</NavLink>
            )}
          </li>

          <li onClick={checkLogin}>
            <p className='login'>
              {isLogin ? 'Login' : 'Logout'}
              {user?.email ? `(${user?.email})` : ' '}
            </p>
          </li>
        </ul>
      </header>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          {' '}
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  )
}
