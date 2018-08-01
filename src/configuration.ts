require('dotenv').config();

interface Keys {
    weather?: string;
    smsServer: {
        host:string;
        port:number
    };
}

const configuration: Keys = {
    weather: process.env.WEATHER_KEY,
    smsServer: {
        host: "192.168.1.10",
        port: 5554 
    }
}
export default configuration;