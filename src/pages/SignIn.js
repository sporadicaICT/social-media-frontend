import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router"
import { IonToast } from '@ionic/react';
import '@ionic/react/css/core.css';
import { Filesystem } from "@capacitor/filesystem"


export const SignInPage = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    function getUsername(event) {
        setUsername(event.target.value)
    }

    function getPassword(event) {
        setPassword(event.target.value)
    }

    function submitData(){
        fetch('http://localhost:4000/sign-in', {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("user", JSON.stringify(data))
            navigate('/main/home')
        })
        .catch((err)=>{
            console.error(err.message)
            err.message === 'No username or password provided' ? setErrorMessage(err.message) : setErrorMessage('Error while Signing In')
            setError(true)

        })
    }


    return(
        <section>
            <div className="flex flex-col gap-3 items-center h-40  w-2/3 mx-auto my-auto">
                <input className="form-control" onChange={getUsername} placeholder="Enter your username"/>
                <input className="form-control" type="password" onChange={getPassword} placeholder="Your password goes here"/>

                <button onClick={submitData} className="btn-primary w-3/5 h-10">Login</button>
            </div>

            <p>
                Dont have an account?<span onClick={()=>navigate('/signup')}>Sign Up</span>
            </p>

            <IonToast 
                duration={2000} 
                isOpen={error}
                message={errorMessage}
                onDidDismiss={()=>setError(false)}
                buttons={[{
                    side: 'end',
                    text: 'OK',
                    role: 'cancel',
                }]}/>
            

        </section>
    )
}