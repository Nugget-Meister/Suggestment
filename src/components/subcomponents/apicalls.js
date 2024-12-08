let localURL = import.meta.env.VITE_API_LOCAL
let liveURL = import.meta.env.VITE_API_LIVE
let isLocal = import.meta.env.VITE_API_ISLOCAL


let currentURL = isLocal ? localURL : liveURL


// console.log(isLocal)

let registerUser =  async (data) => {
    const options = { 
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json' 
        }
    }
    
    return fetch(`${currentURL}/users`, options)
    .then((res) => {return res.json()})
    .then(json => {
        return json
    }).catch(error => {
        return {}
    })
}



const getUserVerification = async (token) => {
    const options = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    console.log(token, options, currentURL)

    return fetch(`${currentURL}/users/verify`,options)
    .then(res => {
        return res.json()})
    .then(json => {return json})
    .catch(error => {
        console.log("Failed to fetch.")
    })


}

const getTransactions = async (id) => {

    return fetch(`${currentURL}/transactions/user/${id}`)
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
    getTransactions,
    getUserVerification,
    registerUser
}