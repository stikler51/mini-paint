import { createSlice } from '@reduxjs/toolkit';

export const toolSlice = createSlice({
  name: 'tool',
  initialState: {
    value: {
      activeTool: null
    }
  },
  reducers: {
    enableTool: (state, action) => {
      state.value = {
        activeTool: action.payload
      };
    }
  }
});

export const { enableTool } = toolSlice.actions;

export default toolSlice.reducer;
