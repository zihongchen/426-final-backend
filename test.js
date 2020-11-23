const fetch = require("node-fetch");
let a = async function(){
    const result = await fetch({
        method: 'post',
        //TODO: change add backend @zihongchen
        url: "http://localhost:3001/auth/login",
        withCredentials: true,
        data: {
          "password" :"helloWorld",
          "email" : "Broscience@gmail.com"
        }
    }).then(res => {
        console.log(res.body)
    })
    .catch(error => console.log(error))
}

a()
