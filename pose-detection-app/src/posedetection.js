import React, { useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs';

const PoseDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const runPoseNet = async () => {
      const net = await posenet.load();
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const detectPose = async () => {
        const poses = await net.estimateMultiplePoses(video, {
          flipHorizontal: false,
          maxDetections: 5,
          scoreThreshold: 0.6,
          nmsRadius: 20,
        });

        // Draw poses on the canvas
        context.clearRect(0, 0, video.width, video.height);
        poses.forEach(({ score, keypoints }) => {
          if (score >= 0.6) {
            posenet.drawKeypoints(keypoints, 0.6, context);
            posenet.drawSkeleton(keypoints, 0.6, context);
          }
        });

        requestAnimationFrame(detectPose);
      };

      if (video && canvas) {
        video.width = video.clientWidth;
        video.height = video.clientHeight;

        canvas.width = video.width;
        canvas.height = video.height;

        detectPose();
      }
    };

    runPoseNet();
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ display: 'none' }}
      />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PoseDetection;