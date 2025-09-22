import { IKContext, IKUpload } from "imagekitio-react";
import { MdAttachFile } from "react-icons/md";
import { useRef } from "react";

// Get environment variables from Vite
const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

// Define the authenticator function for secure uploads
const authenticator = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/upload`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ setImage }) => {
  const IKUploadRef = useRef(null);

  // Handle error on upload
  const onError = (err) => {
    console.error("Error during upload:", err);
  };

  // Handle success on upload
  const onSuccess = (res) => {
    console.log("Upload successful:", res);
    setImage((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  // Track upload progress
  const onUploadProgress = (progress) => {
    console.log("Upload progress:", progress);
  };

  // Triggered when upload starts
  const onUploadStart = (evt) => {
    console.log("Upload started:", evt);
    setImage((prev) => ({ ...prev, isLoading: true }));
  };

  return (
    <>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticationEndpoint={authenticator} // Fetch authentication params
      >
        <IKUpload
          fileName="test-upload.png" // You can dynamically set this based on user input
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          useUniqueFileName={true} // Ensures the filename is unique
          style={{ display: "none" }} // Hidden input
          ref={IKUploadRef} // Ref to trigger upload
        />
        {/* Attach button triggers file upload */}
        <label
          className="newFormLabel"
          onClick={() => IKUploadRef.current.click()}>
          <MdAttachFile className="text-xl md:text-2xl lg:text-3xl cursor-pointer" />
        </label>
      </IKContext>
    </>
  );
};

export default Upload;
