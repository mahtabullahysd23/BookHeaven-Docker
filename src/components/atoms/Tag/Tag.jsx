import React from 'react'
import './Tag.style.scss'
const Tag = ({text,color}) => {
  return (
    <div className= {`tag ${color}`} ><p>{text}</p></div>
  )
}

export default Tag