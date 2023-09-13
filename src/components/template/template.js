import { useEffect, useState } from 'react'
import './Template.scss'
import template1 from './template1'
import template2 from './template2'
import template3 from './template3'



export const templateList = [
    template1,template2
]


const TemplatePicker = ({ templates, dispatch }) => {
    const [activeTemplate, setActiveTemplate] = useState(0)
    useEffect(() => {
        dispatch({ type: 'template', payload: { templateIndex: activeTemplate } })
    }, [activeTemplate])

    return (
        <div className="template-container">
            <div className="template-list">
                {templates.map((template, index) => (
                    <TemplateItem index={index} key={index} action={setActiveTemplate} style={activeTemplate == index ? 'active' : ''} template={template} />
                ))}
            </div>
        </div>
    )

}

export default TemplatePicker

const TemplateItem = ({ template, action, index, style }) => {
    return (
        <div onClick={() => action(index)} className={`template-item ${style}`}>
            <div className="template-preview">
                <img src={template[0].preview} alt="" />
            </div>
        </div>
    )
}