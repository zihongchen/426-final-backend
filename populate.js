const axios = require('axios')
nameCollection = ["Harry","Ross",
                        "Bruce","Cook",
                        "Carolyn","Morgan",
                        "Albert","Walker",
                        "Randy","Reed",
                        "Larry","Barnes",
                        "Lois","Wilson",
                        "Jesse","Campbell",
                        "Ernest","Rogers",
                        "Theresa","Patterson",
                        "Henry","Simmons",
                        "Michelle","Perry",
                        "Frank","Butler",
                        "Shirley","Brooks",
                    "Rachel","Edwards",
                    "Christopher","Perez",
                    "Thomas","Baker",
                    "Sara","Moore",
                    "Chris","Bailey",
                    "Roger","Johnson",
                    "Marilyn","Thompson",
                    "Anthony","Evans",
                    "Julie","Hall",
                    "Paula","Phillips",
                    "Annie","Hernandez",
                    "Dorothy","Murphy",
                    "Alice","Howard","Ruth","Jackson",
                    "Debra","Allen",
                    "Gerald","Harris",
                    "Raymond","Carter",
                    "Jacqueline","Torres",
                    "Joseph","Nelson",
                    "Carlos","Sanchez",
                    "Ralph","Clark",
                    "Jean","Alexander",
                    "Stephen","Roberts",
                    "Eric","Long",
                    "Amanda","Scott",
                    "Teresa","Diaz",
                    "Wanda","Thomas"]


for( let  i= 0;i < 20; i ++){
    let is_alumni = false;
    let first_name;
    let last_name;
    let email;
    let description;
    let password = "123456"
    if(Math.random()>0.5) is_alumni = true;
    first_name = nameCollection[Math.floor(Math.random()*(nameCollection.length-1))]
    last_name = nameCollection[Math.floor(Math.random()*(nameCollection.length-1))]
    email = first_name + last_name +"@cs.unc.edu"
    description = "Hi my name is "+first_name
    var data = JSON.stringify({
        "email": email,
        "password": password,
        "first_name": first_name,
        "last_name": last_name,
        "is_alumni": is_alumni,
        "description" : description
    });
    var config = {
        method: 'post',
        url: 'https://comp426-final-backend.herokuapp.com/auth/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}
