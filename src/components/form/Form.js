import './Form.scss'

const Form = ({ state, dispatch,download }) => {
    return (
        <div className='form'>
            <div>Editor</div>
            <div className="form-control">
                <label>Main Content</label>
                <div className="form-group">
                    <div className="flex-grow-5">
                        <input className='flex-grow-1' type="text" onChange={(e) => dispatch({ type: 'main-text', payload: e.target.value })} /></div>
                    <div className="flex-grow-1">
                        <input type="color" value={state.mainContent.color} onChange={(e) => dispatch({ type: 'main-color', payload: e.target.value })} /></div>
                    <div className="">
                        <input type="number" value={state.mainContent.fontSize} min="0" step="1" maxLength="3" size="3" onChange={(e) => dispatch({ type: 'main-font', payload: e.target.value })} /></div>

                </div>
            </div>
            <div className="form-control">
                <label>Sub Content</label>
                <div className="form-group">
                    <div className="flex-grow-5">
                        <input type="text" onChange={(e) => dispatch({ type: 'sub-text', payload: e.target.value })} /></div>
                    <div className="flex-grow-1">
                        <input type="color" value={state.subContent.color} onChange={(e) => dispatch({ type: 'sub-color', payload: e.target.value })} /></div>
                    <div className="">
                        <input type="number" value={state.subContent.fontSize} min="0" step="1" maxLength="3" size="3" onChange={(e) => dispatch({ type: 'sub-font', payload: e.target.value })} /></div>

                </div>
            </div>
            <div className="form-control">
                <label>Title</label>
                <div className="form-group">
                    <div className="flex-grow-5">
                        <input className='flex-grow-1' type="text" onChange={(e) => dispatch({ type: 'title-text', payload: e.target.value })} /></div>
                    <div className="flex-grow-1">
                        <input type="color" value={state.title.color} onChange={(e) => dispatch({ type: 'title-color', payload: e.target.value })} /></div>
                    <div className="">
                        <input type="number" value={state.title.fontSize} min="0" step="1" maxLength="3" size="3" onChange={(e) => dispatch({ type: 'title-font', payload: e.target.value })} /></div>

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
                <button onClick={download} className="download">Download</button>
            </div>
        </div>
    )
}

export default Form