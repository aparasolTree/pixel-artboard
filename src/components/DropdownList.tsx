import React from 'react';
import styled from 'styled-components';

export interface DropdownListProps {
    trigger: React.ReactNode;
    backgroundColor?: string;
    children?: React.ReactNode;
}

const DropdownListContainer = styled.div`
    height: var(--header-height);
    display: flex;
    cursor: pointer;
    padding: 0 10px;
    position: relative;
    align-items: center;
    justify-content: center;
    z-index: 9999;

    &:hover .dropdown-list {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
`;

const DropdownMenu = styled.div<{ backgroundColor?: string }>`
    width: 200px;
    padding: 10px;
    position: absolute;
    right: 10%;
    top: 50px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(100%);
    border-radius: 10px;
    border: 1px solid rgba(84, 84, 84, 0.25);
    background-color: ${(props) => props.backgroundColor ?? '#f1f5f8'};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;

export default function DropdownList({ backgroundColor, children, trigger }: DropdownListProps) {
    return (
        <DropdownListContainer className='color-transition'>
            {trigger}
            <DropdownMenu className='dropdown-list' backgroundColor={backgroundColor}>
                {children}
            </DropdownMenu>
        </DropdownListContainer>
    );
}
