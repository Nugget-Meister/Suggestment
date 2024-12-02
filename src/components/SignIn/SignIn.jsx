import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { validatePassword } from './functions';
import PasswordBox from './subcomponent/PasswordBox';
// import signInImg from '/public/signInImg.jpg'

const SignIn = () => {
    
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
        console.log(formData, formRef.current)
        console.log(hasFailed)
    }

    let gridVals = "grid grid-cols-2 w-full max-w-screen-xl min-w-96 md:container md:mx-auto bg-secondary rounded"
    
    return (
    <>
        <div className='place-content-center'>
            <div className={gridVals}>
                <img src="src/assets/signInImg.jpg" alt="{$image}"/>
                <div className='m-4 px-2'>
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
                                className='rounded w-full p-2 bg-gray-500' type="text" />
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
                                className='rounded w-full p-2' type="email" />
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
                                className='rounded w-full p-2' type="password" />
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
                                className='rounded w-full p-2' type="password" />
                        </div>
                        <div className='pt-2 pr-2 flex items-center'>
                        </div>
                            <button 
                                className="my-2 hover:bg-sky-200 transition" 
                                type='submit'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
}

export default SignIn;
