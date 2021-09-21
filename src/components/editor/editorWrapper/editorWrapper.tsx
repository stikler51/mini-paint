import React from 'react'
import DrawingArea from '../drawingArea/drawingArea'
import ToolPanel from '../toolPanel/toolPanel'
import HistoryPanel from '../historyActions/historyPanel'
import styles from './editorWrapper.module.scss'

const EditorWrapper = () => (
  <div className={styles.wrapper}>
    <ToolPanel />
    <DrawingArea />
    <HistoryPanel />
  </div>
)

export default EditorWrapper
