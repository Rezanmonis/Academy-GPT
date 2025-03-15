import React, { useEffect, useState, useRef } from "react";
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
import Draggable from "react-draggable";
import useVideoSDK from "../hook/useVideoSdk";

const MiniMeetingModal = ({ modalIsOpen, handleModal, size }) => {
  let isMiniModal = true;
  // const { setSessionContainer, setControlContainer } = useVideoSDK(
  //   modalIsOpen,
  //   handleModal,
  //   (isMiniModal = true)
  // );

  // useEffect(() => {
  //   const container = document.getElementById("sessionMiniContainer");
  //   const controlContainer = document.getElementById("controlComponent");
  //   setSessionContainer(container);

  //   setControlContainer(controlContainer);
  // }, [setSessionContainer, setControlContainer]);
  const videoRef = useRef(null);

  useEffect(() => {
    // Simulate enabling a video stream locally without API call
    const enableVideo = async () => {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      }
    };

    enableVideo();

    return () => {
      // Stop video stream when the component is unmounted
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [modalIsOpen]);

  return (
    <Draggable>
      <div
        style={{
          zIndex: 99,
          position: "absolute",
          left: "75%",
          top: "30%",
          backgroundColor: "#FAFAFA",
          border: "1px solid gray",
          borderRadius: "15px",
        }}
      >
        <div
          style={{
            backgroundColor: "#D3443C",
            justifyItems: "center",
            fontSize: "26px",
          }}
          className="rounded-t-[15px]"
        >
          <h4>Video is Active</h4>
        </div>
        <div
          id="sessionMiniContainer"
          style={{ display: "flex", flexDirection: "row-reverse" }}
        >
         <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: "300px",
              height: "200px",
              border: "1px solid gray",
              borderRadius: "10px",
            }}
          ></video>
        </div>
      </div>
    </Draggable>
  );
};

export default MiniMeetingModal;
