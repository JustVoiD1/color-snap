export const hsbToRgb = (hue: number, saturation: number, brightness: number) => {
    saturation /= 100
    brightness /= 100

    const c = brightness * saturation
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1))
    const m = brightness - c

    let r = 0, g = 0, b = 0

    if (hue < 60) [r, g, b] = [c, x, 0]
    else if (hue < 120) [r, g, b] = [x, c, 0]
    else if (hue < 180) [r, g, b] = [0, c, x]
    else if (hue < 240) [r, g, b] = [0, x, c]
    else if (hue < 300) [r, g, b] = [x, 0, c]
    else[r, g, b] = [c, 0, x]

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
    }
}