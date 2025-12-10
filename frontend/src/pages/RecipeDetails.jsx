import { useParams } from 'react-router-dom'
import {useEffect, useState } from 'react'
import axios from 'axios'

export default function RecipeDetails() {
	const {id} = useParams();
	const [recipe, setRecipe] = useState(null);

	useEffect(() => {
		async function fetchRecipe() {
		const res = await axios.get(`/api/recipes/${id}`);
		setRecipe(res.data);
		}
		fetchRecipe();
  	}, [id]);	

	if (!recipe) return <p>Loading...</p>

	return (
	<div className='mt-20 pt-20'>
		<div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md">
			<div className='flex-shrink-0'>
				{recipe.image_url && (
					<img
						src={`http://localhost:3000${recipe.image_url}`}
						alt={recipe.title}
						className='w-auto h-48 object-cover rounded mb-4 align'
					/>
				)}
			</div>
		<h1 className="text-3xl font-bold">{recipe.title}</h1>
		<p className='mt-4'>{recipe.meal} -- {recipe.cuisine}</p>
		<p className="mt-4">{recipe.description}</p>
		<p className="mt-2 text-gray-500">Ingredients: {recipe.ingredients}</p>
		<p className="mt-2 text-gray-500">Instructions: {recipe.instructions}</p>
		<p className="mt-2 text-gray-500">Servings: {recipe.servings}</p>
		<p className="mt-2 text-gray-500">Prep Time: {recipe.prep_minutes} minutes</p>	
		</div>
	</div>
  );
}