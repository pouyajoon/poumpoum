import * as express from 'express';
import { SmsParser } from './SmsParser';

const smsParser = new SmsParser();
smsParser.parse('')

const home = (req: express.Request, res: express.Response) => {
    res.send(smsParser.instructionList())
};

const sms = (req: express.Request, res: express.Response) => {
    console.log(req.params.message);
    const instruction = smsParser.parse(req.params.message);
    const instructionResult = instruction.action();
    res.send(`sms ${req.params.message} : ${instructionResult}`);
}

export const setup = () => {
    const app = express();
    app.get('/', home);
    app.get('/sms/:message', sms);
    app.listen(3000, () => {
        console.log('Example app listening on port 3000!')
    });
}
