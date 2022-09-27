import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
    border-radius: 4px;
    outline: none;
    padding: 2px 5px;
    width: 130px;
    border: 1px solid #ccc;
`;

export interface ColorInputProps {
    value: string;
    setColor: (color: string) => void;
}

export default function ColorInput({ value, setColor }: ColorInputProps) {
    const [hex, setHex] = useState(value);

    const handleChange = ({ target }: React.FormEvent) => {
        const value = (target as HTMLInputElement).value;
        setHex(value);
    };

    const handleBlur = ({ target }: React.FormEvent) => {
        const value = (target as HTMLInputElement).value;
        if (value.includes('#') && (value.length === 4 || value.length === 7)) {
            setColor(value);
        }
    };

    const handleKeyUp = ({ target, nativeEvent }: React.FormEvent) => {
        const key = (nativeEvent as KeyboardEvent).key;
        if (key === 'Enter') {
            const value = (target as HTMLInputElement).value;
            if (value.includes('#') && (value.length === 4 || value.length === 7)) {
                setColor(value);
            }
        }
    };

    useEffect(() => {
        setHex(value);
    }, [value]);

    return (
        <Input
            value={hex}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
        ></Input>
    );
}
