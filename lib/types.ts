export interface HSBColor {
    h: number,
    s: number,
    b: number
}




export interface ColorContextType {
    hsb: HSBColor,
    setHsb: React.Dispatch<React.SetStateAction<HSBColor>>,
    targetColor: HSBColor,
    setTargetColor: React.Dispatch<React.SetStateAction<HSBColor>>,

}
