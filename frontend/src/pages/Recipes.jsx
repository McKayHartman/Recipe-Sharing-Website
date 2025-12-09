import React from "react"
import { useState, useContext } from "react"
import { useEffect } from "react"
import RecipeCard from "../components/RecipeCard"
import axios from "axios"
import CreateRecipe from "./CreateRecipe"
import { Link } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import { useLocation } from 'react-router-dom'

import './App.css'


export default function Recipes() {
	const [results, setResults] = useState([]);

	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const query = params.get("q");

	useEffect(() => {
		async function fetchResults() {
			try {
				const res = await axios.get(`/api/recipes?search=${query}`);
				setResults(res.data);
			} catch (error) {
				console.error("Search failed", error);
			}
	// Gets all recipes from the DB
	async function fetchAllRecipes() {
		try {
			const response = await axios.get('/api/recipes');
			console.log(response.data);
			setRecipes(response.data);
		} catch (error) {
			console.error("Error fetching recipes:", error);
=======
		

		}
		if (query) fetchResults();
	}, [query]);

	return (
		<div className="pt-20">
			<h1 className="text-2xl font-bold">Search Results fro "{query}"</h1>

			<ul>
				{results.map(r => (
					<li key={r.recipe_id}>
						<RecipeCard recipe={r} />
		<div className="recipes-page">
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
