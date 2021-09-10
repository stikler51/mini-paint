export default {
  onMouseDown: (e, context, canvasOffset, setIsPainting) => {
    console.log('yo down');
    setIsPainting(true);
    const start = {
      top: e.pageY - canvasOffset.top,
      left: e.pageX - canvasOffset.left
    };

    return start;
  },

  onMouseMove: (e, context, canvasOffset, isPainting, startPos, imageData) => {
    console.log('yo move');
    if (isPainting) {
      const finishPos = {
        x: e.pageX - canvasOffset.left,
        y: e.pageY - canvasOffset.top
      };
      context.clearRect(0, 0, 760, 480);
      context.putImageData(imageData, 0, 0);
      context.beginPath();
      context.moveTo(startPos.left, startPos.top);
      context.lineTo(finishPos.x, finishPos.y);
      context.stroke();
    }
  },

  onMouseUp: (setIsPainting) => {
    console.log('yo up');
    setIsPainting(false);
  }
};
