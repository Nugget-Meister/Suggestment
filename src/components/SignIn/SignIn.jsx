import React from 'react';
import { useState } from 'react';

// import signInImg from '/public/signInImg.jpg'

const SignIn = () => {
    let [form, setForm] = useState({}) 

    const onChange = (e) => {

    }
    const onSubmit = (e) => {
        console.log(e.target)
    }

    let gridVals = "grid grid-cols-2 w-full max-w-screen-xl min-w-96 md:container md:mx-auto bg-secondary rounded"
    
    return (
    <>
        <div className='place-content-center'>
            <div className={gridVals}>
                <img src="src/assets/signInImg.jpg" alt="{$image}"/>
                <div className='m-4'>
                    <form onSubmit={onSubmit} className='grid grid-cols-none'>
                        <div>Name</div>
                        <input type="text" />
                        <div>Email</div>
                        <input type="text" />
                        <div>Password</div>
                        <input type="text" />
                        <div>Repeat Password</div>
                        <input type="text" />
                        <button type='submit'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
}

export default SignIn;
