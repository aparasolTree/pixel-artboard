import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { clamp } from '../utils';
import withEvent from '../utils/withEvent';

const Container = styled.div`
    border-radius: 5px;
    overflow: hidden;
    position: relative;
`;

const Input = styled.input`
    width: 100px;
    height: 20px;
    border: 0;
    outline: 0;
    margin: 0;
    padding-left: 5px;
    background-color: #eee;
`;

const Controller = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 3px;
`;

const Arrow = styled.div`
    width: 10px;
    height: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:after {
        content: '';
        display: block;
        box-sizing: border-box;
        width: 6px;
        height: 6px;
        border: 3px solid #333;
        border-right: none;
        border-bottom: none;
        transform: rotate(45deg);
    }

    &:hover {
        background-color: #aaa;
    }
`;

const Up = styled(Arrow)`
    &:after {
        transform: rotate(45deg);
    }
`;

const Down = styled(Arrow)`
    &:after {
        transform: rotate(-135deg);
    }
`;

export interface NumberInputProps {
    number?: number;
    max?: number;
    min?: number;
    onChange?: (number: number) => void;
}

export default function NumberInput({
    number = 0,
    max = Infinity,
    min = -Infinity,
    onChange,
}: NumberInputProps) {
    const [value, setValue] = useState<number>(number);
    const handleChange = ({ target }: React.FormEvent) => {
        setValue(Number((target as HTMLInputElement).value));
    };

    const handleBlur = () => {
        if (typeof value === 'number' && !Number.isNaN(value)) {
            const num = clamp(value, min, max);
            setValue(num);
            onChange && onChange(num);
        }
    };

    const up = () => onChange && onChange(clamp(value + 1, min, max));
    const down = () => onChange && onChange(clamp(value - 1, min, max));

    useEffect(() => {
        setValue(number);
    }, [number]);

    return (
        <Container>
            <Input value={value} onChange={handleChange} onBlur={handleBlur} />
            <Controller>
                <Up onClick={withEvent(['stop', 'prevent'], up)}></Up>
                <Down onClick={withEvent(['stop', 'prevent'], down)}></Down>
            </Controller>
        </Container>
    );
}
