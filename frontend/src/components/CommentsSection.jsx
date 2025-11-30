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

// debug flag
let debug = true;


export default function CommentsSection ({ recipe_id, setShowComments, showComments }) {
	const { loggedInUser } = useContext(UserContext);
	const [comments, setComments] = useState([]);


	////////////////// HELPER FUNCTIONS/////////////// 
	const fetchComments = async () => {
			try {
				const res = await axios.get(`/api/comments/${recipe_id}`);
				setComments(res.data);
				console.log("Comments fetched showComments: " + showComments);
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

	//////////////////////Component///////////////////////

	return (
		<div className="comments-section">
			<h2 className="text-xl font-semibold mb-4">Comments</h2>

			{/* Top Level comments here */}
			<CommentForm
				recipeId={recipe_id}
				parentId={null}
				onSubmit={fetchComments}
			/>

			{/* Render comments below */}
			<div className="mt-6">
				{comments.map((comment) => (
					<CommentCard
						key={comment.comment_id}
						comment={comment}
						recipeId={recipe_id}
					/>
				))}
			</div>
		</div>
	);
}

