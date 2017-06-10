import React from 'react';
import styles from '../styles/SignupForm.scss'

export default class extends React.Component {
  state = { email: "", passowrd: "", passowrd2: "", emailerror: "", passworderror: "", registererror: "" }
  handleSubmitForm = (e) => {
    //e.preventDefault()
    console.log("registrar")
  }
  render() {
    return (
      <div className="root">
        <div className="panel">
          <h2>Crear cuenta</h2>
          <form onSubmit={this.handleSubmitForm} action="/registrar" method="POST">
            <input type="text" name="email" placeholder="Correo" value={this.state.email} onChange={(e) => { this.setState({ email: e.currentTarget.value }) }} />
            <span className="error">{this.state.emailerror}</span>
            <input type="password" name="password" placeholder="Contraseña" value={this.state.password} onChange={(e) => { this.setState({ password: e.currentTarget.value }) }} />
            <input type="password" name="password2" placeholder="Repetir Contraseña" value={this.state.password2} onChange={(e) => { this.setState({ password2: e.currentTarget.value }) }} />
            <span className="error">{this.state.passworderror}</span>
            <input type="submit" value="Registrar" />
            <span className="error">{this.state.registererror}</span>
          </form>
        </div>

        <style jsx>{styles}</style>
      </div>
    )
  }
}