import { createSlice } from '@reduxjs/toolkit';

// used for setting up tools
export const toolSlice = createSlice({
  name: 'tool',
  initialState: {
    value: {
      activeTool: 'pen',
      color: '#000000',
      lineWidth: 1
    }
  },
  reducers: {
    enableTool: (state, action) => {
      state.value = {
        activeTool: action.payload,
        color: state.value.color,
        lineWidth: state.value.lineWidth
      };
    },
    setColor: (state, action) => {
      state.value = {
        activeTool: state.value.activeTool,
        color: action.payload,
        lineWidth: state.value.lineWidth
      };
    },
    setLineWidth: (state, action) => {
      state.value = {
        activeTool: state.value.activeTool,
        color: state.value.color,
        lineWidth: action.payload
      };
    }
  }
});

export const { enableTool, setColor, setLineWidth } = toolSlice.actions;

export default toolSlice.reducer;
