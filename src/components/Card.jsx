import React from 'react'

function Card(elem) {


  return (
    <ul>
        <li>{elem.symbol}</li>
        <li>{elem.title}</li>
        <li>{elem.keywords}</li>
    </ul>
  )
}

export default Card