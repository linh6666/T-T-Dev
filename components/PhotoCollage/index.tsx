"use client";

import React, { useState, useRef } from "react";
import NextImage from "next/image";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import {
  IconPhotoPlus,
  IconDownload,
  IconReplace,
  IconCirclePlus,
  IconCircleMinus,
  IconX,
} from "@tabler/icons-react";
import "./styles.css";

const CANVAS_SIZE = 450;
const EXPORT_SIZE = 1200;

export default function PhotoCollage() {
  const [image, setImage] = useState<string | null>(null);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const transformWrapperRef = useRef<ReactZoomPanPinchRef>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const currentCanvasWidth = canvasWrapperRef.current?.getBoundingClientRect().width || CANVAS_SIZE;
          const scaleW = currentCanvasWidth / img.width;
          const scaleH = currentCanvasWidth / img.height;
          const initialScale = Math.max(scaleW, scaleH);
          
          setImgDimensions({ width: img.width, height: img.height });
          setImage(src);
          
          setTimeout(() => {
            if (transformWrapperRef.current) {
              // Reset transform first to avoid cumulative issues
              transformWrapperRef.current.setTransform(0, 0, initialScale, 0);
              transformWrapperRef.current.centerView(initialScale);
            }
          }, 100);
        };
        img.src = src;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!image || !transformWrapperRef.current) return;
    
    try {
      const canvas = document.createElement("canvas");
      canvas.width = EXPORT_SIZE;
      canvas.height = EXPORT_SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Đồng nhất màu nền với editor
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, EXPORT_SIZE, EXPORT_SIZE);

      // Lấy trạng thái hiện tại của TransformWrapper
      const state = transformWrapperRef.current.instance?.transformState 
        || transformWrapperRef.current.state 
        || { positionX: 0, positionY: 0, scale: 1 };

      const currentCanvasWidth = canvasWrapperRef.current?.getBoundingClientRect().width || CANVAS_SIZE;
      const exportScaleRatio = EXPORT_SIZE / currentCanvasWidth;

      // 1. Tải ảnh người dùng
      const img = new Image();
      const imgPromise = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      img.src = image;
      await imgPromise;

      ctx.save();
      
      // Áp dụng translation rồi đến scale (khớp với cách library render)
      ctx.translate(state.positionX * exportScaleRatio, state.positionY * exportScaleRatio);
      ctx.scale(state.scale * exportScaleRatio, state.scale * exportScaleRatio);
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      
      // Vẽ ảnh với kích thước gốc (vì logic scale/translate của thư viện dựa trên kích thước phần tử trong DOM)
      // Trong UI, chúng ta đã đổi width/height của NextImage thành imgDimensions.width/height
      ctx.drawImage(img, 0, 0, imgDimensions.width, imgDimensions.height);
      ctx.restore();

      // 2. Tải và vẽ khung ảnh
      const frameImg = new Image();
      const framePromise = new Promise((resolve, reject) => {
        frameImg.onload = resolve;
        frameImg.onerror = () => reject(new Error("Không thể tải khung nền"));
      });
      frameImg.src = "/Khung%20MohinhViet.png";
      await framePromise;
      
      ctx.drawImage(frameImg, 0, 0, EXPORT_SIZE, EXPORT_SIZE);

      const link = document.createElement("a");
      link.download = `T&T_Moment_${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (error) {
      console.error("Lỗi khi kết xuất ảnh:", error);
      alert("Đã có lỗi xảy ra. Hãy chắc chắn bạn đã tải ảnh lên và thử lại!");
    }
  };

  return (
    <div className="photo-collage-container">
      
      <div className="collage-header">
        <h1 className="collage-title">Ghép Khung Ảnh</h1>
        <p className="collage-subtitle">
          Tải ảnh lên <span>→</span> Điều chỉnh <span>→</span> Tải về
        </p>
      </div>

      {!image ? (
        <div className="upload-box-wrapper" onClick={() => fileInputRef.current?.click()}>
          <div className="upload-box-glow" />
          <div className="upload-box-border" />
          <div className="upload-box-content">
            <div className="upload-icon-container">
              <IconPhotoPlus size={48} stroke={1.5} />
            </div>
            <div style={{ textAlign: "center" }}>
              <h3 className="upload-text-main">Nhấn để chọn ảnh</h3>
              <p className="upload-text-sub">PNG, JPG, WEBP</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="editor-container">
          
          <div className="canvas-area">
            <button 
              className="close-btn" 
              onClick={() => setImage(null)}
              title="Gỡ ảnh"
            >
              <IconX size={24} stroke={3} />
            </button>
            <div 
              ref={canvasWrapperRef}
              className="canvas-wrapper" 
            >
              <TransformWrapper
                ref={transformWrapperRef}
                initialScale={1}
                centerOnInit={true}
                minScale={0.1}
                maxScale={10}
                onTransformed={(p) => setZoom(p.state.scale)}
              >
                <TransformComponent 
                  wrapperStyle={{ width: "100%", height: "100%" }}
                  contentStyle={{ width: "fit-content", height: "fit-content" }}
                >
                  <NextImage 
                    src={image} 
                    alt="User" 
                    width={imgDimensions.width}
                    height={imgDimensions.height}
                    unoptimized
                    style={{ 
                      width: "auto",
                      height: "auto",
                      maxWidth: "none", 
                      display: "block",
                      userSelect: "none"
                    }} 
                  />
                </TransformComponent>
              </TransformWrapper>
              
              <NextImage 
                src="/Khung%20MohinhViet.png" 
                alt="Frame" 
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  width: "100%", 
                  height: "100%", 
                  pointerEvents: "none", 
                  zIndex: 10, 
                  objectFit: "fill" 
                }} 
              />
              
              <div className="floating-hint">
                <span className="hint-pill">Kéo để di chuyển • Cuộn để zoom</span>
              </div>
            </div>
          </div>

          <div className="controls-area">
            <div className="control-panel">
              <h4 className="panel-title">1. Điều chỉnh kích thước</h4>
              <div className="zoom-controls">
                <button onClick={() => transformWrapperRef.current?.zoomOut()} className="zoom-btn">
                  <IconCircleMinus size={22} />
                </button>
                <input
                  type="range"
                  min="0.1" max="10" step="0.01"
                  value={zoom}
                  onChange={(e) => {
                    const newScale = parseFloat(e.target.value);
                    transformWrapperRef.current?.setTransform(
                      transformWrapperRef.current.instance.transformState.positionX,
                      transformWrapperRef.current.instance.transformState.positionY,
                      newScale,
                      0
                    );
                  }}
                  className="range-slider"
                />
                <button onClick={() => transformWrapperRef.current?.zoomIn()} className="zoom-btn">
                  <IconCirclePlus size={22} />
                </button>
              </div>
              <p style={{ color: "#4b5563", fontSize: "12px", marginTop: "10px", textAlign: "center" }}>
                Độ phóng đại: {Math.round(zoom * 100)}%
              </p>
            </div>

            <div className="action-buttons">
              <button onClick={() => fileInputRef.current?.click()} className="btn-secondary">
                <IconReplace size={20} /> Đổi ảnh
              </button>
              <button onClick={handleDownload} className="btn-primary">
                <IconDownload size={20} /> Tải về
              </button>
            </div>
          </div>
        </div>
      )}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept="image/*" 
      />

      {/* Decorative Background */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: -10, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "40%", height: "40%", backgroundColor: "rgba(139, 92, 246, 0.1)", filter: "blur(120px)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "40%", height: "40%", backgroundColor: "rgba(236, 72, 153, 0.1)", filter: "blur(120px)", borderRadius: "50%" }} />
      </div>
    </div>
  );
}
