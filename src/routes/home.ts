import * as express from 'express';
const router = express.Router();

import {monPublicIp} from '../publicIp'; 
const MonIp = async () => {
    const chaine = await monPublicIp();
    console.log(`Retour Ip ${chaine}`);
    return chaine;
}


import {getDaikinControls} from '../daikin';
const DaikinState = async () => {
    const nombre = await getDaikinControls('192.168.0.161');
    console.log(`OnOff ${nombre.pow} Mode ${nombre.mode} --- Consigne ${nombre.stemp}`);
    return nombre;

}

import {getDaikinSensors} from '../daikin';
const DaikinSensors = async () => {
    const nombre = await getDaikinSensors('192.168.0.161');
    console.log(`Température ${nombre.htemp}`);
    return nombre.htemp;
}

router.get('/', async function(req, res, next) {
    const retourDaikin = await DaikinState();
    const retourDaikinS =await DaikinSensors();
    console.log(`génération page retourD = ${retourDaikin} - ${retourDaikinS}`);
    const retourIp = await MonIp();
    res.render('home', {
        title: 'Le Majordome de La Poumerole',
        onoff: retourDaikin.pow,
        mode: retourDaikin.mode,
        consigne: retourDaikin.stemp,
        hometemp: retourDaikinS,
        ippub: retourIp
    });
});

module.exports = router;