// import { useState } from "react";
// import {Link,  useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import LoginNavbar from "../Componets/loginNavbar";
// import { updateUser } from "../features/userSlice";
// import { fetchTeacherProfile } from "../features/teacherSlice";
// import facebook from "../assets/Image/facebook.png";
// import google from "../assets/Image/google.png";
// import apple from "../assets/Image/apple.png";
// import login from "../assets/Image/Login.png";

// const LoginPages = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

//   const validateInputs = () => {
//     setError(null);
//     if (!email.trim()) {
//       setError("Email is required");
//       return false;
//     }
//     if (!password) {
//       setError("Password is required");
//       return false;
//     }
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailRegex.test(email.trim())) {
//       setError("Please enter a valid email address");
//       return false;
//     }
//     return true;
//   };

//   const handleLogin = async () => {
//     if (!validateInputs()) return;

//     try {
//       setError(null);
//       setIsLoading(true);

//       const response = await axios.post(
//         "https://api.academygpt.net/api/auth/login/",
//         { email: email.trim(), password },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (response.data?.statusCode === 200 && response.data?.data?.access) {
//         const { access, user } = response.data.data;

//         if (rememberMe) {
//           localStorage.setItem("token", access);
//         } else {
//           sessionStorage.setItem("token", access);
//         }

//         if (user.is_student) {
//           dispatch(
//             updateUser({
//               ...user,
//               username: `${user.first_name} ${user.last_name}`,
//             })
//           );
//           navigate("/leanernavbar");
//         } else if (user.is_teacher) {
//           dispatch(fetchTeacherProfile(user.teacher_id));
//           navigate("/tutornavbar");
//         } else {
//           setError("Unknown user role.");
//         }
//       } else {
//         setError("Invalid response from server.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.detail || "Login failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleLogin(); // Call the login function on pressing Enter
//     }
//   };

// const handleSocialLogin = () => {
//     if (isLoading) return;
    
//   };


//   return (
//     <>
//       <LoginNavbar />
//       <div className="lg:flex mt-8 px-8 h-screen lg:h-full relative font-urbanist">
//         <div className="lg:w-1/2 md:px-16 lg:px-20 md:my-auto">
//           <h2 className="text-center text-4xl font-bold">LOGIN</h2>
//           <p className="text-center text-black/70 text-lg">
//             Login to access your account
//           </p>
//           <form className="py-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full p-2 pl-5 border-[1px] border-black rounded-lg"
//               disabled={isLoading}
//             />
//             <div className="relative mt-1">
//               {passwordVisible ? (
//                 <AiOutlineEye
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
//                   size={20}
//                 />
//               ) : (
//                 <AiOutlineEyeInvisible
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
//                   size={20}
//                 />
//               )}
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-2 pl-5 border-[1px] border-black rounded-lg"
//                 disabled={isLoading}
//               />
//             </div>
//             {error && <p className="text-red-500 text-sm">{error}</p>}
//             <div className="flex justify-between">
//               <label className="text-sm flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   disabled={isLoading}
//                 />
//                 Remember me
//               </label>
//               <Link to="/forgotpassword">
//                 <p className="text-sm text-primary">Forgot Password?</p>
//               </Link>
//             </div>
//             <button
//               type="button"
//               className={`p-2 w-full rounded-md text-white bg-primary ${
//                 isLoading ? "opacity-70 cursor-not-allowed" : ""
//               }`}
//               onClick={handleLogin}
//               disabled={isLoading}>
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//           <p className="text-center text-sm py-2 font-medium">
//             Don&apos;t have an account?{" "}
//             <Link to="/signuppages" className="text-primary">
//               Sign up
//             </Link>
//           </p>
//           <div className="flex py-5">
//             <hr className="w-1/2 border-t-[0.5px] h-1 border-[#313131] my-auto" />
//             <p className="whitespace-nowrap text-sm px-2">Or login with</p>
//             <hr className="w-1/2 border-t-[0.5px] h-1 border-[#313131] my-auto" />
//           </div>
//           <div className="flex space-x-3">
//             <button
//               className="p-3 w-full justify-center flex border-[1px] rounded-md border-black"
//               onClick={() => handleSocialLogin("facebook")}
//               disabled={isLoading}>
//               <img
//                 className="w-6 my-auto"
//                 src={facebook}
//                 alt="Facebook login"
//               />
//             </button>
//             <button
//               className="p-3 w-full justify-center flex border-[1px] rounded-md border-black"
//               onClick={() => handleSocialLogin("google")}
//               disabled={isLoading}>
//               <img className="w-6 my-auto" src={google} alt="Google login" />
//             </button>
//             <button
//               className="p-3 w-full justify-center flex border-[1px] rounded-md border-black"
//               onClick={() => handleSocialLogin("apple")}
//               disabled={isLoading}>
//               <img className="w-6 my-auto" src={apple} alt="Apple login" />
//             </button>
//           </div>
//         </div>
//         <div className="hidden lg:flex lg:w-1/2 mx-auto lg:my-auto">
//           <div className="mx-auto flex justify-center">
//             <img
//               className="lg:max-h-[540px] xl:min-h-full justify-center"
//               src={login}
//               alt="Login"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginPages;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoginNavbar from "../Componets/loginNavbar";
import { updateUser } from "../features/userSlice";
import { fetchTeacherData } from "../features/teacherSlice"; // Correct import
import facebook from "../assets/Image/facebook.png";
import google from "../assets/Image/google.png";
import apple from "../assets/Image/apple.png";
import login from "../assets/Image/Login.png";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';


const LoginPages = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showNumberCode, setShowNumberCode] = useState(false);
  const [verifiactionToken,setVerificationToken] = useState()
  const [userData,setUserData] = useState()
  const baseURL = import.meta.env.VITE_BASE_URL

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const validateInputs = () => {
    setError(null);
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      setError(null);
      setIsLoading(true);

      const response = await axios.post(
        "https://academy-gpt-backend.onrender.com/api/auth/login",
        { email: email.trim(), password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("ress login",response)
      if (response.status === 202) {
        setShowNumberCode(true);
        setUserData(response.data)
      }
      if (response.data?.status) { 
        const { access, user } = response.data.data;
        setUserData
        if (rememberMe) {
          localStorage.setItem("token", access);
        } else {
          sessionStorage.setItem("token", access);
        }

        if (user.is_student) {
          dispatch(
            updateUser({
              ...user,
              username: `${user.first_name} ${user.last_name}`,
            })
          );
          navigate("/leanernavbar");
        } else if (user.is_teacher) {
          dispatch(fetchTeacherData()); // Corrected to fetch teacher profile
          navigate("/tutornavbar");
        } else {
          setError("Unknown user role.");
        }
      } else {
        setError("Invalid response from server.");
        toast.error(response.data.detail )}
        // setShowNumberCode(true);


    } catch (err) {
      console.error(err);
      toast.error(err.response.data?.message);

      setError(err.response?.data?.detail || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(); // Call the login function on pressing Enter
    }
  };

  const handleSocialLogin = () => {
    if (isLoading) return;
    // Add social login logic here if needed
  };

  const handleVerifyOTP =async ()=>{
    console.log("calling")
    try {
      console.log("user+++++>",userData.user)
      const response = await axios.post(
        `${baseURL}auth/verify-mfa`,
        {
          user:userData.user,
          token:verifiactionToken
        }
      );
console.log("calllllllll---.",response)
      if (response.data.statusCode === 200) {
        const responseData = response.data.data.user
        sessionStorage.setItem("token", response.data.data.access);

        if (responseData.is_student) {
          dispatch(
            updateUser({
              ...responseData,
              username: `${user.first_name} ${user.last_name}`,
            })
          );
          navigate("/leanernavbar");
        } else if (responseData.is_teacher) {
          dispatch(fetchTeacherData()); // Corrected to fetch teacher profile
          navigate("/tutornavbar");
        } else {
          setError("Unknown user role.");
        }



      }
      console.log("resonseee===>",response)
    } catch (error) {
      console.log("errr===>",error)

      if ( error?.response?.status===400) {

        console.error("Response data:", error.response.data); // Backend response
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
        setError(
          
            "Server error occurred. Please try again."
        );
        toast.error(error.response.data?.detail)
      } else if (error.request) {
        // console.error("Request error:", error.request);
        setError("No response from server. Please check your connection.");
      } else {
        // console.error("Error", error.message);
        setError("Registration failed. Please try again.");
      }
    }
  }

  const handleResendOTP =async ()=>{
    try {
      const response = await axios.post(
        `${baseURL}auth/resend-mfa-code`,
        {
          email:email
        }
      );

      if (response.status === 201) {
        setShowNumberCode(true);
      }
    } catch (error) {
      if ( error.response.status===400) {

        console.error("Response data:", error.response.data); // Backend response
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
        setError(
          
            "Server error occurred. Please try again."
        );
        toast.error(error.response.data?.detail)
      } else if (error.request) {

        setError("No response from server. Please check your connection.");
      } else {

        setError("Registration failed. Please try again.");
      }
    }
  }

console.log("userDaa",userData)


  return (
    <>
      <LoginNavbar />
      <div className="lg:flex mt-8 px-8 h-screen lg:h-full relative font-urbanist">
        <div className="lg:w-1/2 md:px-16 lg:px-20 md:my-auto">
          <h2 className="text-center text-4xl capitalize font-bold">{t("LOGIN")}</h2>
          <p className="text-center text-black/70 text-lg">
            {t("Login to access your account")}
          </p>
          <form className="py-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={t("Email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-2 pl-5 border-[1px] border-black rounded-lg"
              disabled={isLoading}
            />
            <div className="relative mt-1">
              {passwordVisible ? (
                <AiOutlineEye
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                  size={20}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                  size={20}
                />
              )}
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder={t("Password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 pl-5 border-[1px] border-black rounded-lg"
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-between">
              <label className="text-sm flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                {t("Remember me")}
              </label>
              <Link to="/forgotpassword">
                <p className="text-sm text-primary">{t("Forgot Password")}?</p>
              </Link>
            </div>
            <button
              type="button"
              className={`p-2 w-full rounded-md text-white bg-primary ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-center text-sm py-2 font-medium">
            {t("Don't have an account")}?{" "}
            <Link to="/signuppages" className="text-primary">
             {t("Sign up")}
            </Link>
          </p>
          <div className="flex py-5">
            <hr className="w-1/2 border-t-[0.5px] h-1 border-[#313131] my-auto" />
            <p className="whitespace-nowrap text-sm px-2">{t("Or login with")}</p>
            <hr className="w-1/2 border-t-[0.5px] h-1 border-[#313131] my-auto" />
          </div>
          <div className="flex space-x-3">
            <button
              className="p-3 w-full justify-center flex border-[1px] rounded-md border-black"
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading}
            >
              <img className="w-6 my-auto" src={facebook} alt="Facebook login" />
            </button>
            <button
              className="p-3 w-full justify-center flex border-[1px] rounded-md border-black"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <img className="w-6 my-auto" src={google} alt="Google login" />
            </button>
            <button
              className="p-3 w-full justify-center flex border-[1px] rounded-md border-black"
              onClick={() => handleSocialLogin("apple")}
              disabled={isLoading}
            >
              <img className="w-6 my-auto" src={apple} alt="Apple login" />
            </button>
          </div>
        </div>
        <div className="hidden lg:flex lg:w-1/2 mx-auto lg:my-auto">
          <div className="mx-auto flex justify-center">
            <img className="lg:max-h-[540px] xl:min-h-full justify-center" src={login} alt="Login" />
          </div>
        </div>
      </div>
      {showNumberCode && (
        <div className="fixed top-0 left-0 w-full h-full font-urbanist px-10 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 space-y-3 shadow-xl px-7 lg:w-5/12 xl:w-2/6">
            <h2 className="font-semibold text-center whitespace-nowrap text-2xl xl:text-[26px]">
              {t("Enter Verification ")}
              <br />
              {t("Code Just Sent To Phone No.")}
              <br />
              {t("Address")}
            </h2>
            <input
              className="w-full p-2 pl-5 xl:p-3 border border-black rounded-lg focus:outline-primary"
              name="code"
              id="code"
              placeholder= {t("Enter Verification Code")}
              value={verifiactionToken}
              onChange={(e)=>setVerificationToken(e.target.value)}
            />
            <div className="space-y-2">
              <button className="p-2 w-full flex justify-center text-lg xl:text-xl font-medium"
              onClick={handleResendOTP}
              >
                {t("Resend Code")}
              </button>
              <button
                onClick={handleVerifyOTP}
                className="p-2 w-full flex justify-center text-xl xl:text-2xl font-bold rounded-md text-white bg-primary">
                {t("Verify")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPages;

