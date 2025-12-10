import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


export default function Navbar() {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext);
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	// function to set the logged in user as null and navigate back to the login screen
	function handleLogout(){
		// set loggedInUser as null
		setLoggedInUser(null);
		// route back to login
		navigate('/login');
	}
	// get the username of the loggedinuser
	useEffect(() => {
		async function getUsername(){
			if (!loggedInUser) return;

			try{
				const result = await axios.get(`/api/users/${loggedInUser}`);
				setUsername(result.data.name);
			} catch (error) {
				console.log("unable to get username", error);
			}
			
		}
	getUsername();
	}, [loggedInUser]);

  return (
    <nav className="bg-brown-800 text-white p-4 fixed z-50 shadow-md top-0 w-full flex flex-row">
	{/* Left side */}
	  <div className='flex-1'>
		<h1 className="text-xl font-bold">Recipe Website</h1>
		{/* Navigation links */}
		<a href="/" className="mr-4 hover:underline">Home</a>
		{!loggedInUser && <a href="/login" className="mr-4 hover:underline">Login</a>}
		{!loggedInUser && <a href="/create-account" className="mr-4 hover:underline">Create Account</a>}
		{loggedInUser && <a href="/my-recipes" className='mr-4 hover:underline'> My Recipes</a>}
		{loggedInUser && <a href="/create-recipe" className='mr-4 hover:underline'>Create a Recipe</a>}
		
		
	  </div>
		{/* Right side */}
	  <div className='pt-3'>
			{loggedInUser && <a href="/my-account" className='mr-4 hover:underline'>{username}</a>}
			{loggedInUser && <button onClick={handleLogout}>Logout</button>}
	  </div>
	  
    </nav>
  );
}
