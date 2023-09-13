import React, { useEffect, useState } from 'react'
import './SizePicker.scss'

const SizePicker = ({ template, dispatch }) => {
    console.log(template)
    const [activeSize, setActiveSize] = useState(0)
    useEffect(() => {
        dispatch({ type: 'template', payload: {sizeIndex:activeSize } })
    }, [activeSize])
    return (
        <div className='size-container'>
            <div className="">
                Available sizes
            </div>

            <div className="size-list">
                {template&&template.map((size, index) => <SizeItem index={index} action={setActiveSize} style={activeSize == index ? 'active' : ''} key={index} template={size} />)}
            </div>
        </div>
    )
}

export default SizePicker

const SizeItem = ({ template, action, style, index }) => {
    // console.log(index)
    return (
        <div onClick={() => action(index)} className={`size-card ${style}`}>
            <div className="size-name">{template.name}</div>
            <div className="size-preview-container">
                <div style={{ width: template.canvasSize.width * .2 + "px", height: template.canvasSize.height * .2 + "px" }} className="size-preview"></div>
            </div>
            <div className="size-values"><span>{template.canvasSize.width}x{template.canvasSize.height}</span></div>
        </div>
    )
}