import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'



export default function Navbar() {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext);
	const navigate = useNavigate();

	// function to set the logged in user as null and navigate back to the login screen
	function handleLogout(){
		// set loggedInUser as null
		setLoggedInUser(null);
		// route back to login
		navigate('/login');
	}
  return (
    <nav className="bg-white text-black p-4 fixed z-50 shadow-md top-0 w-full">
      <h1 className="text-xl font-bold">Recipe Website</h1>
	  <div>
		{/* Navigation links */}
		<a href="/" className="mr-4 hover:underline">Home</a>
		<a href="/recipes" className="mr-4 hover:underline">Recipes</a>
		{!loggedInUser && <a href="/login" className="mr-4 hover:underline">Login</a>}
		{!loggedInUser && <a href="/create-account" className="mr-4 hover:underline">Create Account</a>}
		{loggedInUser && <a href="/my-recipes" className='mr-4 hover:underline'> My Recipes</a>}
		{loggedInUser && <a href="/create-recipe" className='mr-4 hover:underline'>Create a Recipe</a>}
		{loggedInUser && <button onClick={handleLogout}>Logout</button>}

	  </div>
	  
    </nav>
  );
}
