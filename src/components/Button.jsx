import React from 'react'
import './Button.css'

export default props => {
    let cssClass = 'button '
    cssClass +=  props.operation ? 'button-operation' : ''
    cssClass +=  props.cols === 2 ? 'button-col-2' : ''
    cssClass +=  props.cols === 3 ? 'button-col-3' : ''
    return (
        <button 
            onClick={e => props.click && props.click(props.label)}
            className={cssClass}>
            {props.label}
        </button>
    )
}
   