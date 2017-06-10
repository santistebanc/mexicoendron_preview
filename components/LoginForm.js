import React from 'react';
import styles from '../styles/LoginForm.scss'
import Link from 'next/link'

export default class extends React.Component {
  state = { email: "", passowrd: "", error: "" }
  handleSubmitForm = (e) => {
    // e.preventDefault()
    console.log("login")
  }
  render() {
    return (
      <div className="panel">
        <form onSubmit={this.handleSubmitForm} action="/login" method="POST">
          <input type="text" name="email" placeholder="Correo" value={this.state.email} onChange={(e) => { this.setState({ email: e.currentTarget.value }) }} />
          <input type="password" name="password" placeholder="Contraseña" value={this.state.password} onChange={(e) => { this.setState({ password: e.currentTarget.value }) }} />
          <div className="controls">
            <input type="submit" value="Ingresar" /><Link prefetch href={'/registrar'}><span className="createaccount">Crear Cuenta</span></Link>
          </div>
          <span className="error">{this.state.error}</span>
        </form>

        <style jsx>{styles}</style>
      </div>
    )
  }
}