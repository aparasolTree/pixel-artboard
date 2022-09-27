import styled, { useTheme } from 'styled-components';
import ColorProvider from '../context/ColorContex';
import Collect from './Collect';
import ColorPanel from './ColorPanel';
import Rows from './Rows';
import Columns from './Columns';
import Card from './common/Card';
import OperationMenu from './OperationMenu';
import Width from './Width';
import Height from './Height';

const Container = styled.div`
    flex: 1;
    padding: 0 10px;
`;

export default function Sidebar() {
    const { theme } = useTheme() as DefaultTheme;

    return (
        <Container style={{ backdropFilter: 'blur(3px)', color: theme.ftSecondary }}>
            <ColorProvider>
                <Collect bgColor={theme.bgSecondary} ftColor={theme.ftSecondary}></Collect>
                <div>
                    <h2>Picker</h2>
                    <ColorPanel></ColorPanel>
                    <Card
                        bgColor={theme.bgSecondary}
                        ftColor={theme.ftSecondary}
                        style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20 }}
                    >
                        <Rows />
                        <Columns />
                    </Card>
                    <Card
                        bgColor={theme.bgSecondary}
                        ftColor={theme.ftSecondary}
                        style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20 }}
                    >
                        <Width />
                        <Height />
                    </Card>
                </div>
                <OperationMenu></OperationMenu>
            </ColorProvider>
        </Container>
    );
}
