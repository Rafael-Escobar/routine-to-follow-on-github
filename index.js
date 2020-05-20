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
    Seguir os Devs github
*/
const followCoders = () => coders.github.forEachSync(async (user, index, array) => {
    try {
        const response = await api.put(`/user/following/${user}`);
        if (response.status == 204) {
            console.log(`Agora esta seguindo *${user}* status[${response.status}] da resposta`);
            await new Promise(r => setTimeout(r, 100));
        } else {
            console.log(`Verificar status[${response.status}] da resposta`);
        }
    } catch(error) {
        // console.log(`Não foi possível seguir *${user}*`);

        console.log(`Não foi possível seguir *${user}* status[${error.response.status}] erro ${error.response.statusText}`);
    }
});

followCoders()
    .catch(error => {
        console.error(error);
    });
    