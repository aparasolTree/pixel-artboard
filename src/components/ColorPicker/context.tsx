import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { hex2hsv, hsl2Rgb, hsv2hsl, rgb2hex } from "../../utils";

export type HSV = { h: number; s: number; v: number };
export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number };
export interface ColorPickerContextProps {
    hsv: HSV;
    rgb: RGB;
    hsl: HSL;
    hex: string;
    setHSV: (hsl: Partial<HSV>) => void;
    setHex: (hex: string) => void;
    clear: () => void;
}

const defaultState = {
    hsv: { h: 0, s: 1, v: 1 },
    rgb: { r: 255, g: 255, b: 255 },
    hsl: { h: 0, s: 0, l: 100 },
    hex: "#ffffff",
    setHSV: console.log,
    setHex: console.log,
    clear: console.log,
};

const ColorPickerContext = React.createContext<ColorPickerContextProps>(defaultState);

export const useColor = () => useContext(ColorPickerContext);
export interface ColorPickerProviderProps {
    defaultColor?: string;
    children?: React.ReactNode;
    onChange?: (color: string) => void;
}

export default function ColorPickerProvider({
    children,
    defaultColor,
    onChange,
}: ColorPickerProviderProps) {
    const [hsv, _setHSV] = useState<HSV>(() => hex2hsv(defaultColor) ?? { h: 0, s: 0, v: 1 });
    const setHSV = useCallback((hsv: Partial<HSV>) => {
        _setHSV((prevHSV) => {
            return { ...prevHSV, ...hsv };
        });
    }, []);

    const setHex = useCallback((hex: string) => {
        const hsv = hex2hsv(hex);
        if (hsv) {
            _setHSV(hsv);
        }
    }, []);

    const clear = useCallback(() => _setHSV({ h: 0, s: 0, v: 1 }), []);

    const hsl = useMemo(() => hsv2hsl(hsv.h, hsv.s, hsv.v), [hsv]);
    const rgb = useMemo(() => hsl2Rgb(hsl.h / 360, hsl.s, hsl.l), [hsl]);
    const hex = useMemo(() => rgb2hex(rgb.r, rgb.g, rgb.b), [rgb]);

    useEffect(() => {
        onChange && onChange(hex);
    }, [hex, onChange]);

    // useEffect(() => {
    //     const hsv = hex2hsv(defaultColor);
    //     if (hsv) {
    //         _setHSV(hsv);
    //     }
    // }, [defaultColor]);

    return (
        <ColorPickerContext.Provider value={{ hsv, rgb, hex, hsl, setHSV, setHex, clear }}>
            {children}
        </ColorPickerContext.Provider>
    );
}
