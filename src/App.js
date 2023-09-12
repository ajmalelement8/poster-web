import logo from './logo.svg';
import './App.css';
import './App.scss'
import Form from './components/form/Form';
import Canvas from './components/canvas/Canvas';
import { useReducer, useRef, useState } from 'react';
import Modal from './components/modal/Modal';
import TextForm from './components/form/TextForm';
import CropForm from './components/form/CropForm';
import GeneratedList from './components/generated-list/GeneratedList';
import {template} from './components/template/template';

const initialState = {
  title: { text: 'title', color: '#ffffff', fontSize: 34 },
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
    }, background: '#ffffff'
  },
  modal: {
    crop: { isActive: false },
    template: { isActive: false },
  },
  activeForm: { type: '', src: '', crop: {}, ratio: null }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'title-text':
      return {
        ...state, title: { ...state.title, text: action.payload }
      }
    case 'title-color':
      return {
        ...state, title: { ...state.title, color: action.payload }
      }
    case 'title-font':
      return {
        ...state, title: { ...state.title, fontSize: action.payload }
      }
    case 'main-text':
      return {
        ...state, mainContent: { ...state.mainContent, text: action.payload }
      }
    case 'main-color':
      return {
        ...state, mainContent: { ...state.mainContent, color: action.payload }
      }
    case 'main-font':
      return {
        ...state, mainContent: { ...state.mainContent, fontSize: action.payload }
      }
    case 'sub-text':
      return {
        ...state, subContent: { ...state.subContent, text: action.payload }
      }
    case 'sub-color':
      return {
        ...state, subContent: { ...state.subContent, color: action.payload }
      }

    case 'sub-font':
      return {
        ...state, subContent: { ...state.subContent, fontSize: action.payload }
      }
    case 'background':
      return {
        ...state, images: { ...state.images, background: action.payload }
      }

    case 'images':
      const { element, imageUrl } = action.payload;
      return {
        ...state, images: { ...state.images, [element]: { ...state.images[element], url: imageUrl } }, activeForm: { type: element, crop: state.images[element].crop, src: imageUrl, ratio: null }, modal: { ...state.modal, crop: { isActive: true } }
      }

    case 'active-form':
      if (action.payload && state.images[action.payload].url) {
        return {
          ...state, activeForm: { ...state.activeForm, type: action.payload, crop: state.images[action.payload].crop, src: state.images[action.payload].url }, modal: {...state.modal,crop:{ isActive: true} }
        }
      }
      return state;

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

    case 'clear':
      return initialState

    default:
      return state
  }
}

function App() {
  const [canvasData, dispatch] = useReducer(reducer, initialState)
  const canvasRef = useRef(null);

  // Function to trigger download
  const handleExport = (elementref,name) => {
    const uri = elementref.current.toDataURL();
    const link = document.createElement('a')
    link.href = uri;
    link.download = name+".png";
    link.target = "_blank";
    link.click();
    // window.open(uri, '_blank');
  };

  const handleGenerate = () => {
    showModal('template')
  }

  const showModal = (currentModal)=>{
    dispatch({ type:'show-modal',payload:currentModal})

  }

  const hideModal = (currentModal) => {
    dispatch({ type: 'hide-modal', payload: currentModal })
  }

  return (
    <div className="App">
      <div className=''>
        
      </div>

      <div className="container">
        <div className="main">
          <div className="">
            <Form action={handleGenerate} state={canvasData} dispatch={dispatch} />
          </div>
          <div className="">
            <Canvas template={template.template1[0]} canvasRef={canvasRef}  {...canvasData} />
            {/* <CropForm /> */}
          </div>
        </div>
      </div>

      <Modal hideModal={() => hideModal('crop')} showModal={canvasData.modal.crop.isActive}>
        <CropForm {...canvasData.activeForm} dispatch={dispatch} />
      </Modal>
      <Modal size="lg" hideModal={() => hideModal('template')} showModal={canvasData.modal.template.isActive}>
        {canvasData.modal.template.isActive&&<GeneratedList action={handleExport} templateList={template.template1} mainContent={canvasData.mainContent} subContent={canvasData.subContent} title={canvasData.title} images={canvasData.images}/>}
      </Modal>
      {/* <div className="buttons">
      <button onClick={()=>{setActiveForm('text','main')}}>Main Content</button>
      <button onClick={()=>{setActiveForm('text','sub')}}>Sub Content</button>
      <button onClick={()=>{setActiveForm('text','title')}}>Title Content</button>
      <button onClick={()=>{setActiveForm('image','image')}}>Image Content</button>
      <button onClick={()=>{setActiveForm('image','logo')}}>Logo Content</button>
      <button onClick={()=>{setActiveForm('image','watermark')}}>Watermark Content</button>
      </div> */}
    </div>
  );
}

export default App;
