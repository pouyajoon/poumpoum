
import { setup } from './server';
import { getWeather } from './weather';

setup();

// sendSms('coucou');

const poumerole = {
    lat: 45.9602886,
    lon: 2.6813398
}



getWeather(poumerole);