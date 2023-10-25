import React from 'react'
import './FooterMolecule.style.scss'
const FooterMolecule = ({header,list}) => {
  return (
    <>
    <div className="list-group">
        <h4>{header}</h4>
        <ul className='list-ul'>
            {list.map((item,index) => (
                <li key={index} >{item}</li>
            ))}
        </ul>
    </div>
    </>   
  )
}

export default FooterMolecule