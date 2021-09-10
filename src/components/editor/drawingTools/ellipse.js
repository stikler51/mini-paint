export default {
  onMouseDown: (e, context, canvasOffset, setIsPainting) => {
    console.log('yo down');
    setIsPainting(true);
    context.fillStyle = 'rgb(200,0,0)';
    const start = {
      top: e.pageY - canvasOffset.top,
      left: e.pageX - canvasOffset.left
    };

    return start;
  },

  onMouseMove: (e, context, canvasOffset, isPainting, startPos, imageData) => {
    console.log('yo move');
    if (isPainting) {
      const radiusX = Math.round((e.pageX - canvasOffset.left - startPos.left) / 2);
      const radiusY = Math.round((e.pageY - canvasOffset.top - startPos.top) / 2);
      context.clearRect(0, 0, 760, 480);
      context.putImageData(imageData, 0, 0);
      context.beginPath();
      if (e.shiftKey) {
        context.arc(
          radiusY < 0 && radiusX > 0 // 4th quarter (x; -y)
            ? startPos.left - radiusY
            : radiusY < 0 && radiusX < 0 // 3rd quarter (-x; -y)
              ? startPos.left + radiusY
              : radiusY > 0 && radiusX < 0 // 2nd quarter (-x; y)
                ? startPos.left - radiusY
                : startPos.left + radiusY, // 1st quarter (x; y)
          startPos.top + radiusY,
          Math.abs(radiusY),
          0,
          2 * Math.PI
        );
      } else {
        context.ellipse(
          startPos.left + radiusX,
          startPos.top + radiusY,
          Math.abs(radiusX),
          Math.abs(radiusY),
          0,
          0,
          2 * Math.PI
        );
      }
      context.stroke();
    }
  },

  onMouseUp: (setIsPainting) => {
    console.log('yo up');
    setIsPainting(false);
  }
};
