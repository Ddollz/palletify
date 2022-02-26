import React from "react";
import ColorBlock from './ColorBlock.js'
import Settings from './setting/Settings.js'
import PalleteList from "./PalleteList.js";
import { useState, useEffect } from "react";
import { isValidHex, hexToNumber, defaultState } from '../utilities.js'
import Color from "color"
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

const Pallete = () => {
    const initialState = defaultState
    const [currentcolor, setCurrentColor] = useState(initialState.mainColor);
    const [r, setR] = useState(initialState.r);
    const [g, setG] = useState(initialState.b);
    const [b, setB] = useState(initialState.g);
    const [colorList, setColor] = useState({ "color1": 0, "color2": 0, "color3": 0, "color4": 0, "color5": 0 });
    const [maxlight, setMaxLight] = useState(90);
    const [maxdark, setMaxDark] = useState(0);
    const [light, setLight] = useState(initialState.light.toFixed());
    const [sat, setSaturation] = useState(initialState.sat.toFixed());

    const [colorPreview, setColorPreview] = useState(true);

    const [pallete_List, setPallete_List] = useState([]);


    const handleMainColorChange = (e) => {
        setCurrentColor(e)
    }

    const saturationChange = (e) => {
        let s = Color(currentcolor).hsl().saturationl(e);
        setCurrentColor(s.hex())
        setSaturation(Color(currentcolor).hsl().saturationl())
    }

    useEffect(() => {
        if (isValidHex(hexToNumber(Color(`rgb(${r}, ${g}, ${b})`).hex()))) {
            setCurrentColor(Color(`rgb(${r}, ${g}, ${b})`).hex());
        }
    }, [r, g, b]);

    useEffect(() => {

        if (currentcolor[0] !== "#") {
            setCurrentColor("#" + currentcolor)
        }

        if (!isValidHex(hexToNumber(currentcolor))) {
            return
        }

        // Find greatest and smallest channel values
        let h = Color(currentcolor).hsl().hue().toFixed(1),
            s = Color(currentcolor).hsl().saturationl().toFixed(1),
            l = Color(currentcolor).hsl().lightness();
        if (l <= 0) {
            setLight(1);
        } else {
            setLight(l.toFixed());
        }
        setSaturation(s)
        setColor({
            "color1": "hsl(" + h + "," + s + "%," + maxdark + "%)",
            "color2": "hsl(" + h + "," + s + "%," + (((l + parseInt(maxdark)) / 2)).toFixed(1) + "%)",
            "color3": "hsl(" + h + "," + s + "%," + l.toFixed(1) + "%)",
            "color4": "hsl(" + h + "," + s + "%," + (((maxlight - l) / 2) + l).toFixed(1) + "%)",
            "color5": "hsl(" + h + "," + s + "%," + maxlight + "%)"
        });

        document.documentElement.style.setProperty('--primary-text', currentcolor)

    }, [currentcolor, maxlight, maxdark])

    const handleAdd = () => {
        if (pallete_List.length <= 3) {
            const tempos = { id: Math.floor(Math.random() * 10000), pallete: colorList }
            const tempcolostlist = [tempos, ...pallete_List]
            setPallete_List(tempcolostlist)
        }
        if (pallete_List.length >= 3) {
            setColorPreview(!colorPreview)
        }
    }
    const handleRemove = (id) => {
        const removeArr = [...pallete_List].filter(pallete_List => pallete_List.id !== id)
        setPallete_List(removeArr);
        if (pallete_List.length <= 4) {
            setColorPreview(true)
        }
    }
    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min)
    }
    const handleRandomColor = () => {
        setR(randomNumber(0, 255))
        setG(randomNumber(0, 255))
        setB(randomNumber(0, 255))
    }

    const getColorsListText = () => {
        let output = "";
        pallete_List.forEach((element, index) => {
            output = output + `Color Pallete ${index + 1} \n`;
            for (const key in element.pallete) {
                output = output + ` ${Color(element.pallete[key]).hex()}`;
            }
            output = output + "\n";
        });
        return output;
    }
    return (
        <>
            <div className="pallete__card">
                <div className="triggerCopy">
                    <CopyToClipboard
                        text={getColorsListText()}
                    >
                        <button className="copy__Button">
                            Copy Palletes
                        </button>
                    </CopyToClipboard>
                </div>
                {colorPreview === true && (
                    <div className="card-row">
                        <div className="icon">
                            <AiOutlinePlusCircle onClick={handleAdd} className='delete-icon' />
                        </div>
                        <ColorBlock color={colorList.color1} />
                        <ColorBlock color={colorList.color2} />
                        <ColorBlock color={colorList.color3} />
                        <ColorBlock color={colorList.color4} />
                        <ColorBlock color={colorList.color5} />
                    </div>
                )}
                <PalleteList Pallete_List={pallete_List} handleRemove={handleRemove} />
            </div>
            <div className="divider"></div>
            <div className="pallete__list">
                <div className="setting__wrapper">
                    <div className="text__head">Color
                        <button className="copy__Button">
                            <GiPerspectiveDiceSixFacesRandom className="inputIcon" onClick={handleRandomColor} />
                        </button>
                    </div>

                    <div className="hex__input">
                        <Settings type="text" value={currentcolor} onChange={(e) => {
                            handleMainColorChange(e.target.value)
                        }} />

                    </div>

                    <div className="rgb__input">
                        <Settings type="range" min="0" max="255" value={r}
                            label="Red" onChange={(e) => {
                                setR(e.target.value);
                            }} />
                        <Settings type="range" min="0" max="255" value={g}
                            label="Green" onChange={(e) => {
                                setG(e.target.value);
                            }} />
                        <Settings type="range" min="0" max="255" value={b}
                            label="Blue" onChange={(e) => {
                                setB(e.target.value);
                            }} />
                    </div>
                </div>
                <div className="setting__wrapper">
                    <Settings type="range" min={light} max="100" step="1" value={maxlight}
                        label="Lightness" onChange={(e) => setMaxLight(e.target.value)} />

                    <Settings type="range" min="0" step="1" max={light} value={maxdark}
                        label="Darkness" onChange={(e) => setMaxDark(e.target.value)} />
                </div>
                <div className="setting__wrapper">
                    <Settings type="range" min="0" max="100" step="1" value={sat}
                        label="Saturation" onChange={(e) => saturationChange(e.target.value)} />
                </div>
                {/* <br />
                {colorList.color1}
                <br />
                {colorList.color2}
                <br />
                {colorList.color3}
                <br />
                {colorList.color4}
                <br />
                {colorList.color5} */}
            </div>
        </>
    );
};
export default Pallete;
