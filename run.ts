import axios from 'axios';

async function run() {
    const res = await axios.get('http://localhost:8000/healthcheck')
    console.log(res.data)
}

run()