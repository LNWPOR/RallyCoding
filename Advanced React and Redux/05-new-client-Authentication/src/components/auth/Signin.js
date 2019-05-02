import React, { Component } from 'react';
import { reduxForm , Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
class Signin extends Component {
  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push('/feature');
    });
  };
    
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
            name="email"
            typee="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <div>
          {this.props.errorMessage}
        </div>
        <button>Sign In!</button>
      </form>
    );
  }
}

function mapStateTotProps(state){
  return { errorMessage: state.auth.errorMessage};
}
// compose ใช้ช่วยให้เขียนการใช้ multiple HOC ให้ดูเรียบร้อยขึ้น
export default compose(
  connect(mapStateTotProps, actions),
  reduxForm({ form: 'signin'})
)(Signin);