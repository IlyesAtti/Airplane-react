import asteroidImg from '../Images/asteroid.png';
export default function Asteroids(props) {

    return (
        <>
        <img
            src={asteroidImg}
            className={"asteroid"}
            style={{ left: (props.asteroidPosition) + 'px',
             top: props.asteroidTopPosition + 'px' }}
        ></img>
        </>
    )
}