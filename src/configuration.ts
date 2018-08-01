require('dotenv').config();

interface Keys {
    weather?: string;
}

const configuration: Keys = {
    weather: process.env.WEATHER_KEY
}
export default configuration;