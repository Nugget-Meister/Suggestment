import React, { useEffect, useState } from 'react';
import Container from '../subcomponents/Container';
import { useNavigate, useParams } from 'react-router';
import { 
    getTransaction,    
    createTransaction,
    updateTransaction,
    deleteTransaction } from '../subcomponents/apicalls';
import Modal from '../subcomponents/Modal';

    const imgURLs = {
        BILL: 'https://images.unsplash.com/photo-1724482606633-fa74fe4f5de1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        PAYMENT: 'https://images.unsplash.com/photo-1676151863834-b9b162faa8ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        EXPENSE: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        PURCHASE: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        SALE: 'https://images.unsplash.com/photo-1669951584309-492ed24d274f?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }


const Transaction = (props) => {
    let id = useParams().id
    const navigate = useNavigate()

    const sessionToken = window.localStorage.getItem('sessionToken')

    const [pageState, setPageState] = useState ({
        editMode: false
    })
    

    //Draw from this to set form edit data. Origin
    const [transactionData, setTransactionData] = useState({
        transaction_id: '',
        details: '',
        category: '',
        amount: '',
        date: '',
        type: ''
    })

    // Data to be modified and sent, stored separately to allow for refresh on edit cancels.
    const [formData, setFormData] = useState({
        transaction_id: '',
        details: '',
        category: '',
        amount: '',
        date: '',
        type: ''
    })

    const [modalList, setModalList] = useState([])

    useEffect(()=>{
        // console.log(id)
        if(!props.new){
            getTransaction(id, sessionToken)
            .then(res => {
                // console.log(res.data)
                if(res.data.transaction_id){
                    setTransactionData(res.data)
                    setFormData(res.data)
                } else {
                    navigate('/')
                }
            })
        }
    },[])

    // Used to keep data exposed topside despite sending action in.
    // This needs a better naming convention
    const transactionHandler = () => {
        // console.log("Hit transactionhandler")
        updateTransaction(formData, sessionToken)
        .then(res => {
            if(res.message == "OK"){
                setModalList([...modalList,
                    <Modal
                        key={modalList.length}
                        message='Successfully Edited Transaction'
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

    const deleteHandler = () => {
        // console.log("Hit transactionhandler")
        deleteTransaction(formData.transaction_id, sessionToken)
        .then(res => {
            console.log(res)
            if(res.message == "OK"){
                setModalList([...modalList,
                    <Modal
                        key={modalList.length}
                        message='Successfully Deleted Transaction'
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


    // Handlers for buttons, original invokers
   
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    // 

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(formData)
        setModalList([...modalList,
            <Modal
            key={modalList.length}
            message='Confirm Edit?'
            action={()=>transactionHandler()}
            actionColor='bg-blue-500'
            actionHover='hover:bg-blue-700'
            linkText="Confirm"
            />
        ])
    }

    const handleDelete = () => {
        setModalList([...modalList,
            <Modal
            key={modalList.length}
            message='Are you sure you want to delete this?'
            action={()=>deleteHandler()}
            actionColor='bg-red-500'
            actionHover='hover:bg-red-700'
            linkText="Confirm"
            />
        ])
    }

    // console.log(modalList)
    // console.log(pageState.editMode == true)
    return (
        <>
        {modalList.length > 0 ? modalList.map((modal) => modal) : null}

        <div className='place-content-center items-center h-full w-full flex'>
            <div className='w-[1020px] min-w-96'>
                {/* <h1 className='py-2'>Edit Entry</h1> */}
                <Container className='relative grid-cols-2 text-right transition-all h-[450px]'>
                    <button 
                        onClick={()=> navigate('/')}
                        className='rounded-sm absolute top-0 right-0 md:left-0 bg-slate-500 transition-all w-[120px] hover:w-[200px] hover:bg-slate-700 float-left m-2 md:m-0 px-6'>
                        {'< Back'}
                    </button>
                    <div className='hidden place-content-center md:inline'>
                        <img 
                            className='w-[512px] overflow:hidden hidden md:inline rounded'
                            src={imgURLs[transactionData.category] || imgURLs.BILL} alt="" />
                    </div>
                    <div 
                        className='col-span-2 md:col-span-1 relative place-content-center'>
                        {pageState.editMode == false ?
                            <>
                                <div className='p-5 grid'>
                                    <div className='p-2 text-2xl font-bold'>
                                        {transactionData.type}
                                    </div>
                                    <div className='p-2 font-bold text-4xl '>
                                        {transactionData.date.split('T')[0]}
                                    </div>
                                    <div className='p-2 text-2xl '>
                                        {transactionData.details}
                                    </div>
                                    <div className='p-2'>
                                        {transactionData.category}
                                    </div>
                                    <div className='p-1 px-2 text-2xl font-bold'>
                                        ${transactionData.amount}
                                    </div>
                                </div>
                                <div 
                                    className='bottom-0 right-0 p-4'>
                                    <button
                                        onClick={handleDelete}
                                        className='bg-red-400 m-2 transition hover:bg-red-700'>Delete</button>
                                    <button 
                                        onClick={()=> {setPageState({...pageState, editMode: !pageState.editMode})}}
                                        className='bg-slate-500 m-2 transition hover:bg-slate-700'>Edit</button>
                                </div>
                            </>
                        : <>
                        <form 
                            className='grid grid-cols-none text-left px-4'
                            onSubmit={handleSubmit}>
                            
                            <div className='my-1'>
                                <div className='m-1 text-lg'>
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
                            <div className='mt-2'>  
                                <div className='flex place-content-center'>
                                    <div className='p-2 place-items-center'>
                                        <span className='p-2'>Payment</span>
                                        <input 
                                            onChange={(e)=>setFormData({...formData, type:'PAYMENT'})}
                                            checked={formData.type == 'PAYMENT'}
                                            className='appearance-none transition-all w-4 h-4 bg-gray-100 rounded-full checked:bg-slate-700 checked:ring-slate-100 checked:ring-2 focus:ring-2'
                                            type="radio" name="type" id="type" value='PAYMENT'/>
                                    </div>
                                    <div className='p-2  place-items-center'>
                                        <span className='p-2'>Expense</span>
                                        <input 
                                            onChange={(e)=>setFormData({...formData, type:'EXPENSE'})}
                                            checked={formData.type == 'EXPENSE'}
                                            className='appearance-none transition-all w-4 h-4 bg-gray-100 rounded-full checked:bg-slate-700 checked:ring-slate-100 checked:ring-2 focus:ring-2'
                                            type="radio" name="type" id="type" value='EXPENSE'/>
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <div className='m-1 text-lg'>
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
                            
                            <div className=''>
                                <div className='m-1 text-lg'>
                                    Category
                                </div>
                                <select
                                    className='rounded w-full p-2 transition active:scale-105 hover:scale-105 bg-slate-800'
                                    name="category" 
                                    id="category"
                                    onChange={handleChange}
                                    value={formData.category}
                                >

                                    {formData.type == "EXPENSE"?
                                    <>
                                        <option value="BILL">Bill</option>
                                        <option value="PURCHASE">Purchase</option>
                                        <option value="SUBSCRIPTION">Subscription</option>
                                        <option value="TRANSFER">Money Transfer</option>
                                        <option value="STOCK">Stock Purchase</option>
                                    </>:
                                    <>
                                        <option value="TRANSFER">Money Transfer</option>  
                                        <option value="STOCK">Stock Sale</option>
                                        <option value="PAYCHECK">Paycheck</option>
                                    </>}
                                </select>

                                   {/* <input 
                                    required
                                    value={formData.category}
                                    id='category'
                                    onChange={handleChange}
                                    className='rounded w-full p-2 transition focus:scale-105 bg-slate-800'
                                    type="text" /> */}
                            </div>
                            <div className=''>
                                <div className='m-1 text-lg'>
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
                                    className='bg-blue-500 m-1 transition hover:bg-blue-700'>Save Edit</button>
                                <button 
                                    onClick={()=> {
                                        setPageState({...pageState, editMode: !pageState.editMode})
                                        setFormData({...transactionData})
                                    }}
                                    className='bg-slate-500 m-1 transition hover:scale-105 hover:bg-slate-700'>Cancel Edit</button>
                            </div>
                        </form>
                        </>}
                    </div>
                </Container>
            </div>
        </div>
        
        </>
    );
}

export default Transaction;
