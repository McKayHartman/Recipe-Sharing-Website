import React, { useState, useContext } from "react"
import axios from "axios"
import Input from "../components/Input"
import { UserContext } from '../context/UserContext'
import "App.css"

export default function CreateRecipe() {
  const { loggedInUser } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [servings, setServings] = useState("");
  const [prepMinutes, setPrepMinutes] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [meal, setMeal] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [postStatus, setPostStatus] = useState(false);
  const [invalidInputStatus, setInvalidInputStatus] = useState(false);

  const CUISINES = [
    "American", "Italian", "Mexican", "Indian",
    "Chinese", "Japanese", "Thai", "Mediterranean"
  ];

  const MEALS = [
    'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Other'
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !description || !instructions ) {
      setInvalidInputStatus(true);
      return;
    }

    const formData = new FormData();
    formData.append('user_id', loggedInUser);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('instructions', instructions);
    formData.append('servings', servings);
    formData.append('prep_minutes', prepMinutes);
    formData.append('cuisine', cuisine);
    formData.append('meal', meal);
    if (imageFile) formData.append('image', imageFile);

    try {
      await axios.post('/api/recipes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setTitle('');
      setDescription('');
      setInstructions('');
      setServings('');
      setPrepMinutes('');
      setCuisine('');
      setMeal('');
      setImageFile(null);
      setInvalidInputStatus(false);
      setPostStatus(true);

    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  }

  return (
    <div className="recipe-page">
      <div className="recipe-card">
        <h2 className="recipe-title">Create a Recipe</h2>

        {invalidInputStatus && <h3 className="errorMessage">Invalid Input</h3>}
        {postStatus && <h3>Recipe Posted!</h3>}

        <form className="recipe-form" onSubmit={handleSubmit}>

          <label>
            Recipe Title:
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </label>

          <label>
            Description:
            <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
          </label>

          <label>
            Instructions:
            <Input type="text" value={instructions} onChange={(e) => setInstructions(e.target.value)}/>
          </label>

          <label>
            Servings:
            <Input type="number" value={servings} onChange={(e) => setServings(e.target.value)}/>
          </label>

          <label>
            Prep Minutes:
            <Input type="number" value={prepMinutes} onChange={(e) => setPrepMinutes(e.target.value)}/>
          </label>

          <label>
            Cuisine:
            <select className="border rounded p-2 w-full" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
              <option value="">Select a cuisine</option>
              {CUISINES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label>
            Meal:
            <select className="border rounded p-2 w-full" value={meal} onChange={(e) => setMeal(e.target.value)}>
              <option value="">Select a meal</option>
              {MEALS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </label>

          <label>
            Upload a Picture:
            <input 
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </label>

          <button type="submit" className="recipe-button">Post Recipe</button>
        </form>
      </div>
    </div>
  )
}
