// Recipe card is the default display component for individual recipes
import React from 'react'
import './RecipeCard.css'
import CommentsSection from './CommentsSection'
import { useState } from 'react'
import GlobalRating from './GlobalRating'

export default function RecipeCard({ recipe }) {
	const [showComments, setShowComments] = useState(false);

	return (
		<div className="recipe-card">
			<h2>{recipe.title}</h2>
			<p>{recipe.description}</p>
			<p>Servings: {recipe.servings}</p>
			<p>Prep Time: {recipe.prep_minutes} minutes</p>
			<h3>Instructions:</h3>
			<p>{recipe.instructions}</p>




			
			<GlobalRating 
				recipe_id={recipe.recipe_id}
			/>
			{/* Show or Hide comments with a button*/}
			{!showComments ? (
				<button onClick={() => {setShowComments(true);}}>Show Comments</button>
			) : (
				<button onClick={() => {setShowComments(false);}}>Hide Comments</button>
			)}
			{/* Comments Section */}
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