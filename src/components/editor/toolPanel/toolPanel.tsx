import React, { useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { enableTool, setColor, setLineWidth } from '../../../store/toolSlice';
import styles from './toolPanel.module.scss';
import useClickOutside from '../../../hooks/useClickOutside';

const tools = [
  { value: 'pen', icon: '/icons/pen.svg' },
  { value: 'rectangle', icon: '/icons/rectangle.svg' },
  { value: 'ellipse', icon: '/icons/ellipse.svg' },
  { value: 'line', icon: '/icons/line.svg' }
];

const ToolPanel = () => {
  const [openWidthButton, setOpenWidthButton] = useState<boolean | null>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { activeTool, color, lineWidth } = useAppSelector<{
    activeTool: string,
    color: string,
    lineWidth: number
  }>((state) => state.tool.value);
  const theme = useAppSelector<string>((state) => state.theme.value);
  const dispatch = useAppDispatch();

  const clickOutsideCb = () => {
    setOpenWidthButton(false);
  };

  useClickOutside(wrapperRef, clickOutsideCb);

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

      <button
        type="button"
        onClick={() => setOpenWidthButton(true)}
        className={styles.toolButton}
      >
        <img src="/icons/width.svg" alt="line width tool" />

        {
          openWidthButton
            ? (
              <div className={styles.lineWidthWrapper} ref={wrapperRef}>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={lineWidth}
                  onChange={(e) => dispatch(setLineWidth(+e.target.value))}
                />
                <div
                  className={styles.widthExample}
                  style={{ height: lineWidth, background: color }}
                />
                <span>
                  {lineWidth}
                  px
                </span>
              </div>
            )
            : ''
        }
      </button>

      <div className={`${styles.colorPickerWrapper}`}>
        <div style={{ background: color }} className={styles.colorIndicator}>
          <input
            type="color"
            onBlur={(e) => dispatch(setColor(e.target.value))}
            className={styles.colorPicker}
            defaultValue={color}
          />
        </div>
      </div>
    </div>
  );
};

export default ToolPanel;
