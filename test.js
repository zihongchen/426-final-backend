// const fetch = require("node-fetch");
const axios = require('axios')

// let a = async function(){
//     const result = await fetch({
//         method: 'get',
//         //TODO: change add backend @zihongchen
//         url: "http://localhost:3001/alumni",
//         withCredentials: true,
//         data: {
//           "password" :"helloWorld",
//           "email" : "Broscience@gmail.com"
//         }
//     }).then(res => {
//         console.log(res.body)
//     })
//     .catch(error => console.log(error))
// }


let url = "https://comp426-final-backend.herokuapp.com/auth/register"
let test = async ()=>{
    //const res = axios.get('http://localhost:3001/alumni');
    
    const result = await axios.post(url, {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })


    console.log(result)
    
}

test()