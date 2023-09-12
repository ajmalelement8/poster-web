import { useEffect, useRef, useState } from 'react'
import Canvas from '../canvas/Canvas'
import './GeneratedList.scss'
const GeneratedList = ({ templateList, mainContent, subContent, title, images,action }) => {
    const dataList = templateList?.map((template, index) => <CanvasItem key={index} action={action} mainContent={mainContent} subContent={subContent} title={title} images={images} template={template} />)
    return (
        <div className="generate-list-container">
            {dataList}
        </div>
    )
}

export default GeneratedList


const CanvasItem = (props) => {
    const canvasRef = useRef(null)
    const [src, setSrc] = useState('')
    useEffect(() => {
        if (canvasRef.current) {
            convertCanvasToImage()
        }
    }, [canvasRef])

    const convertCanvasToImage = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL(); 

        const img = new Image();
        img.src = dataURL;
        setSrc(img.src)

    };
    const { mainContent, subContent, title, images, template,action } = props
    return (
        <div className="canvas-item">
            <div className="canvas-title">
                {template.name}
            </div>
            <div className="canvas-data">
                <Canvas canvasRef={canvasRef} {...props} />
            </div>
            <div className="canvas-preview">
                <img src={src} alt="" />
            </div>
            <div className="data-handler">
                <button onClick={()=>action(canvasRef,template.name)}>Download</button>
            </div>
        </div>
    )
}