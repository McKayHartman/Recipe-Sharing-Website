import React from "react"
import { useState, useContext, useEffect } from "react"
import RecipeCard from "../components/RecipeCard"
import axios from "axios"
import CreateRecipe from "./CreateRecipe"
import { Link } from "react-router-dom"
import { UserContext } from '../context/UserContext'
<<<<<<< HEAD
import { useLocation } from 'react-router-dom'

=======
import './App.css'
>>>>>>> 001b31e3e8d415842cc485987ad64944a1047e7f

export default function Recipes() {
	const [results, setResults] = useState([]);

<<<<<<< HEAD
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
=======
	// Gets all recipes from the DB
	async function fetchAllRecipes() {
		try {
			const response = await axios.get('/api/recipes');
			console.log(response.data);
			setRecipes(response.data);
		} catch (error) {
			console.error("Error fetching recipes:", error);
>>>>>>> 001b31e3e8d415842cc485987ad64944a1047e7f
		}
		if (query) fetchResults();
	}, [query]);

	// Auto-fetch recipes once the page loads
	useEffect(() => {
		fetchAllRecipes();
	}, []);


	return (
<<<<<<< HEAD
		<div className="pt-20">
			<h1 className="text-2xl font-bold">Search Results fro "{query}"</h1>

			<ul>
				{results.map(r => (
					<li key={r.recipe_id}>
						<RecipeCard recipe={r} />
=======
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
>>>>>>> 001b31e3e8d415842cc485987ad64944a1047e7f
					</li>
				))}
			</ul>
		</div>
	);
}
