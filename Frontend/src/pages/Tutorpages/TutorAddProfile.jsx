// import { MdCameraAlt } from "react-icons/md";
// import CreatableSelect from "react-select/creatable";
// import { useState } from "react";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
// import { UploadCloud } from "lucide-react";
// import { Camera } from "lucide-react";

// const initialLanguages = [
//   {
//     value: "en",
//     label: "English",
//     flag: "https://flagcdn.com/us.svg",
//   },
//   {
//     value: "es",
//     label: "Spanish",
//     flag: "https://flagcdn.com/es.svg",
//   },
//   {
//     value: "fr",
//     label: "French",
//     flag: "https://flagcdn.com/fr.svg",
//   },
// ];

// const TutorAddProfile = () => {
//   const navigate = useNavigate();

//   const [selectedLanguages, setSelectedLanguages] = useState([
//     initialLanguages[0],
//   ]);
//   const [languages, setLanguages] = useState(initialLanguages);
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");
//   const customOption = (props) => (
//     <div
//       {...props.innerProps}
//       className="flex items-center my-auto p-2 cursor-pointer "
//     >
//       <img src={props.data.flag} alt="" className="w-5 h-5 mr-2 rounded-md" />
//       <span>{props.data.label}</span>
//     </div>
//   );

//   customOption.propTypes = {
//     innerProps: PropTypes.object.isRequired,
//     data: PropTypes.shape({
//       flag: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//     }).isRequired,
//   };

//   const customSingleValue = (props) => (
//     <div className="flex -mt-6 ml-2 border-[1px]  my-auto items-center">
//       <img src={props.data.flag} alt="" className="w-5 h-5 mr-2 rounded-md" />
//       <span>{props.data.label}</span>
//     </div>
//   );

//   customSingleValue.propTypes = {
//     data: PropTypes.shape({
//       flag: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//     }).isRequired,
//   };

//   const handleLanguageChange = (newValue) => {
//     setSelectedLanguages(newValue);
//   };

//   const handleLanguageCreate = (inputValue) => {
//     const newLanguage = { value: inputValue.toLowerCase(), label: inputValue };
//     setLanguages([...languages, newLanguage]);
//     setSelectedLanguages([...selectedLanguages, newLanguage]);
//   };

//   const handleProfileClick = async () => {
//     // navigate("/tutornavbar/paymentmethod");

//     e.preventDefault();
//     if (!image) return alert("Please select an image");

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       setUploading(true);
//       const res = await axios.post(
//         "https://your-api-endpoint.com/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setMessage("Upload successful!");
//       console.log(res.data);
//     } catch (error) {
//       console.error(error);
//       setMessage("Upload failed.");
//     } finally {
//       setUploading(false);
//     }
//   };
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);

//     // Preview image
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };
// console.log("imageegege===>",image)
//   return (
//     <>
//       <div>
//         <div className="px-10 pt-10 lg:pt-0 xl:px-20 my-auto space-y-3 xl:space-y-5">
//           <div className="space-y-2">
//             {/* Profile Image with camera overlay */}
//             <div className="relative w-40 h-40">
//               <img
//                 src={preview || "https://via.placeholder.com/150"}
//                 alt="Profile"
//                 className="w-full h-full object-cover rounded-full border-2 border-gray-300"
//               />
//               <label className="absolute bottom-2 right-2 bg-white shadow p-2 rounded-full cursor-pointer hover:bg-gray-100 transition">
//                 <Camera className="w-5 h-5 text-gray-700" />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </label>
//             </div>

//             {/* Upload Button */}
//             {image && (
//               <button
//                 onClick={handleSubmit}
//                 disabled={uploading}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition disabled:opacity-50"
//               >
//                 {uploading ? "Uploading..." : "Upload Profile Picture"}
//               </button>
//             )}
//           </div>

//           <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
//             <input
//               type="text"
//               placeholder="Name"
//               className="w-full p-2 border-[1px] border-black/70 rounded-md focus:outline-primary"
//             />
//             <input
//               type="text"
//               name="basicinformation"
//               id="basicinformation"
//               placeholder="Basic Information"
//               className="w-full p-2 border-[1px] border-black/70 rounded-md focus:outline-primary"
//             />
//           </div>

//           <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
//             <input
//               type="text"
//               placeholder="Skill"
//               className="w-full p-2 border-[1px] border-black/70 rounded-md focus:outline-primary"
//             />
//             <input
//               type="text"
//               name="Education"
//               id="Education"
//               placeholder="Education"
//               className="w-full p-2 border-[1px] border-black/70 rounded-md focus:outline-primary"
//             />
//           </div>

//           <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
//             <input
//               type="text"
//               placeholder="Work Experience"
//               className="w-full p-2 border-[1px] border-black/70 rounded-md focus:outline-primary"
//             />
//             <input
//               type="email"
//               name="email"
//               id="email"
//               placeholder="Email"
//               className="w-full p-2 border-[1px] border-black/70 rounded-md focus:outline-primary"
//             />
//           </div>

//           <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
//             <input
//               type="text"
//               placeholder="Address"
//               className="w-full p-2 border-[1px] border-black/70 rounded-md focus:outline-primary"
//             />
//             <input
//               type="text"
//               placeholder="Tutor Lesson"
//               className="w-full p-2 border-[1px] border-black/70 rounded-md focus:outline-primary"
//             />
//           </div>

//           <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
//             <input
//               type="number"
//               name="phonenumber"
//               id="phonenumber"
//               placeholder="Phone no"
//               className="w-full p-2 border-[1px] md:w-1/2 border-black/70 rounded-md focus:outline-primary"
//             />
//             <div className="relative md:w-1/2">
//               <CreatableSelect
//                 isMulti
//                 className="border-[1px] w-full md:w-full border-black rounded-md"
//                 options={languages}
//                 value={selectedLanguages}
//                 onChange={handleLanguageChange}
//                 onCreateOption={handleLanguageCreate}
//                 components={{
//                   Option: customOption,
//                   SingleValue: customSingleValue,
//                 }}
//               />
//             </div>
//           </div>

//           <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
//             <input
//               type="password"
//               name="password"
//               id="password"
//               placeholder="Create New Password"
//               className="w-full p-2 border-[1px] border-black/70 rounded-md focus:outline-primary"
//             />

//             <input
//               type="text"
//               placeholder="Lesson Subject"
//               className="w-full p-2 border-[1px] border-black/70 rounded-md focus:outline-primary"
//             />
//           </div>

//           <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
//             <input
//               type="text"
//               placeholder="In Person"
//               className="w-full p-2 border-[1px] border-black/70 rounded-md focus:outline-primary"
//             />
//             <input
//               type="number"
//               placeholder="IBAN"
//               className="w-full p-2 border-[1px] border-black/70 rounded-md focus:outline-primary"
//             />
//           </div>

//           <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
//             <input
//               type="text"
//               placeholder="Policy"
//               className="w-full p-2 border-[1px] md:w-1/2 border-black/70 rounded-md focus:outline-primary"
//             />

//             <button
//               onClick={handleProfileClick}
//               className="p-2 text-center  md:w-1/2 text-white bg-primary w-full rounded-md"
//             >
//               Add Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TutorAddProfile;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { Camera } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import apiService from "../../services/apiServices";
import { toast } from "react-toastify";

const initialLanguages = [
  { value: "en", label: "English", flag: "https://flagcdn.com/us.svg" },
  { value: "es", label: "Spanish", flag: "https://flagcdn.com/es.svg" },
  { value: "fr", label: "French", flag: "https://flagcdn.com/fr.svg" },
];

const TutorAddProfile = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [languages, setLanguages] = useState(initialLanguages);
  const [selectedLanguages, setSelectedLanguages] = useState([
    initialLanguages[0],
  ]);
  // const [image, setImage] = useState(null);
  // const [preview, setPreview] = useState(null);
  const [initialMainData, setInitialMainData] = useState(null);
  const [initialTeacherData, setInitialTeacherData] = useState(null);
  const [existingProfilePic, setExistingProfilePic] = useState(null);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      skill: "",
      education: "",
      work_experience: "",
      basic_info: "",
      password: "",
      lesson_subject: "",
      IBAN: "",
      policy: "",
    },
    validationSchema: Yup.object({}), // optional
    onSubmit: async (values) => {
      const formData = new FormData();
      const teacherFields = [
        "basic_info",
        "work_experience",
        "IBAN",
        "address",
        "lesson_subject",
        "policy",
        "phone",
      ];
      const teacherDetails = {};

      let hasChanges = false;

      Object.entries(values).forEach(([key, value]) => {
        const initial = teacherFields.includes(key)
          ? initialTeacherData?.[key]
          : initialMainData?.[key];

        if (value !== initial && value !== "") {
          hasChanges = true;
          if (teacherFields.includes(key)) {
            teacherDetails[key] = value;
          } else {
            formData.append(key, value);
          }
        }
      });

      // ✅ Append whole object as string
      if (Object.keys(teacherDetails).length > 0) {
        formData.append("teacher_details", JSON.stringify(teacherDetails));
      }

      // ✅ Handle image upload
      if (image instanceof File) {
        formData.append("profile_picture", image);
        hasChanges = true;
      }

      if (!hasChanges) {
        toast.info("No changes to update.");
        return;
      }

      const response = await apiService({
        method: "PATCH",
        endpoint: "users/me",
        data: formData,
      });

      if (!response.error) toast.success("Profile updated successfully!");
    },
  });

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  //   const reader = new FileReader();
  //   reader.onloadend = () => setPreview(reader.result);
  //   reader.readAsDataURL(file);
  // };

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await apiService({ method: "GET", endpoint: "users/me" });
      console.log("ress", res);
      if (res?.status) {
        const tData = res.data.teacher_details;
        const data = res.data;
        setInitialMainData(data);
        setInitialTeacherData(tData);
        setExistingProfilePic(data.profile_picture || null);
        formik.setValues({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone: tData.phone || "",
          address: tData.address || "",
          skill: data.skill || "",
          education: data.education || "",
          work_experience: tData.work_experience || "",
          basic_info: data.basic_info || "",
          password: "",
          lesson_subject: tData.lesson_subject || "",
          IBAN: tData.IBAN || "",
          policy: tData.policy || "",
        });
      }
    };
    fetchProfile();
  }, []);

  const handleLanguageChange = (newValue) => setSelectedLanguages(newValue);
  const handleLanguageCreate = (inputValue) => {
    const newLang = { value: inputValue.toLowerCase(), label: inputValue };
    setLanguages([...languages, newLang]);
    setSelectedLanguages([...selectedLanguages, newLang]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };
  console.log("preview", existingProfilePic);
  console.log("image", image);
  return (
    <div className="px-10 pt-10 xl:px-20 space-y-5">
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Profile Image */}
        <div className="relative w-40 h-40 mx-auto">
          <img
            src={
              preview || existingProfilePic || "../../assets/upload_image/jpg"
            }
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-2 border-gray-300"
          />
          <label className="absolute bottom-2 right-2 bg-white shadow p-2 rounded-full cursor-pointer hover:bg-gray-100 transition">
            <Camera className="w-5 h-5 text-gray-700" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Upload button
        {image && (
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
          >
            {uploading ? "Uploading..." : "Upload Profile Picture"}
          </button>
        )} */}

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["first_name", "First Name"],
            ["last_name", "Last Name"],
            // ["basic_info", "Basic Information"],
            ["skill", "Skill"],
            ["education", "Education"],
            ["work_experience", "Work Experience"],
            ["address", "Address"],
            ["lesson_subject", "Tutor Lesson"],
            // ["in_person", "In Person"],
            ["IBAN", "IBAN"],
            // ["policy", "Policy"],
            ["password", "Create New Password"],
          ].map(([field, placeholder]) => (
            <input
              key={field}
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={placeholder}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[field]}
              className="p-2 border border-black/70 rounded-md"
            />
          ))}

          {/* Email and Phone - disabled */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            disabled
            className="p-2 border border-black/70 rounded-md bg-gray-100"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formik.values.phone}
            disabled
            className="p-2 border border-black/70 rounded-md bg-gray-100"
          />
        </div>

        {/* Languages */}
        <CreatableSelect
          isMulti
          className="mt-3"
          options={languages}
          value={selectedLanguages}
          onChange={handleLanguageChange}
          onCreateOption={handleLanguageCreate}
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="p-2 text-white bg-primary w-full rounded-md mt-3 w-[60%]" 
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TutorAddProfile;
