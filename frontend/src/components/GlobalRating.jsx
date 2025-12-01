// This component is displayed on the recipe card
// it shows the average rating for all users
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'


export default function GlobalRating({ recipe_id }) {
	const [rating, setRating] = useState(0);

	const stars = Array(5).fill(0);

	const colors = {
		orange: "#e2b864ff",
		grey: "#9b9b9bff"
	}

	// Helper functions
	async function getAssociatedRatings(recipe_id) {
		const response = await axios.get(`/api/ratings/${recipe_id}`);
		return response.data;
	}

	function getAverageRating(ratings) {
		// filter ratings and only get the rating values
		const ratingValues = ratings.map(r => r.rating);
		const total = ratingValues.reduce((acc, val) => acc + val, 0);
		return (total / ratingValues.length) || 0;
	}

	useEffect(() => {
		async function fetchAverageRating() {
			const ratings = await getAssociatedRatings(recipe_id);
			const avgRating = getAverageRating(ratings);
			setRating(avgRating);
		}
		fetchAverageRating();
	}, [recipe_id]);


	return (
	<div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
		{stars.map((_, index) => {
			return (
				<FaStar
					key={index}
					size={14}
					value={rating}
					color={(rating) > index ? colors.orange : colors.grey}
				/>
			)
		})}
	</div>
	);


}