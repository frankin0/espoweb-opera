import styled from "styled-components";

interface StyledWrapperProps {
    width: string;
    innerSize: 'default' | 'large' | 'small';
}
export const StyledWrapper = styled.div<StyledWrapperProps>`
    position: relative;
    width: 0px;
    height: 0px;
`;

export const StyledModal = styled.div`
    padding: 0px;
`;