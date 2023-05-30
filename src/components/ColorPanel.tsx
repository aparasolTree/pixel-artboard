import { useCallback } from "react";
import styled, { useTheme } from "styled-components";
import { useColor } from "../context/ColorContex";
import { usePixelArtboard } from "../pixel";
import ColorPick from "./ColorPicker";
import Card from "./common/Card";

const Container = styled.div`
    margin-top: 20px;
`;

const ColorItem = styled.button`
    width: 30px;
    height: 20px;
    border-radius: 5px;
    outline: 0;
    border: 0;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;

const colors = [
    { name: "浅绿", color: "#8cc540" },
    { name: "深绿", color: "#009f5d" },
    { name: "暗蓝", color: "#019fa0" },
    { name: "蓝色", color: "#019fde" },
    { name: "深蓝", color: "#007cdc" },
    { name: "深紫", color: "#887ddd" },
    { name: "浅紫", color: "#cd7bdd" },
    { name: "粉色", color: "#ff5675" },
    { name: "红色", color: "#ff1244" },
    { name: "橙色", color: "#ff8345" },
    { name: "黄色", color: "#f8bd0b" },
    { name: "灰色", color: "#d1d2d4" },
];

export default function ColorPanel() {
    const { controller } = usePixelArtboard();
    const { theme } = useTheme() as DefaultTheme;
    const { color, setColor } = useColor();

    const onChange = useCallback((color: string) => {
        controller.brushColor = color;
    }, []);

    const onClick = (color: string) => {
        setColor(color);
        controller.brushColor = color;
    };

    return (
        <Container>
            <Card bgColor={theme.bgSecondary} ftColor={theme.ftSecondary}>
                <div style={{ display: "flex" }}>
                    <span style={{ marginRight: 10 }}>Brush Color: </span>
                    <ColorPick onChange={onChange} defaultColor={color} key={color} />
                </div>
                <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
                    {colors.map(({ color }) => (
                        <ColorItem
                            key={color}
                            style={{ backgroundColor: color }}
                            onClick={() => onClick(color)}
                        />
                    ))}
                </div>
            </Card>
        </Container>
    );
}
