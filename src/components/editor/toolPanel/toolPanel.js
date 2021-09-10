import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enableTool } from '../../../store/toolSlice';
import styles from './toolPanel.module.scss';

const tools = [
  { value: 'pen', icon: '/icons/pen.svg' },
  { value: 'rectangle', icon: '/icons/rectangle.svg' },
  { value: 'ellipse', icon: '/icons/ellipse.svg' }
];

const ToolPanel = () => {
  const { activeTool } = useSelector((state) => state.tool.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(activeTool);
  }, [activeTool]);

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
    </div>
  );
};

export default ToolPanel;
