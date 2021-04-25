const inputs = document.querySelectorAll(".form-control")
const showPass = document.querySelector("input[type='checkbox'")
const submitBtn = document.querySelector("#submit-btn")

showPass.addEventListener("change",(evt)=>{
    if(!showPass.checked){
        inputs[1].type = "password"
        return
    }
    inputs[1].type = "text"
})