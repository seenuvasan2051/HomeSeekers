/* eslint-disable react/prop-types */
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openModalName, setOpenModalName] = useState("");

  const closeModal = () => setOpenModalName("");

  const openModal = setOpenModalName;

  return (
    <ModalContext.Provider value={{ openModalName, closeModal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, children }) {
  const { openModal } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => openModal(opens) });
}

function Window({ render, name }) {
  const { openModalName, closeModal } = useContext(ModalContext);
  // NOTE: React portal places the html in a desired position of the dom tree but does not alter the component tree making it ideal for react developers to pass the props.

  if (name !== openModalName) return null;

  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={closeModal}>
          <HiXMark />
        </Button>
        <div>{render && render(closeModal)}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
