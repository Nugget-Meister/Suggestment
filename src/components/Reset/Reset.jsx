import React, { useRef, useState } from 'react';
import Modal from '../subcomponents/Modal';
import { useNavigate, useParams } from 'react-router';
import { validatePassword } from '../SignUp/functions';
import Container from '../subcomponents/Container';
import PasswordBox from '../SignUp/subcomponent/PasswordBox';
import { resetUserPassword } from '../subcomponents/apicalls';


const imgURL = 'https://images.unsplash.com/photo-1669251921941-ae3645715017?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'


const Reset = () => {
    let token = useParams().token
    let navigate = useNavigate()

    let [modalList, setModalList] = useState([])
    let formRef = useRef({
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
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(formData)
        let hasFailed = Object.values(passFails).find(a => a == true) || false
        if(!hasFailed) {
            resetUserPassword(formData, token)
            .then(res => {
                if(res.message == "OK" && res) {
                    setModalList([...modalList,
                        <Modal 
                            linkTo='/signin' 
                            linkText='Back to Login'
                            good
                            title='Password reset'
                            message={(<span>Your password has been successfully reset<br/> You will be signed out upon navigating away from this page.</span>)}
                    />
                    ])
                    window.localStorage.removeItem('sessionToken')
                    window.localStorage.removeItem('valid')
                } else {
                    setModalList([...modalList,
                        <Modal 
                            bad
                            closeAnywhere
                            title='Unable to reset password'
                            message={(<span>We were unable to reset your password. If this issue persists. Contact site owner<br/> You will be signed out upon navigating away from this page.</span>)}
                        />
                    ])
                    // window.localStorage.removeItem('sessionToken')
                    // window.localStorage.removeItem('valid')
                }
            })
        }
    }

    return (
        <>
            {modalList.length > 0 ? modalList.map(modal => modal) : null}
            <div className='place-content-center items-center w-full h-full flex'>
                <div className='max-w-5xl'>
                    <h1 className='p-4'>Reset Password</h1>
                    <Container>
                        <div className='overflow-clip'>
                            <img className='rounded h-full scale-x-125 pr-4 ' src={imgURL} alt="{$image}"/>
                            <div className='grid place-content-center p-4 my-4'>
                        </div>
                    </div>
                    <div className='m-2 px-4'>
                        <form onSubmit={handleSubmit} className='grid grid-cols-none'>
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
                                    className="my-2 bg-red-400 hover:bg-red-700 hover:scale-105 transition" 
                                    type='submit'>
                                        Reset Password
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

export default Reset;
