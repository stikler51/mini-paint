import { createSlice } from '@reduxjs/toolkit';

export const toolSlice = createSlice({
  name: 'tool',
  initialState: {
    value: {
      activeTool: 'pen',
      color: '#000000'
    }
  },
  reducers: {
    enableTool: (state, action) => {
      state.value = {
        activeTool: action.payload,
        color: state.value.color
      };
    },
    setColor: (state, action) => {
      state.value = {
        activeTool: state.value.activeTool,
        color: action.payload
      };
    }
  }
});

export const { enableTool, setColor } = toolSlice.actions;

export default toolSlice.reducer;
