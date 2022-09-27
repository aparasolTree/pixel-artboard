import { PixelArtboard, Pixels } from '../pixel';
import { createCanvasElement } from '../pixel/utils';

export const blobToImgSrc = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    return url;
};

const canvas = createCanvasElement();
const cache: Record<string, Blob> = {};
export const toBlob = (
    pixels: Pixels,
    row: number,
    column: number,
    width: number,
    height: number
) => {
    return new Promise<Blob>((resolve, reject) => {
        if (cache[JSON.stringify(pixels)]) return resolve(cache[JSON.stringify(pixels)]);
        if (canvas) {
            const columnSpacing = Math.floor(width / column);
            const rowSpacing = Math.floor(height / row);
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext('2d')!;
            context.clearRect(0, 0, canvas.width, canvas.height);

            pixels.forEach((row, rowIndex) => {
                row.forEach(({ color }, columnIndex) => {
                    if (color) {
                        context.save();
                        context.fillStyle = color;
                        context.beginPath();
                        context.fillRect(
                            columnIndex * columnSpacing,
                            rowIndex * rowSpacing,
                            columnSpacing,
                            rowSpacing
                        );
                        context.closePath();
                        context.restore();
                    }
                });
            });
            canvas.toBlob((blob) => {
                if (!blob) return reject('blob is undefined');
                resolve(blob);
                cache[JSON.stringify(pixels)];
            });
        }
    });
};

const FORMAT_DATE = /Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
export const formatDate = (time: number, format: string) => {
    const date = new Date(time);

    const year = date.getFullYear();
    const month = date.getMonth();
    const days = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDay();
    const seconds = date.getSeconds();
    const milliscends = date.getMilliseconds();
    const matches = {
        YY: `${year}`.slice(-2),
        YYYY: year,
        M: month + 1,
        MM: `${month + 1}`.padStart(2, '0'),
        D: days,
        DD: `${days}`.padStart(2, '0'),
        H: hours,
        HH: `${hours}`.padStart(2, '0'),
        h: `${hours % 12 || 12}`,
        hh: `${hours % 12 || 12}`.padStart(2, '0'),
        m: minutes,
        mm: `${minutes}`.padStart(2, '0'),
        s: seconds,
        ss: `${seconds}`.padStart(2, '0'),
        SSS: `${milliscends}`.padStart(3, '0'),
        d: day,
    };

    return format.replace(FORMAT_DATE, (match) => (matches as any)[match]);
};

export const hsv2hsl = (h: number, s: number, v: number) => {
    var l = ((2 - s) * v) / 2;

    if (l != 0) {
        if (l == 1) s = 0;
        else if (l < 0.5) s = (s * v) / (l * 2);
        else s = (s * v) / (2 - l * 2);
    }

    return {
        h,
        s,
        l,
    };
};

export const hsl2Rgb = (h: number, s: number, l: number) => {
    var r, g, b;

    if (s == 0) r = g = b = l;
    else {
        var hue2rgb = function hue2rgb(p: number, q: number, t: number) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
};

export const rgb2hex = (r: number, g: number, b: number) => {
    const rStr = r.toString(16).padStart(2, '0');
    const gStr = g.toString(16).padStart(2, '0');
    const bStr = b.toString(16).padStart(2, '0');
    return `#${rStr}${gStr}${bStr}`;
};

export const rgb2hsv = function (r: number, g: number, b: number) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    const v = max;

    const s = v === 0 ? 0 : 1 - min / v;

    if (min === max) h = 0;
    else {
        switch (v) {
            case b:
                h = 240 + (60 * (r - g)) / (v - min);
                break;
            case r:
                h = (60 * (g - b)) / (v - min);
                break;
            case g:
                h = 120 + (60 * (b - r)) / (v - min);
                break;
        }
    }

    return {
        h: clamp(h, 0, 360),
        s: clamp(s, 0, 1),
        v: clamp(v, 0, 1),
    };
};

export const hex2hsv = (color?: string) => {
    if (color && color.startsWith('#')) {
        const hex = color.replace('#', '');
        if (!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(hex)) return null;
        let r: number = 0,
            g: number = 0,
            b: number = 0;

        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
            r = parseInt(hex.slice(0, 2), 16);
            g = parseInt(hex.slice(2, 4), 16);
            b = parseInt(hex.slice(4, 6), 16);
        }

        return rgb2hsv(r, g, b);
    }
    return null;
};

export const clamp = (curr: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, curr));
};

export const formatSize = (size: number) => {
    const unit = ['KB', 'MB', 'GB'];
    for (let i = 0; i < unit.length; i++) {
        if (size < Math.pow(1024, i + 1)) {
            return (size / Math.pow(1024, i)).toFixed(2) + unit[i - 1];
        }
    }

    return size + 'Byte';
};

export const genId = () => {
    return Date.now() + '' + Math.round(Math.random() * 1000000);
};
