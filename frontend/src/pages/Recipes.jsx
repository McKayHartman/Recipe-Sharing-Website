import React from "react"
import { useState, useContext } from "react"
import { useEffect } from "react"
import RecipeCard from "../components/RecipeCard"
import axios from "axios"
import CreateRecipe from "./CreateRecipe"
import { Link } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import { useLocation } from 'react-router-dom'


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
					</li>
				))}
			</ul>
		</div>
	)
}
