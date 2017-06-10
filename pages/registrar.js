import React, { Component } from 'react'
import Base from '../components/Base.js'
import SignupForm from '../components/SignupForm.js'
import Page from '../Page.js'

export default Page(

  class extends Component {
    render() {
      return (
        <Base hideSide>
          <SignupForm />
        </Base>
      )
    }
  }

)
