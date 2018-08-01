import { SmsParser } from "./SmsParser";
import { getPublicIp } from "./publicIp";

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
    action: getPublicIp
}
export const instructions: Instruction[] = [help, publicIpInstruction, startBox, stopBox];