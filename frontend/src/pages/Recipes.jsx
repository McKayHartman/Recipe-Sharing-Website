import React from "react"
import { useState, useContext } from "react"
import { useEffect } from "react"
import RecipeCard from "../components/RecipeCard"
import axios from "axios"
import CreateRecipe from "./CreateRecipe"
import { Link } from "react-router-dom"
import { UserContext } from '../context/UserContext'



export default function Recipes() {
	const [recipes, setRecipes] = useState([]);
	const { loggedInUser } = useContext(UserContext);

	// Gets all recipes from the DB
	async function fetchAllRecipes() {
		try {
			const response = await axios.get('/api/recipes');
			console.log(response.data);
			setRecipes(response.data);
		} catch (error) {
			console.error("Error fetching recipes:", error);
		
		}
	}

	return (
		<div>
			<h1 className="text-3xl">Recipes Page</h1>

			<button onClick={fetchAllRecipes}>Get All Recipes</button>

			<br></br>
			{/* Link to create recipe page only renders when user is logged in*/}
			{loggedInUser && <Link className="text-xl font-bold hover:underline" to="/create-recipe" element={<CreateRecipe />}>Create a New Recipe</Link>}

			{/* render ul of recipe cards here */}
			<ul>
				{recipes.map(recipe => (
					<li key={recipe.recipe_id}>
						<RecipeCard recipe={recipe} />
					</li>
				))}
			</ul>
		</div>
	)
}
