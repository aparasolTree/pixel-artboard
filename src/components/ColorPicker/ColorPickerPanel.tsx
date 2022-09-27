import { useCallback } from 'react';
import styled from 'styled-components';

import HueSlider from './HueSlider';
import SVpanel from './SVPanel';
import ColorInput from './ColorInput';

import { useColor } from './context';

const Container = styled.div<{ show: boolean }>`
    border-radius: 4px;
    background-color: #fff;
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
    opacity: ${(props) => (props.show ? '1' : '0')};
    padding: 10px;
    position: absolute;
    top: 30px;
    left: 0px;
`;

const HSVPanel = styled.div`
    display: flex;
`;

const Controller = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
`;

const Clear = styled.button`
    border: none;
    outline: none;
    color: #888;
    background-color: #fff;
    cursor: pointer;

    &:hover {
        background-color: #f1f5f8;
    }
`;

const Ok = styled.button`
    border: none;
    outline: none;
    color: #888;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-left: 10px;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        border-color: skyblue;
        color: skyblue;
    }
`;

export interface ColorPickerPanel {
    showPanel: boolean;
    close: () => void;
}

export default function ColorPickPanel({ showPanel, close }: ColorPickerPanel) {
    const { hsv, hex, setHSV, setHex, clear } = useColor();

    const onChange = useCallback((hue: number) => setHSV({ h: Math.round(hue * 360) }), []);

    return (
        <Container show={showPanel}>
            <HSVPanel>
                <SVpanel {...hsv} setHSV={setHSV} />
                <HueSlider h={hsv.h} onChange={onChange} />
            </HSVPanel>
            <Controller>
                <ColorInput value={hex} setColor={setHex}></ColorInput>
                <div>
                    <Clear onClick={clear}>Clear</Clear>
                    <Ok onClick={close}>Ok</Ok>
                </div>
            </Controller>
        </Container>
    );
}
