import { useState } from "react";
import { IonToast } from '@ionic/react';
import '@ionic/react/css/core.css';



export const SignUpPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    function getEmail(event) {
        setEmail(event.target.value)
    }

    function getPassword(event) {
        setPassword(event.target.value)
    }

    function getUsername(event) {
        setUsername(event.target.value)
    }

    function getName(event) {
        setName(event.target.value)
    }


    function submitData(){
        fetch('http://localhost:5001/sign-up', {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify({
                email: email,
                password: password,
                name: name,
                username: username,
            })
        })
        .then(response => response.json())
        .catch((err)=>{
            err.message === 'No username or password provided' ? setErrorMessage(err.message) : setErrorMessage('Error while Signing In')
            setError(true)

        })
    }


    return(
        <section>
            <div className="flex flex-col gap-3 items-center h-40  w-2/3 mx-auto my-auto">
                <input className="form-control" type="email" onChange={getEmail} placeholder="Enter your email address"/>
                <input className="form-control" type="password" onChange={getPassword} placeholder="Create a password"/>
                <input className="form-control" onChange={getName} placeholder="Enter your name"/>
                <input className="form-control" onChange={getUsername} placeholder="Choose your username"/>

                <button onClick={submitData} className="btn-primary w-3/5 h-10">Login</button>
            </div>

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