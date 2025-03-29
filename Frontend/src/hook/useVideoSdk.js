import { useEffect, useState } from "react";
import { KJUR } from "jsrsasign";
import uitoolkit from "@zoom/videosdk-ui-toolkit";

const useVideoSDK = (modalIsOpen, handleModal, isMiniModal) => {
  const [sessionContainer, setSessionContainer] = useState(null);
  const [controlContainer, setControlContainer] = useState(null);
  const [videoSDKJWT, setVideoSDKJWT] = useState("");

  useEffect(() => {
    // console.log({ isMiniModal });

  
    
    const authToken = ''
  

    if (isMiniModal) {
      if (modalIsOpen && sessionContainer && controlContainer) {
        getVideoSDKJWT();
      }
    }
    if (modalIsOpen && sessionContainer) {
      getVideoSDKJWT();
    }

    return () => {
      //   if (isMiniModal) observer.disconnect();
      if (sessionContainer) {
        uitoolkit.closeSession(sessionContainer);
        handleModal("close");
      }
    };
  }, [modalIsOpen, sessionContainer, controlContainer]); // Added sessionContainer to dependencies




  

  const generateSignature = async () => {
    return await fetch(import.meta.env.VITE_ZOOM_SIGNATURE_END_POINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}` // Replace `authToken` with your token variable
      },
      
    });
    
    
  }


  // async function parseZoomUrl() {
  //   const zoomUrl = await meetingUrlResponse()
  //   const url = new URL(zoomUrl);
  //   const params = url.searchParams;
  
  //   const meetingNumber = url.pathname.split("/").pop(); // Extract the meeting number from the URL path
  //   const passWord = params.get("pwd"); // Get the password from the query string
  //   const userName = params.get("uname"); // Get the user name from the query string (if available)
  
  //   return {
  //     meetingNumber,
  //     passWord,
  //     userName: userName || "Guest", // Default to "Guest" if userName is not provided
  //   };
  // }
  


  const getVideoSDKJWT = async () => {
    const token = await generateSignature();
    setVideoSDKJWT(token);
    joinSession(token);
  };

  const joinSession = (token) => {
    if (sessionContainer) {
      console.log(
        "dkaf",token
      )

      
      const config = {
        
        videoSDKJWT: token,
        sessionName: "test",
       
        features: isMiniModal
          ? ["video"]
          : ["video", "audio", "settings", "users", "chat", "share"],
        options: { init: {}, audio: {}, video: {} },
        virtualBackground: {
          allowVirtualBackground: true,
          allowVirtualBackgroundUpload: true,
          virtualBackgrounds: [
            "https://images.unsplash.com/photo-1715490187538-30a365fa05bd?q=80&w=1945&auto=format&fit=crop",
          ],
        },
      };

      //   uitoolkit.showControlsComponent(controlContainer);
      uitoolkit.joinSession(sessionContainer, config);

      uitoolkit.onSessionJoined(sessionJoined);
      uitoolkit.onSessionClosed(sessionClosed);
    }else {
      console.log("container not found")
    }
  };
  const sessionJoined = () => {
    console.log("session jodfadjklajf lk");
    uitoolkit.hideControlsComponent();
  };

  const sessionClosed = () => {
    if (sessionContainer) {
      uitoolkit.closeSession(sessionContainer);
      handleModal("close");
    }
  };

  console.log({ videoSDKJWT })
  return { setSessionContainer, setControlContainer, videoSDKJWT };
};

export default useVideoSDK;
