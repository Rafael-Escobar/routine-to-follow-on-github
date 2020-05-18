var axios = require('axios');
let credentials = require('./credentials.json');
let coders = require('./coders.json');
let endpoint = 'https://api.github.com';

let options = {
    baseURL: endpoint,
    auth: {
        username: credentials.user,
        password: credentials.password
    }
};

const api = axios.create(options);

coders.github.forEach(async (user) => {

    await api.get(`/user/following/${user}`)
        .then(function (response) {
            if (response.status == 204) {
                console.log(`You are following *${user}* becaus de status[${response.status}] is ${response.statusText}`);
            }else{
                console.log(`Was impossible to know if you are following *${user}* becaus de status[${response.status}] is ${response.statusText}`);
            }
        }).catch((error) => {
            console.log(`You are not following *${user}* becaus de status[${error.response.status}] is ${error.response.statusText}`);
            if (error.response.status == 404) {
                 api.put(`/user/following/${user}`)
                    .then(function (response) {
                        console.log(`Now you are following *${user}* becaus de status[${response.status}] is ${response.statusText}`);
                    }).catch((error) => {
                        console.log(`You cant following *${user}* becaus de status[${error.response.status}] is ${error.response.statusText}`);
                    });
            }else{
                console.log(`Not was possible to find *${user}* becaus de status[${error.response.status}] is ${error.response.statusText}`);
            }
        });

});
