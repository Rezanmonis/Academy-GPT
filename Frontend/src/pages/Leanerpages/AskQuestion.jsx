// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { PiCameraLight } from "react-icons/pi";
// import { LuSendHorizontal } from "react-icons/lu";
// import Webcam from "react-webcam";
// import { IoMdAttach } from "react-icons/io";
// import ReactMarkdown from "react-markdown";
// import "./AskQuestion.css";
// import { motion } from "framer-motion";

// // Image processing helper function
// const processImage = async (imageFile) => {
//   return new Promise((resolve, reject) => {
//     // Check file type
//     if (!imageFile.type.match(/^image\/(jpeg|png)$/)) {
//       reject(new Error("Only JPEG and PNG images are allowed"));
//       return;
//     }

//     const img = new Image();
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       img.src = e.target.result;
//       img.onload = () => {
//         // Create canvas for resizing
//         const canvas = document.createElement("canvas");
//         let width = img.width;
//         let height = img.height;

//         // Max dimensions
//         const MAX_WIDTH = 1200;
//         const MAX_HEIGHT = 1200;

//         // Resize if needed
//         if (width > MAX_WIDTH || height > MAX_HEIGHT) {
//           if (width > height) {
//             height *= MAX_WIDTH / width;
//             width = MAX_WIDTH;
//           } else {
//             width *= MAX_HEIGHT / height;
//             height = MAX_HEIGHT;
//           }
//         }

//         canvas.width = width;
//         canvas.height = height;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0, width, height);

//         // Convert to Blob
//         canvas.toBlob(
//           (blob) => {
//             resolve(
//               new File([blob], imageFile.name, {
//                 type: "image/jpeg",
//                 lastModified: Date.now(),
//               })
//             );
//           },
//           "image/jpeg",
//           0.8
//         );
//       };
//     };
//     reader.onerror = reject;
//     reader.readAsDataURL(imageFile);
//   });
// };

// function AskQuestion() {
//   const [subject, setSubject] = useState("");
//   const [inputText, setInputText] = useState("");
//   const [file, setFile] = useState(null);
//   const [cameraMode, setCameraMode] = useState(false);
//   const [pastQA, setPastQA] = useState([]);
//   const [preferredAnswer, setPreferredAnswer] = useState("aiAnswer");
//   const [capturedImage, setCapturedImage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [conversationId, setConversationId] = useState(null);
//   const [userLanguage, setUserLanguage] = useState("en");
//   const [isMobileDevice, setIsMobileDevice] = useState(false);

//   const chatEndRef = useRef(null);
//   const webcamRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const mobileCameraInputRef = useRef(null);

//   const { student_id } = useSelector((state) => state.user.user || {});

//   useEffect(() => {
//     const detectLanguage = () => {
//       const browserLang = navigator.language || navigator.userLanguage;
//       setUserLanguage(browserLang.split("-")[0]);
//     };

//     const detectDevice = () => {
//       const isMobile =
//         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//           navigator.userAgent
//         );
//       setIsMobileDevice(isMobile);
//     };

//     detectLanguage();
//     detectDevice();
//   }, []);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [pastQA]);

//   const handleCameraClick = () => {
//     if (isMobileDevice) {
//       mobileCameraInputRef.current?.click();
//     } else {
//       setCameraMode(true);
//     }
//   };

//   const handleMobileCameraCapture = async (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       try {
//         const processedImage = await processImage(file);
//         setFile(processedImage);
//         setInputText("Captured Image");
//       } catch (error) {
//         alert(error.message);
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     setInputText(e.target.value);
//   };

//   const handleFileChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       try {
//         const processedImage = await processImage(selectedFile);
//         setFile(processedImage);
//         setInputText(selectedFile.name);
//       } catch (error) {
//         alert(error.message);
//       }
//     }
//   };

//   const formatTextOnlyHistory = (history) => {
//     return history
//       .filter((qa) => !qa.image)
//       .map((qa) => ({
//         question: qa.question,
//         answer: qa.answer,
//       }));
//   };

//   const handleCaptureImage = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       try {
//         // Convert base64 to blob
//         const response = await fetch(imageSrc);
//         const blob = await response.blob();
//         const imageFile = new File([blob], "captured-image.jpg", {
//           type: "image/jpeg",
//         });

//         const processedImage = await processImage(imageFile);
//         setCapturedImage(URL.createObjectURL(processedImage));
//         setFile(processedImage);
//         setCameraMode(false);
//         setInputText("Captured Image");
//       } catch (error) {
//         alert("Error processing captured image: " + error.message);
//       }
//     }
//   };

//   const handleSend = async () => {
//     if (!inputText.trim() && !file && !capturedImage) return;

//     if (!student_id) {
//       alert("Student ID is not available. Please log in.");
//       return;
//     }

//     setIsLoading(true);

//     const fullQuestion = `Question: ${inputText}`;
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");

//     try {
//       let response;

//       if (preferredAnswer === "onlineClassroom") {
//         const formData = new FormData();
//         formData.append("student_id", student_id);
//         formData.append("query", fullQuestion);
//         formData.append("subject", subject);

//         if (file) {
//           formData.append("image", file);
//         }

//         response = await axios.post(
//           "https://academy-gpt-backend.onrender.com/courses/student-queries",
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         const newQA = {
//           question: fullQuestion,
//           answer: response.data.response || "Query submitted successfully.",
//           image: file ? URL.createObjectURL(file) : null,
//           timestamp: new Date().toISOString(),
//           conversationId: null,
//           subject,
//         };

//         setPastQA((prev) => [...prev, newQA]);
//         setInputText("");
//         setFile(null);
//         setCapturedImage(null);
//       } else {
//         const formData = new FormData();

//         if (file) {
//           formData.append("image", file);
//           formData.append("question", fullQuestion);
//           formData.append("language", userLanguage);

//           response = await axios.post(
//             "https://academy-gpt.onrender.com/api/chat-with-image",
//             formData,
//             {
//               headers: { "Content-Type": "multipart/form-data" },
//             }
//           );
//         } else {
//           response = await axios.post(
//             "https://academy-gpt.onrender.com/api/chat",
//             {
//               question: fullQuestion,
//               chatHistory: conversationId ? formatTextOnlyHistory(pastQA) : [],
//               conversationId: conversationId,
//               language: userLanguage,
//               resetConversation: conversationId === null,
//             }
//           );
//         }

//         const newQA = {
//           question: fullQuestion,
//           answer: response.data.response,
//           image: file ? URL.createObjectURL(file) : null,
//           timestamp: new Date().toISOString(),
//           conversationId: conversationId,
//           subject,
//         };

//         setPastQA((prev) => [...prev, newQA]);
//         setInputText("");
//         setFile(null);
//         setCapturedImage(null);
//       }
//     } catch (error) {
//       console.error("Error details:", error.response?.data || error.message);
//       alert(
//         "An error occurred while processing your request. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const renderAnswer = (answer) => {
//     return (
//       <div className="answer-container">
//         <p className="answer-label">Answer:</p>
//         <ReactMarkdown
//           className="markdown-content"
//           components={{
//             p: ({ children }) => (
//               <p className="markdown-paragraph">{children}</p>
//             ),
//             strong: ({ children }) => (
//               <span className="markdown-strong">{children}</span>
//             ),
//           }}>
//           {answer}
//         </ReactMarkdown>
//       </div>
//     );
//   };

//   const startNewConversation = () => {
//     setConversationId(null);
//     setSubject("");
//     setPastQA([]);
//   };

//   return (
//     <div className="h-screen flex flex-col bg-gray-50">
//       <div className="flex-1 flex flex-col w-full mx-auto bg-white rounded-lg shadow-md">
//         <form
//           className="flex flex-col h-full space-y-2"
//           onSubmit={(e) => e.preventDefault()}>
//           <div className="flex justify-between items-center">
//             <input
//               className="w-full h-10 border-b-2 border-black/70 px-2 focus:outline-none"
//               type="text"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               placeholder="Subject (optional)"
//             />
//             {conversationId && (
//               <button
//                 type="button"
//                 onClick={startNewConversation}
//                 className="ml-2 px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300">
//                 New Conversation
//               </button>
//             )}
//           </div>

//           <div className="flex-1 border-2 rounded-md overflow-hidden">
//             <div className="h-full overflow-y-auto p-4 space-y-4">
//               {pastQA.map((qa, index) => (
//                 <div key={index} className="space-y-2">
//                   <div className="flex">
//                     <div className="bg-blue-100 p-3 rounded-lg max-w-[100%]">
//                       <p className="text-sm font-semibold text-gray-600 mb-1">
//                         Your Question:
//                       </p>
//                       <p>{qa.question}</p>
//                       {qa.image && (
//                         <img
//                           src={qa.image}
//                           alt="Attached"
//                           className="mt-2 rounded-md object-cover max-w-full h-auto"
//                         />
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex">{renderAnswer(qa.answer)}</div>
//                 </div>
//               ))}
//               <div ref={chatEndRef} />
//             </div>
//           </div>

//           <motion.div
//             initial={{ y: 100, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.6, type: "spring" }}
//             className="sticky z-30 bottom-0 space-y-2 xl:w-full bg-white w-full">
//             <div className="flex items-center space-x-5 px-2">
//               <p className="text-lg font-semibold">Preferred Answer</p>
//               <div className="flex space-x-5">
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="preferredAnswer"
//                     value="onlineClassroom"
//                     id="onlineClassroom"
//                     checked={preferredAnswer === "onlineClassroom"}
//                     onChange={(e) => setPreferredAnswer(e.target.value)}
//                     className="form-radio"
//                   />
//                   <label htmlFor="onlineClassroom">Online Classroom</label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="preferredAnswer"
//                     value="aiAnswer"
//                     id="aiAnswer"
//                     checked={preferredAnswer === "aiAnswer"}
//                     onChange={(e) => setPreferredAnswer(e.target.value)}
//                     className="form-radio"
//                   />
//                   <label htmlFor="aiAnswer">AI</label>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center w-full space-x-4 p-2 border-2 rounded-full">
//               <div className="flex space-x-4">
//                 <label htmlFor="fileInput" className="cursor-pointer">
//                   <IoMdAttach className="text-2xl text-gray-600 hover:text-gray-800" />
//                 </label>
//                 <input
//                   id="fileInput"
//                   type="file"
//                   accept="image/jpeg,image/png"
//                   onChange={handleFileChange}
//                   ref={fileInputRef}
//                   className="hidden"
//                 />
//                 <input
//                   type="file"
//                   accept="image/jpeg,image/png"
//                   capture="environment"
//                   onChange={handleMobileCameraCapture}
//                   ref={mobileCameraInputRef}
//                   className="hidden"
//                 />
//                 <PiCameraLight
//                   className="text-2xl text-gray-600 hover:text-gray-800 cursor-pointer"
//                   onClick={handleCameraClick}
//                 />
//               </div>
//               <input
//                 className="flex-1 px-4 py-2 focus:outline-none"
//                 type="text"
//                 placeholder="Ask your question..."
//                 value={inputText}
//                 onChange={handleInputChange}
//                 onKeyPress={handleKeyPress}
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 onClick={handleSend}
//                 disabled={isLoading}
//                 className={`p-2 rounded-full ${
//                   isLoading ? "bg-gray-400" : "bg-primary hover:bg-primary"
//                 } text-white`}>
//                 <LuSendHorizontal  className="text-2xl" />
//               </button>
//             </div>
//           </motion.div>
//         </form>
//       </div>

//       {!isMobileDevice && cameraMode && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-4 rounded-lg">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               className="mb-4"
//             />
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 onClick={handleCaptureImage}>
//                 Capture
//               </button>
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                 onClick={() => setCameraMode(false)}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AskQuestion;

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { PiCameraLight } from "react-icons/pi";
import { LuSendHorizontal } from "react-icons/lu";
import Webcam from "react-webcam";
import { IoMdAttach } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

import "./AskQuestion.css";
import { motion } from "framer-motion";

// Image processing helper function
const processImage = async (imageFile) => {
  return new Promise((resolve, reject) => {
    // Check file type
    if (!imageFile.type.match(/^image\/(jpeg|png)$/)) {
      reject(new Error("Only JPEG and PNG images are allowed"));
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = () => {
        // Create canvas for resizing
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Max dimensions
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;

        // Resize if needed
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          } else {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to Blob
        canvas.toBlob(
          (blob) => {
            resolve(
              new File([blob], imageFile.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
            );
          },
          "image/jpeg",
          0.8
        );
      };
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });
};

function AskQuestion() {
  const [subject, setSubject] = useState("");
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState(null);
  const [cameraMode, setCameraMode] = useState(false);
  const [pastQA, setPastQA] = useState([]);
  const [preferredAnswer, setPreferredAnswer] = useState("onlineClassroom");
  const [capturedImage, setCapturedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [userLanguage, setUserLanguage] = useState("en");
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [loading, setLoading] = useState(false); 
  const { t } = useTranslation();

  const chatEndRef = useRef(null);
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const mobileCameraInputRef = useRef(null);

  const { student_id } = useSelector((state) => state.user.user || {});

  useEffect(() => {
    const detectLanguage = () => {
      const browserLang = navigator.language || navigator.userLanguage;
      setUserLanguage(browserLang.split("-")[0]);
    };

    const detectDevice = () => {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobileDevice(isMobile);
    };

    detectLanguage();
    detectDevice();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [pastQA]);

  const handleCameraClick = () => {
    if (isMobileDevice) {
      mobileCameraInputRef.current?.click();
    } else {
      setCameraMode(true);
    }
  };

  const handleMobileCameraCapture = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const processedImage = await processImage(file);
        setFile(processedImage);
        setInputText("Captured Image");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        const processedImage = await processImage(selectedFile);
        setFile(processedImage);
        setInputText(selectedFile.name);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const formatTextOnlyHistory = (history) => {
    return history
      .filter((qa) => !qa.image)
      .map((qa) => ({
        question: qa.question,
        answer: qa.answer,
      }));
  };

  const handleCaptureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      try {
        // Convert base64 to blob
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        const imageFile = new File([blob], "captured-image.jpg", {
          type: "image/jpeg",
        });

        const processedImage = await processImage(imageFile);
        setCapturedImage(URL.createObjectURL(processedImage));
        setFile(processedImage);
        setCameraMode(false);
        setInputText("Captured Image");
      } catch (error) {
        alert("Error processing captured image: " + error.message);
      }
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() && !file && !capturedImage) return;

    if (!student_id) {
      alert("Student ID is not available. Please log in.");
      return;
    }

    setIsLoading(true);

    const fullQuestion = `Question: ${inputText}`;
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      let response;

      if (preferredAnswer === "onlineClassroom") {
        const formData = new FormData();
        formData.append("student_id", student_id);
        formData.append("query", fullQuestion);
        formData.append("subject", subject);

        if (file) {
          formData.append("image", file);
        }

        response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/courses/student-queries`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const newQA = {
          question: fullQuestion,
          answer: response.data.response || "Query submitted successfully.",
          image: file ? URL.createObjectURL(file) : null,
          timestamp: new Date().toISOString(),
          conversationId: null,
          subject,
        };

        setPastQA((prev) => [...prev, newQA]);
        setInputText("");
        setFile(null);
        setCapturedImage(null);
      } else {
        const formData = new FormData();

        if (file) {
          formData.append("image", file);
          formData.append("question", fullQuestion);
          formData.append("language", userLanguage);

          response = await axios.post(
            "https://academy-gpt.onrender.com/api/chat-with-image",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
        } else {
          response = await axios.post(
            "https://academy-gpt.onrender.com/api/chat",
            {
              question: fullQuestion,
              chatHistory: conversationId ? formatTextOnlyHistory(pastQA) : [],
              conversationId: conversationId,
              language: userLanguage,
              resetConversation: conversationId === null,
            }
          );
        }

        const newQA = {
          question: fullQuestion,
          answer: response.data.response,
          image: file ? URL.createObjectURL(file) : null,
          timestamp: new Date().toISOString(),
          conversationId: conversationId,
          subject,
        };

        setPastQA((prev) => [...prev, newQA]);
        setInputText("");
        setFile(null);
        setCapturedImage(null);
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      alert(
        "An error occurred while processing your request. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderAnswer = (answer) => {
    return (
      <div className="answer-container">
        <p className="answer-label">Answer:</p>
        <ReactMarkdown
          className="markdown-content"
          components={{
            p: ({ children }) => (
              <p className="markdown-paragraph">{children}</p>
            ),
            strong: ({ children }) => (
              <span className="markdown-strong">{children}</span>
            ),
          }}>
          {answer}
        </ReactMarkdown>
      </div>
    );
  };

  const startNewConversation = () => {
    setConversationId(null);
    setSubject("");
    setPastQA([]);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex flex-col w-full mx-auto bg-white rounded-lg shadow-md">
        <form
          className="flex flex-col h-full space-y-2"
          onSubmit={(e) => e.preventDefault()}>
          <div className="flex justify-between items-center">
            <input
              className="w-full h-10 border-b-2 border-black/70 px-2 focus:outline-none"
              type="text"
              value={subject}
              required
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject "
            />
            {conversationId && (
              <button
                type="button"
                onClick={startNewConversation}
                className="ml-2 px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300">
                New Conversation
              </button>
            )}
          </div>

          <div className="flex-1 border-2 rounded-md overflow-hidden">
            <div className="h-full overflow-y-auto p-4 space-y-4">
              {pastQA.map((qa, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex">
                    <div className="bg-blue-100 p-3 rounded-lg max-w-[100%]">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        Your Question:
                      </p>
                      <p>{qa.question}</p>
                      {qa.image && (
                        <img
                          src={qa.image}
                          alt="Attached"
                          className="mt-2 rounded-md object-cover max-w-full h-auto"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex">{renderAnswer(qa.answer)}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="sticky z-30 bottom-0 space-y-2 xl:w-full bg-white w-full">
            <div className="flex items-center space-x-5 px-2">
              <p className="text-lg font-semibold">
              {t("Preferred Answer")}
              </p>
              <div className="flex space-x-5">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="preferredAnswer"
                    value="onlineClassroom"
                    id="onlineClassroom"
                    checked={preferredAnswer === "onlineClassroom"}
                    onChange={(e) => setPreferredAnswer(e.target.value)}
                    className="form-radio"
                  />
                  <label htmlFor="onlineClassroom">
                  {t("Online Classroom")}</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="preferredAnswer"
                    value="aiAnswer"
                    id="aiAnswer"
                    checked={preferredAnswer === "aiAnswer"}
                    onChange={(e) => setPreferredAnswer(e.target.value)}
                    className="form-radio"
                  />
                  <label htmlFor="aiAnswer">
                  {t("AI")}</label>
                </div>
              </div>
            </div>

            <div className="flex items-center w-full space-x-4 p-2 border-2 rounded-full">
              <div className="flex space-x-4">
                <label htmlFor="fileInput" className="cursor-pointer">
                  <IoMdAttach className="text-2xl text-gray-600 hover:text-gray-800" />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  capture="environment"
                  onChange={handleMobileCameraCapture}
                  ref={mobileCameraInputRef}
                  className="hidden"
                />
                <PiCameraLight
                  className="text-2xl text-gray-600 hover:text-gray-800 cursor-pointer"
                  onClick={handleCameraClick}
                />
              </div>
              <input
                className="flex-1 px-4 py-2 focus:outline-none"
                type="text"
                placeholder={t("Ask your Question")}
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={isLoading}
                className={`p-2 rounded-full ${
                  isLoading ? "bg-gray-400" : "bg-primary hover:bg-primary"
                } text-white`}>
                <LuSendHorizontal  className="text-2xl" />
              </button>
            </div>
          </motion.div>
        </form>
      </div>

      {!isMobileDevice && cameraMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="mb-4"
            />
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleCaptureImage}>
                Capture
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setCameraMode(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AskQuestion;