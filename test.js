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

// (async () => {

    
// })();
let url = "url: 'http://localhost:3001/auth/login'"
let test = async ()=>{
    //const res = axios.get('http://localhost:3001/alumni');
    
    const result = await axios.get(url,
        
        {
        method: 'get',
        //TODO: change add backend @zihongchen

        withCredentials: true,
        data: {
          "password" :"helloWorld",
          "email" : "Broscience@gmail.com"
        }
    }).then(res => {
        console.log(res.body)
    })
    .catch(error => console.log(error))


    console.log("hello")
    
}

test()