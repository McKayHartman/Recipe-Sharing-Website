import react, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import RecipeCard from '../components/RecipeCard'
import axios from 'axios'

export default function MyRecipes() {
	const { loggedInUser } = useContext(UserContext);
	const [userRecipes, setUserRecipes] = useState([]);

	// get recipes based on logged in user id
	useEffect(() => {
		async function fetchRecipes() {
			try {
				const response = await axios.get(`/api/users/${loggedInUser}/recipes`);
				setUserRecipes(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching user recipes:", error);
			}
		}
		if (loggedInUser) fetchRecipes();
	}, [loggedInUser]);


	return (
		<div className="recipes-page">
			<h1 className="recipes-title">My Recipes</h1>

			<ul className="recipes-list">
				{userRecipes.map(recipe => (
					<li key={recipe.recipe_id}>
						<RecipeCard recipe={recipe} />
					</li>
				))}
			</ul>
		</div>
	);
}
