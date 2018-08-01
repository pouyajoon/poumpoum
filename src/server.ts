import * as express from 'express';
import { SmsParser } from './SmsParser';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import fetch from 'node-fetch';

const smsParser = new SmsParser();

const home = (req: express.Request, res: express.Response) => {
    res.send(smsParser.instructionList())
};

const sms = async (req: express.Request, res: express.Response) => {
    console.log('sms params', req.url, req.query);
    console.log('message', req.query.m);
    const instruction = smsParser.parse(req.query.m);
    const instructionResult = await instruction.action();
    sendSms(req.query.f, instructionResult);
    res.send(`sms ${req.query.m} : ${instructionResult}`);
}

const PORT = 80;
export const setup = () => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/', home);
    app.get('*', sms);

    app.listen(PORT, () => {
        console.log(`Poum app listening on port ${PORT}!`)
    });
}

export const sendSms = (from: string, msg: string) => {
    const phone = from.replace('+336', '06');
    const uri = `http://192.168.1.10:5554/SendSMS/user=&password=123456&phoneNumber=${phone}&msg=${msg}`;
    console.log('send sms', uri);
    http.get(uri, (res: any) => {
        // console.log('res body', res.body);
    })
}

export async function getJson<T>(uri: string): Promise<T> {
    const response = await fetch(uri);
    const json: T = await response.json();
    return json;
}
