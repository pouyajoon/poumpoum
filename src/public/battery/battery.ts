console.log('battery');

const registerBattery = async () => {
    const n: any = window.navigator;
    const b = await n.getBattery();

    console.log(b);

    let timeStamp = 0;

    b.addEventListener("chargingchange", (e: any) => {
        const diff = e.timeStamp - timeStamp;
        timeStamp = e.timeStamp;
        console.log('change', e.target.charging, diff);
    });
}

registerBattery();