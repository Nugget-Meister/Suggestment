let validatePassword = (a,b) => {
    // console.log("kevin")
    let conditions = []
    
    let capital = /[A-Z]/.test(a)
    let lowercase = /[a-z]/.test(a)
    let number = /[0-9]/.test(a)
    let symbol = /[$-/:-?{-~!"^_`\[\]]/.test(a)
    
    if (a != b){
        conditions.push("mismatch")
    }    
    if (a.length < 12){
        conditions.push("sub12")
    }
    if(!capital){
        conditions.push("capital")
    }
    

    console.log(capital)



    console.log(conditions)
    return conditions
}



export {
    validatePassword
}