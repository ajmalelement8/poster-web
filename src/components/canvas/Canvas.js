import { useEffect, useRef, useState } from 'react';
import './Canvas.scss'
import { Stage, Layer, Rect, Text, Path, Image, Group, Transformer } from 'react-konva';




const Canvas = ({ btnText, mainContent, subContent, images, canvasRef, template, preview, activeTemplate, setTemplates }) => {


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
        // newWidth = parentElem.clientWidth;
        // newHeight = newWidth * aspectRatioHeight;
        if (canvasSize.height > canvasSize.width) {

          newHeight = parentElem.clientHeight;
          newWidth = newHeight * aspectRatioWidth;
        }
        else {


          newWidth = parentElem.clientWidth;
          newHeight = newWidth * aspectRatioHeight;
        }
      }
      else {
        if (canvasSize.height > canvasSize.width) {

          newHeight = parentElem.clientHeight;
          newWidth = newHeight * aspectRatioWidth;
        }
        else {
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
  }, [template.canvasSize, window.resize]);

  function loadImage(src, setFunction, type) {
    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      setFunction((prevstate) => ({ ...prevstate, [type]: image }));
    };
  }
  const handleElementDrag = (event, name) => {

    setTemplates((prevState) => {
      const updatedTemplates = [...prevState];     //all templates
      const activeIndex = updatedTemplates[activeTemplate.templateIndex]; //current template
      const activeItemIndex = activeIndex.findIndex(item => item.name == template.name);   //curent template size

      //template - current template with the size
      const updatedTemplateItem = {
        ...template,
        [name]: { ...template[name], x: event.target.x(), y: event.target.y() },
      };

      activeIndex[activeItemIndex] = updatedTemplateItem;      //updating item inside current template size

      return updatedTemplates;
    }
    )
    // setTemplates(['asd0','asdasd','asdasd'])
  }
  const handleGroupDrag = (event, elements) => {
    setTemplates((prevState) => {
      const updatedTemplates = [...prevState];   //all templates
      const activeIndex = updatedTemplates[activeTemplate.templateIndex];   //current templates
      const activeItemIndex = activeIndex.findIndex(item => item.name == template.name);  //curent template size
      const updatedTemplateItem = { ...template }; //current template with size

      elements.forEach((element) => {
        let elem = event.target.findOne((node) => {
          return node.attrs.name === element;
        });
        updatedTemplateItem[element] = {
          ...template[element],
          x: template[element].x + event.target.x(),
          y: template[element].y + event.target.y()
          // x: elem.x(),
          // y: elem.y()
        };
      })

      activeIndex[activeItemIndex] = updatedTemplateItem;      //updating item inside current template size


      return updatedTemplates;
    });
  };

  const handleTransform = (name,x,y,width,height) => {

    setTemplates((prevState) => {
      const updatedTemplates = [...prevState];     //all templates
      const activeIndex = updatedTemplates[activeTemplate.templateIndex]; //current template
      const activeItemIndex = activeIndex.findIndex(item => item.name == template.name);   //curent template size

      //template - current template with the size
      const updatedTemplateItem = {
        ...template,
        [name]: { ...template[name], x:x,y:y,width:width,height:height},
      };

      activeIndex[activeItemIndex] = updatedTemplateItem;      //updating item inside current template size

      return updatedTemplates;
    }
    )
    // setTemplates(['asd0','asdasd','asdasd'])
  }

  // selectable images
  const [selectors, setSelectors] = useState([template.watermark, template.image, template.logo])
  const [selectedId, setSelectedId] = useState(null)

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
            {/* <ImageGenerator /> */}

            {/* <Image {...template.image} image={image.image} draggable onDragEnd={(e) => handleElementDrag(e, 'image')} /> */}
            <ImageGenerator
              shapeProps={{ ...template.image }}
              isSelected={'image' === selectedId}
              onSelect={() => setSelectedId('image')}
              changeAction={handleElementDrag}
              transformAction={handleTransform}
              image={image.image}
              name="image"
              draggable={true}
            />

            {/* <Path {...template.pattern} /> */}
            <Image {...template.logo} image={image.logo} draggable onDragEnd={(e) => handleElementDrag(e, 'logo')} />
            {/* <ImageGenerator /> */}


            <Text {...template.mainContent} draggable onDragEnd={(e) => handleElementDrag(e, 'mainContent')} text={mainContent?.text} fontSize={mainContent?.fontSize || template.mainContent.fontSize} fill={mainContent?.color || template.mainContent.fill} />


            <Text {...template.subContent} text={subContent?.text} fontSize={subContent?.fontSize || template.subContent.fontSize} fill={subContent?.color || template.subContent.fill} />
            <Group draggable={true} onDragEnd={(e) => handleGroupDrag(e, ['btnBox', 'btnText'])}>
              <Rect name='btnBox' {...template.btnBox} />
              <Text name='btnText' {...template.btnText} text={btnText?.text} fontSize={btnText?.fontSize || template.btnText.fontSize} fill={btnText?.color || template.btnText.fill} />
            </Group>

          </Layer>
        </Stage>
      </div>
    </div>
  )
}

export default Canvas;


const ImageGenerator = ({ shapeProps, isSelected, onSelect, changeAction,transformAction, draggable, image, name }) => {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected])

  return (
    <>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={draggable}
        onDragEnd={(e) => changeAction(e, name)}
        image={image}

        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          transformAction({
            ...shapeProps,
            name:name,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}

    </>
  )
}