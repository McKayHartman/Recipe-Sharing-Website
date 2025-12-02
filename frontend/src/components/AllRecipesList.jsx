import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';

export default function AllRecipesList(){ 

	const [recipes, setRecipes] = useState([]);

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

	useEffect(() => {
		fetchAllRecipes();
	}, []);

	return (
		<div>
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