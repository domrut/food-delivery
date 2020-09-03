import React, { Component } from 'react';
import axios from '../../axios-instance';
import Loading from '../../components/Loading/Loading';
import styles from './DeliveryDataForm.module.css';
import { connect } from 'react-redux';

export class DeliveryDataForm extends Component {

    state = {
        formControls: {
            email: {
                value: ''
            },
            name: {
                value: ''
            },
            address: {
                value: ''
            },
            deliveryMethod: {
                value: ''
            },
            paymentMethod: {
                value: ''
            },
            mobilePhone: {
                value: ''
            },
            additionalComments: {
                value: ''
            }
        },
        loading: true,
    };

    orderCompleted = e => {
        e.preventDefault();
        const orderInfo = {
            restaurant: decodeURIComponent(this.props.orderedFrom),
            dishes: this.props.dshes,
            price: this.props.ttlPrice.toFixed(2),
            customerInfo: {
                name: this.state.formControls.name,
                email: this.state.formControls.email,
                mobilePhone: this.state.formControls.mobilePhone,
                address: this.state.formControls.address,
                deliveryMethod: this.state.formControls.deliveryMethod,
                paymentMethod: this.state.formControls.paymentMethod
            },
            additionalComments: this.state.formControls.additionalComments
        }
        axios.post('checkoutOrders.json', orderInfo)
            .then(() => {this.setState({loading: false})},
                setTimeout(() => {
                    window.location.href="/"
                }, 2500))
            .catch((error) => {console.log(error)});
    }

    changeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        })
    }

    render() {
        
        let completedForm = <Loading />;
        if (this.state.loading) {
            completedForm = (
                <form onSubmit={this.orderCompleted}>
                    <label htmlFor="name">Vardas <span style={{color: "red"}}>*</span></label>
                    <input className={styles.InputField} required type="text" name="name" id="name" placeholder="Your name" value={this.state.formControls.name.value} onChange={this.changeHandler} autoFocus minLength="6"/>
                    
                    <label htmlFor="email">El.paštas <span style={{color: "red"}}>*</span></label>
                    <input className={styles.InputField} required type="email" name="email" id="email" placeholder="Your e-mail" value={this.state.formControls.email.value.trim()} onChange={this.changeHandler}/>
                    
                    <label htmlFor="address">Adresas <span style={{color: "red"}}>*</span></label>
                    <input className={styles.InputField} required type="text" name="address" id="address" placeholder="Your address" value={this.state.formControls.address.value.trim()} onChange={this.changeHandler} minLength="5"/>
                    
                    <label htmlFor="mobilePhone">Telefono numeris <span style={{color: "red"}}>*</span></label>
                    <input className={styles.InputField} required type="number" name="mobilePhone" id="mobilePhone" placeholder="Your phone number" value={this.state.formControls.mobilePhone.value.trim()} onChange={this.changeHandler} minLength="8" pattern="^[+]*[0-9]{12}"/>
                    
                    <label htmlFor="paymentMethod">Mokėjimo būdas <span style={{color: "red"}}>*</span>(pristatymo metu)</label>
                    <select className={styles.InputField} required name="paymentMethod" id="paymentMethod" value={this.state.formControls.paymentMethod.value} onChange={this.changeHandler}>
                        <option value="" disabled>Pasirinkite mokėjimo būdą</option>
                        <option value="creditCard">Credit Card</option>
                        <option value="applePay">Apple Pay</option>
                        <option value="googlePay">Google Pay</option>
                        <option value="cash">Grynieji</option>
                    </select>

                    <label style={{display: "block"}} htmlFor="deliveryMethod">Pristatymo būdas <span style={{color: "red"}}>*</span></label>
                    <select className={styles.InputField} required name="deliveryMethod" id="deliveryMethod" value={this.state.formControls.deliveryMethod.value} onChange={this.changeHandler}>
                        <option value="" disabled>Pasirinkite pristatymo būdą</option>
                        <option value="restaurant">Atsiėmimas restorane</option>
                        <option value="deliveryViaCar">Pristatymas automobiliu</option>
                        <option value="deliveryViaBike">Pristatymas dviračiu</option>
                    </select>
                    
                    <label htmlFor="additionalComments">Papildomi komentaras (nebūtina)</label>
                    <textarea name="additionalComments" id="additionalComments" cols="30" rows="5" placeholder="Add additional comments to the restaurant" value={this.state.formControls.additionalComments.value} onChange={this.changeHandler}></textarea>
                    
                    <button className={styles.SubmitButton}><i className="fas fa-shopping-cart fa-lg"></i>Užsisakyti!</button>
                </form>
            );
        }

        return (
            <div className={styles.DeliveryForm}>
                {this.state.loading ? <h3 className={styles.FormHeader}>Įveskite pristatymo duomenis</h3> : null}
                {this.state.loading === false ? <h1 style={{textAlign: "center"}}>Užsakymas priimtas !</h1>: null}
                {completedForm}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dshes: state.dishes,
        ttlPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(DeliveryDataForm);