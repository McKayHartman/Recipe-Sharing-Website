import React, { use } from 'react';
import Input from './Input';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import Rating from './Rating';

export default function CommentForm({ recipeId, parentId, onSubmit }) {
	console.log("CommentForm props - recipeId:", recipeId, " parentId:", parentId);
	const [content, setContent] = useState('');
	let {loggedInUser} = useContext(UserContext);


	let user_id = null;

	try {
		// change loggedInUser number string to int
		user_id = parseInt(loggedInUser, 10);

	} catch (error) { // if the user id does not come back, the user is not logged in
		user_id = null;
		console.error("Error getting user id from context:", error);
		console.log("user is not logged in - defualting to null");
	}

	async function handleSubmit(e) {
		console.log("Submitting comment for recipeId:", recipeId, "parentId:", parentId);
		e.preventDefault();

		const normalizedParentId = parentId ?? null;

		const comment = {
			recipe_id: recipeId,
			parent_comment_id: normalizedParentId,
			body: content,
			user_id: user_id
		};

		try {
			const response = await axios.post('/api/comments', comment);
			console.log("Comment posted:", response.data);
		} catch (error) {
			console.error("Error posting comment:", error);
		}

		// Clear the form
		setContent('');

		// Call the onSubmit callback to notify parent component
		if (onSubmit) {
			onSubmit();
		}
	}

	// when the componoent renders, check if the user is logged in and has rated the recipe before
	// If they have, show their previous rating
	

	



	return(
		<div>
			<form className="mb-4" onSubmit={handleSubmit}>
				<label>
					Comment:
					<Input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
				</label>
				<button type="submit" className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
					Post Comment
				</button>
			</form>
		</div>
	)
}