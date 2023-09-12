import { useEffect, useRef, useState } from 'react';
import './Canvas.scss'
import { Stage, Layer, Rect, Text, Path, Image } from 'react-konva';
import Konva from 'konva';

const generateCanvas = () => {

}

const Canvas = (props) => {
  const { title, mainContent, subContent, images, canvasRef, template } = props;
  console.log(template)


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

  const canvasSize = template.canvasSize
  return (
    <div className='canvas-container'>
      <div id='canvas' className="canvas">
        <Stage height={canvasSize.height} width={canvasSize.width} ref={canvasRef} >
          <Layer>
            <Rect  {...template.background} fill={images.background} />
            <Image {...template.watermark} x={(canvasSize.width - 300) / 2} y={(canvasSize.height - 300) / 2} opacity={0.2} image={image.watermark} />
            <Image {...template.image} image={image.image} />
            <Rect {...template.titleContainer} />
            <Path {...template.pattern} />
            <Image {...template.logo} image={image.logo} />


            <Text {...template.mainContent} text={mainContent?.text} fontSize={mainContent?.fontSize} fill={mainContent?.color} />
            <Text {...template.subContent} text={subContent?.text} fontSize={subContent?.fontSize} fill={subContent?.color} />
            <Text {...template.title} text={title?.text} fontSize={title?.fontSize} fill={title?.color} />


          </Layer>
        </Stage>
      </div>
    </div>
  )
}

export default Canvas;