import React from 'react';
import styles from './Footer.module.css';
import logo from '../../assets/images/Logo.png';
import FooterItems from '../FooterItems/FooterItems';

const footer = props => {

    let copyrightDate = new Date();
    let a = 0;
    const sortArray = id => Object.keys(id).sort((a,b) => {return id[b] - id[a]});

    const popularCategories = sortArray(props.size).map((el, i) => {
            if (a <= 4) {
                a++;
                return <FooterItems link={el} nav={"/categories/category/"} key={i}/>;
            }
            return null;
        });

    const topRestaurants = sortArray(props.topRestaurant).map((el,i) => {
        if (a <= 9) {
            a++;
            return <FooterItems link={props.topRestaurant[el]} nav={"/restaurants/"} key={i} />;
        }
        return null;
    })

    return (
        <footer>
            <div className={styles.Footer}>
                <div className={styles.FooterLogo}>
                    <img src={logo} alt="Logotipas" width='55px' height='55px'/>
                </div>
                <div className={styles.FooterDiv}>
                        <h4>Populiaru</h4>
                        <ul>
                            {popularCategories}
                        </ul>
                </div>
                <div className={styles.FooterDiv}>
                        <h4>Restoranai</h4>
                        <ul>
                            {topRestaurants}
                        </ul>
                </div>
                <div className={styles.SocialLinks}>
                    <a href="/"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                                d="M17.338 5.462a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4M12 15.333a3.333 3.333 0 1 1 0-6.665 3.333 3.333 0 0 1 0 6.665m0-8.468a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27M12 2c-2.716 0-3.057.012-4.123.061-1.064.047-1.791.216-2.428.464a4.875 4.875 0 0 0-1.77 1.154 4.875 4.875 0 0 0-1.154 1.77c-.248.637-.416 1.364-.464 2.428C2.012 8.943 2 9.284 2 12s.012 3.057.061 4.123c.048 1.065.216 1.791.464 2.428a4.875 4.875 0 0 0 1.154 1.77 4.875 4.875 0 0 0 1.77 1.154c.637.248 1.364.417 2.428.465 1.066.048 1.407.06 4.123.06s3.057-.012 4.123-.06c1.065-.048 1.791-.217 2.428-.465a4.875 4.875 0 0 0 1.77-1.154 4.875 4.875 0 0 0 1.154-1.77c.248-.637.417-1.363.465-2.428.048-1.066.06-1.407.06-4.123s-.012-3.057-.06-4.123c-.048-1.064-.217-1.791-.465-2.428a4.875 4.875 0 0 0-1.154-1.77 4.875 4.875 0 0 0-1.77-1.154c-.637-.248-1.363-.417-2.428-.464C15.057 2.012 14.716 2 12 2m0 1.802c2.67 0 2.986.01 4.041.058.975.044 1.504.207 1.857.344.466.182.799.399 1.15.748.35.351.566.684.748 1.151.137.352.3.881.344 1.856.049 1.055.058 1.371.058 4.041 0 2.67-.009 2.986-.058 4.041-.044.975-.207 1.504-.344 1.857a3.12 3.12 0 0 1-.748 1.15 3.12 3.12 0 0 1-1.15.748c-.353.137-.882.3-1.857.344-1.055.049-1.371.058-4.041.058-2.67 0-2.986-.009-4.041-.058-.975-.044-1.504-.207-1.856-.344a3.116 3.116 0 0 1-1.151-.748 3.133 3.133 0 0 1-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.055-.058-1.371-.058-4.041 0-2.67.01-2.986.058-4.041.044-.975.207-1.504.344-1.856.182-.467.399-.8.748-1.151a3.129 3.129 0 0 1 1.151-.748c.352-.137.881-.3 1.856-.344C9.014 3.812 9.33 3.802 12 3.802"
                                fill="currentColor"></path>
                        </svg></a>
                    <a href="/"><svg width="10" height="17" viewBox="0 0 10 17" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor"
                                d="M3.023 17L3 9.562H0V6.376h3V4.25C3 1.382 4.672 0 7.08 0c1.153 0 2.144.091 2.433.132v2.997h-1.67c-1.31 0-1.563.662-1.563 1.632v1.614H10L9 9.563H6.28V17H3.023z">
                            </path>
                        </svg></a>
                    <a href="/"><svg width="17" height="15" viewBox="0 0 17 15" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor"
                                d="M17 2.143c-.637.321-1.275.428-2.019.536.744-.429 1.275-1.072 1.488-1.929-.638.429-1.382.643-2.232.857C13.6.964 12.645.536 11.688.536c-1.806 0-3.4 1.607-3.4 3.535 0 .322 0 .536.107.75A9.75 9.75 0 0 1 1.169 1.18C.85 1.714.744 2.25.744 3c0 1.179.637 2.25 1.594 2.893-.532 0-1.063-.214-1.594-.429 0 1.715 1.169 3.107 2.762 3.429C3.188 9 2.87 9 2.55 9c-.212 0-.425 0-.637-.107.424 1.393 1.7 2.464 3.293 2.464-1.169.964-2.656 1.5-4.356 1.5H0c1.594.964 3.4 1.607 5.313 1.607 6.375 0 9.88-5.357 9.88-9.964v-.429c.745-.535 1.382-1.178 1.807-1.928z">
                            </path>
                        </svg></a>
                    <a href="/"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <g fill="currentColor">
                                <path
                                    d="M1.894 0C.749 0 0 .813 0 1.882c0 1.045.727 1.883 1.85 1.883h.022c1.167 0 1.893-.838 1.893-1.883C3.743.812 3.039 0 1.894 0M0 15.059h3.765V4.706H0zM12.095 4.706c-1.8 0-2.606.983-3.056 1.671v.033h-.023l.023-.033V4.944H5.647c.046.95 0 10.115 0 10.115H9.04v-5.65c0-.302.023-.603.113-.819.245-.605.802-1.23 1.74-1.23 1.227 0 1.717.928 1.717 2.287v5.412H16v-5.8c0-3.107-1.673-4.553-3.905-4.553">
                                </path>
                            </g>
                        </svg></a>
                </div>
            </div>
            <div className={styles.Copyright}>
                <p>&copy; Copyright {copyrightDate.getFullYear()} Dominykas Rutkauskas</p>
            </div> 
        </footer>
    )
};

export default footer;