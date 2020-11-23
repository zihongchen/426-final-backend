// // const fetch = require("node-fetch");
// const axios = require('axios')

// // let a = async function(){
// //     const result = await fetch({
// //         method: 'get',
// //         //TODO: change add backend @zihongchen
// //         url: "http://localhost:3001/alumni",
// //         withCredentials: true,
// //         data: {
// //           "password" :"helloWorld",
// //           "email" : "Broscience@gmail.com"
// //         }
// //     }).then(res => {
// //         console.log(res.body)
// //     })
// //     .catch(error => console.log(error))
// // }

// var auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJiNWQ3NjMxZjEzYzEwZGQ0MTZlYjMiLCJpYXQiOjE2MDYxMTY3OTksImV4cCI6MTYwNjEyMDM5OX0.ViSGD99Xv-KEXq5fIJC4s2dLDD8o3NcW-v5189uLRaE'
// let url = "https://comp426-final-backend.herokuapp.com/meetings/addTimeSlot"
// let config = {
//     headers: {
//         'anth-token': auth_token,
//     }
// }
// let body = {
//     "start_time": "1995-12-17T08:24:00.000Z"
// }

// axios.patch(url, body, config).then(response => {
//     console.log(response)
// })




// // let url = "http://localhost:5039/meetings/addTimeSlot"
// // let test = async () => {
// //     //const res = axios.get('http://localhost:3001/alumni');
// //     let config = {
// //         headers: {
// //             'anth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJiN2FmODhjZTc4ZjAwMDQzOTA4ZmQiLCJpYXQiOjE2MDYxMjQxNTYsImV4cCI6MTYwNjE0MjE1Nn0.8HJmWIuLFZEAyLewdy-kQXpppY4_sMDxuIL7sZTtgR0'
// //         }
// //     }

// //     let data = {
// //         "start_time": "1995-12-17T08:24:00.000Z"
// //     }
// //     const result = axios.patch(url, data, config).then(res => {
// //             console.log(res)
// //         })
// //         .catch(error => console.log(error))


// //     console.log("hello")

// // }

// // test()

const axios = require('axios');

// httpbin.org gives you the headers in the response
// body `res.data`.
// See: https://httpbin.org/#/HTTP_Methods/get_get
const a = async ()=>{
    const res = await axios.get('https://comp426-final-backend.herokuapp.com/meetings/myMeetings', {
        headers: {
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJiNWQ3NjMxZjEzYzEwZGQ0MTZlYjMiLCJpYXQiOjE2MDYxMjAwOTksImV4cCI6MTYwNjEzODA5OX0.y41PNfQTS53hwVMBy4Hlr4HhL2OK_rONby0RxmFPs5c'
        }
      });
    console.log(res)
}
a()
