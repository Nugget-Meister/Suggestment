import React, { useState } from 'react';
import { createTransaction } from '../subcomponents/apicalls';
import { useNavigate } from 'react-router';
import Container from '../subcomponents/Container';
import Modal from '../subcomponents/Modal';

const imgURLs = {
    _: 'https://images.unsplash.com/photo-1496294439361-e8bcfef35916?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    BILL: 'https://images.unsplash.com/photo-1724482606633-fa74fe4f5de1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    PAYMENT: 'https://images.unsplash.com/photo-1676151863834-b9b162faa8ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    EXPENSE: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    PURCHASE: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    SALE: 'https://images.unsplash.com/photo-1669951584309-492ed24d274f?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
}

const TransactionNew = () => {
    const navigate = useNavigate()


    const sessionToken = window.localStorage.getItem('sessionToken')
    const user_id = window.localStorage.getItem('user_id')

    const [formData, setFormData] = useState({
        user_id: user_id,
        details: '',
        category: '',
        amount: '',
        date: '',
    })

    const [modalList, setModalList] = useState([])
 
    const createHandler = () => {
        createTransaction(formData, sessionToken)
        .then((res) => {
            console.log(res)
            if(res.message == "OK"){
                setModalList([...modalList,
                    <Modal
                        key={modalList.length}
                        message='Successfully Created Transaction'
                        good
                        linkText='Back to Transactions'
                        linkTo='/'
                        />
                ])
            } else {
                setModalList([...modalList,
                    <Modal
                        key={modalList.length}
                        message='An error has occurred. Please try again later. If the issue persists contact website owner.'
                        bad
                        linkText='Back to Transactions'
                        linkTo='/'
                        />
                ])
            }
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(formData)
        setModalList([...modalList,
            <Modal
            key={modalList.length}
            message='Create New Entry?'
            action={()=>createHandler()}
            actionColor='bg-blue-500'
            actionHover='hover:bg-blue-700'
            linkText="Confirm"
            />
        ])
    }

    return (
        <>
            {modalList.length > 0 ? modalList.map((modal) => modal) : null}
            <div className='place-content-center items-center h-full w-full flex'>
            <div className='w-[1020px] min-w-96'>
                <Container className='relative grid-cols-2 text-right transition-all h-[450px]'>
                    <button 
                        onClick={()=> navigate('/')}
                        className='rounded-sm absolute top-0 right-0 md:left-0 bg-slate-500 transition-all w-[120px] hover:w-[200px] hover:bg-slate-700 float-left m-2 md:m-0 px-6'>
                        {'< Back'}
                    </button>
                    <div className='hidden place-content-center md:inline'>
                        <img 
                            className='w-[512px] h-full transition-all hidden md:inline rounded'
                            src={imgURLs[formData.category] || imgURLs._} alt="" />
                    </div>
                    <div 
                        className='col-span-2 md:col-span-1 relative place-content-center'>
                        <form 
                            className='grid grid-cols-none text-left px-4'
                            onSubmit={handleSubmit}>
                            <div className='my-1'>
                                <div className='py-2 mx-2 text-lg'>
                                    Date
                                </div>
                                <input 
                                    required
                                    value={formData.date.split('T')[0]}
                                    id='date'
                                    className={`rounded w-full p-2 transition hover:scale-105 focus:scale-105 bg-slate-800`}
                                    onChange={handleChange}
                                    type="date" />
                            </div>
                            <div className='my-1'>
                                <div className='py-2 mx-2 text-lg'>
                                    Details
                                </div>
                                <input 
                                    required
                                    value={formData.details}
                                    id='details'
                                    onChange={handleChange}
                                    className='rounded w-full p-2 transition-all hover:scale-105 focus:scale-105 bg-slate-800'
                                    type="text" />
                            </div>
                            <div className='my-1'>
                                <div className='py-2 mx-2 text-lg'>
                                    Category
                                </div>
                                <select
                                    className='rounded w-full p-2 transition active:scale-105 hover:scale-105 bg-slate-800'
                                    name="category" 
                                    id="category"
                                    onChange={handleChange}
                                    value={formData.category}
                                >

                                    <option value="BILL">Bill</option>
                                    <option value="EXPENSE">Expense</option>
                                    <option value="PAYMENT">Payment</option>
                                    <option value="PURCHASE">Purchase</option>
                                    <option value="SALE">Sale</option>
                                </select>
                            </div>
                            <div className='my-1'>
                                <div className='py-2 mx-2 text-lg'>
                                    Amount
                                </div>
                                <input 
                                    required
                                    value={formData.amount}
                                    id='amount'
                                    onChange={handleChange}
                                    className='rounded w-full p-2 transition focus:scale-105 bg-slate-800'
                                    type="number" />
                            </div>
                            <div className='flex py-2 place-content-end'>
                                <button
                                    type='submit'
                                    onClick={handleSubmit}
                                    className='bg-blue-500 m-1 w-[180px] hover:w-[200px] transition-all hover:bg-blue-700'>Create New Entry</button>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
        </>
    );
}

export default TransactionNew;
