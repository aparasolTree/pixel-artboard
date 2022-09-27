import React, { useContext, useRef } from 'react';
import { PixelArtboard, PixelArtboardOptions } from './PixelArtboard';

export interface PixelArtboardProivderProps extends PixelArtboardOptions {
    children: React.ReactNode;
}

const Context = React.createContext<{
    controller: PixelArtboard;
}>(null!);

export const usePixelArtboard = () => useContext(Context);
export function PixelArtboardProivder({ children, ...rest }: PixelArtboardProivderProps) {
    const controller = useRef<PixelArtboard>();
    if (!controller.current) {
        controller.current = new PixelArtboard(rest);
    }
    return (
        <Context.Provider value={{ controller: controller.current }}>{children}</Context.Provider>
    );
}
