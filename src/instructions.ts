import { SmsParser } from "./SmsParser";
import * as publicIp from 'public-ip';

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
const stopBox = {
    name: 'stop box',
    action: async () => { console.log('stop box'); return 'stop box'; }
};
const startBox = {
    name: 'start box',
    action: async () => { console.log('start box'); return 'start box'; }
};

const publicIpInstruction = {
    name: 'public ip',
    action: async () => {
        return new Promise<string>(resolve => {
            publicIp.v4().then((ip: string) => {
                console.log('public ip is', ip)
                return resolve(ip);
            });
        })
    }
}
export const instructions: Instruction[] = [help, publicIpInstruction, startBox, stopBox];