// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUserData, updateUser } from "../../features/userSlice";
// import axios from "axios";
// import person from "../../assets/Image/person.png";
// import { useTranslation } from "react-i18next";
// import apiService from "../../services/apiServices";

// const initialLanguages = [
//   { value: "en", label: "English" },
//   { value: "es", label: "Spanish" },
//   { value: "fr", label: "French" },
// ];

// const LeanerProfileAdd = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, loading, error } = useSelector((state) => state.user);
//   const { t } = useTranslation();

//   const [formData, setFormData] = useState({
//     username: "",
//     first_name: "",
//     last_name: "",
//     email: "",
//     profile_picture: "",
//     goal: "",
//     education: "",
//     skill: "",
//     basic_information: "",
//     phone: "",
//     dob: "",
//     password: "",
//     languages: [],
//   });

//   const [selectedLanguages, setSelectedLanguages] = useState([]);
//   const [languages, setLanguages] = useState(initialLanguages);
//   const [profilePreview, setProfilePreview] = useState(person);

//   useEffect(() => {
//     if (!user && !loading && !error) {
//       dispatch(fetchUserData());
//     } else if (user) {
//       setFormData({
//         username: user.username || "",
//         first_name: user.first_name || "",
//         last_name: user.last_name || "",
//         email: user.email || "",
//         profile_picture: user.profile_picture || person,
//         goal: user.goal || "",
//         education: user.education || "",
//         skill: user.skill || "",
//         basic_information: user.basic_information || "",
//         phone: user.phone || "",
//         dob: user.dob || "",
//         password: "",
//         languages: user.languages ? user.languages.split(", ") : [],
//       });

//       setProfilePreview(user.profile_picture || person);

//       const userLanguages = user.languages
//         ? user.languages.split(", ").map((lang) => ({
//             value: lang.toLowerCase(),
//             label: lang,
//           }))
//         : [];
//       setSelectedLanguages(userLanguages);
//     }
//   }, [dispatch, user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "dob") {
//       const formattedDate = value
//         ? new Date(value).toISOString().split("T")[0]
//         : "";
//       setFormData({ ...formData, [name]: formattedDate });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleUsernameChange = (e) => {
//     const value = e.target.value;
//     const usernamePattern = /^[a-zA-Z0-9@._+-]+$/;
//     if (usernamePattern.test(value) || value === "") {
//       setFormData({ ...formData, username: value });
//     } else {
//       alert(
//         "Invalid username! Only letters, numbers, @, ., +, -, and _ are allowed."
//       );
//     }
//   };

//   const handleLanguageChange = (newValue) => {
//     setSelectedLanguages(newValue);
//   };

//   const handleLanguageCreate = (inputValue) => {
//     const newLanguage = { value: inputValue.toLowerCase(), label: inputValue };
//     setLanguages([...languages, newLanguage]);
//     setSelectedLanguages([...selectedLanguages, newLanguage]);
//   };

//   const handleProfileImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePreview(URL.createObjectURL(file));
//       setFormData({ ...formData, profile_picture: file });
//     }
//   };

//   const handleProfileUpdate = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       if (!token) throw new Error("No authentication token found");

//       const updatedUserData = new FormData();

//       updatedUserData.append("first_name", formData.first_name);
//       updatedUserData.append("last_name", formData.last_name);
//       updatedUserData.append("email", formData.email);
//       updatedUserData.append("goal", formData.goal);
//       updatedUserData.append("education", formData.education);
//       updatedUserData.append("skill", formData.skill);
//       updatedUserData.append("basic_information", formData.basic_information);
//       updatedUserData.append("phone", formData.phone);
//       updatedUserData.append("dob", formData.dob);
//       updatedUserData.append("password", formData.password);
//       updatedUserData.append(
//         "languages",
//         selectedLanguages.map((lang) => lang.label).join(", ")
//       );

//       // ✅ Limit profile picture filename length
//       if (formData.profile_picture instanceof File) {
//         const file = formData.profile_picture;
//         let fileName = file.name;
//         if (fileName.length > 100) {
//           const ext = fileName.split(".").pop();
//           fileName = `profile_${Date.now()}.${ext}`;
//         }
//         const renamedFile = new File([file], fileName, { type: file.type });
//         updatedUserData.append("profile_picture", renamedFile);
//       }

//       const response = await axios.patch(
//         `https://academy-gpt-backend.onrender.com/users/me`,
//         updatedUserData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       dispatch(updateUser(response.data));
//       alert("Profile updated successfully!");
//       navigate("/leanernavbar/leanerprofile");
//     } catch (error) {
//       console.error("Profile update error:", error);
//       alert(error.response?.data?.message || "Failed to update profile.");
//     }
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const res = await apiService({ method: "GET", endpoint: "users/me" });
//       console.log("ress", res);
//       if (res?.status) {
//         const user = res.data;

//         setFormData({
//           username: user.username || "",
//           first_name: user.first_name || "",
//           last_name: user.last_name || "",
//           email: user.email || "",
//           profile_picture: user.profile_picture || person,
//           goal: user.goal || "",
//           education: user.education || "",
//           skill: user.skill || "",
//           basic_information: user.basic_information || "",
//           phone: user.phone || "",
//           dob: user.dob || "",
//           password: "",
//           languages: user.languages ? user.languages.split(", ") : [],
//         });
//       }
//     };
//     fetchProfile();
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6">
//       <div className="bg-white p-6 rounded-lg w-full">
//         <div className="flex flex-col mx-auto items-center space-y-2">
//           <label htmlFor="profileUpload" className="cursor-pointer ">
//             <img
//               src={profilePreview}
//               alt="Profile"
//               className="w-20 h-20 rounded-full mx-auto border border-gray-300 object-cover"
//             />
//             <div className="text-orange-500 text-sm mt-2">
//               {t("Click to change photo")} (Optional)
//             </div>
//           </label>
//           <input
//             id="profileUpload"
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleProfileImageUpload}
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4 mt-6">
//           <input
//             type="text"
//             name="first_name"
//             placeholder={t("First Name")}
//             value={formData.first_name}
//             onChange={handleChange}
//             className="p-2 border border-gray-300 rounded-md"
//           />
//           <input
//             type="text"
//             name="last_name"
//             placeholder={t("Last Name")}
//             value={formData.last_name}
//             onChange={handleChange}
//             className="p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="text"
//             name="skill"
//             placeholder={t("Skill")}
//             value={formData.skill}
//             onChange={handleChange}
//             className="p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="text"
//             name="basic_informatio"
//             placeholder={t("Basic Information")}
//             value={formData.basic_information}
//             onChange={handleChange}
//             className="p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="text"
//             name="education"
//             placeholder={t("Education")}
//             value={formData.education}
//             onChange={handleChange}
//             className="p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="text"
//             name="goal"
//             placeholder={t("Goal")}
//             value={formData.goal}
//             onChange={handleChange}
//             className="p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder={t("Email")}
//             value={formData.email}
//             onChange={handleChange}
//             className="p-2 border border-gray-300 rounded-md"
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder={t("Phone")}
//             value={formData.phone}
//             onChange={handleChange}
//             className="p-2 border border-gray-300 rounded-md"
//           />
//           <input
//             type="date"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             className="p-2 border border-gray-300 rounded-md"
//           />
//           <CreatableSelect
//             isMulti
//             className="rounded-md "
//             options={languages}
//             value={selectedLanguages}
//             onChange={handleLanguageChange}
//             onCreateOption={handleLanguageCreate}
//           />
//         </div>

//         <button
//           onClick={handleProfileUpdate}
//           className="w-full mt-6 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
//         >
//           {t("Update Profile")}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LeanerProfileAdd;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { Camera } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import apiService from "../../services/apiServices";
import { toast } from "react-toastify";

const initialLanguages = [
  { value: "en", label: "English", flag: "https://flagcdn.com/us.svg" },
  { value: "es", label: "Spanish", flag: "https://flagcdn.com/es.svg" },
  { value: "fr", label: "French", flag: "https://flagcdn.com/fr.svg" },
];

const LeanerProfileAdd = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [languages, setLanguages] = useState(initialLanguages);
  const [selectedLanguages, setSelectedLanguages] = useState([
    initialLanguages[0],
  ]);

  const [initialMainData, setInitialMainData] = useState(null);
  const [initialTeacherData, setInitialTeacherData] = useState(null);
  const [existingProfilePic, setExistingProfilePic] = useState(null);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      skill: "",
      education: "",
      basic_information: "",
      password: "",
      goal: "",
      dob: "",
    },
    validationSchema: Yup.object({}), // optional
    onSubmit: async (values) => {
      const formData = new FormData();

      let hasChanges = false;
      const selectedLangCodes = selectedLanguages
        .map((lang) => lang.value)
        .join(",");

      // Include it in values for processing
      values.languages = selectedLangCodes;
      Object.entries(values).forEach(([key, value]) => {
        if (value !== "") {
          hasChanges = true;

          formData.append(key, value);
        }
      });

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

  const fetchProfile = async () => {
    const res = await apiService({ method: "GET", endpoint: "users/me" });
    console.log("ress", res);
    if (res?.status) {
      const data = res.data;
      setInitialMainData(data);
      setExistingProfilePic(data.profile_picture || null);
      console.log("student===>", data);
      formik.setValues({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        skill: data.skill || "",
        education: data.education || "",
        basic_information: data.basic_information || "",
        goal: data.goal || "",
        dob: data.sob || "",
        password: "",
      });
    }
  };

  useEffect(() => {
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

  console.log("languages", formik.values);

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

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["first_name", "First Name"],
            ["last_name", "Last Name"],
            ["skill", "Skill"],
            ["education", "Education"],
            ["basic_information", "Basic Information"],
            ["dob", " Date of Birth"],
            ["goal", "Goal"],
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
            className="p-2 text-white bg-primary rounded-md mt-3 w-[60%]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeanerProfileAdd;
