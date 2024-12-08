import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../subcomponents/context';
import Container from '../subcomponents/Container';
import {getTransactions, verifyToken} from '../subcomponents/apicalls'
// 

const Home = (value) => {
    const navigate = useNavigate()
    const token = window.localStorage.getItem('sessionToken')
    const [userData, setUserData] = useState({
        name:"",
        email:""
    })
    const [userTransactions, setTransactions] = useState([])

    useEffect(()=> {
        verifyToken(token)
        .then(res => {
            console.log(res.data, res.message, res.message == 'OK')
            if(res.message == 'OK'){
                setUserData(res.data)
            }
               getTransactions(res.data.user_id, token)
               .then(res => {setTransactions(res)})
        })
    }, [])

    


    return (
        <div className='flex items-center place-content-center'>
            <div
                className='grid max-width-5xl grid-cols-3 m-5'
            >
                <div
                    className='col-span-3 m-2'
                >
                    <h1 className='text-slate-300'>
                        Hello {userData.name}
                    </h1>
                </div>
                <div className='min-w-72 h-32 m-2'>
                    <Container className='p-2 h-full'>
                        Your Income 
                    </Container>
                </div>
                <div className='m-2 col-span-2'>
                    <Container className='p-2 h-full'>
                        Your Balance
                    </Container>
                </div>
                <div className='m-2 col-span-3'>
                    <Container className='p-2 h-full'>
                        <div className='col-span-2'>
                        Your Transactions
                        </div>
                        {userTransactions.length > 0 ? userTransactions.map((item)=> {return(
                            <>
                            <div className='grid col-span-2 grid-cols-3'>
                                <div>
                                    {item.details}
                                </div>
                                <div>
                                    {item.date}
                                </div>
                                <div>
                                    {item.amount}
                                </div>
                            </div>
                            </>)}) : (
                                <>
                                    <div>
                                        Attempting to load info.
                                        Nothing to See here yet... 
                                    </div>
                                </>)}    
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default Home;
