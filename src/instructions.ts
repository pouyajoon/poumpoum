import { SmsParser } from "./SmsParser";
import { monPublicIp } from "./publicIp";
import { boxStatus, boxToggle } from "./netbox";
import { smsGetDaikin, smsSetDaikinFroid, smsSetDaikinChaud, smsStopDaikin } from "./daikin";

export interface Instruction {
    name: string;
    action: () => Promise<string>;
}

export const help = {
    name: 'help',
    action: async () => {
        const parser = new SmsParser();
        return parser.instructionList();
    }
};
const toggleBox = {
    name: 'start/stop box',
    action: boxToggle
};
const statBox = {
    name: 'état box',
    action: boxStatus
};

const statGeneral = {
    name: 'état des lieux',
    action: async ()=> {
        const ret_b = await monPublicIp();
        const ret_c = await boxStatus();
        const ret_d = await smsGetDaikin();
        return `IP_>${ret_b} Box->${ret_c} Salle->${ret_d}`;
    }
};

const statDaikin = {
    name: 'état daikin',
    action: smsGetDaikin
}

const froidDaikin = {
    name: 'froid en salle',
    action: smsSetDaikinFroid
}

const chaudDaikin = {
    name: 'chaud en salle',
    action: smsSetDaikinChaud
}

const stopDaikin = {
    name: 'arrêt salle',
    action: smsStopDaikin
}

export const instructions: Instruction[] = [help, statGeneral, statBox, toggleBox, statDaikin, froidDaikin, chaudDaikin, stopDaikin];