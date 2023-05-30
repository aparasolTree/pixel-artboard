import React, { useEffect, useRef, useState } from "react";

export type Boundary = { left: number; top: number; width: number; height: number };
export interface UseCliderOptions {
    defaultState?: { left: number; top: number };
    ref: React.RefObject<HTMLElement>;
    onMoving?: (args: Boundary) => void;
}

export default function useSlider({ defaultState, ref, onMoving }: UseCliderOptions) {
    const [coord, setCoord] = useState(defaultState ?? { left: 0, top: 0 });
    const canMove = useRef(false);
    const startCoord = useRef({ x: 0, y: 0 });

    const handleMouseDown = ({ target, clientX, clientY }: React.MouseEvent) => {
        canMove.current = true;
        const { left, top } = (target as HTMLDivElement).getBoundingClientRect();
        startCoord.current = { x: clientX - left, y: clientY - top };
    };

    useEffect(() => {
        const handleMove = (event: MouseEvent) => {
            event.stopPropagation();
            event.preventDefault();
            if (canMove.current && ref.current) {
                const { clientX, clientY } = event;
                const { top, left, width, height } = ref.current.getBoundingClientRect();
                let moveX = clientX - left - startCoord.current.x,
                    moveY = clientY - top - startCoord.current.y;

                if (moveX < 0) moveX = 0;
                if (moveX > width) moveX = width;
                if (moveY < 0) moveY = 0;
                if (moveY > height) moveY = height;
                setCoord({ left: moveX, top: moveY });
                onMoving && onMoving({ left: moveX, top: moveY, width, height });
            }
        };
        const handleUp = () => (canMove.current = false);

        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleUp);
        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
        };
    }, []);

    return { ...coord, handleMouseDown };
}
