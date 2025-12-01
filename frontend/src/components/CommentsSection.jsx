// Nested comments section component
// Renders comments and replies, with ability to reply to any comment
// and delete only the users own comments.
// PROPS: recipe_id

import React from "react"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import CommentForm from "./CommentForm"
import CommentCard from "./CommentCard"
import { UserContext } from '../context/UserContext'
import Rating from './Rating';


export default function CommentsSection ({ recipe_id, setShowComments, showComments }) {
	const { loggedInUser } = useContext(UserContext);
	const [prev_rating, setPrev_rating] = useState(null);
	const [comments, setComments] = useState([]);


	const fetchComments = async () => {
			try {
				const res = await axios.get(`/api/comments/${recipe_id}`);
				setComments(res.data);
			} catch (error) {
				console.error("Error fetching comments:", error);
			}
	};


	// fetch all comments when recipe id changes
	useEffect(() => {
		fetchComments();
	}, [recipe_id]);

	// fetch all comments again when comment is added
	useEffect(() => {
		fetchComments();
	}, [comments.length]);

	async function fetchUserRating(cur_recipeId) {
			if (!loggedInUser) return; // if they are not logged in, skip this
			
			try {
				const response = await axios.get(`/api/ratings/${cur_recipeId}/user/${loggedInUser}`);
				
	
				if (response.data === null){
					// no ratings for recipe found
					return null;
				}
				// return the rating integer (1-5)
				console.log("Fetched user rating:", response.data.rating);
				return response.data.rating;
			} catch (error) {
				console.log('Error fetching user rating for recipe', error);
			}
		}

	useEffect(() => {
			async function fetchAndSetRating() {
				const rating = await fetchUserRating(recipe_id);
				if (rating !== undefined) {
					if (rating === null) {
						setPrev_rating(null);
					} else {
						console.log("Setting previous rating to:", rating);
						setPrev_rating(rating);
					}
				}
			}
			fetchAndSetRating();
		}, [recipe_id, loggedInUser]);

	return (
		<div className="comments-section">
			<h2 className="text-xl font-semibold mb-4">Comments</h2>
			{/* Rating Component */}
			{loggedInUser && (
				<div>
					<p>Rate this recipe:</p>
					<Rating 
						recipe_id={recipe_id} 
						user_id={loggedInUser} 
						prev_rating={prev_rating}

					/>
				</div>
			)}


			{/* Check if user is logged in, if they are, give option to add comment */}
			{loggedInUser && (
				<CommentForm
					recipeId={recipe_id}
					parentId={null}
					onSubmit={fetchComments}
				/>
			)}

			{/* Render comments below */}
			<div className="mt-6">
				{comments.map((comment) => (
					<CommentCard
						key={comment.comment_id}
						comment={comment}
						recipeId={recipe_id}
						onSubmit={fetchComments}
					/>
				))}
			</div>
		</div>
	);
}

