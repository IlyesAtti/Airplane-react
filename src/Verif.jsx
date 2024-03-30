let astTop = 0;
let astPoz = 0;
let planePoz = 300;


function VerifAsteroid(asteroidTopPosition, asteroidPosition) {
    astTop = asteroidTopPosition;
    astPoz = asteroidPosition;
    return(astTop, astPoz);
}
function VerifPlane(planePosition) {
    planePoz = planePosition;
    return(planePoz);
}

export default function Compare() {
    if (planePoz >= astPoz - 70 && planePoz<= astPoz + 110 && astTop >= 310) {
        document.querySelector('.gameOver').style = 'visibility: visible;';
        document.querySelector('.restart').style = 'visibility: visible;';
        document.querySelector('.start-btn').style = 'visibility: hidden;';
       return(true);
    }
    return (false);
}
export {VerifAsteroid, VerifPlane}