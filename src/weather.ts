import { getJson } from "./server";

interface Coords {
    lat: number;
    lon: number;
}

const apiKey = 'e6a38c6e46ab47097b9af70315310cb1';


interface WeatherType {
    description: 'clear sky' | 'thunderstorm'
}
interface Weather {
    main: {
        temp: number
    };
    weather: WeatherType[];
}

export const getWeather = async (coords: Coords) => {
    const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`
    const res = await getJson<Weather>(uri);
    return res;
}
