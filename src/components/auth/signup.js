import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import * as actions from '../../actions'

class Signup extends Component {

 handleSubmitForm(fromProps) {
  this.props.signupUser(fromProps)
}
 renderAlert() {
   console.log(this.props.errorMessage);
  if(this.props.errorMessage) {
    return (
      <div className='alert alert-danger'>
        <strong>Oops!</strong> {this.props.errorMessage}
      </div>
    )
  }
}

  render() {
    const { handleSubmit, fields: {email, password, passwordConfirmed} } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm.bind(this))}>
        <fieldset className='form-group'>
          <label>Email: </label>
          <input {...email} className='form-control'/>
          {email.touched && email.error && <div className='error'>{email.error}</div>}
        </fieldset>
        <fieldset className='form-group'>
          <label>Password: </label>
          <input type='password' {...password} className='form-control'/>
            {password.touched && password.error && <div className='error'>{password.error}</div>}
        </fieldset>
        <fieldset className='form-group'>
          <label>Confirm password: </label>
          <input type='password' {...passwordConfirmed} className='form-control'/>
          {passwordConfirmed.touched && passwordConfirmed.error && <div className='error'>{passwordConfirmed.error}</div>}
        </fieldset>
          {this.renderAlert()}
        <button action='submit' className='btn btn-success'>Sign Up</button>
      </form>
    )
  }
}

function validate(formProps) {
  const errors = {}

  if(!formProps.email) {
    errors.email = 'Please enter a email'
  }

  if(!formProps.password) {
    errors.password = 'Please enter a password'
  }

  if(!formProps.passwordConfirmed) {
    errors.passwordConfirmed = 'Please enter a confirm password'
  }

  if(formProps.password !== formProps.passwordConfirmed) {
    errors.password = 'Password must match!'
  }

  return errors
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error
  }
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirmed'],
  validate
}, mapStateToProps, actions)(Signup)
