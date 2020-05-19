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
    Adiciona uma versão síncrona do forEach ao protótipo de Array
*/
Array.prototype.forEachSync = async function(iteration) {
    for (let i=0; i<this.length; ++i) {
        await iteration(this[i], i, this);
    }
};

/*
    Verificação dos devs que já são seguidos
*/
const verifyFollowers = () => coders.github.forEachSync(async (user, index, array) => {
    try {
        const response = await api.get(`/user/following/${user}`);
        if (response.status == 204) {
            console.log(`Seguindo *${user}* status[${response.status}] da resposta`);
            coders.splice(index,1);
            await new Promise(r => setTimeout(r, 1000));
        } else {
            console.log(`Verificar status[${response.status}] da resposta`);
        }
    } catch(error) {
        // console.log(`Não esta seguindo *${user}* status[${error.response.status}] da resposta`);
        // console.log(`Não foi possível encontrar *${user}*  status[${error.response.status}] erro ${error.response.statusText}`);
        console.log(`Não foi possível encontrar *${user}*`);
    };
});

/*
    Seguir os Devs que ainda não segue
*/
const verifyNonFollowers = () => coders.github.forEachSync(async (user, index, array) => {
    try {
        const response = await api.put(`/user/following/${user}`);
        if (response.status == 204) {
            console.log(`Agora esta seguindo *${user}* status[${response.status}] da resposta`);
            coders.splice(index, 1);
            await new Promise(r => setTimeout(r, 1000));
        } else {
            console.log(`Verificar status[${response.status}] da resposta`);
        }
    } catch(error) {
        console.log(`Não foi possível seguir *${user}*`);
        // console.log(`Não foi possível seguir *${user}* status[${error.response.status}] erro ${error.response.statusText}`);
    }
});

verifyFollowers()
    .then(verifyNonFollowers)
    .catch(error => {
        console.error(error);
    });
    
// console.log(coders);