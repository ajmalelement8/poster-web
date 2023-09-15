import React, { useState } from 'react'
import './Tab.scss'

const Tab = ({ children,dir }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    }
    return (
        <div className={`tabs-container ${dir}`}>
            <div className="tabs">
                {React.Children.map(children, (child, index) => (
                    <div
                        className={`tab-control ${activeTab === index ? 'active' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {child.props.label}
                    </div>
                ))}
            </div>
            <div className="tab-content">
                {React.Children.map(children, (child, index) =>
                    <div
                        className={`tab-pane ${activeTab === index ? 'active' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {activeTab==index && child}
                    </div>
                )}
            </div>
        </div>
    )
}

export const TabContent = ({ children }) => {
    return children;
};


export default Tab