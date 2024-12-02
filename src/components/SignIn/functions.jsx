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



export {
    validatePassword
}