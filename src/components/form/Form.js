import './Form.scss'

const Form = ({ state, dispatch,action }) => {
    return (
        <div className='form-container'>
            <div>Editor</div>
            <div className="form-control">
                <label>Main Content</label>
                <div className="form-group">
                    <div style={{width:'60%'}} className="flex-grow-5">
                        <input className='flex-grow-1' type="text" onChange={(e) => dispatch({ type: 'text', payload:{field:'mainContent',value: e.target.value }})} /></div>
                    <div style={{width:'20%'}} className="flex-grow-1">
                        <input type="color" value={state.mainContent.color} onChange={(e) => dispatch({ type: 'color', payload:{field:'mainContent',value: e.target.value } })} /></div>
                    <div style={{width:'20%'}} className="">
                        <input type="number" value={state.mainContent.fontSize} min="0" step="1" maxLength="3" size="3" onChange={(e) => dispatch({ type: 'font', payload:{field:'mainContent',value: e.target.value } })} /></div>

                </div>
            </div>
            <div className="form-control">
                <label>Sub Content</label>
                <div className="form-group">
                    <div style={{width:'60%'}}  className="flex-grow-5">
                        <input type="text" onChange={(e) => dispatch({ type: 'text', payload:{field:'subContent',value:e.target.value }})} /></div>
                    <div style={{width:'20%'}}  className="flex-grow-1">
                        <input type="color" value={state.subContent.color} onChange={(e) => dispatch({ type: 'color', payload: {field:'subContent',value:e.target.value } })} /></div>
                    <div style={{width:'20%'}}  className="">
                        <input type="number" value={state.subContent.fontSize} min="0" step="1" maxLength="3" size="3" onChange={(e) => dispatch({ type: 'font', payload: {field:'subContent',value:e.target.value } })} /></div>

                </div>
            </div>
            <div className="form-control">
                <label>Title</label>
                <div className="form-group">
                    <div style={{width:'60%'}}  className="flex-grow-5">
                        <input className='flex-grow-1' type="text" onChange={(e) => dispatch({ type: 'text', payload:{field:'btnText',value: e.target.value } })} /></div>
                    <div style={{width:'20%'}}  className="flex-grow-1">
                        <input type="color" value={state.btnText.color} onChange={(e) => dispatch({ type: 'color', payload:{field:'btnText',value: e.target.value } })} /></div>
                    <div style={{width:'20%'}}  className="">
                        <input type="number" value={state.btnText.fontSize} min="0" step="1" maxLength="3" size="3" onChange={(e) => dispatch({ type: 'font', payload:{field:'btnText',value: e.target.value } })} /></div>

                </div>
            </div>
            <div className="form-control">
                <label>Logo</label>
                <div className="form-group">
                    <div className="">
                        <input type="file" accept='image/*' onChange={(e) => dispatch({ type: 'images', payload:{element:'logo',imageUrl: e.target.files[0] }})} />
                    </div>
                    <div className="">
                        <button onClick={(e)=>dispatch({type:"active-form",payload:'logo'})} className="crop-trigger">Crop/Resize</button>
                    </div>
                </div>
            </div>
            <div className="form-control">
                <label>Image</label>
                <div className="form-group">
                    <div className="">
                        <input type="file" accept='image/*' onChange={(e) => dispatch({ type: 'images', payload:{element:'image',imageUrl: e.target.files[0] }})} />
                    </div>
                    <div className="">
                        <button onClick={(e)=>dispatch({type:"active-form",payload:'image'})} className="crop-trigger">Crop/Resize</button>
                    </div>
                </div>
            </div>
            <div className="form-control">
                <label>WaterMark</label>
                <div className="form-group">
                    <div className="">
                        <input  type="file" accept='image/*'
                            onChange={(e) => dispatch({ type: 'images', payload:{element:'watermark',imageUrl: e.target.files[0] }})}
                        />
                    </div>
                    <div className="">
                        <button onClick={(e)=>dispatch({type:"active-form",payload:'watermark'})} className="crop-trigger">Crop/Resize</button>
                    </div>
                </div>
            </div>
            <div className="form-control">
                <label>Background</label>
                <input type="color" value={state.images.background} onChange={(e) => dispatch({ type: 'background', payload: e.target.value })} />
            </div>

            <div className="download-container">
                <button onClick={action} className="download">Generate</button>
            </div>
        </div>
    )
}

export default Form