import styled, { useTheme } from 'styled-components';

import Back from './icons/Back';
import Forward from './icons/Forward';
import Download from './icons/Download';
import Heart from './icons/Heart';
import Reset from './icons/Reset';
import Export from './icons/Export';

import { usePixelArtboard, usePixelArtboardDownload, usePixelArtboardHistory } from '../pixel';
import { useCollect } from '../context/CollectContext';
import { useRef } from 'react';
import TipButton from './common/TipButton';

const Container = styled.div`
    display: flex;
`;

export default function Actions() {
    const { add } = useCollect();
    const { controller } = usePixelArtboard();
    const { download } = usePixelArtboardDownload();
    const { back, forward } = usePixelArtboardHistory();
    const { theme } = useTheme() as DefaultTheme;

    const addToCollect = () => {
        const { name, pixels, size, id, rows, columns } = controller;
        add({ id, name, pixels, size, row: rows, column: columns });
    };

    const reset = async () => {
        controller.resetArtboard();
        controller.name = '';
    };

    const exportJson = () => {
        if (controller.name) {
            const json = JSON.stringify({
                name: controller.name,
                pixels: controller.pixels,
                id: controller.id,
                row: controller.rows,
                column: controller.columns,
            });
            const blob = new Blob([json], { type: 'text/plain' });
            const href = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = href;
            a.download = controller.name + '.json';
            a.click();
            setTimeout(() => {
                URL.revokeObjectURL(href);
            }, 100);
        }
    };

    const components = [
        { onClick: () => back(), Component: Back },
        { onClick: () => forward(), Component: Forward },
        { onClick: () => download(), Component: Download },
        { onClick: () => addToCollect(), Component: Heart },
        { onClick: reset, Component: Reset },
        { onClick: exportJson, Component: Export },
    ];

    return (
        <Container>
            {components.map(({ onClick, Component }) => {
                return (
                    <TipButton
                        key={Component.displayName}
                        onClick={onClick}
                        tip={Component.displayName}
                        className='tip'
                        bgColor={theme.bgSecondary}
                        ftColor={theme.ftSecondary}
                        direction='top'
                        style={{ backgroundColor: theme.bgSecondary }}
                    >
                        <Component stroke={theme.ftSecondary} />
                    </TipButton>
                );
            })}
        </Container>
    );
}
