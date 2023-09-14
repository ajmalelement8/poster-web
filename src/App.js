import logo from './logo.svg';
import './App.css';
import './App.scss'
import Form from './components/form/Form';
import Canvas from './components/canvas/Canvas';
import { useEffect, useReducer, useRef, useState } from 'react';
import Modal from './components/modal/Modal';
import TextForm from './components/form/TextForm';
import CropForm from './components/form/CropForm';
import GeneratedList from './components/generated-list/GeneratedList';
import TemplatePicker, { templateList } from './components/template/template';
import Tab, { TabContent } from './components/tab/Tab';
import SizePicker from './components/sizePicker/SizePicker';

const initialState = {
  btnText: { text: 'button', color: '#ffffff', fontSize: 34 },
  mainContent: { text: 'main content', color: '#377979', fontSize: 38 },
  subContent: { text: 'sub content', color: '#b02439', fontSize: 22 },
  images: {
    logo: {
      url: '',
      crop: {
        unit: "%",
        x: 0,
        y: 0,
        width: 50,
        height: 50,
      }, croppedUrl: ''
    }, watermark: {
      url: '',
      crop: {
        unit: "%",
        x: 0,
        y: 0,
        width: 50,
        height: 50
      }, croppedUrl: ''
    }, image: {
      url: '',
      crop: {
        unit: "%",
        x: 0,
        y: 0,
        width: 50,
        height: 50
      }, croppedUrl: ''
    }, background: ""
  },
  modal: {
    crop: { isActive: false },
    template: { isActive: false },
  },
  activeForm: { type: '', src: '', crop: {}, ratio: null },
  activeTemplate: { templateIndex: 0, sizeIndex: 0 }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'text':
      return {
        ...state, [action.payload.field]: { ...state[action.payload.field], text: action.payload.value }
      }
    case 'color':
      return {
        ...state, [action.payload.field]: { ...state[action.payload.field], color: action.payload.value }
      }
    case 'font':
      return {
        ...state, [action.payload.field]: { ...state[action.payload.field], fontSize: action.payload.value }
      }
    case 'background':
      return {
        ...state, images: { ...state.images, background: action.payload }
      }

    case 'images':
      const { element, imageUrl } = action.payload;
      if (imageUrl) {
        return {
          ...state, images: { ...state.images, [element]: { ...state.images[element], url: imageUrl } }, activeForm: { type: element, crop: state.images[element].crop, src: imageUrl, ratio: null }, modal: { ...state.modal, crop: { isActive: true } }
        }
      }
      return {
        ...state, images: { ...state.images, [element]: { ...state.images[element], url: null, croppedUrl: null } }, modal: { ...state.modal, crop: { isActive: true } }
      };

    case 'active-form':
      if (action.payload && state.images[action.payload].url) {
        return {
          ...state, activeForm: { ...state.activeForm, type: action.payload, crop: state.images[action.payload].crop, src: state.images[action.payload].url }, modal: { ...state.modal, crop: { isActive: true } }
        }
      }
      return state;
    case 'clear-active-form':
      return {
        ...state, activeForm: { ...initialState.activeForm }
      }


    case 'image-crop':
      const { type, crop, croppedUrl } = action.payload;
      if (['logo', 'watermark', 'image'].includes(type)) {
        return {
          ...state, images: {
            ...state.images, [type]: { ...state.images[type], crop, croppedUrl, },
          }, modal: { ...state.modal, crop: { isActive: false } }
        };
      }
      return state;

    // case 'active-form':
    //   return {
    //     ...state, form: { ...state.form, activeForm: action.payload.form, type: action.payload.type }
    //   }

    case 'show-modal':
      var currentModal = action.payload
      return {
        ...state, modal: { ...state.modal, [currentModal]: { isActive: true } }
      }
    case 'hide-modal':
      var currentModal = action.payload;
      return {
        ...state, modal: { ...state.modal, [currentModal]: { isActive: false } }
      }

    case 'template':
      return {
        ...state, activeTemplate: { ...state.activeTemplate, ...action.payload }
      }

    case 'clear':
      return initialState

    default:
      return state
  }
}

function App() {
  const [canvasData, dispatch] = useReducer(reducer, initialState)
  const [canavsSrc, setCanvasSrc] = useState(null)
  const [templates, setTemplates] = useState([])
  const canvasRef = useRef(null);
  useEffect(() => {
    setTemplates(templateList)
  }, [])
  // Function to trigger download
  const handleExport = (elementref, name) => {
    const uri = elementref.current.toDataURL();
    const link = document.createElement('a')
    link.href = uri;
    link.download = name + ".png";
    link.target = "_blank";
    link.click();
    // window.open(uri, '_blank');
  };

  const handleGenerate = () => {
    showModal('template')
  }

  const showModal = (currentModal) => {
    dispatch({ type: 'show-modal', payload: currentModal })

  }

  const hideModal = (currentModal) => {
    dispatch({ type: 'hide-modal', payload: currentModal })
  }

  useEffect(() => {
    if (canvasRef.current) {
      convertCanvasToImage()
    }
  }, [canvasData.btnText, canvasData.mainContent, canvasData.subContent, canvasData.images, canvasData.activeTemplate])

  const convertCanvasToImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();

    const img = new Image();
    img.src = dataURL;
    setCanvasSrc(img.src)


  };

  return (
    <div className="App">
      <div className=''>

      </div>

      <div className="container">
        <div className="main">
          <div className="main-controls">
            <Tab>
              <TabContent label="Text">
                <Form action={handleGenerate} state={canvasData} dispatch={dispatch} />
              </TabContent>
              <TabContent label="Size">
                {templates && <SizePicker template={templates[canvasData.activeTemplate.templateIndex]} action={handleGenerate} state={canvasData} dispatch={dispatch} />}
              </TabContent>
              <TabContent label="Template">
                <TemplatePicker templates={templates} action={handleGenerate} state={canvasData} dispatch={dispatch} />
              </TabContent>

            </Tab>

          </div>
          <div className="main-preview">
            <div className="main-canvas">
              <Canvas preview={true} template={templateList[canvasData.activeTemplate.templateIndex][canvasData.activeTemplate.sizeIndex]} canvasRef={canvasRef} setTemplates={setTemplates}  {...canvasData} />
            </div>
            {/* <div className="main-img">
              <img data-index={canvasData.activeTemplate.templateIndex} src={canavsSrc} alt="" />
            </div> */}
            {/* <CropForm /> */}
          </div>
        </div>
      </div>

      <Modal hideModal={() => hideModal('crop')} showModal={canvasData.modal.crop.isActive}>
        <CropForm {...canvasData.activeForm} dispatch={dispatch} />
      </Modal>
      <Modal size="lg" hideModal={() => hideModal('template')} showModal={canvasData.modal.template.isActive}>
        {canvasData.modal.template.isActive && <GeneratedList action={handleExport} templateList={templateList[canvasData.activeTemplate.templateIndex]} mainContent={canvasData.mainContent} subContent={canvasData.subContent} btnText={canvasData.btnText} images={canvasData.images} />}
      </Modal>
      {/* <div className="buttons">
      <button onClick={()=>{setActiveForm('text','main')}}>Main Content</button>
      <button onClick={()=>{setActiveForm('text','sub')}}>Sub Content</button>
      <button onClick={()=>{setActiveForm('text','btnText')}}>Title Content</button>
      <button onClick={()=>{setActiveForm('image','image')}}>Image Content</button>
      <button onClick={()=>{setActiveForm('image','logo')}}>Logo Content</button>
      <button onClick={()=>{setActiveForm('image','watermark')}}>Watermark Content</button>
      </div> */}
    </div>
  );
}

export default App;
