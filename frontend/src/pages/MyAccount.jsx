import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default function MyAccount(){
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">My Account</h2>

        {loggedInUser ? (
          <p style={{ color: "#f5f1e3" }}>
            Logged in as User ID: {loggedInUser}
          </p>
        ) : (
          <p style={{ color: "#f5f1e3" }}>
            Not logged in.
          </p>
        )}
      </div>
    </div>
  )
}
