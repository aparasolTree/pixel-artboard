import { useEffect, useState } from 'react';
import { useColor } from '../../context/ColorContex';
import { usePixelArtboard } from '../../pixel';

export default function Eyedropper() {
    const [color, setColor] = useState<string>('#000');
    const { controller } = usePixelArtboard();
    const { setColor: _setColor } = useColor();

    useEffect(() => {
        return controller.addEventListener('eyedropper', () => {
            setColor(controller.brushColor);
            _setColor(controller.brushColor);
        });
    }, []);

    return (
        <svg
            viewBox='0 0 1024 1024'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            p-id='4287'
            width='20'
            height='20'
        >
            <path
                d='M780.4 163.9c-5.8-20.4-19.1-37.8-37.7-49-18.5-11.2-40.1-15-60.9-10.7-21.5 4.5-39.5 17.1-50.7 35.5l-50.1 83-11.3-6.8c-38.9-23.5-89.7-11.1-113.2 27.8s-11.1 89.7 27.8 113.2l6 3.6-245.2 405c-3 4.9-4.5 10.6-4.5 16.4l1.5 109.2c0.2 10.6 5.8 20.5 14.9 26 4.9 3 10.4 4.5 16 4.5 4.8 0 9.5-1.1 13.9-3.3l97.5-49.2c4.9-2.5 9-6.2 12-10.8l174.4-269.4c9.3-14.3 5.2-33.4-9.1-42.7-14.3-9.3-33.4-5.2-42.7 9.1L349.1 817.6l-45.9 23.2-0.7-51 240.6-397.4 105 63.6c13 7.9 27.7 12 42.6 12 6.6 0 13.2-0.8 19.8-2.4 21.4-5.3 39.4-18.5 50.8-37.4 11.4-18.8 14.8-41 9.5-62.4-5.3-21.4-18.5-39.4-37.4-50.8l-11.3-6.8 50.2-82.9c11.2-18.4 14.1-40.2 8.1-61.4z m-71.9 232.3c-2.9 4.7-7.4 8.1-12.8 9.4-5.4 1.3-10.9 0.5-15.7-2.4L516.2 304c-9.8-5.9-12.9-18.7-7-28.4 3.9-6.4 10.7-10 17.7-10 3.6 0 7.3 1 10.7 3l163.8 99.2c4.7 2.9 8.1 7.4 9.4 12.8 1.4 5.3 0.5 10.9-2.3 15.6z m-74.7-141.6l50.2-82.9c5-8.2 17-10 26.8-4.1 5.1 3.1 8.7 7.7 10.2 13 0.9 3.2 1.4 8-1.4 12.6l-50.2 82.9-35.6-21.5z'
                fill={color}
            ></path>
        </svg>
    );
}

Eyedropper.displayName = 'eyedropper';
