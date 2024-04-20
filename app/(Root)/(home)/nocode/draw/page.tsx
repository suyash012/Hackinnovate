"use client";
import React, { useRef, useState } from 'react';

const DrawingApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [selectedTool, setSelectedTool] = useState<string>('pencil');
  const [brushSize, setBrushSize] = useState<number>(5);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const newCtx = canvasRef.current.getContext('2d');
    if (!newCtx) return;
    setCtx(newCtx);

    const { offsetX, offsetY } = e.nativeEvent;
    newCtx.beginPath();
    newCtx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current) return;

    const { offsetX, offsetY } = e.nativeEvent;
    if (selectedTool === 'eraser') {
      ctx.clearRect(offsetX - brushSize / 2, offsetY - brushSize / 2, brushSize, brushSize);
    } else if (selectedTool === 'pencil') {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const handleToolChange = (tool: string) => {
    setSelectedTool(tool);
  };

  const handleBrushSizeChange = (size: number) => {
    setBrushSize(size);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="border border-black"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={finishDrawing}
            onMouseOut={finishDrawing}
            style={{ cursor: selectedTool === 'eraser' ? 'crosshair' : 'pointer' }}
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedTool === 'pencil' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            }`}
            onClick={() => handleToolChange('pencil')}
          >
            Pencil
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedTool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            }`}
            onClick={() => handleToolChange('eraser')}
          >
            Eraser
          </button>
          <select
            value={brushSize}
            onChange={(e) => handleBrushSizeChange(Number(e.target.value))}
            className="px-4 py-2 rounded-lg bg-gray-300 text-black"
          >
            <option value={5}>Small</option>
            <option value={10}>Medium</option>
            <option value={15}>Large</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DrawingApp;
