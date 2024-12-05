import React, { useState } from 'react';
import Container from '../subcomponents/Container';
import { useNavigate } from 'react-router';


const imgURL = 'https://images.unsplash.com/photo-1527219525722-f9767a7f2884?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
const SignIn = () => {
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    }) 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)

        
    }

    return (
        <div className='place-content-center items-center h-full w-full flex'>
            <div className='max-w-5xl'>
            <h1>Sign In</h1>
            <Container>
                <div>
                    <img 
                        className='rounded'
                        src={imgURL} alt="image of person" />
                    <div className='grid place-content-center p-4 my-4'>
                        <p className='m-2'>
                            Don't have an account?
                        </p>
                        <button
                            className='my-2 hover:bg-slate-700 hover:scale-105 transition' 
                            onClick={()=> navigate('/signup')}>
                            Sign Up
                        </button>
                    </div>

                </div>
                <div className='m-2 px-2 place-content-center'>
                    <form 
                        className='grid grid-cols-none'
                        onSubmit={handleSubmit}>
                        <div className='my-1'>
                            <div className='py-2 mx-2 text-lg'>
                                Email
                            </div>
                            <input 
                                required
                                value={formData.email}
                                id='email'
                                className='rounded w-full p-2 transition focus:scale-105'
                                onChange={handleChange}
                                type="text" />
                        </div>
                        <div className='my-1'>
                            <div className='py-2 mx-2 text-lg'>
                                Password
                            </div>
                            <input 
                                required
                                value={formData.password}
                                id='password'
                                onChange={handleChange}
                                className='rounded w-full p-2 transition focus:scale-105'
                                type="password" />
                        </div>

                            <div
                                className='pt-2 pr-2 flex place-content-center items-center'>
                                <button 
                                    className='my-2 hover:bg-slate-700 hover:scale-105 transition'
                                    type='submit'
                                >Sign In</button>
                            </div>
                    </form>
                </div>
            </Container>
            </div>
        </div>
    );
}

export default SignIn;
