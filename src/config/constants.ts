import dotenv from 'dotenv';
dotenv.config();

let port = 3002;
let apiBase = '/api/v2/';

if (process.env.NODE_ENV === 'DEVTEST') {
  port = 3003;
}

if (process.env.NODE_ENV === 'DEVTEST' || process.env.NODE_ENV === 'production') {
  apiBase = '/v2/';
}

const acceptedAgents = ['IQAPIv1', 'IQiOSv1', 'IQAndroidv1'];

export { port, apiBase, acceptedAgents };
