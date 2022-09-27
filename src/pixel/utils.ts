const toString = Object.prototype.toString;
const getRawType = (val: unknown) => toString.call(val).slice(8, -1);

export const isObject = (val: unknown): val is Record<any, any> => getRawType(val) === 'Object';
export const isArray = (val: unknown): val is any[] => Array.isArray(val);

export const isCanvasElement = (val: unknown): val is HTMLCanvasElement =>
    getRawType(val) === 'HTMLCanvasElement';

export const deepClone = (target: unknown, set: Set<any> = new Set()) => {
    if (!isObject(target) && !isArray(target)) return target;
    if (set.has(target)) return target;
    set.add(target);
    const cloneObject: Record<any, any> | Array<any> = isArray(target) ? [] : {};

    for (const key in target) {
        if (Object.hasOwn(target, key)) {
            (cloneObject as any)[key] =
                isObject(target[key]) || isArray(target[key])
                    ? deepClone(target[key], set)
                    : target[key];
        }
    }

    return cloneObject;
};

export const clamp = (curr: number, min: number, max: number) => {
    return Math.max(min, Math.min(curr, max));
};

export const isServer = !(window && typeof window !== 'undefined');
export const createCanvasElement = (width?: number, height?: number) => {
    if (!isServer) {
        const canvas = window.document.createElement('canvas');
        width && (canvas.width = width);
        height && (canvas.height = height);
        return canvas;
    }
    return null;
};
