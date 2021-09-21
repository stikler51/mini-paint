import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { prevArtState, nextArtState } from '../../../store/artSlice';
import styles from '../toolPanel/toolPanel.module.scss';

const HistoryPanel = () => {
  const { currentPosition, artHistory } = useAppSelector((state) => state.art.value);
  const theme = useAppSelector<string>((state) => state.theme.value);
  const dispatch = useAppDispatch();

  const onKeysPress = (e: KeyboardEvent) => {
    if (e.keyCode === 90 && e.ctrlKey) {
      if (currentPosition > 0) {
        dispatch(prevArtState());
      }
    }

    if (e.keyCode === 89 && e.ctrlKey) {
      if (currentPosition < 20 && currentPosition < artHistory.length - 1) {
        dispatch(nextArtState());
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeysPress);
    return () => {
      document.removeEventListener('keydown', onKeysPress);
    };
  }, [currentPosition]);

  return (
    <div className={styles[theme]}>
      <button
        type="button"
        className={`${styles.toolButton}`}
        disabled={currentPosition === 0}
        onClick={() => {
          if (currentPosition > 0) {
            dispatch(prevArtState());
          }
        }}
      >
        <img src="/icons/undo.svg" alt="Undo" />
      </button>
      <button
        type="button"
        className={`${styles.toolButton}`}
        disabled={currentPosition >= artHistory.length - 1}
        onClick={() => {
          if (currentPosition < 20 && artHistory.length > currentPosition) {
            dispatch(nextArtState());
          }
        }}
      >
        <img src="/icons/redo.svg" alt="Redo" />
      </button>
    </div>
  );
};

export default HistoryPanel;
