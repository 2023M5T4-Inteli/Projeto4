import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Modal = styled(motion.div)`
    position: fixed;
    top: 50%;
    left: 50%;
    opacity: 1;
    /* transform: translate(-50%, -50%); */
    min-width: 30%;

    box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);
    padding: 20px;
    background-color: ${props => props.theme.colors.white};
    border-radius: 3px;
    z-index: 150;
`

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h5 {
        font-size: 26px;
        font-weight: 300;
        color: ${props => props.theme.colors.greyDark1};
    }

    svg {
        width: 30px;
        height: 30px;
        fill: ${props => props.theme.colors.greyDark2};
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
        }
    }
`

export const ModalBody = styled.div`
    padding-top: 30px;
`
