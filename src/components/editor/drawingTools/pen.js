export default {
  onMouseDown: (e, context, canvasOffset, setIsPainting) => {
    console.log('yo down');
    setIsPainting(true);
    context.beginPath();
    context.moveTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
  },

  onMouseMove: (e, context, canvasOffset, isPainting) => {
    console.log('yo move');
    if (isPainting) {
      context.lineTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
      context.stroke();
    }
  },

  onMouseUp: (setIsPainting) => {
    console.log('yo up');
    setIsPainting(false);
  }
};
