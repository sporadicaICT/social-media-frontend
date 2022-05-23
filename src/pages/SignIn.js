import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router"
import { IonToast } from '@ionic/react';
import '@ionic/react/css/core.css';
import { Filesystem } from "@capacitor/filesystem"
import { errorHandled } from "../utils/utils";
import { useForm } from "react-hook-form";
export const SignInPage = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    function submitDevData(data) {
        const {username,password} = data;
        console.log ({data});
      errorHandled(
        fetch(
          `http://localhost:4000/auth?username=${username}&password=${password}`
        )
      )
        .then(async(result) =>{
            if (result[1]) throw result[1];
            const data  =  await result[0].json()
            if (!data[0]) throw new Error("Cannot fetch");
            localStorage.setItem("user", JSON.stringify(data[0]));
            navigate('/main/home');
        })
        .catch((err)=>{
            console.error(err.message)
            err.message === 'No username or password provided' ? setErrorMessage(err.message) : setErrorMessage('Error while Signing In')
            setError(true)
        });
    }
    function submitData(loginData){
        if (process.env.NODE_ENV === "development") return submitDevData(loginData);
        fetch('http://localhost:4000/sign-in', {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify(loginData)
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
            <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-3 items-center h-40  w-2/3 mx-auto my-auto">
                <input className="form-control" {...register("username", {required:true})}  placeholder="Enter your username"/>
                <input className="form-control" type="password" {...register("password",{required:true})}  placeholder="Your password goes here"/>

                <button type="submit" className="btn-primary w-3/5 h-10">Login</button>
            </form>

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