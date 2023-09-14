import { useEffect, useRef, useState } from 'react';
import './Canvas.scss'
import { Stage, Layer, Rect, Text, Path, Image, Group } from 'react-konva';




const Canvas = ({ btnText, mainContent, subContent, images, canvasRef, template, preview,activeTemplate,setTemplates }) => {


  const [image, setImage] = useState({});


  const canvasSize = Object.assign({}, template.canvasSize);

  const rectangles = template?.rectangles && template.rectangles.map((rect, index) => <Rect key={index}  {...rect} />)
  const paths = template?.paths && template.paths.map((path, index) => <Path key={index}  {...path} />)


  useEffect(() => {
    loadImage(images.logo.croppedUrl, setImage, 'logo');
  }, [images.logo.croppedUrl]);

  useEffect(() => {
    loadImage(images.watermark.croppedUrl, setImage, 'watermark');
  }, [images.watermark.croppedUrl]);

  useEffect(() => {
    loadImage(images.image.croppedUrl, setImage, 'image');
  }, [images.image.croppedUrl]);

  useEffect(() => {
    if (preview && canvasRef?.current) {
      let parentElem = canvasRef.current.content.parentElement;
      let canvasContainer = canvasRef.current.content;
      let canvas = canvasRef.current.content.querySelector('canvas')
      // const ctx = canvas.getContext('2d');
      let aspectRatioHeight = canvasSize.height / canvasSize.width;
      let aspectRatioWidth = canvasSize.width / canvasSize.height;

      let newWidth;
      let newHeight;
      if (canvasSize.height < parentElem.clientHeight) {
        // console.log("ch<ph")
        // console.log("height ", canvasSize.height, parentElem.clientHeight);
        // console.log("width ", canvasSize.width, parentElem.clientWidth);

        // newWidth = parentElem.clientWidth;
        // newHeight = newWidth * aspectRatioHeight;
        if (canvasSize.height > canvasSize.width) {
          console.log("ch>cw")
          console.log("height ", canvasSize.height, parentElem.clientHeight);
          console.log("width ", canvasSize.width, parentElem.clientWidth);

          newHeight = parentElem.clientHeight;
          newWidth = newHeight * aspectRatioWidth;
        }
        else {

          console.log("ch<cw")
          console.log("height ", canvasSize.height, parentElem.clientHeight);
          console.log("width ", canvasSize.width, parentElem.clientWidth);

          newWidth = parentElem.clientWidth;
          newHeight = newWidth * aspectRatioHeight;
        }
      }
      else {
        if (canvasSize.height > canvasSize.width) {
          console.log("ch>cw")
          console.log("height ", canvasSize.height, parentElem.clientHeight);
          console.log("width ", canvasSize.width, parentElem.clientWidth);

          newHeight = parentElem.clientHeight;
          newWidth = newHeight * aspectRatioWidth;
        }
        else {

          console.log("ch<cw")
          console.log("height ", canvasSize.height, parentElem.clientHeight);
          console.log("width ", canvasSize.width, parentElem.clientWidth);

          newWidth = parentElem.clientWidth;
          newHeight = newWidth * aspectRatioHeight;
        }
      }


      // canvas.width = newWidth
      // canvas.height = newHeight
      // const scaleX = newWidth / canvas.width;
      // const scaleY = newHeight / canvas.height;

      canvas.style.width = newWidth + "px";
      canvas.style.height = newHeight + "px";

      // canvasContainer.style.width = "100%";
      // canvasContainer.style.height = "100%";
      canvasContainer.classList.add("canvas-parent")

    }
  }, [template.canvasSize, window.resize])

  function loadImage(src, setFunction, type) {
    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      setFunction((prevstate) => ({ ...prevstate, [type]: image }));
    };
  }
  const handleElementDrag = (event,name,element)=>{
    setTemplates((prevState)=>([...prevState,[...prevState[activeTemplate.templateIndex],{...template,[name]:{...element,x:event.target.x,y:event.target.y}}]]))
  }

  return (
    <div className='canvas-container w-100'>
      <div id='canvas' className="canvas w-100">
        <Stage className='w-100 flex-center h-100' height={canvasSize.height} width={canvasSize.width} ref={canvasRef} >
          <Layer>
            <Rect  {...template.background} fill={images.background || template.background.fill} />
            {rectangles}
            {paths}
            {/* <Image {...template.watermark} x={(template.canvasSize.width - 300) / 2} y={(template.canvasSize.height - 300) / 2} opacity={0.2} image={image.watermark} /> */}
            <Image {...template.watermark} x={template.canvasSize.width - 50} y={template.canvasSize.height - 50} opacity={0.2} image={image.watermark} />
            <Image {...template.image} image={image.image} draggable  onDragEnd={(e)=>handleElementDrag(e,'image',template.image)} />
            {/* <Path {...template.pattern} /> */}
            <Image {...template.logo} image={image.logo} draggable onDragEnd={(e)=>handleElementDrag(e,'logo',template.logo)} />


            <Text {...template.mainContent} draggable onDragEnd={(e)=>handleElementDrag(e,'mainContent',template.mainContent)} text={mainContent?.text} fontSize={mainContent?.fontSize || template.mainContent.fontSize} fill={mainContent?.color || template.mainContent.fill} />
            <Text {...template.subContent} text={subContent?.text} fontSize={subContent?.fontSize || template.subContent.fontSize} fill={subContent?.color || template.subContent.fill} />
            <Group draggable={true}>
              <Rect {...template.btnBox} />
              <Text {...template.btnText} text={btnText?.text} fontSize={btnText?.fontSize || template.btnText.fontSize} fill={btnText?.color || template.btnText.fill} />
            </Group>

          </Layer>
        </Stage>
      </div>
    </div>
  )
}

export default Canvas;