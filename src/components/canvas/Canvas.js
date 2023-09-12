import { useEffect, useRef, useState } from 'react';
import './Canvas.scss'
import { Stage, Layer, Rect, Text, Path, Image } from 'react-konva';
import Konva from 'konva';

const generateCanvas = () => {

}

const Canvas = (props) => {
  const { title, mainContent, subContent, images, canvasRef } = props;


  const [image, setImage] = useState({});
  useEffect(() => {
    loadImage(images.logo.croppedUrl, setImage, 'logo');
  }, [images.logo.croppedUrl]);
  useEffect(() => {
    loadImage(images.watermark.croppedUrl, setImage, 'watermark');
  }, [images.watermark.croppedUrl]);
  useEffect(() => {
    loadImage(images.image.croppedUrl, setImage, 'image');
  }, [images.image.croppedUrl]);

  function loadImage(src, setFunction, type) {
    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      setFunction((prevstate) => ({ ...prevstate, [type]: image }));
    };
  }

  const canvasSize = {
    canvasWidth: 500,
    canvasHeight: 750,
    spacing: 50,
  }
  return (
    <div className='canvas-container'>
      <div id='canvas' className="canvas">
        <Stage ref={canvasRef} height={canvasSize.canvasHeight} width={canvasSize.canvasWidth}>
          <Layer>
            <Rect fill={images.background} x={0} y={0} width={500} height={750} />
            <Image x={(canvasSize.canvasWidth - 300) / 2} height={300} width={300} y={(canvasSize.canvasHeight - 300) / 2} opacity={0.2} draggable image={image.watermark} />
            <Image cornerRadius={[0, 180, 0, 0]} x={0} y={canvasSize.canvasHeight - 300} scaleX={1} scaleY={1} width={canvasSize.canvasWidth} height={canvasSize.canvasWidth} image={image.image} draggable />
            <Rect x={-20} y={220} width={200} height={50} fill='#b02439' cornerRadius={[20, 20, 20, 20]} />
            <Path x={400} y={0} data='"M106 0L1.17531 0C-1.44083 8.02616 0.0150094 18.4589 12 30C25.3663 42.8712 33.0959 40.7931 41.3763 38.5668C49.8224 36.2961 58.8415 33.8712 75 47C92.174 60.9539 86.3053 75.4839 80.8907 88.8895C76.2164 100.462 71.8805 111.197 83 120C87.7646 123.772 95.9122 126.719 106 129.002V0Z"' fill='#b1283d' scaleX={1} scaleY={1} />
            <Image x={30} y={30} height={80} width={80} draggable image={image.logo} />


            <Text x={30} y={125} fontFamily='Calibri' fontStyle='bold' text={mainContent?.text} fontSize={mainContent?.fontSize} draggable fill={mainContent?.color} />
            <Text x={30} y={165} fontFamily='Calibri' fontStyle='bold' text={subContent?.text} fontSize={subContent?.fontSize} draggable fill={subContent?.color} />
            <Text x={30} y={230} fontFamily='Calibri' fontStyle='bold' text={title?.text} fontSize={title?.fontSize} fill={title?.color} />


          </Layer>
        </Stage>
      </div>
    </div>
  )
}

export default Canvas;