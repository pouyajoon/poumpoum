import { SmsParser } from "./SmsParser";
import { monPublicIp } from "./publicIp";

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
    action: async () => { console.log('stop box'); return ('false') }
};
const startBox = {
    name: 'start box',
    action: async () => { console.log('start box'); return ('true'); }
};

const publicIpInstruction = {
    name: 'public ip',
    action: monPublicIp
}
export const instructions: Instruction[] = [help, publicIpInstruction, startBox, stopBox];