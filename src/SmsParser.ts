

interface Instruction {
    name: string;
    action: () => string;
}

const help = {
    name: 'help',
    action: () => {
        const parser = new SmsParser();
        return parser.instructionList();
    }
};
const stopBox = {
    name: 'stop box',
    action: () => { console.log('stop box'); return 'stop box'; }
};
const startBox = {
    name: 'start box',
    action: () => { console.log('start box'); return 'start box'; }
};
const instructions: Instruction[] = [help, startBox, stopBox];


export class SmsParser {
    instructionList() {
        return instructions.map((ins, i) => `${i}. ${ins.name}`).join(', ');
    }
    parse = (message: string): Instruction => {
        const words = message.split(' ');
        if (words.length === 1) {
            const number = parseInt(words[0], 10);
            if (!isNaN(number)) {
                const instruction = instructions[number];
                if (instruction) {
                    return instruction;
                }
            }
        }
        return help;
    }
}



