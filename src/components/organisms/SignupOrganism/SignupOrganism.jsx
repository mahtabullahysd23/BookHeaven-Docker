import React from 'react'
import SignupFormMolecules from '../../molecules/SignupFormMolecules/SignupFormMolecules'
import './SignupOrganism.style.scss'

const SignupOrganism = () => {
  return (
    <>
    <div className="left-div">
    <div className="content">
      <div className="rounded-square"></div>
      <div className="img-div">
            <img src="Banner.png"></img>
          </div>
    </div>
  </div>
    <div className="right-div">
    <div className="content-left">
      <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        Register Now
      </h2>
      <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Register to get access to all the features
      </p>
     <SignupFormMolecules/>
    </div>
  </div>
    </>
  )
}

export default SignupOrganism