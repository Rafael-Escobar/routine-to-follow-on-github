var axios = require('axios');
let credentials = require('./credentials.json');
let endpoint = 'https://api.github.com';

let options = {
    baseURL: endpoint,
    auth: {
        username: credentials.user,
        password: credentials.password
    }
};

const api = axios.create(options);
let boddy ='Rafael-Escobar'
let repos = [
    'omnistak11_frontend'
] ;

repos.forEach( (repo)=>{
    api.get(`/user/starred/${boddy}/${repo}`)
        .then(function (response) {
            if (response.status==204){
                    console.log(`You already give star to the repo[${repo}] from user[${boddy}]`)
                    console.log(`*Becaus de status[${response.status}] is ${response.statusText}`);
                }else{
                    console.log(`You was impossible to verify if give star to the repo[${repo}] from user[${boddy}]`)
                    console.log(`*Becaus de status[${response.status}] is ${response.statusText}`);
                }
        }).catch((error) => {
            console.log(`You still not give star to the repo[${repo}] from user[${boddy}]`)
            console.log(`*Becaus de status[${error.response.status}] is ${error.response.statusText}`);
            api.put(`/user/starred/${boddy}/${repo}`)
                .then(function (response) {
                    if (response.status == 204) {
                        console.log(`Now you give star to the repo[${repo}] from user[${boddy}]`)
                        console.log(`*Becaus de status[${response.status}] is ${response.statusText}`);
                    } else {
                        console.log(`You was impossible to give star to the repo[${repo}] from user[${boddy}]`)
                        console.log(`*Becaus de status[${response.status}] is ${response.statusText}`);
                    }
                }).catch((error) => {
                    console.log(`You was impossible to give star to the repo[${repo}] from user[${boddy}]`)
                    console.log(`*Becaus de status[${error.response.status}] is ${error.response.statusText}`);
                });
        });
    }
);
