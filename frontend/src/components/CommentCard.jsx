import { useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function CommentCard({ comment, recipeId, onSubmit }) {
	const [showReply, setShowReply] = useState(false);
	const { loggedInUser } = useContext(UserContext);

	async function handleDeleteComment() {
		// check if has children
		console.log("handling delete on comment id:", comment.comment_id);
		try {
			const response = await axios.get(`/api/comments/${comment.comment_id}/replies`);
			const replies = response.data;
			console.log("Fetched replies for comment:", replies);
			if (replies && replies.length > 0) {
				// has child comments, cannot delete yet, must run handleDeleteChildComment for each child
				for (const reply of replies) {
					await handleDeleteChildComment(reply.comment_id);
				}
			} else {
				// if not children, just delte
				await axios.delete(`/api/comments/${comment.comment_id}`);
			}
			// Refresh comments after deletion
			onSubmit();
		} catch (error) {
			console.error("Error deleting comment:", error);
		}
	}

	async function handleDeleteChildComment(childCommentId) {
		try {
			// check if child has its own children
			const response = await axios.get(`/api/comments/${childCommentId}/replies`);
			console.log("Fetched replies for child comment:", response.data);
			const replies = response.data;
			if (replies && replies.length > 0) {
				console.log("Child comment id:", childCommentId, " also has replies, deleting them first.");
				// has child comments, recursively delete them first
				for (const reply of replies) {
					console.log("Recursively deleting reply comment id:", reply.comment_id);
					await handleDeleteChildComment(reply.comment_id);
				}
			}
			// delete the child comment itself
			console.log("Attempting to delete child comment id:", childCommentId);
			await axios.delete(`/api/comments/${childCommentId}`);
		} catch (error) {
			console.error("Error deleting child comment:", error);
		}

	}


	return(
		
		<div className="border-l pl-4 mb-4">
			<p className="font-bold">{comment.user_name}</p>
			<p className="mb-2">{comment.body}</p>

			{/* Reply button - only show if user is logged in */}
			{loggedInUser && (
				<button
					className="text-blue-500 hover:underline mb-2"
					onClick={() => setShowReply(!showReply)}
				>
					Reply
				</button>
			)}

			{/* User reply form */}
			{showReply && (
				<div>
					<CommentForm
						recipeId={recipeId}
						parentId={comment.comment_id}
						onSubmit={() => {
							setShowReply(false);
							onSubmit(); // refresh comments
						}}	
					/>
				</div>
			)}

			{/* Check if it is the user's comment --  if so, let them delete it */}
			<button
				className="text-red-500 hover:underline mb-2"
				onClick={handleDeleteComment}
			>	
			Delete
			</button>

			{/* Other user's replies in recursion*/}
			{comment.replies && comment.replies.length > 0 && (
				<div className="ml-4 mt-4">
					{comment.replies.map((reply) => (
						<CommentCard
							key={reply.comment_id}
							comment={reply}
							recipeId={recipeId}
							onSubmit={onSubmit}
						/>
					))}
				</div>
			)}
		</div>
	);
}