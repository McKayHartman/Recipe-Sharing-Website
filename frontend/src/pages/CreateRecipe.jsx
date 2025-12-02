// Page where users can create a new recipe

import React, { useState, useContext } from "react"
import axios from "axios"
import Input from "../components/Input"
import { UserContext } from '../context/UserContext'

export default function CreateRecipe() {
	const { loggedInUser } = useContext(UserContext);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [instructions, setInstructions] = useState("");
	const [servings, setServings] = useState("");
	const [prepMinutes, setPrepMinutes] = useState("");
	const [cuisine, setCuisine] = useState("");
	const [meal, setMeal] = useState("");
	const [imageFile, setImageFile] = useState(null);

	const [postStatus, setPostStatus] = useState(false);
	const [invalidInputStatus, setInvalidInputStatus] = useState(false);

	const CUISINES = [
		"American",
		"Italian",
		"Mexican",
		"Indian",
		"Chinese",
		"Japanese",
		"Thai",
		"Mediterranean"
		];

	const MEALS = [
		'Breakfast',
		'Lunch',
		'Dinner',
		'Dessert',
		'Other'
	];


	async function handleSubmit(e) {
		e.preventDefault();

		// che
		if (!title || !description || !instructions ) {
			setInvalidInputStatus(true);
			return;
		}


		// using formData so that image file can go through
		const formData = new FormData();
		formData.append('user_id', loggedInUser);
		formData.append('title', title);
		formData.append('description', description);
		formData.append('instructions', instructions);
		formData.append('servings', servings);
		formData.append('prep_minutes', prepMinutes);
		formData.append('cuisine', cuisine);
		formData.append('meal', meal);
		if (imageFile) formData.append('image', imageFile); // append image if present

		try {
			const response = await axios.post('/api/recipes', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});

			console.log("recipe created", response.data);

			// Reset form
			setTitle('');
			setDescription('');
			setInstructions('');
			setServings('');
			setPrepMinutes('');
			setCuisine('');
			setMeal('');
			setImageFile(null);
			setInvalidInputStatus(false);
			setPostStatus(true);

		} catch (error) {
			console.error("Error creating recipe:", error);
		}
	}

	// Return a form with inputs for the POST route to the db
	return (
		<div className="pt-20">
			<div>
				{/* This checks to see if invalidInputStatus is true, and if so, alert the user */}
				{invalidInputStatus && <h3 class="errorMessage">Invalid Input</h3>}
				{/* Alert the user that their post went through */}
				{postStatus && <h3>Recipe Posted!</h3>}
			</div>
			<form className="space-y-4 max-w-md">
				{/* Title */}
				<label>
					Recipe Title: 
					<Input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
				</label>
				{/* Description */}
				<label>
					Description:
						<Input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
				</label>
				{/* Instructions */}
				<label>
					Instructions:
					<Input type="text" value={instructions} onChange={(e) => setInstructions(e.target.value)}/>
				</label>
				{/* Servings */}
				<label>
					Servings:
					<Input type="number" value={servings} onChange={(e) => setServings(e.target.value)}/>
				</label>
				{/* Prep Minutes */}
				<label>
					Prep Minutes:
					<Input type="number" value={prepMinutes} onChange={(e) => setPrepMinutes(e.target.value)} placeholder="Prep time (minutes)"/>
				</label>
				{/* Cuisine */}
				<label>
					Cuisine:
					<select className="border rounded p-2 w-full" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
						<option value="">Select a cuisine</option>
						{CUISINES.map((cuisineOption) => (
							<option key={cuisineOption} value={cuisineOption}>
								{cuisineOption}
							</option>
						))}
					</select>
				</label>
				{/* Meal Type */}
				<label>
					Meal:
					<select className="border rounded p-2 w-full" value={meal} onChange={(e) => setMeal(e.target.value)}>
						<option value="">Select a meal</option>
						{MEALS.map((mealOption) => (
							<option key={mealOption} value={mealOption}>
								{mealOption}
							</option>
						))}
					</select>
				</label>
				<label>
					Upload a Picture of your Food!
					<input 
						type="file"
						accept="image/*"
						onChange={(e) => setImageFile(e.target.files[0])}
					/>
				</label>
				<button onClick={handleSubmit} type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Post Recipe</button>
				
				
			</form>
		</div>
	)
}