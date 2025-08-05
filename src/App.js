import { useState } from "react"
import googlePlayLogo from "./images/googlePlayLogo.png"
import appStoreLogo from "./images/appleStoreLogo.png"

const App = () => {

    const [user, setUser] = useState(null)

    const updateUser = (e) =>{
        setUser({...user, [e.target.name] : e.target.value})
    }
    console.log(user)

    const registerUser = async (e) =>{
        e.preventDefault()
        try{
            const options = {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch('http://localhost:8000/register', options)
            const data = await response.json()
            console.log(data)

        }catch (error){
            console.log(error)
        }
    }


  return (
    <div className="auth-modal">
       <div className="close-icon"> ✕ </div>
        <h2> Sign Up </h2>
        <p>
            By signing up you agree to our terms and conditions.
        </p>
        <form onSubmit={registerUser}>
            <input
                type="email"
                id = "email"
                name="email"
                placeholder="Email"
                onChange={updateUser}
                value={user?.email}
            />

            <input
                type="tel"
                id = "tel"
                name="tel"
                placeholder="Phone Number"
                onChange={updateUser}
                value={user?.tel}
            />

            <input type="submit" className="form-button" />
        </form>

        <hr/>

        <h2> Download the app </h2>

        <div className="link-container">
            <a href="http://play.googe.com/store" >
                <img src={googlePlayLogo} alt="google play icon" />
            </a>

            <a href="http://www.apple.com/store" >
                <img src={appStoreLogo} alt="apple store icon" />
            </a>
        </div>

    </div>
  )
}

export default App;
