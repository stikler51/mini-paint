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
      const rectangle = {
        width: e.pageX - canvasOffset.left - startPos.left,
        height: e.pageY - canvasOffset.top - startPos.top
      };
      context.clearRect(0, 0, 760, 480);
      context.putImageData(imageData, 0, 0);
      if (e.shiftKey) {
        context.strokeRect(
          startPos.left,
          startPos.top,
          rectangle.width,
          rectangle.height < 0 && rectangle.width > 0 // 4th quarter (x; -y)
            ? -rectangle.width
            : rectangle.height < 0 && rectangle.width < 0 // 3rd quarter (-x; -y)
              ? rectangle.width
              : rectangle.height > 0 && rectangle.width < 0 // 2nd quarter (-x; y)
                ? -rectangle.width
                : rectangle.width // 1st quarter (x; y)
        );
      } else {
        context.strokeRect(startPos.left, startPos.top, rectangle.width, rectangle.height);
      }
    }
  },

  onMouseUp: (setIsPainting) => {
    console.log('yo up');
    setIsPainting(false);
  }
};
