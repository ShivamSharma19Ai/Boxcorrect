import React, { useState } from 'react'
import '../../App.css'
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import {Text, StyleSheet} from 'react-native';
export default function Check() {
  const [count, setCount]=useState("Hi welcome to online Boxing Gym");
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  
  
  const detectWebcamFeed = async (posenet_model) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      function distance(x,  y){
        return  Math.sqrt(((pose.keypoints[x].position.x-pose.keypoints[y].position.x)**2)+((pose.keypoints[x].position.y-pose.keypoints[y].position.y)**2));
      }
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // Make Estimation
      const pose = await posenet_model.estimateSinglePose(video);
      //L Shoulder Wrist
      var LSW = distance(6,10);
      //L Shoulder Elbow
      const LSE = distance(6,8);
      //R Shoulder Wrist
      var RSW=distance(5,9);
      //R Shoulder Elbow
      const RSE=distance(5,7);
      //L hip Ankle
      var LHA=distance(12,16);
      //R Hip Ankle
      var RHA=distance(11,15);
      //L Hip Knee
      const LHK=distance(12,14);
      //R Hip Knee
      const RHK=distance(11,13);
      //L R Shoulder
      const LRS= distance(6,5);
      //L R Ankle
      const LRA= distance(16,15);
      //L Shoulder Hip
      var LSH = distance(6,12);
      //R Shoulder Hip
      var RSH = distance(5,11);

      if(LSW>(1.8*LSE) && RSW>(1*RSE)){
        setCount("Keep Your Right hand Up while jabbing");
      }
      
      if(LHA>1.9*LHK && RHA>1.9*RHK){
        setCount("Sit on your punches bend your legs");
      }
  
      
      if(pose.keypoints[10].position.y<=pose.keypoints[12].position.y){
        setCount("Keep your hand up after jabbing don' let it go down");
      }
      
      if(LRA<LRS){
       setCount(" Try to keep your feet shoulder width apart");
      }
      if(LSH<0.7*LHA || RSH<0.7*RHA){
        setCount("Do not lean on the punches");
      }
      
      /*
      if(RSW>(1.8*RSE) && LSW>(1.2*LSE)){
        console.log("Keep Your Left hand Up while throwing a cross");
      }
      
      //console.log(pose.keypoints[0].position.x);
      /*
      if((pose.keypoints[10].position.x - pose.keypoints[6].position.x)>1.7*(pose.keypoints[8].position.x - pose.keypoints[6].position.x) && (pose.keypoints[11].position.x - pose.keypoints[7].position.x)>1*(pose.keypoints[9].position.x - pose.keypoints[7].position.x)){
        console.log("Keep Your Right hand Up while jabbing");
      }
      if((pose.keypoints[11].position.x - pose.keypoints[7].position.x)>1.7*(pose.keypoints[9].position.x - pose.keypoints[7].position.x) && (pose.keypoints[10].position.x - pose.keypoints[6].position.x)>1*(pose.keypoints[8].position.x - pose.keypoints[6].position.x)){
        console.log("Keep Your Left hand Up while throwing a cross");
      }
      */
      drawResult(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };
  const runPosenet = async () => {
    const posenet_model = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8
    });
    //
    setInterval(() => {
      detectWebcamFeed(posenet_model);
    }, 1000);
  };
  runPosenet();
  const drawResult = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };
  return (
   
    <div className="Check">
        <header className="App-header">
            <Webcam
              ref={webcamRef}
              style={{
                position: 'relative',
                zIndex: 9,
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                width: 640,
                height: 480
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                zIndex: 9,
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                width: 640,
                height: 480
              }}
            />
            <h1 style={{position:'relative' }} >{count}</h1>
            <button style={{position: 'relative', marginBottom:"5%" }} onClick={runPosenet}>+</button>  
          </header>
    </div>
  );
}