import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Collect } from '../../context/CollectContext';

import { Pixels, usePixelArtboard } from '../../pixel';
import { blobToImgSrc, toBlob } from '../../utils';

export type CollectImageProps = Omit<Collect, 'time' | 'size'>;

const Image = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    vertical-align: top;
`;

const Container = styled.div`
    margin: 0 auto;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;

    &:hover {
        background-color: #fff;
    }
`;

export default function CollectImage({
    pixels,
    name,
    id,
    row,
    column,
    width,
    height,
}: CollectImageProps) {
    const { controller } = usePixelArtboard();
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        (async () => {
            const url = blobToImgSrc(await toBlob(pixels, row, column, width, height));
            setUrl(url);
        })();
    }, [pixels, row, column]);

    const modify = () => controller.modify({ pixels, name, id, row, column, width, height });

    return (
        <Container onClick={modify}>
            {url && (
                <Image
                    src={url}
                    alt='collect image'
                    onLoad={() => url && URL.revokeObjectURL(url)}
                />
            )}
        </Container>
    );
}
