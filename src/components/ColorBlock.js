import React from "react";

const ColorBlock = ({color}) => {
    return (
        <div className="color-card" style={{background: color}}></div>
    );
}

export default ColorBlock;
