import * as express from 'express';
import { SmsParser } from './SmsParser';
// import * as bodyParser from 'body-parser';
import fetch from 'node-fetch';
import configuration from './configuration';
import { ServerHost } from './configuration';
import * as path from 'path';

// import * as homeRouter from './routes/home';
const homeRouter = require('./routes/home.js');


const smsParser = new SmsParser();

// const battery = (req: express.Request, res: express.Response) => {
//     const indexPath = path.join(__dirname, '../src/public/battery/battery.html');
//     console.log('indexPath', __dirname, indexPath);
//     res.sendFile(indexPath);
// };

const sms = async (req: express.Request, res: express.Response) => {
    console.log('sms params', req.url, req.query);
    console.log('message', req.query.m);
    if (req.query.m) {
        const instruction = smsParser.parse(req.query.m);
        const instructionResult = await instruction.action();
        sendSms(req.query.f, instructionResult);
        res.send(`sms ${req.query.m} : ${instructionResult}`);
    }
}

const PORT = 80;
export const setup = () => {
    const app = express();
    const publicPath = path.join(__dirname, '../dist/public');
    console.log('Chemin : ', publicPath);

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use(express.static(publicPath));
    app.use(express.urlencoded({ extended: false }));

    // app.get('/battery', battery);
    app.get('/sms/', sms);
    app.use('/', homeRouter);

    app.listen(PORT, () => {
        console.log(`On ecoute sur le port ${PORT} !`)
    });
}

export function getUrlFromServerHost(serverHost: ServerHost) {
    return `${serverHost.protocol}://${serverHost.host}:${serverHost.port}`;
}

export const sendSms = async (to: string, msg: string) => {
    const phone = to.replace('+336', '06');
    const encodedMessage = encodeURIComponent(msg.replace(/[=%&]/g, '->'));
    const uri = `${getUrlFromServerHost(configuration.smsServer)}/SendSMS/user=&password=123456&phoneNumber=${phone}&msg=${encodedMessage}`;
    // const uri = `${getUrlFromServerHost(configuration.smsServer)}/SendSMS/user=&password=123456&phoneNumber=${phone}&msg=${msg}`;
    console.log('send sms', uri);
    const res = await getTextFromUri(uri);
    console.log('send sms result', res);
}

export async function getJson<T>(uri: string): Promise<T> {
    const response = await fetch(uri);
    const json: T = await response.json();
    return json;
}


export async function getTextFromUri(uri: string): Promise<string> {
    const response = await fetch(uri).catch(err => console.error(err));
    if (response) {
        const text = await response.text();
        return text;
    }
    return '<KO>';
}


export async function postToUrl(uri: string, body: string): Promise<string> {
    const response = await fetch(uri, {
        body,
        method: "POST",
    }).catch(err => console.error(err));
    if (response) {
        const text = await response.text();
        return text;
    }
    return '<KO>';
}
