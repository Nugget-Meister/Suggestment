let localURL = import.meta.env.VITE_API_LOCAL
let liveURL = import.meta.env.VITE_API_LIVE
let isLocal = import.meta.env.VITE_API_ISLOCAL




// console.log(isLocal)

 const getTransactions = async (id) => {

    return fetch(`${isLocal ? localURL : liveURL}/transactions/user/${id}`)
    .then(res => {
        // console.log(res)
        return res.json()
    }).then(json => {
        // console.log(json.data)
        return json.data
    }).catch(error => {
        return []
    })

}

export {
    getTransactions
}