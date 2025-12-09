import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import CreateRecipe from './pages/CreateRecipe'
import MyRecipes from './pages/MyRecipes'
import MyAccount from './pages/MyAccount'
import './App.css' 


export function App() {

  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>

<<<<<<< HEAD
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Recipes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path='/my-recipes' element={<MyRecipes />} />
        <Route path='/my-account' element={<MyAccount />} />
      </Routes>
      
=======

      <nav className="navbar">
        <div className="nav-container">


          <Link to="/" className="logo">RecipeShare</Link>


          <button className="hamburger" onClick={() => setOpen(!open)}>
            ☰
          </button>


          <div className={`nav-links ${open ? "show" : ""}`}>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/recipes" onClick={() => setOpen(false)}>Recipes</Link>
            <Link to="/create-recipe" onClick={() => setOpen(false)}>Create Recipe</Link>
            <Link to="/my-recipes" onClick={() => setOpen(false)}>My Recipes</Link>
            <Link to="/my-account" onClick={() => setOpen(false)}>My Account</Link>
            <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/create-account" onClick={() => setOpen(false)}>Create Account</Link>
          </div>

        </div>
      </nav>


      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/my-account" element={<MyAccount />} />
        </Routes>
>>>>>>> 001b31e3e8d415842cc485987ad64944a1047e7f
      </div>

    </BrowserRouter>
  )
}



export default App

