import Color from "color"
export const numberToHex = (number) => '#' + number
export const hexToNumber = (number) => number.substr(1, number.length)

export const isValidHex = (color) => {
    if (!color || typeof color !== 'string') return false

    if (color.substring(0, 1) === '#') color = color.substring(1)

    switch (color.length) {
        case 3: return /^[0-9A-F]{3}$/i.test(color)
        case 6: return /^[0-9A-F]{6}$/i.test(color)
        case 8: return /^[0-9A-F]{8}$/i.test(color)
        default: return false
    }
}

export const initialColor = "bb94a7"
export const defaultState = {
    mainColor: initialColor,
    r: Color(numberToHex(initialColor)).rgb().red(),
    g: Color(numberToHex(initialColor)).rgb().green(),
    b: Color(numberToHex(initialColor)).rgb().blue(),
    light: Color(numberToHex(initialColor)).hsl().lightness(),
    sat: Color(numberToHex(initialColor)).hsl().saturationl(),
}