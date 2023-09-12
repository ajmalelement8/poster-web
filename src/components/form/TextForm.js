import './Form.scss'

const TextForm = (props) => {
    const { dispatch, handleSubmit } = props;
    return (
        <div className='text-form'>
            <div className="title">
                Edit {props.type}
            </div>
            <div className="form-control">
                <label>Font Size</label>
                <input type="text" onChange={(e) => dispatch({ type: props.type + '-font', payload: e.target.value })} />
            </div>
            <div className="form-control">
                <label>Font Color</label>
                <input type="color" onChange={(e) => dispatch({ type: props.type + '-color', payload: e.target.value })} />
            </div>
            <div className="submit-container">
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default TextForm