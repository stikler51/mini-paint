import React, { useState, useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { enableTool, setColor, setLineWidth } from '../../../store/toolSlice'
import styles from './toolPanel.module.scss'
import useClickOutside from '../../../hooks/useClickOutside'
import { ToolReduxSliceType, ToolButton } from '../../../types/types'

const tools: ToolButton[] = [
  { value: 'pen', icon: '/icons/pen.svg' },
  { value: 'rectangle', icon: '/icons/rectangle.svg' },
  { value: 'ellipse', icon: '/icons/ellipse.svg' },
  { value: 'line', icon: '/icons/line.svg' },
  { value: 'bucket', icon: '/icons/paint-bucket.svg' },
  { value: 'eraser', icon: '/icons/eraser.svg' },
]

const ToolPanel = () => {
  const [openWidthButton, setOpenWidthButton] = useState<boolean | null>(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { activeTool, color, lineWidth } = useAppSelector<ToolReduxSliceType>((state) => state.tool.value)
  const theme = useAppSelector<string>((state) => state.theme.value)
  const dispatch = useAppDispatch()

  useClickOutside(wrapperRef, () => setOpenWidthButton(false))

  return (
    <div className={styles[theme]}>
      {tools.map((tool) => (
        <button
          type="button"
          key={tool.value}
          onClick={() => dispatch(enableTool(tool.value))}
          className={`${styles.toolButton} ${activeTool === tool.value ? styles.activeTool : ''}`}
        >
          <img src={tool.icon} alt={`${tool.value} tool`} />
        </button>
      ))}

      <button type="button" onClick={() => setOpenWidthButton(true)} className={styles.toolButton}>
        <img src="/icons/width.svg" alt="line width tool" />

        {openWidthButton ? (
          <div className={styles.lineWidthWrapper} ref={wrapperRef}>
            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={lineWidth}
              onChange={(e) => dispatch(setLineWidth(+e.target.value))}
            />
            <div className={styles.widthExample} style={{ height: lineWidth, background: color }} />
            <span>
              {lineWidth}
              px
            </span>
          </div>
        ) : (
          ''
        )}
      </button>

      <div className={`${styles.colorPickerWrapper}`}>
        <div style={{ background: color }} className={styles.colorIndicator}>
          <input
            type="color"
            onChange={(e) => dispatch(setColor(e.target.value))}
            className={styles.colorPicker}
            defaultValue={color}
          />
        </div>
      </div>
    </div>
  )
}

export default ToolPanel
