import React from 'react';
import styles from './Navbar.module.css';
import companyLogo from '../../assets/images/Logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Navbaras = () => {

  const scrollHandler = () => {
    const loc = document.querySelector("main");
    if (loc !== null) {
      loc.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
    return (
          <Navbar expand="md">
            <Navbar.Brand href='/restaurants'>
              <img
                  src={companyLogo}
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                  alt="Logotipas"
                />
          </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className={["ml-auto", styles.NavBar].join(' ')}>
                <Link className={styles.Links} to="/restaurants" onClick={scrollHandler}>Restoranai</Link>
                <Link className={styles.Links} to="/categories">Kategorijos</Link>
                <Link className={styles.Links} to="/checkout">Krepšelis</Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Navbaras;