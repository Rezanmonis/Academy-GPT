import { MdCameraAlt } from "react-icons/md";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { updateTeacher } from "../../features/teacherSlice";

const initialLanguages = [
  {
    value: "en",
    label: "English",
    flag: "https://flagcdn.com/us.svg",
  },
  {
    value: "es",
    label: "Spanish",
    flag: "https://flagcdn.com/es.svg",
  },
  {
    value: "fr",
    label: "French",
    flag: "https://flagcdn.com/fr.svg",
  },
];

const TutorAddProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teacher } = useSelector((state) => state.teacher);

  const [selectedLanguages, setSelectedLanguages] = useState([initialLanguages[0]]);
  const [languages, setLanguages] = useState(initialLanguages);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    basic_info: "",
    skill: "",
    education: "",
    work_experience: "",
    email: "",
    address: "",
    lesson: "",
    phone: "",
    password: "",
    lesson_subject: "",
    in_person: "",
    IBAN: "",
    policy: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLanguageChange = (newValue) => {
    setSelectedLanguages(newValue);
  };

  const handleLanguageCreate = (inputValue) => {
    const newLang = {
      value: inputValue.toLowerCase(),
      label: inputValue,
    };
    setLanguages((prev) => [...prev, newLang]);
    setSelectedLanguages((prev) => [...prev, newLang]);
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = async () => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token") ||
      null;

    if (!token || !teacher?.teacher_profile?.id) {
      alert("Authentication or teacher ID missing");
      return;
    }

    const payload = new FormData();

    // Rename profile image if name too long
    if (profileImage instanceof File) {
      let fileName = profileImage.name;
      if (fileName.length > 100) {
        const ext = fileName.split('.').pop();
        fileName = `profile_${Date.now()}.${ext}`;
      }
      const renamedFile = new File([profileImage], fileName, {
        type: profileImage.type,
      });
      payload.append("profile_picture", renamedFile);
    }

    // Append all form fields
    payload.append("description", formData.basic_info);
    payload.append("work_experience", formData.work_experience);
    payload.append("address", formData.address);
    payload.append("policy", formData.policy);
    payload.append("lesson_subject", formData.lesson_subject);
    payload.append("IBAN", formData.IBAN);
    payload.append("skill", formData.skill);
    payload.append("language", selectedLanguages.map((l) => l.label).join(", "));
    payload.append("education", formData.education);
    payload.append("phone", formData.phone);
    payload.append("basic_info", formData.basic_info);

    try {
      const response = await axios.patch(
        `https://academy-gpt-backend.onrender.com/teachers/${teacher.teacher_profile.id}/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(updateTeacher(response.data));
      alert("Tutor profile updated successfully!");
      navigate("/tutornavbar/paymentmethod");
    } catch (err) {
      console.error("Error updating tutor profile:", err);
      alert("Something went wrong! Check the fields and try again.");
    }
  };

  const customOption = (props) => (
    <div {...props.innerProps} className="flex items-center my-auto p-2 cursor-pointer ">
      <img src={props.data.flag} alt="" className="w-5 h-5 mr-2 rounded-md" />
      <span>{props.data.label}</span>
    </div>
  );

  const customSingleValue = (props) => (
    <div className="flex -mt-6 ml-2 border-[1px] my-auto items-center">
      <img src={props.data.flag} alt="" className="w-5 h-5 mr-2 rounded-md" />
      <span>{props.data.label}</span>
    </div>
  );

  customOption.propTypes = {
    innerProps: PropTypes.object.isRequired,
    data: PropTypes.shape({
      flag: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  };

  customSingleValue.propTypes = {
    data: PropTypes.shape({
      flag: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <div className="px-10 pt-10 lg:pt-0 xl:px-20 my-auto space-y-3 xl:space-y-5">
      <div className="space-y-2">
        <div className="flex justify-center">
          <label htmlFor="profileUpload" className="cursor-pointer bg-[#A39494] p-2 rounded-full">
            <MdCameraAlt className="size-8 md:size-10 xl:size-12" />
            <input
              id="profileUpload"
              type="file"
              accept="image/*"
              onChange={handleProfileUpload}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-center text-primary">Upload Photo ( Optional )</p>
      </div>

      <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
        <input type="text" name="name" placeholder="Name" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
        <input type="text" name="basic_info" placeholder="Basic Information" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
      </div>

      <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
        <input type="text" name="skill" placeholder="Skill" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
        <input type="text" name="education" placeholder="Education" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
      </div>

      <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
        <input type="text" name="work_experience" placeholder="Work Experience" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
      </div>

      <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
        <input type="text" name="address" placeholder="Address" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
        <input type="text" name="lesson" placeholder="Tutor Lesson" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
      </div>

      <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
        <input type="number" name="phone" placeholder="Phone no" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
        <div className="relative w-full">
          <CreatableSelect
            isMulti
            className="border border-black rounded-md"
            options={languages}
            value={selectedLanguages}
            onChange={handleLanguageChange}
            onCreateOption={handleLanguageCreate}
            components={{ Option: customOption, SingleValue: customSingleValue }}
          />
        </div>
      </div>

      <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
        <input type="password" name="password" placeholder="Create New Password" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
        <input type="text" name="lesson_subject" placeholder="Lesson Subject" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
      </div>

      <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
        <input type="text" name="in_person" placeholder="In Person" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
        <input type="text" name="IBAN" placeholder="IBAN" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
      </div>

      <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5">
        <input type="text" name="policy" placeholder="Policy" onChange={handleInputChange}
          className="w-full p-2 border border-black/70 rounded-md focus:outline-primary" />
        <button onClick={handleSubmit}
          className="p-2 text-center text-white bg-primary w-full rounded-md">
          Add Now
        </button>
      </div>
    </div>
  );
};

export default TutorAddProfile;
