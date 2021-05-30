
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

submitBtn.onclick = async ()=>{
    const user = {
        email:inputs[0].value,
        password:inputs[1].value
    }
    console.log(user)
    let res = await fetch('/api/user/login',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(user)
    })
    let data = await res.json();
    if(data.status === "success"){
        return Swal.fire({
            icon: 'success',
            title: 'Logged In!',
            text: data.msg,
        })
    }
    Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: data.msg,
    })
}