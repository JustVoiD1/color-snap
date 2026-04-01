import { HSBColor } from "./types";
type Lab = { L: number; a: number; b: number };

function hsbToRgb({ h, s, b }: HSBColor) {
    s /= 100;
    b /= 100;

    const k = (n: number) => (n + h / 60) % 6;
    const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));

    return {
        r: f(5),
        g: f(3),
        b: f(1)
    };
}

function rgbToXyz({ r, g, b }: { r: number; g: number; b: number }) {
    const srgb = [r, g, b].map(v =>
        v <= 0.04045
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4)
    );

    const [R, G, B] = srgb;

    return {
        x: R * 0.4124 + G * 0.3576 + B * 0.1805,
        y: R * 0.2126 + G * 0.7152 + B * 0.0722,
        z: R * 0.0193 + G * 0.1192 + B * 0.9505
    };
}

function xyzToLab({ x, y, z }: { x: number; y: number; z: number }): Lab {
    const refX = 0.95047;
    const refY = 1.00000;
    const refZ = 1.08883;

    let X = x / refX;
    let Y = y / refY;
    let Z = z / refZ;

    const f = (t: number) =>
        t > 0.008856
            ? Math.cbrt(t)
            : 7.787 * t + 16 / 116;

    X = f(X);
    Y = f(Y);
    Z = f(Z);

    return {
        L: 116 * Y - 16,
        a: 500 * (X - Y),
        b: 200 * (Y - Z)
    };
}

function hsbToLab(hsb: HSBColor): Lab {
    const rgb = hsbToRgb(hsb);
    const xyz = rgbToXyz(rgb);
    return xyzToLab(xyz);
}

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}

function deltaE(c1: Lab, c2: Lab) {
    return Math.sqrt(
        (c1.L - c2.L) ** 2 +
        (c1.a - c2.a) ** 2 +
        (c1.b - c2.b) ** 2
    );
}

export function calculateScore(color: HSBColor, target: HSBColor): number {
    const lab1 = hsbToLab(color);
    const lab2 = hsbToLab(target);

    const dE = deltaE(lab1, lab2);

    // BASE SCORE
    const base = 10 / (1 + Math.pow(dE / 38, 1.6));

    // HUE DIFFERENCE
    const hueDiffRaw = Math.abs(color.h - target.h);
    const hueDiff = Math.min(hueDiffRaw, 360 - hueDiffRaw);

    const avgSat = (color.s + target.s) / 2;

    // HUE RECOVERY
    const hueAccuracy = Math.max(0, 1 - Math.pow(hueDiff / 25, 1.5));
    const satWeightRecovery = Math.min(1, avgSat / 30);
    const recovery = (10 - base) * hueAccuracy * satWeightRecovery * 0.5;

    // HUE PENALTY
    const huePenFactor = Math.max(0, (hueDiff - 30) / 150);
    const satWeightPenalty = Math.min(1, avgSat / 40);
    const penalty = base * huePenFactor * satWeightPenalty * 0.4;

    const finalScore = clamp(base + recovery - penalty, 0, 10);

    return Number(finalScore.toFixed(2));
}

