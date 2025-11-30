import React from 'react';
import Input from './Input';
import axios from 'axios';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function CommentForm({ recipeId, parentId, onSubmit }) {
	const [content, setContent] = useState('');
	let {loggedInUser} = useContext(UserContext);


	let user_id = null;
		// try and pull the user id from the context
		try {
			// change loggedInUser number string to int
			user_id = parseInt(loggedInUser, 10);
			
			console.log("parsed uid" + user_id);

		} catch (error) { // if the user id does not come back, the user is not logged in
			user_id = null;
			console.error("Error getting user id from context:", error);
			console.log("user is not logged in - defualting to null");
		}

	async function handleSubmit(e) {
		console.log("Submitting comment for recipeId:", recipeId, "parentId:", parentId);
		e.preventDefault();

		

		const comment = {
			recipe_id: recipeId,
			parent_comment_id: parentId,
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