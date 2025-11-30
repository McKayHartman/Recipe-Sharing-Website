// Recipe card is the default display component for individual recipes
import React from 'react'
import './RecipeCard.css'
import CommentsSection from './CommentsSection'
import { useState } from 'react'

export default function RecipeCard({ recipe }) {
	const [showComments, setShowComments] = useState(false);
	console.log("Use State: " + showComments);

	return (
		<div className="recipe-card">
			<h2>{recipe.title}</h2>
			<p>{recipe.description}</p>
			<p>Servings: {recipe.servings}</p>
			<p>Prep Time: {recipe.prep_minutes} minutes</p>
			<h3>Instructions:</h3>
			<p>{recipe.instructions}</p>
			{/* Toggle comments section */}
			{!showComments ? (
				<button onClick={() => {setShowComments(true); console.log("Show Comments clicked")}}>Show Comments</button>
			) : (
				<button onClick={() => {setShowComments(false); console.log("Hide Comments clicked")}}>Hide Comments</button>
			)}
			{showComments &&
				<CommentsSection 
					recipe_id={recipe.recipe_id} 
					setShowComments={setShowComments} 
					showComments={showComments} 
				/>
			}
			
		</div>
	)
}