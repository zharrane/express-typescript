import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.PORT || 5000;

const SERVER_HOSTNAME = process.env.HOSTNAME || 'localhost';

const SERVER = {
    port: SERVER_PORT,
    hostname: SERVER_HOSTNAME
};

const config = {
    server: SERVER
};
export default config;
