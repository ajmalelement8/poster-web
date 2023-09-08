import logo from './logo.svg';
import './App.css';
import './App.scss'
import Form from './components/form/Form';
import Canvas from './components/canvas/Canvas';
import { useReducer, useState } from 'react';
import Modal from './components/modal/Modal';
import TextForm from './components/form/TextForm';
import CropForm from './components/form/CropForm';

const initialState = {
  title: { text: '', color: '', fontSize: 13 },
  mainContent: { text: '', color: '', fontSize: 13 },
  subContent: { text: '', color: '', fontSize: 13 },
  images: { logo: '', watermark: '', image: '', background: '' },
  modal: { isActive: false, content: '' },
  form: { activeForm: '', type: '' }
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
    case 'logo':
      return {
        ...state, images: { ...state.images, logo: action.payload }
      }
    case 'watermark':
      return {
        ...state, images: { ...state.images, watermark: action.payload }
      }
    case 'image':
      return {
        ...state, images: { ...state.images, image: action.payload }
      }
    case 'background':
      return {
        ...state, images: { ...state.images, background: action.payload }
      }

    case 'active-form':
      return {
        ...state, form: { ...state.form, activeForm: action.payload.form, type: action.payload.type }
      }

    case 'show-modal':
      return {
        ...state, modal: { ...state.modal, isActive: true, content: action.payload }
      }
    case 'hide-modal':
      return {
        ...state, modal: { ...state.modal, isActive: false, content: '' }
      }

    case 'clear':
      return initialState

    default:
      return state
  }
}

function App() {
  const [canvasData, dispatch] = useReducer(reducer, initialState)

  // const setActiveForm = (form, type) => {
  //   dispatch({ type: 'active-form', payload: { form, type } })
  //   let content = ''
  //   if (form == 'text') {
  //     content = <TextForm dispatch={dispatch} />
  //     dispatch({ type: 'show-modal', payload: content })

  //   }
  //   else if(form == 'image') {
  //     content = <CropForm dispatch={dispatch} />

  //     dispatch({ type: 'show-modal', payload: content })
  //   }
  // }

  // const hideModal = ()=>{
  //   dispatch({ type: 'hide-modal' })
  // }

  return (
    <div className="App">
      <div className=''>
        Designer
      </div>

      <div className="container">
        <div className="main">
          <div className="">
            <Form state={canvasData} dispatch={dispatch} />
          </div>
          <div className="">
            {/* <Canvas canvasData={canvasData} /> */}
            <CropForm/>
          </div>
        </div>
      </div>

      {/* <Modal hideModal={hideModal} showModal={canvasData.modal.isActive}>
        {canvasData.modal.content}
      </Modal> */}
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
