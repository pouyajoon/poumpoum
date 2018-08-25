import * as publicIp from 'public-ip';

export const getPublicIp = () => {
    return new Promise<string>(resolve => {
        publicIp.v4().then((ip: string) => {
            console.log('public ip is', ip)
            return resolve(ip);
        });
    })
}

const execa = require('execa');

interface objShell {
    stdout: string;
  stderr: string;
  code: number;
  failed: boolean;
  killed: boolean;
  signal: string;
  cmd: string;
  timedOut: boolean; 
}

export const monPublicIp = () => {
    return new Promise<string>(resolve => {
        execa('lb_test').then((retour: objShell) => {
            console.log('ip publique ', retour.stdout)
            return resolve(retour.stdout); 
        });
    })
}