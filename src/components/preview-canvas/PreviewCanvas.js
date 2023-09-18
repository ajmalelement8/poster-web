import { useEffect, useRef, useState } from 'react';
import './PreviewCanvas.scss'
import { Stage, Layer, Rect, Text, Path, Image, Group, Transformer } from 'react-konva';




const PreviewCanvas = ({ btnText, mainContent, subContent, images, canvasRef, template, preview, activeTemplate, setTemplates }) => {

    const [ratio, setRatio] = useState(1)
    const [image, setImage] = useState({});
    const [canvasSize, setCanvasSize] = useState({
        height: 800,
        width: 800,
    })


    useEffect(() => {
        if (template.canvasSize) {

            setCanvasSize(template.canvasSize)
        }
    }, [template.canvasSize])


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

    const handleTransform = ({ name, x, y, scaleX, scaleY,height,width, rotation }) => {

        setTemplates((prevState) => {
            const updatedTemplates = [...prevState];     //all templates
            const activeIndex = updatedTemplates[activeTemplate.templateIndex]; //current template
            const activeItemIndex = activeIndex.findIndex(item => item.name == template.name);   //curent template size

            //template - current template with the size
            const updatedTemplateItem = {
                ...template,
                [name]: {
                    ...template[name],
                    x: x,
                    y: y,
                    // width: width, // Adjust width based on scaleX
                    // height: height,// Adjust height based on scaleY
                    scaleY:scaleY,
                    scaleX:scaleX,
                    rotation: rotation, // Set the rotation
                },
            };
            activeIndex[activeItemIndex] = updatedTemplateItem;      //updating item inside current template size
            

            return updatedTemplates;
        }
        )
    }

    // selectable images
    const [selectors, setSelectors] = useState([template.watermark, template.image, template.logo])
    const [selectedId, setSelectedId] = useState(null)

    // rectangles and paths
    const rectangles = template?.rectangles && template.rectangles.map((rect, index) => <Rect key={index} {...rect} />)
    const paths = template?.paths && template.paths.map((path, index) => <Path key={index}  {...path} />)

    return (
        <div className='preview-canvas-container w-100'>
            <div id='preview-canvas' className="preview-canvas">
                <Stage className='w-100 flex-center h-100 preview-canvas-stage' height={canvasSize.height} width={canvasSize.width} ref={canvasRef} >
                    <Layer>
                        <Rect  {...template.background} {...canvasSize} fill={images.background || template.background.fill} />
                        {rectangles}

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
                        {/* <Image {...template.logo} image={image.logo} draggable onDragEnd={(e) => handleElementDrag(e, 'logo')} /> */}
                        <ImageGenerator
                            shapeProps={{ ...template.logo }}
                            isSelected={'logo' === selectedId}
                            onSelect={() => setSelectedId('logo')}
                            changeAction={handleElementDrag}
                            transformAction={handleTransform}
                            image={image.logo}
                            name="logo"
                            draggable={true}
                        />
                        {/* <ImageGenerator /> */}

                        {/* <Image {...template.watermark} x={(template.canvasSize.width - 300) / 2} y={(template.canvasSize.height - 300) / 2} opacity={0.2} image={image.watermark} /> */}
                        <Image {...template.watermark} x={canvasSize.width - 50} y={canvasSize.height - 50} opacity={0.2} image={image.watermark} />
                        {/* <ImageGenerator /> */}
                        {paths}

                        <Text {...template.mainContent} draggable onDragEnd={(e) => handleElementDrag(e, 'mainContent')} text={mainContent?.text} fontSize={mainContent?.fontSize || template.mainContent.fontSize} fill={mainContent?.color || template.mainContent.fill} />


                        <Text {...template.subContent} draggable onDragEnd={(e) => handleElementDrag(e, 'subContent')} text={subContent?.text} fontSize={subContent?.fontSize || template.subContent.fontSize} fill={subContent?.color || template.subContent.fill} />
                        {/* <Group draggable={true} onDragEnd={(e) => handleGroupDrag(e, ['btnBox', 'btnText'])}> */}
                        <Rect draggable={true} onDragEnd={(e) => handleElementDrag(e, 'btnBox')}   {...template.btnBox} />
                        <Text draggable={true} onDragEnd={(e) => handleElementDrag(e, 'btnText')} {...template.btnText} text={btnText?.text} fontSize={btnText?.fontSize || template.btnText.fontSize} fill={btnText?.color || template.btnText.fill} />
                        {/* </Group> */}

                    </Layer>
                </Stage>
            </div>
        </div>
    )
}

export default PreviewCanvas;


const ImageGenerator = ({ shapeProps, isSelected, onSelect, changeAction, transformAction, draggable, image, name }) => {
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
                   
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();   
                    const rotation = node.rotation(); // Get the rotation value

                    transformAction({
                        ...shapeProps,
                        name: name,
                        x: node.x(),
                        y: node.y(),
                        scaleX:scaleX,
                        scaleY:scaleY,
                        // width: Math.max(5, node.width() * scaleX),
                        // height: Math.max(node.height() * scaleY),
                        rotation: rotation, // Pass the rotation value
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