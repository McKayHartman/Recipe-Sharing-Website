import React from "react"
import { useState, useContext, useEffect } from "react"
import RecipeCard from "../components/RecipeCard"
import axios from "axios"
import CreateRecipe from "./CreateRecipe"
import { Link } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import './App.css'

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

	// Auto-fetch recipes once the page loads
	useEffect(() => {
		fetchAllRecipes();
	}, []);


	return (
		<div className="recipes-page">

			<h1 className="recipes-title">All Recipes</h1>

			{/* Link to create recipe page only renders when user is logged in*/}
			{loggedInUser && (
				<Link
					className="create-link"
					to="/create-recipe"
					element={<CreateRecipe />}
				>
					Create a New Recipe
				</Link>
			)}

			{/* render ul of recipe cards here */}
			<ul className="recipes-list">
				{recipes.map(recipe => (
					<li key={recipe.recipe_id}>
						<RecipeCard recipe={recipe} />
					</li>
				))}
			</ul>
		</div>
	);
}
