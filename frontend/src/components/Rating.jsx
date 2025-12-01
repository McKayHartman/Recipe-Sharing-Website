import { useState, useEffect, useContext } from "react"
import { UserContext } from '../context/UserContext'
import axios from "axios"
import React from 'react'
import { FaStar } from 'react-icons/fa'


export default function Rating({ recipe_id, user_id, prev_rating }) {
	const { loggedInUser } = useContext(UserContext);
	const [rating, setRating] = useState(0);
	const [hoverValue, setHoverValue] = useState(undefined);

	const stars = Array(5).fill(0);

	const colors = {
		orange: "#e2b864ff",
		grey: "#9b9b9bff"
	}

	// Helper functions
	const handleMouseOverStar = value => {
		setHoverValue(value);
	}
	const handleMouseLeaveStar = () => {
		setHoverValue(undefined);
	}
	const handleClickStar = async (value, prev_rating) => {
		console.log("Handling click star - value:", value, " prev_rating:", prev_rating);
		// check if the user has previously rated the recipe
		if(prev_rating != -1){
			console.log("Updating previous rating from", prev_rating, "to", value);
			// delete prev rating before posting new one
			const deleteResponse = await axios.delete(`/api/ratings/${recipe_id}/user/${user_id}`);
			console.log("Delete previous rating response:", deleteResponse.data);
		} else {
			console.log("Never rated this recipe; Creating new rating:", value);
		}
		setRating(value);
		// post to backend
		const response = await axios.post('/api/ratings', {
			recipe_id: recipe_id,
			user_id: user_id,
			rating: value
		});
		console.log("Rating response:", response.data);
	}


	return (
	<div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
		{stars.map((_, index) => {
			return (
				<FaStar
					key={index}
					size={24}
					color={(hoverValue ?? rating ?? prev_rating) > index ? colors.orange : colors.grey}
					onClick={() => {handleClickStar(index + 1, prev_rating)}}
					onMouseOver={() => {handleMouseOverStar(index + 1)}}
					onMouseLeave={() => {handleMouseLeaveStar()}}
				/>
			)
		})}
	</div>
	);


}
