// This file is the entry point for the backend server.
// Here you will find routes and middleware for handling api requests.
// You can modify the existing routes, but BE CAREFUL because some
// of them are critical to the application's functionality


// Imports
import express from 'express';
import { pool } from './db.js';
import cors from 'cors';

import path from 'path';
const __dirname = path.resolve();


// Express app setup
const app = express();
const PORT = 3000; // Express server port




// Middleware
app.use(cors());
app.use(express.json());


//////////////////// ROUTES ////////////////////
app.get('/', async (req, res) => {
  res.json({ message: 'API running' });
});




// Returns all recipes from the database
app.get('/api/recipes', async (req, res) => {
  try {
	const result = await pool.query('SELECT * FROM recipes');
	res.json(result.rows);
  } catch (err) {
	console.error(err);
	res.status(500).send('Error fetching recipes');
  }
});

// Returns a specific recipe by ***recipe_id***
app.get('/api/recipes/:id', async (req, res) => {
	try{
		const id = parseInt(req.params.id);

		// Look through the database for row with corresponding id
		const result = await pool.query('SELECT * FROM recipes WHERE recipe_id = $1', [id]);
		// if no results found throw error code 404
		if (!result.rows[0]) {
			return res.status(404).json({ error: 'Recipe with requested id not found'});
		}
		// return the found rows
		res.json(result.rows[0]);
	} catch (error) {
		console.error('Error fetching recipe from db:', error);
		res.status(500).json({error: 'Internal Server Error'});
	}
});

// Returns a specific recipe by ***user_id***
app.get('/api/users/:user_id/recipes', async (req, res) => {
	try{
		const id = parseInt(req.params.user_id);

		// Look through the database for row with corresponding user_id
		const result = await pool.query('SELECT * FROM recipes WHERE user_id = $1', [id]);
		// if no results found throw error code 404
		if (result.rows.length === 0) {
			return res.json([]); // returns empty array
		}
		// return the found rows
		res.json(result.rows);
	} catch (error) {
		console.error('Error fetching recipes from db:', error);
		res.status(500).json({error: 'Internal Server Error'});
	}
});

// POST routes
app.post('/api/recipes', async (req, res) => {
  try {
    const { user_id, title, description, instructions, servings, prep_minutes } = req.body;

    const result = await pool.query(
      `INSERT INTO recipes (user_id, title, description, instructions, servings, prep_minutes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, title, description, instructions, servings, prep_minutes]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting recipe into db:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE routes
// delete all recipes - for test only
app.delete('/api/recipes', async (req, res) => {
  try {
	await pool.query('DELETE FROM recipes');
	res.json({ message: 'All recipes deleted' });
  } catch (error) {
	console.error('Error deleting recipes from db:', error);
	res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Account creation routes

app.post('/api/create-account', async (req, res) => {
	const { username, email, password,} = req.body;
	try {
		// check if user with email already exists
		const checkUser = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);
		if(checkUser.rows.length > 0) {
			return res.status(409).json({error: "Email already in use"});
		}
		// check if username already exists
		// check if username already exists
				const checkName = await pool.query(
					"SELECT * FROM users WHERE name = $1",
					[username]
				);
				if(checkName.rows.length > 0) {
					return res.status(409).json({error: "Username already in use"});
				}

		const result = await pool.query(
			"INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
			[username, email, password]
		);
		res.json(result.rows[0]);
		console.log("Account created successfully");
	} catch (error) {
		console.log("Unable to create account");
		res.status(500).json({ error: 'Internal Server Error' });
	}
});








// Authentication routes
app.post('/api/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		const result = await pool.query(
			"SELECT * FROM users WHERE email = $1 AND password = $2", [email, password]
		);

		if (result.rows.length === 0) {
			console.log("No matching email and password");
			return res.status(401).json({ error: 'Invalid email or password' });
		} else {
			console.log("User exists");
			return res.status(200).json(result.rows[0]);
		}

	} catch (error) {
		console.error("Error on login post route", error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.get('/api/users/:id', async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		// look for row w/ corresponding id
		const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);

		// if there is no results throw error 404
		if(!result.rows[0]) {
			return res.status(404).json({error: "User with requested id not found"});
		}
		// return the found row(s)
		res.json(result.rows[0]);
	} catch (error) {
		console.error('Error fetching user from db', error);
		res.status(500).json({error: 'Internal Error'});
	}
});

// Get all comments for a recipe
app.get('/api/comments/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  console.log("recipeId:", req.params.recipeId);

  try {
    const result = await pool.query(
      `SELECT c.comment_id,
              c.recipe_id,
              c.parent_comment_id,
			  c.user_id,
              c.body,
              u.name AS user_name,
              c.created_at
       FROM comments c
       JOIN users u ON c.user_id = u.user_id
       WHERE c.recipe_id = $1
       ORDER BY c.created_at ASC`,
      [recipeId]
    );

    res.json(buildCommentTree(result.rows));

  } catch (error) {
	console.error("Error fetching comments:", error.stack);
  }
});

// Post a comment
app.post("/api/comments", async (req, res) => {
  const { recipe_id, parent_comment_id, body, user_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO comments (recipe_id, parent_comment_id, body, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [recipe_id, parent_comment_id, body, user_id]
    );

    res.json(result.rows[0]); // return the new comment

  } catch (error) {
    console.error("Error posting comment", error);
    res.status(500).json({ error: "Error posting comment" });
  }
});
// get a comment by parent comment id
app.get("/api/comments/parent/:parent_comment_id", async (req,res) => {
	const { parent_comment_id } = req.params;
	try{
		const result = await pool.query(
			`SELECT * FROM COMMENTS
			WHERE parent_comment_id = $1`,
			[ parent_comment_id ]
		);
		if (result.rows.length === 0) {
			return res.json([]); // return empty array if no comments found
		}
		return res.json(result.rows);
	} catch (error) {
		console.log("Error fetching comments by parent id", error);
		return res.status(500).json({ error: "Server Error fetching comments by parent id"});
	}
});
// check if a comment has replies
app.get("/api/comments/:comment_id/replies", async (req,res) => {
	const { comment_id } = req.params;
	try{
		const result = await pool.query(
			`SELECT * FROM COMMENTS
			WHERE parent_comment_id = $1`,
			[ comment_id ]
		);
		if (result.rows.length === 0) {
			return res.json([]); // return empty array if no replies found
		}
		return res.json(result.rows);
	} catch (error) {
		console.log("Error fetching replies for comment", error);
		return res.status(500).json({ error: "Server Error fetching replies for comment"});
	}
});

// Delete a comment
app.delete("/api/comments/:comment_id", async (req,res) => {
	const { comment_id } = req.params;
	try{
		const result = await pool.query(
			`DELETE FROM COMMENTS
			WHERE comment_id = $1`,
			[ comment_id ]
		);
		res.status(200).json({message: "Comment deleted successfully"});
	} catch (error) {
		console.log("Error deleting comment", error);
		return res.status(500).json({ error: "Server Error deleting comment"});
	}
})

// Post a rating
app.post('/api/ratings', async (req, res) => {
	const { recipe_id, user_id, rating } = req.body;
	try {
		const result = await pool.query(
			`INSERT INTO ratings (recipe_id, user_id, rating)
			VALUES ($1, $2, $3)
			RETURNING *`,
			[recipe_id, user_id, rating]
		);

		res.json(result.rows[0]); // return the rating

	} catch (error) {
		console.error("Error rating recipe", error);
		res.status(500)({ error: "Error rating recipe" });
	}
})

// WHAT DOES THIS EVEN DO????
// app.get('/api/ratings', async (req, res) => {
// 	const { recipe_id } = req.body;
// 	try {
// 		const result = await pool.query(
// 			`SELECT * FROM recipes WHERE recipe_id = $1`, [recipe_id]
// 		);
// 		if (result.rows.length === 0) {
// 			return res.status(404).json({ error: "Recipe with requested id not found"});
// 		}
// 		return res.json(result.rows);
// 	} catch (error) {
// 		console.error('Error fetching ratings', error);
// 		res.status(500).json({error: 'Internal Server Error'});
// 	}
// });

// get all ratings for a specific recipe
app.get('/api/ratings/:recipeId', async (req, res) => {
	const { recipeId } = req.params;
	try {
		const result = await pool.query(
			`SELECT * FROM ratings WHERE recipe_id = $1`,
			[recipeId]
		);
		return res.json(result.rows);
	} catch (error) {
		console.error('Error fetching ratings', error);
		res.status(500).json({error: 'Internal Server Error'});
	}
});


// get ratings for a specific user and specific recipe
app.get('/api/ratings/:recipeId/user/:userId', async (req, res) => {
	const { recipeId, userId } = req.params;
	try {
		const result = await pool.query(
			`SELECT * FROM ratings WHERE recipe_id = $1 AND user_id = $2`,
			[recipeId, userId]
		);
		if (result.rows.length === 0) {
			return res.json({ rating: null }); // return null if no rating found
		}
		return res.json(result.rows[0]);
	} catch (error) {
		console.error('Error fetching user rating', error);
		res.status(500).json({error: 'Internal Server Error'});
	}
});

// delete a rating for a user and recipe
app.delete('/api/ratings/:recipeId/user/:userId', async (req, res) => {
	const { recipeId, userId } = req.params;
	try {
		const result = await pool.query(
			`DELETE FROM ratings WHERE recipe_id = $1 AND user_id = $2 RETURNING *`,
			[recipeId, userId]
		);
		if (result.rows.length === 0) {
			// retunr null if no rating found to delete
			return res.status(200).json({ message: "No rating found to delete" });
		}
		console.log("Deleted rating:");
		return res.json({ message: "Rating deleted successfully" });
	} catch (error) {
		console.error('Error deleting user rating', error);
		res.status(500).json({error: 'Internal Server Error'});
	}
});
//////////////////////////////////////////////////







app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



//////////////////Helper Functions/////////////////////////
// Comments section routes
function buildCommentTree(rows) {
  const map = {};
  const roots = [];

  rows.forEach(row => {
    map[row.comment_id] = {
      ...row,
      replies: []
    };
  });

  rows.forEach(row => {
    if (row.parent_comment_id === null) {
      roots.push(map[row.comment_id]);
    } else {
      if (map[row.parent_comment_id]) {
        map[row.parent_comment_id].replies.push(map[row.comment_id]);
      } else {
        roots.push(map[row.comment_id]);
      }
    }
  });
  return roots;
}