let localURL = import.meta.env.VITE_API_LOCAL
let liveURL = import.meta.env.VITE_API_LIVE
let isLocal = import.meta.env.VITE_API_ISLOCAL


let currentURL = isLocal ? localURL : liveURL;

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
    // console.log(token, options, currentURL)

    return fetch(`${currentURL}/users/verify`,options)
    .then(res => {
        return res.json()})
    .then(json => {return json})
    .catch(error => {
        console.log("Failed to fetch.")
    })
}

const signInUser = (data) => {
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json' 
        }
    }

    // console.log(currentURL,isLocal, data)
    return fetch(`${currentURL}/login`, options)
    .then(res => {
        return res.json()})
    .then(json => {
        console.log(json)
        return json})
    .catch(error => {console.log(error)})

}

const getSignInVerification = async (token) => {
    const options = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    return fetch(`${currentURL}/login/`, options)
    .then(res =>{
        return res.json()
    }).then(json => {return json})
    .catch(error => {
        console.log("Failed to fetch.")
    })


}

const getTransactions = async (id, token) => {
    const options = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    // console.log(id,token)

    return fetch(`${currentURL}/transactions/user/${id}`, options)
    .then(res => {
        return res.json()
    }).then(json => {
        // console.log(json.data)
        return json.data
    }).catch(error => {
        return []
    })
}


const verifyToken = (token) => {
    const options = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    // console.log(currentURL)
    return fetch(`${currentURL}/login/sync`, options)
    .then(res => {return res.json()})
    .then(json => {return json})
    .catch(error => {
        console.log(error)
    })
}

export {
    getTransactions,
    getUserVerification,
    registerUser,
    signInUser,
    getSignInVerification,
    verifyToken
}