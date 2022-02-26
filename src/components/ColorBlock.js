import React from "react";
import Color from "color"
import { CopyToClipboard } from 'react-copy-to-clipboard'

const ColorBlock = ({ color }) => {
    return (
        <CopyToClipboard text={Color(color).hex()}>
            <div className="color-card" style={{ background: color }}>
                <div className="ColorBlockCode">{Color(color).hex()}</div>
            </div>
        </CopyToClipboard>
    );
}

export default ColorBlock;
