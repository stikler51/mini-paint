import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enableTool, setColor } from '../../../store/toolSlice';
import styles from './toolPanel.module.scss';

const tools = [
  { value: 'pen', icon: '/icons/pen.svg' },
  { value: 'rectangle', icon: '/icons/rectangle.svg' },
  { value: 'ellipse', icon: '/icons/ellipse.svg' },
  { value: 'line', icon: '/icons/line.svg' }
];

const ToolPanel = () => {
  const { activeTool, color } = useSelector((state) => state.tool.value);
  const dispatch = useDispatch();
  console.log('yyooyoy', color);

  return (
    <div className={styles.toolPanelWrapper}>
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
