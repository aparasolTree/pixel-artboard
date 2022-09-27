import { useCallback } from 'react';
import { usePixelArtboard } from '../context';
import { Pixels } from '../PixelArtboard';

const randomFilename = () => Math.random().toString(16).split('.')[1];

export default function usePixelArtboardDownload() {
    const { controller } = usePixelArtboard();

    const download = useCallback((type: string = 'png') => {
        controller.download(type);
    }, []);

    const downloadByPixels = useCallback(
        (pixels: Pixels, row: number, column: number, name?: string, type: string = 'png') => {
            const filename = name ?? randomFilename();
            controller.downloadByPixels(pixels, row, column, filename, type);
        },
        []
    );

    return { download, downloadByPixels };
}
