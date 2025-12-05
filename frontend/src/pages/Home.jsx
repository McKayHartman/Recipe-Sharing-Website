import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import Marquee from '../components/Marquee'
import SearchBar from '../components/SearchBar'
import AllRecipesList from '../components/AllRecipesList'	


export default function Home() {
	const { loggedInUser } = useContext(UserContext);
	const [userName, setUserName] = useState("");

	// get the user name based on the loggedInUser id number
	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await axios.get(`/api/users/${loggedInUser}`);
				setUserName(response.data.name);
			} catch (error) {
				console.error("Error fetching user info: ", error);
				setUserName("Guest");
			}
		}
		if (loggedInUser) fetchUser();
	}, [loggedInUser]);


	return (
		<div className='min-h-screen bg-fixed bg-center bg-cover' >
			{/* background illsutration */}
			<div className="h-[50vh] bg-fixed bg-center bg-cover relative flex justify-center items-center" style={{ backgroundImage: "url('../assets/backgrounds/homebg.jpg')" }}>
			{/* centered in div */}
			{/* Search Bar */}
				<SearchBar 
				
				/>
				{/* <div className='bg-white h-auto flex justify-center align-middle '> 
					
				</div> */}
			</div>

			<Marquee />
			{/* Render list of recipes */}
			<AllRecipesList />
		</div>
	)
}