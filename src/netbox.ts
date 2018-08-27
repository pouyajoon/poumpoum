import {getTextFromUri} from './server'

export const boxStatus = () => {
    return new Promise<string>(resolve => {
        getTextFromUri('192.168.0.141').then((retour: string) => {
            console.log('Etat box ', retour)
            return resolve(retour);
        });
    })
}
