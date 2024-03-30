import useBulets from "./Bulets";

let astTop = 0;
let astPoz = 0;
let buletsData = 0;

function posAsteroid(asteroidTopPosition, asteroidPosition) {
    astTop = asteroidTopPosition;
    astPoz = asteroidPosition;
    return(astTop, astPoz);
}

function buletInfo(useBulets) {
    buletsData = [...useBulets];
    return(buletsData);
}

export default function Hit() {
    if (useBulets.buletPosition >= astPoz - 70 && useBulets.buletPosition <= astPoz + 110 && astTop == useBulets.buletTopPosition - 100) {
        console.log("hited");
    }
    buletsData.forEach(bulet => {
        const buletIsActive = bulet.props.className.includes('isActive');
        if (buletIsActive) {
            const buletPosition = parseInt(bulet.props.style.left);
            const buletTopPosition = parseInt(bulet.props.style.top);
            if (buletPosition >= astPoz - 70 && buletPosition <= astPoz + 110 && astTop == buletTopPosition - 100) {
                console.log("hited");
                document.querySelector('.asteroid').style = 'top: 395px;';
            }
        }
    });
}

export {posAsteroid, buletInfo}