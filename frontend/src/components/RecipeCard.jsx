// Recipe card is the default display component for individual recipes
import React from 'react'
import './RecipeCard.css'
import CommentsSection from './CommentsSection'
import { useState } from 'react'
import GlobalRating from './GlobalRating'

export default function RecipeCard({ recipe }) {
	const [showComments, setShowComments] = useState(false);

	return (
		<div className="recipe-card flex gap-4">
			<div className='flex-shrink-0'>
				{recipe.image_url && (
					<img
						src={`http://localhost:3000${recipe.image_url}`}
						alt={recipe.title}
						className='w-auto h-48 object-cover rounded mb-4 align'
					/>
				)}
			</div>

			<div className="flex-1">
				<h2 className='text-xl font-bold'>{recipe.title}</h2>
				<p>{recipe.description}</p>
				<p>Servings: {recipe.servings}</p>
				<p>Prep Time: {recipe.prep_minutes} minutes</p>
				<h3>Instructions:</h3>
				<p>{recipe.instructions}</p>
			</div>

			



			
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