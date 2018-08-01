require('dotenv').config();

interface Keys {
    weather?: string;
    smsServer: {
        host:string;
        port:number
    };
    cloudflare: {
        email?: string;
        key?: string;
    }
}

const configuration: Keys = {
    weather: process.env.WEATHER_KEY,
    smsServer: {
        host: "192.168.1.10",
        port: 5554 
    },
    cloudflare: {
        email: process.env.CLOUDFLARE_EMAIL,
        key: process.env.CLOUDFLARE_APIKEY
    }
}
export default configuration;