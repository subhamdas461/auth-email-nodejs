const inputs = document.querySelectorAll(".form-control")
const showPass = document.querySelector("input[type='checkbox'")
const submitBtn = document.querySelector("#submit-btn")

showPass.addEventListener("change",(evt)=>{
    if(!showPass.checked){
        inputs[2].type = "password"
        inputs[3].type = "password"
        return
    }
    inputs[2].type = "text"
    inputs[3].type = "text"
})
submitBtn.addEventListener("click",async (evt)=>{
    try {
        let res = await fetch("/api/user/signup",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body : JSON.stringify({
                name:inputs[0].value,
                email:inputs[1].value,
                password:inputs[2].value
            })
        })
        let response = await res.json()
        console.log(response,res)
    }
    catch (error){
        console.log("ERR",error)
    }
})