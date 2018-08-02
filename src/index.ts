
import { setup, sendSms } from './server';
import { updatePublicIpOnDomain } from './mydns';
import { batteryCheck } from './battery';
// import { getWeather } from './weather';

setup();

// const poumerole = {
//     lat: 45.9602886,
//     lon: 2.6813398
// }

// const start = async () => {
//     const a = await getWeather(poumerole);
//     console.log(a);
// }

// start();

updatePublicIpOnDomain('origamix.fr', 'rognes');
batteryCheck(2000, (states) => {
    console.log('states', states);
    const time = states.map(s => `${Math.round(s.diff / 1000)}s`).join(', ');
    const message = `Votre appareil est hors tension depuis plus de ${time}`;
    sendSms('0668755503', message);
});
