'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, RefreshCw } from 'lucide-react';

interface SelfieCaptureProps {
  onCapture: (base64Image: string) => void;
}

export function SelfieCapture({ onCapture }: SelfieCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => setIsReady(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size to desired dimensions (500x500)
    canvas.width = 500;
    canvas.height = 500;

    // Calculate crop dimensions
    const size = Math.min(video.videoWidth, video.videoHeight);
    const startX = (video.videoWidth - size) / 2;
    const startY = (video.videoHeight - size) / 2;

    // Draw and crop the image
    context.drawImage(
      video,
      startX, startY, size, size,  // Source crop
      0, 0, 500, 500              // Destination dimensions
    );

    // Convert to base64
    const base64Image = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(base64Image);
    onCapture(base64Image);
    stopCamera();
  };

  const retake = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <div className="relative w-[500px] h-[500px] mx-auto rounded-2xl overflow-hidden bg-black">
      {/* Overlay Guide */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full border-[3px] border-white/30 rounded-full m-auto">
          <div className="absolute inset-0 border-[3px] border-white/60 rounded-full m-4"></div>
        </div>
      </div>

      {/* Video/Image Display */}
      {capturedImage ? (
        <img
          src={capturedImage}
          alt="Captured selfie"
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform scale-x-[-1]"
        />
      )}

      {/* Hidden Canvas for Processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Controls */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 z-20">
        {capturedImage ? (
          <Button
            onClick={retake}
            variant="secondary"
            size="lg"
            className="rounded-full px-6 py-6 bg-white/20 hover:bg-white/30 backdrop-blur-md border-2 border-white/30"
          >
            <RefreshCw className="w-6 h-6 mr-2" />
            Retake
          </Button>
        ) : (
          <Button
            onClick={captureImage}
            disabled={!isReady}
            size="lg"
            className="rounded-full w-16 h-16 p-0 bg-white hover:bg-white/90 text-black"
          >
            <Camera className="w-8 h-8" />
          </Button>
        )}
      </div>

      {/* Loading State */}
      {!isReady && !capturedImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-30">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}