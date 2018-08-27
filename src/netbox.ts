import {getTextFromUri} from './server'

export const boxStatus = () => {
    return new Promise<string>(resolve => {
        getTextFromUri('http://192.168.0.141').then((retour: string) => {
            retour = retour.substring(retour.indexOf('Prise')+6);
            retour = retour.substring(retour.indexOf('Prise')+6);
            retour = retour.slice(0,3);
            retour = (retour=='OFF' ? "OFF" : "ON");
            console.log('Etat box ', retour)
            return resolve(retour);
        });
    })
}

export const boxToggle = () => {
    return new Promise<string>(resolve => {
        getTextFromUri('http://192.168.0.141').then((retour: string) => {
            retour = retour.substring(retour.indexOf('Prise')+6);
            retour = retour.substring(retour.indexOf('Prise')+6);
            retour = retour.slice(0,3);
            const ordre = (retour=='OFF' ? "ON" : "OFF");
            console.log('Commande box ', ordre);
            getTextFromUri(`http://192.168.0.141/${ordre}`).then((retour2: string) => {
                retour2 = retour2.substring(retour2.indexOf('Prise')+6);
                retour2 = retour2.substring(retour2.indexOf('Prise')+6);
                retour2 = retour2.slice(0,3);
                retour2 = (retour2=='OFF' ? "->OFF" : "->ON");
                return resolve(retour2);
            })
            
        });
    })
}
