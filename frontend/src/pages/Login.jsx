import Input from "../components/Input"
import React from "react"
import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

// Full Login page
// handleLogin happens inside of the try block of handleSubmit

export default function Login() {
	const { setLoggedInUser } = useContext(UserContext);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const loginInfo = {
		email,
		password
	}

	// triggered when the submit button is clicked
	async function handleSubmit(){
		try{
			console.log("attempting login", loginInfo);
			const response = await axios.post('api/login', loginInfo);
			console.log("Successful Login: ", response.data); // 2XX status expected
			// login the user to their account based on user_id
			handleLogin(response.data.user_id);
		} catch(error){ // non 2XX status code
			if (error.response) {
      			switch (error.response.status) {
        			case 401:
          				console.log("No matching credentials found");
						setErrorMessage("No matching credentials found: Email or password is incorrect.")
          				break;
        			case 500:
          				console.log("Server error");
          				break;
       			 	default:
          				console.log("Other error:", error.response.status);
      			}
			}
		}
	}

	function handleLogin(user_id){
		// store user_id inside of context
		setLoggedInUser(user_id);
		console.log("User logged in to page using id: ", user_id);
		navigate("/"); // route the user to the home page

	}

	return (
		<div className="pt-20">
			{errorMessage && <p class="errorMessage">{errorMessage}</p>}
			<form className="max-w-md">
				<label>
					Email:
					<Input value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
				</label>
				<br />
				<label>
					Password:
					<Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" />
				</label>
				<br />
			</form>
			<button type="submit" onClick={handleSubmit}>Login</button>
		</div>
	)
}