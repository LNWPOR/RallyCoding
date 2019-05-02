import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            // default use USJ currency
            // 500 cen = 5 dollar
            // token = callback function ที่จะทำงานต่อหลังจากได้ token จาก stripe
            // ถ้าจะทำ style ปุ่มของตัวเองดังนั้นไม่ใช้ self closing tag แล้ว แต่งลูกข้างในมัน //ลูกไม่จำเป็นต้องเป็น button ก็ได้
            <StripeCheckout
                name="Emaily"
                description="5$ for 5 email credits"
                amount={500}
                token={token=>this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
            // <StripeCheckout
            //     name="Emaily"
            //     description="5$ for 5 email credits"
            //     amount={500}
            //     token={token=>console.log(token)}
            //     stripeKey={process.env.REACT_APP_STRIPE_KEY}
            // />
        );
    }
}

export default connect(null, actions)(Payments);