import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { validatePassword } from './functions';
import { useNavigate } from 'react-router';
import PasswordBox from '../SignUp/subcomponent/PasswordBox';
import Container from '../subcomponents/Container';
import Modal from '../subcomponents/Modal';
import { registerUser } from '../subcomponents/apicalls';
// import SuccessModal from './subcomponent/SuccessModal';
// import FailModal from './subcomponent/FailModal';

// import signInImg from '/public/signInImg.jpg'

const imgURL = 'https://images.unsplash.com/photo-1669251921941-ae3645715017?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
// import imgURL from '/public/signInImg.jpg'

const SignUp = () => {
    
const navigate = useNavigate()

    let [pageState, setPageState] = useState({
        showModal: false,
        modal: (<></>)
    })

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

        // console.log(validatePassword(formRef.current.password,formRef.current.repeat))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //Coerce undefined into false if fail value not found
        let hasFailed = Object.values(passFails).find(a => a == true) || false
        console.log(hasFailed)
        if(!hasFailed){
            // Reset state then reappply after delay to force refresh
            setPageState({
                showModal: false,
                modal: (<></>)
            })
            setTimeout(()=>{ 
                registerUser(formRef.current)
                .then((res) => {
                    if(res.message == "OK"){
                        console.log('gottem')
                        setPageState({
                            showModal: true,
                            modal: (<Modal 
                                linkTo='/signin' 
                                linkText='Back to Login'
                                good
                                title='Verification Email Sent'
                                message={(<span>A verification email has been sent. <br/> You can now safely close this tab or return to login.</span>)}
                        />)})
                    } else {
                        console.log('failed')
                        setPageState({
                            showModal:true,
                            modal:(<Modal 
                                bad
                                closeAnywhere
                                message={(<span>An error has occurred, the email may be in use. <br />If you think this is an error, please contact site owner. <br/> <br /><div className="font-bold">Click Anywhere to Dismiss</div></span>)}
                            />)
                        })
                    }
                })
            })
        }
    }

    let gridVals = "grid grid-cols-2 w-full max-w-screen-xl min-w-96 md:container md:mx-auto bg-secondary rounded"
    
    return (
    <>

        {pageState.showModal ? pageState.modal: null}
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
                            className='my-2 bg-slate-600 hover:bg-slate-700 hover:scale-105 transition' 
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
                                className='rounded w-full p-2 transition focus:scale-105 bg-slate-800'
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
                                className='rounded w-full p-2 transition focus:scale-105 bg-slate-800'
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
                                className='rounded w-full p-2 transition focus:scale-105 bg-slate-800'
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
                                className='rounded w-full p-2 transition focus:scale-105 bg-slate-800'
                                type="password" />
                        </div>
                        <div className='pt-2 pr-2 flex place-content-center items-center'>
                            <button 
                                className="my-2 bg-slate-600 hover:bg-slate-700 hover:scale-105 transition" 
                                type='submit'>
                                    Sign Up
                            </button>
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
