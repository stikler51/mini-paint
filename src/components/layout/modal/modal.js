import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './modal.module.scss';
import { closeModal } from '../../../store/modalSlice';

const Modal = () => {
  const { isOpen, data } = useSelector((state) => state.modal.value);
  const dispatch = useDispatch();
  const modalRef = useRef();

  function useOutsideClick(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(closeModal());
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideClick(modalRef);

  if (isOpen) {
    return (
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={modalRef}>
          <img src={data} alt="User's art" />
        </div>
      </div>
    );
  }

  return '';
};

export default Modal;
