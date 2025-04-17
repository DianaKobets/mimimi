import '../App.css'
import  Heart from '../img/heart.svg'

type LoaderProps = {
    className?: string;
}

export const Loader = ({className} : LoaderProps    ) => {
    return(
        <div className={`heart ${className || ""}`}>
            <img src={Heart} alt="heart-image"/>
        </div>
    );
}