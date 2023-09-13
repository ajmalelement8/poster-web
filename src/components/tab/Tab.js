import React, { useState } from 'react'
import './Tab.scss'

const Tab = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    }
    return (
        <div className="tabs-container">
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
                        {child}
                    </div>
                )}
            </div>
        </div>
    )
}

export const TabContent = ({ children }) => {
    return <div className="tab-content">{children}</div>;
};


export default Tab