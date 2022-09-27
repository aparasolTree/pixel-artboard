import React, { useContext, useState } from 'react';

const defaultState = { color: '#000', setColor: console.log };
const ColorContext = React.createContext<{ color: string; setColor: React.Dispatch<string> }>(
    defaultState
);

export const useColor = () => useContext(ColorContext);
export default function ColorProvider({ children }: React.PropsWithChildren) {
    const [color, setColor] = useState<string>('#000');
    return <ColorContext.Provider value={{ color, setColor }}>{children}</ColorContext.Provider>;
}
