import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../subcomponents/context';
import Container from '../subcomponents/Container';
import {getTransactions} from '../subcomponents/apicalls'
// 



const Home = (value) => {

    const navigate = useNavigate()
    const context = useContext(UserContext)
//   console.log(useContext(UserContext))
//   console.log(value)

    const [userTransactions, setTransactions] = useState([])

    useEffect(()=> {

       getTransactions(context.id)
       .then(res => setTransactions(res))
    }, [context])

    if(context.token == ''){
        navigate('/signin')
    } else if(context.token != "DELTA") {
        // Insert login verification here NEEDS TO BE DONE
    }
    if(context.token == "DELTA"){
        context.email = "suggestment1@gmail.com"
        context.id = "2482e649-22e0-4c4e-9e1a-caef3fc82609"
    }
    


    return (
        <div className='flex items-center place-content-center'>
            <div
                className='grid max-width-5xl grid-cols-3 m-5'
            >
                <div
                    className='col-span-3 m-2'
                >
                    <h1 className='text-slate-300'>
                        Hello {context.email}
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
                                        Nothing to See here...
                                    </div>
                                </>)}    
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default Home;
