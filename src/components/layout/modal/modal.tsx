import React, { useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import styles from './modal.module.scss'
import { closeModal } from '../../../store/modalSlice'
import useClickOutside from '../../../hooks/useClickOutside'
import { ModalReduxSliceType } from '../../../types/types'

const Modal = () => {
  const { isOpen, data } = useAppSelector<ModalReduxSliceType>((state) => state.modal.value)
  const dispatch = useAppDispatch()
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, () => dispatch(closeModal()))

  if (isOpen) {
    return (
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={modalRef}>
          <img src={data} alt="User's art" />
        </div>
      </div>
    )
  }

  return <></>
}

export default Modal
