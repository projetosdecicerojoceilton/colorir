window.addEventListener("load", function(event) {

  // Evento de "puxar para baixo" (pull-to-refresh)
window.addEventListener('touchmove', function(event) {
  // Verifica se o usuário está puxando para baixo
  if (window.scrollY === 0) {
    event.preventDefault(); // Previne o comportamento padrão do navegador
  }
}, { passive: false });


  // =============
  // == Globals ==
  // =============
  const canvas = document.getElementById('drawing-area');
  const canvasContext = canvas.getContext('2d');
  const clearButton = document.getElementById('clear-button');
  const state = {
    mousedown: false
  };
  
  // ===================
  // == Configuration ==
  // ===================
  let lineWidth = 1;
  const halfLineWidth = lineWidth / 2;
  const fillStyle = '#000';
  let strokeStyle = '#000';
  let shadowColor = '#000';
  const shadowBlur = lineWidth / 4;
  
  // =====================
  // == Event Listeners ==
  // =====================
  canvas.addEventListener('mousedown', handleWritingStart);
  canvas.addEventListener('mousemove', handleWritingInProgress);
  canvas.addEventListener('mouseup', handleDrawingEnd);
  canvas.addEventListener('mouseout', handleDrawingEnd);
  
  canvas.addEventListener('touchstart', handleWritingStart);
  canvas.addEventListener('touchmove', handleWritingInProgress);
  canvas.addEventListener('touchend', handleDrawingEnd);
  
  clearButton.addEventListener('click', handleClearButtonClick);
  
  // ====================
  // == Event Handlers ==
  // ====================
  function handleWritingStart(event) {
    event.preventDefault();
  
    const mousePos = getMosuePositionOnCanvas(event);
    
    canvasContext.beginPath();
  
    canvasContext.moveTo(mousePos.x, mousePos.y);
  
    canvasContext.lineWidth = lineWidth;
    canvasContext.strokeStyle = strokeStyle;
    canvasContext.shadowColor = null;
    canvasContext.shadowBlur = null;
  
    canvasContext.fill();
  
    canvasContext.fillStyle = "white";
    
    state.mousedown = true;
  }
  
  function handleWritingInProgress(event) {
    event.preventDefault();
    
    if (state.mousedown) {
      const mousePos = getMosuePositionOnCanvas(event);
  
      canvasContext.lineTo(mousePos.x, mousePos.y);
      canvasContext.stroke();
    }
  }
  
  function handleDrawingEnd(event) {
    event.preventDefault();
    
    if (state.mousedown) {
      canvasContext.shadowColor = shadowColor;
      canvasContext.shadowBlur = shadowBlur;
  
      canvasContext.stroke();
    }
    
    state.mousedown = false;
  }
  
  function handleClearButtonClick(event) {
    event.preventDefault();
    
    clearCanvas();
  }
  
  // ======================
  // == Helper Functions ==
  // ======================
  function getMosuePositionOnCanvas(event) {
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    const { offsetLeft, offsetTop } = event.target;
    const canvasX = clientX - offsetLeft;
    const canvasY = clientY - offsetTop;
  
    return { x: canvasX, y: canvasY };
  }
  
  document.getElementById("brushWidth").addEventListener("change", function() {
    const brushWidthInput = document.getElementById('brushWidth');
    let linhalargura = parseInt(brushWidthInput.value);
  
    // Garanta que a largura do pincel seja um número inteiro
    if (isNaN(linhalargura) || linhalargura < 1) {
      linhalargura = 1;
    } else if (brushWidth > 20) {
      linhalargura = 20;
    }
  
    // Atualizar a largura do pincel conforme o valor inserido
    lineWidth = linhalargura;
  });
  
  document.getElementById("downloadCanvas").addEventListener("click", function() {

    window.location.href = "http://127.0.0.1:5500/download.html?data=" + canvas.toDataURL();

    /*const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'imagem.png';
    link.click();*/

  });
  
  document.getElementById("colorSelect").addEventListener("change", function() {
    strokeStyle = this.value;
    shadowColor =  this.value;
  });
  
  
  function clearCanvas() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  }                                                    
  
  });
