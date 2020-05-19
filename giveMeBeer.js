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
    'omnistack11_frontend',
    'omnistack11_backend',
    'omnistack11_mobile',
    'routine-to-follow-on-github',
] ;

repos.forEach( async (repo)=>{
    await api.get(`/user/starred/${boddy}/${repo}`)
        .then(function (response) {
            if (response.status==204){
                    console.log(`Você já me deu estrela no repositório[${repo}]`);
                    console.log(`*Status[${response.status}] `);
                }else{
                    console.log(`Não foi possível dar uma estrela para o repositório[${repo}]`);
                    console.log(`*Status[${response.status}] is ${response.statusText}`);
                }
        }).catch(async (error) => {
            console.log(`You still not give star to the repositório[${repo}]`)
            console.log(`*Status[${error.response.status}] is ${error.response.statusText}`);
            await api.put(`/user/starred/${boddy}/${repo}`)
                .then(function (response) {
                    if (response.status == 204) {
                        console.log(`Obrigado por me dar Estrela no repositório[${repo}]`)
                        console.log(`*Status[${response.status}]`);
                    } else {
                        console.log(`You was impossible to give star to the repositório[${repo}]`)
                        console.log(`*Status[${response.status}]`);
                    }
                }).catch((error) => {
                    console.log(`Não foi possível encontrar o repositório[${repo}]`)
                    console.log(`*Status[${error.response.status}] erro ${error.response.statusText}`);
                });
        });
    }
);
