import styled from 'styled-components';

import { Pixels, usePixelArtboardDownload } from '../../pixel';
import { formatDate, formatSize } from '../../utils';

import CollectImage from './CollectImage';
import Remove from '../icons/Remove';
import Download from '../icons/Download';
import { Collect } from '../../context/CollectContext';

const Container = styled.li`
    list-style: none;
    background-color: #f1f5f8;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    margin: 0 10px;
`;

const CollectInfo = styled.div`
    color: #ccc;
    display: flex;
    font-size: 12px;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;
`;
const CollectName = styled.span`
    display: block;
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis; //文本溢出显示省略号
    white-space: nowrap; //文本不会换行
`;
const Button = styled.button`
    padding: 0;
    border: none;
    background-color: transparent;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const ButtonGroup = styled.div`
    display: flex;
`;

export interface CollectItemProps extends Collect {
    remove: (tiem: string) => void;
}

const Size = styled.span`
    font-size: 12px;
    color: #444;
`;

export default function CollectItem({ time, name, remove, size, ...rest }: CollectItemProps) {
    const { downloadByPixels } = usePixelArtboardDownload();

    return (
        <Container>
            <CollectImage {...rest} name={name} />
            <CollectInfo>
                <CollectName title={name}>{name ?? 'xl'}</CollectName>
                <span title={formatDate(time, 'YYYY/MM/DD HH:mm')}>{formatDate(time, 'M/D')}</span>
            </CollectInfo>
            <div
                style={{
                    marginTop: 5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Size>{formatSize(size)}</Size>
                <ButtonGroup>
                    <Button
                        onClick={() => downloadByPixels(rest.pixels, rest.row, rest.column, name)}
                    >
                        <Download stroke={'#333'} />
                    </Button>
                    <Button onClick={() => remove(rest.id)}>
                        <Remove stroke={'#333'} />
                    </Button>
                </ButtonGroup>
            </div>
        </Container>
    );
}
