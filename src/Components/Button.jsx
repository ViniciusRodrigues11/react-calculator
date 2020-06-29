import React from 'react'
import './Button.css'


export default props => {
  let classes = 'button '
  classes += props.buttonType === 'operator' ? 'operation' : ''
  classes += props.buttonType.includes('double') ? 'double' : ''
  classes += props.buttonType === 'triple' ? 'triple' : ''


  return (
    <button 
    onClick={e => props.click && props.click(props.label)}
    className={classes}>{props.label}</button>
  )

}

