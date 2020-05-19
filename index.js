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
/*
    Verificação dos devs que já são seguidos
*/
coders.github.forEach((user, index, array) => {

    api.get(`/user/following/${user}`)
        .then(async function  (response) {
            if (response.status == 204) {
                console.log(`Seguindo *${user}* status[${response.status}] da resposta`);
                coders.splice(index,1);
                await new Promise(r => setTimeout(r, 1000));
            }else{
                console.log(`Verificar status[${response.status}] da resposta`);
            }
        }).catch((error) => {
                // console.log(`Não esta seguindo *${user}* status[${error.response.status}] da resposta`);
                // console.log(`Não foi possível encontrar *${user}*  status[${error.response.status}] erro ${error.response.statusText}`);
                console.log(`Não foi possível encontrar *${user}*`);
        });

});

/*
    Seguir os Devs que ainda não segue
*/
coders.github.forEach(async (user, index, array) => {
    await api.put(`/user/following/${user}`)
        .then(async function (response) {
            if (response.status == 204) {
                console.log(`Agora esta seguindo *${user}* status[${response.status}] da resposta`);
                coders.splice(index, 1);
                await new Promise(r => setTimeout(r, 1000));
            }else{
                console.log(`Verificar status[${response.status}] da resposta`);
            }
        }).catch((error) => {
            console.log(`Não foi possível seguir *${user}* `);
            // console.log(`Não foi possível seguir *${user}* status[${error.response.status}] erro ${error.response.statusText}`);
        });
});

// console.log(coders);