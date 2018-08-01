require('dotenv').config();

interface Keys {
    weather?: string;
    cloudflare: {
        email?: string;
        key?: string;
    }
}

const configuration: Keys = {
    weather: process.env.WEATHER_KEY,
    cloudflare: {
        email: process.env.CLOUDFLARE_EMAIL,
        key: process.env.CLOUDFLARE_APIKEY
    }
}
export default configuration;