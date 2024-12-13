import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../subcomponents/context';
import Container from '../subcomponents/Container';
import {getTransactions, verifyToken} from '../subcomponents/apicalls'
import ButtonLogout from '../subcomponents/ButtonLogout';


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
            // console.log(res.data, res.message, res.message == 'OK')
            if(res.message == 'OK'){
                setUserData(res.data)
            } else {
                navigate('/signin')
            }
               getTransactions(res.data.user_id, token)
               .then(res => {setTransactions(res)})
            })
    }, [])

    // console.log(userTransactions)

    return (
        <div className='flex items-center place-content-center'>
            <div
                className='grid w-5/6 m-6 grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 m-5 md:grid-cols-2 '
            >
                <div
                    className='col-span-4 sm:grid-cols-1 lg:col-span-4 xl:col-span-4 m-2 flex place-content-between'
                >
                    <h1 className='text-slate-300'>
                        Hello {userData.name || 'Unverified User'},
                    </h1>
                    
                    <div>
                        <button
                            onClick={()=>{navigate('/profile')}}
                            className='bg-inherit mx-4 outline transition outline-1 hover:bg-slate-700 hover:scale-105'>Profile</button>
                        <ButtonLogout />
                    </div>
                </div>
                <div className='min-w-32 h-32 m-2 col-span-4 sm:col-span-1 lg:col-span-2'>
                    <Container className='p-2 h-full grid-cols-1 place-content-center'>
                        <div className='flex place-content-end px-6 col-span-2 sm:px-2 sm:place-content-start'>
                            <div>
                                <div className='text-end sm:text-start'>
                                    Your Income 
                                </div>
                                <h1>
                                    
                                    {userTransactions.length > 0 ? '$' + userTransactions.filter(entry => entry.category == 'PAYMENT')
                                        .reduce((a,b) => a + Number(b.amount),0) : null}
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className='m-2 col-span-1 sm:col-span-2'>
                    <Container className='p-2 h-full grid-cols-1 place-content-center'>
                        <div className='flex place-content-end col-span-2 px-6'>
                            <div >
                                <div className='text-end'>
                                    Your Balance
                                </div>
                                <h1 >
                                    ${userTransactions.length > 0 ? userTransactions.reduce((a,b) => a + Number(b.amount),0).toFixed(2): 0}
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className='m-2 col-span-4'>
                    <Container className='p-4 h-full'>
                        <div className='col-span-2 relative'>
                            <h1 className='py-2 text-3xl'>
                            Transactions
                            </h1>
                            <button
                                onClick={() => navigate('/transaction/new')}
                                className='rounded-sm absolute top-0 right-0 md:right-0 bg-slate-500 transition-all w-[150px] hover:w-[200px] hover:bg-slate-700 float-left m-2 md:m-0 px-6'>
                            New Entry</button>
                            <hr className='p-2 mt-3'/>
                        </div>
                        <div className='grid px-2 col-span-4 grid-cols-2 sm:grid-cols-4'>
                            <span className='text-lg font-bold text-slate-200'>Name</span>
                            <span className='hidden sm:inline'>Date</span>
                            <span className='text-right sm:text-left'>Amount</span>
                            <span className='hidden sm:inline'>Category</span>
                        </div>
                        <div className='col-span-4 bg-slate-500 p-4-3-2'>
                            {userTransactions.length > 0 ? userTransactions.map((item,index)=> {return(
                                
                                <div
                                    key={index} 
                                    onClick={() => navigate(`/transaction/${item.transaction_id}`)}
                                    className='grid px-2 p-1 col-span-2 grid-cols-2 sm:grid-cols-4 rounded hover:bg-slate-600'>
                                    <div>
                                        {item.details}
                                    </div>
                                    <div className='hidden sm:inline'>
                                        {item.date.split('T')[0]}
                                    </div>
                                    <div className='text-right sm:text-left text-lg font-light sm:text-base'>
                                        {item.amount}
                                    </div>
                                    <div className='hidden sm:inline'>
                                        {item.category}
                                    </div>
                                </div>
                                )}) : (
                                    <>
                                        <div>
                                            Attempting to load info.
                                            Nothing to See here yet... 
                                        </div>
                                    </>)}    
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default Home;
