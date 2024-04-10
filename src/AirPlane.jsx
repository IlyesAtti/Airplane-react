import Plane from '../plane.png';

export default function AirPlane(props) {
    return (
        <>
            <img src={Plane} className="Plane" style={{ left: props.planePosition + 'px' }} alt="plane" />
        </>
    )
}

  