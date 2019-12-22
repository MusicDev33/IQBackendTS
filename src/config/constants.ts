import dotenv from 'dotenv';
dotenv.config();

let port = 3002;
let apiBase = '/tsapi/v1/';

if (process.env.NODE_ENV === 'DEVTEST') {
  port = 3003;
}

if (process.env.NODE_ENV === 'DEVTEST' || process.env.NODE_ENV === 'production') {
  apiBase = '/v1/';
}

const acceptedAgents = ['IQAPIv1', 'IQiOSv1', 'IQAndroidv1'];

export { port, apiBase, acceptedAgents };
