import { useEffect, useRef, useState } from 'react'
import Canvas from '../canvas/Canvas'
import './GeneratedList.scss'
const GeneratedList = ({ templateList, mainContent, subContent, btnText, images, action }) => {
    const dataList = templateList?.map((template, index) => <CanvasItem key={index} action={action} mainContent={mainContent} subContent={subContent} btnText={btnText} images={images} template={template} />)
    return (
        <div className="generate-list-container">
            {dataList}
        </div>
    )
}

export default GeneratedList


const CanvasItem = (props) => {
    const { mainContent, subContent, btnText, images, template, action } = props;
    const canvasRef = useRef(null)
    const [src, setSrc] = useState('')
    useEffect(() => {
        if (canvasRef.current) {
            // convertCanvasToImage();
            setTimeout(convertCanvasToImage,100)
        }
    }, [canvasRef])

    const convertCanvasToImage = async() => {
        const canvas = await canvasRef.current.content.querySelector('canvas');
        const dataURL = await canvas.toDataURL('image/jpeg'); 

        const img = new Image();
        img.src = await dataURL;
        setSrc(img.src);

    };
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
                <button onClick={() => action(canvasRef, template.name)}>Download</button>
            </div>
        </div>
    )
}