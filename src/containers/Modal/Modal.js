import React, { Component } from 'react';
import styles from './Modal.module.css';
import Backdrop from '../../components/Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.visible !== this.props.visible;
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop visible={this.props.visible} clicked={this.props.closed} />
                <div className={[styles.Modal, this.props.visible ? styles.ModalIn : styles.ModalOut].join(' ')}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;