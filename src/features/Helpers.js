import { ref } from 'vue'
import { colors } from 'quasar'
const  { hexToRgb, rgbToHex, hsvToRgb, rgbToHsv } = colors

const createRefs = variables => variables.map( variable=>ref(variable) )
const textColorByBackgroundRGB = rgb => (rgb&&((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 145)) ? 'black' : 'white'
const fixColorBrightness = hex => {
    const color = rgbToHsv(hexToRgb(hex))
    color.v = Math.max(Math.min(color.v,75),50)
    return rgbToHex(hsvToRgb(color))
}
const radToDeg = rad => rad * 180 / Math.PI;

export { createRefs, textColorByBackgroundRGB, radToDeg, fixColorBrightness }