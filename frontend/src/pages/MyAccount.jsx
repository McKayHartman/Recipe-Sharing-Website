import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default function MyAccount(){
	const { loggedInUser } = useContext(UserContext);

	return(
		<h1>MyAccount Page</h1>
	)

}