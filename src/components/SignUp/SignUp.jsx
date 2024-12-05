import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { registerUser, validatePassword } from './functions';
import { useNavigate } from 'react-router';
import PasswordBox from '../SignUp/subcomponent/PasswordBox';
import Container from '../subcomponents/Container';
// import signInImg from '/public/signInImg.jpg'

// const imgURL = 'https://images.unsplash.com/photo-1669251921941-ae3645715017?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
import imgURL from '/public/signInImg.jpg'

const SignUp = () => {
    
const navigate = useNavigate()

    let formRef = useRef({
        active: false,
        name: '',
        email: '',
        password: '',
        repeat: '',
    })

    let [formData, setFormData] = useState(formRef.current) 

    let passFails = validatePassword(formRef.current.password,formRef.current.repeat)

    const handleChange = (e) => {
        formRef.current = {
            ...formRef.current,
            [e.target.id]: e.target.value
        }
        setFormData(formRef.current)

        console.log(validatePassword(formRef.current.password,formRef.current.repeat))
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        //Coerce undefined into false if fail value not found
        let hasFailed = Object.values(passFails).find(a => a == true) || false
        // console.log(formData, formRef.current)
        // console.log(hasFailed)

        if(!hasFailed){
            registerUser(formRef.current)
        }
    }

    let gridVals = "grid grid-cols-2 w-full max-w-screen-xl min-w-96 md:container md:mx-auto bg-secondary rounded"
    
    return (
    <>
        <div className='place-content-center items-center w-full h-full flex'>
            <div className='max-w-5xl'>
            <h1
                className='p-4'
            >
                Sign Up</h1>
            <Container> 
                <div>
                    <img className='rounded' src={imgURL} alt="{$image}"/>
                    <div className='grid place-content-center p-4 my-4'>
                        <p className='m-2'>
                            Already have an account?
                        </p>
                        <button
                            className='my-2 hover:bg-slate-700 hover:scale-105 transition' 
                            onClick={()=> navigate('/signin')}>
                            Sign In
                        </button>
                    </div>
                </div>
                <div className='m-2 px-4'>
                    <form onSubmit={handleSubmit} className='grid grid-cols-none'>
                        <div className='my-1'>
                            <div
                                className='my-1'
                                >Name</div>
                            <input 
                                required
                                value={formData.name}
                                id="name"
                                onChange={handleChange}
                                className='rounded w-full p-2 transition focus:scale-105'
                                type="text" />
                        </div>
                        <div className='my-1'>
                            <div
                                className='my-1'
                                >Email</div>
                            <input 
                                required
                                value={formData.email}
                                id="email"
                                pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                                onChange={handleChange}
                                className='rounded w-full p-2 transition focus:scale-105'
                                type="email" />
                        </div>
                        <div className='my-1'>
                            <div
                                className='my-1'
                                >Password</div>
                            <input 
                                required
                                value={formData.password}
                                id="password"
                                onChange={handleChange}
                                className='rounded w-full p-2 transition focus:scale-105'
                                type="password" />
                            <div>
                                <PasswordBox val={passFails}/>
                            </div>
                        </div>
                        <div className='my-1'>
                            <div>Repeat Password</div>
                            <input 
                                required
                                value={formData.repeat}
                                id="repeat"
                                onChange={handleChange}
                                className='rounded w-full p-2 transition focus:scale-105'
                                type="password" />
                        </div>
                        <div className='pt-2 pr-2 flex place-content-center items-center'>
                            
                            <button 
                                className="my-2 hover:bg-slate-700 hover:scale-105 transition" 
                                type='submit'>Sign Up</button>
                        </div>
                    </form>
                </div>

            </Container>
            </div>
        </div>
    </>
    );
}

export default SignUp;