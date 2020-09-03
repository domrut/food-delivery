import React from 'react';
import { Link } from 'react-router-dom';
import fixURL from '../../fixURLfunc';


const footerItems = props => {

    const toTop = () => window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    return (
        <div>
            <li>
                <Link to={`${props.nav}${fixURL(props.link)}`} onClick={toTop}>
                    {props.link}
                </Link>
            </li>
        </div>
    )
};

export default footerItems;