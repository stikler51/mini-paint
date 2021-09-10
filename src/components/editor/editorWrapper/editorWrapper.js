import React from 'react';
import DrawingArea from '../drawingArea/drawingArea';
import ToolPanel from '../toolPanel/toolPanel';
import styles from './editorWrapper.module.scss';

const EditorWrapper = () => (
  <div className={styles.wrapper}>
    <ToolPanel />
    <DrawingArea />
  </div>
);

export default EditorWrapper;
