import React, { useEffect, useState } from "react";
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
import Draggable from "react-draggable";
import useVideoSDK from "../hook/useVideoSdk";

const MiniMeetingModal = ({ modalIsOpen, handleModal, size }) => {
  let isMiniModal = true;
  const { setSessionContainer, setControlContainer } = useVideoSDK(
    modalIsOpen,
    handleModal,
    (isMiniModal = true)
  );

  useEffect(() => {
    const container = document.getElementById("sessionMiniContainer");
    const controlContainer = document.getElementById("controlComponent");
    setSessionContainer(container);

    setControlContainer(controlContainer);
  }, [setSessionContainer, setControlContainer]);

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
         
        </div>
      </div>
    </Draggable>
  );
};

export default MiniMeetingModal;
