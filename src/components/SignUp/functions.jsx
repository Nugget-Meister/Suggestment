let localURL = import.meta.env.VITE_API_LOCAL
let liveURL = import.meta.env.VITE_API_LIVE

let local = import.meta.env.VITE_API_ISLOCAL


let validatePassword = (a,b) => {
    // console.log("kevin")
    let conditions = {
        mismatch: false,
        sub12: false,
        capital: false,
        lowercase: false,
        number: false,
        symbol: false
    }
    
    let capital = /[A-Z]/.test(a)
    let lowercase = /[a-z]/.test(a)
    let number = /[0-9]/.test(a)
    let symbol = /[$-/:-?{-~!"^_`\[\]]/.test(a)
    
    if (a != b){
        conditions["mismatch"] = true;
    }    
    if (a.length < 12){
        conditions["sub12"] = true;
    }
    if(!capital){
        conditions["capital"] = true;
    }
    if(!lowercase){
        conditions["lowercase"] = true;
    }
    if(!number){
        conditions["number"] = true;
    }
    if(!symbol){
        conditions["symbol"] = true;
    }
    
    // console.log(capital)
    // console.log(conditions)
    return conditions
}

// let registerUser =  async (data) => {
//     const options = { 
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json' 
//         }
//     }
//     console.log(local, localURL)
//     console.log(data)
//     return fetch(`${local ? localURL : liveURL}/users`, options)
//     .then((res) => {return res.json()})
//     .then(json => {
//         return json.data
//     }).catch(error => {
//         return {}
//     })
// }

export {
    validatePassword,
    // registerUser
}