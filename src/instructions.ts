import { SmsParser } from "./SmsParser";
import { monPublicIp } from "./publicIp";
import { boxStatus, boxToggle } from "./netbox";

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

const publicIpInstruction = {
    name: 'public ip',
    action: monPublicIp
}
export const instructions: Instruction[] = [help, publicIpInstruction, statBox, toggleBox];