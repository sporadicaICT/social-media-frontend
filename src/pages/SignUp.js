import { useState } from "react";
import { IonToast } from '@ionic/react';
import { useForm } from "react-hook-form";
import '@ionic/react/css/core.css';



export const SignUpPage = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    function submitDevData(data){
        // Polyfill user_id gen
        data.user_id = window.crypto.randomUUID();
        fetch('http://localhost:4000/auth', {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify(data)
        })
        .then(response => response.json())
        .catch((err)=>{
            err.message === 'No username or password provided' ? setErrorMessage(err.message) : setErrorMessage('Error while Signing In')
            setError(true)
        })

    }
    function submitData(data){
        if(process.env.NODE_ENV === 'development') return submitDevData(data);
        fetch('http://localhost:5001/sign-up', {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify(data)
        })
        .then(response => response.json())
        .catch((err)=>{
            err.message === 'No username or password provided' ? setErrorMessage(err.message) : setErrorMessage('Error while Signing In')
            setError(true)

        })
    }


    return(
        <section>
            <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-3 items-center h-40  w-2/3 mx-auto my-auto">
                <input className="form-control" type="email" {...register('email',{required:true})} placeholder="Enter your email address"/>
                <input className="form-control" type="password" {...register('password',{required:true})} placeholder="Create a password"/>
                <input className="form-control" {...register('name',{required:true})} placeholder="Enter your name"/>
                <input className="form-control" {...register('username',{required:true})} placeholder="Choose your username"/>

                <button  className="btn-primary w-3/5 h-10">Login</button>
            </form>

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