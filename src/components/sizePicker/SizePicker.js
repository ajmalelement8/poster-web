import React, { useEffect, useState } from 'react'
import './SizePicker.scss'

const SizePicker = ({ template, dispatch,activeSize }) => {
    
    // const [activeSize, setActiveSize] = useState(0)
    // useEffect(() => {
    //     dispatch({ type: 'template', payload: {sizeIndex:activeSize } })
    // }, [activeSize])

    const handleSizeChange = (index)=>{
        dispatch({ type: 'template', payload: {sizeIndex:index } })
    }
    return (
        <div className='size-container'>
            <div className="">
                Available sizes
            </div>

            <div className="size-list">
                {template&&template.map((size, index) => <SizeItem index={index} action={()=>handleSizeChange(index)} style={activeSize == index ? 'active' : ''} key={index} template={size} />)}
            </div>
        </div>
    )
}

export default SizePicker

const SizeItem = ({ template, action, style, index }) => {
    
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