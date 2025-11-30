import { useState } from 'react';
import CommentForm from './CommentForm';

export default function CommentCard({ comment, recipeId }) {
	const [showReply, setShowReply] = useState(false);


	return(
		
		<div className="border-l pl-4 mb-4">
			<p className="font-bold">{comment.user_name}</p>
			<p className="mb-2">{comment.body}</p>

			<button
				className="text-blue-500 text-sm"
				onClick={() => setShowReply((prev) => !prev)}
			>
				Reply
			</button>

			{/* User reply form */}
			{showReply && (
				<div>
					<CommentForm
						recipeId={recipeId}
						parentId={comment.comment_id}
						onSubmit={() => setShowReply(false)}
					/>
				</div>
			)}

			{/* Other user's replies in recursion*/}
			{comment.replies && comment.replies.length > 0 && (
				<div className="ml-4 mt-4">
					{comment.replies.map((reply) => (
						<CommentCard
							key={reply.comment_id}
							comment={reply}
							recipeId={recipeId}
						/>
					))}
				</div>
			)}
		</div>
	);
}