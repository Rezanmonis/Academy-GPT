import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { LuClock3 } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import placeholderImg from "../../assets/Image/person.png";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiService from "../../services/apiServices";
import { apiNonAuthService } from "../../services/apiServices";
import { toast } from "react-toastify";
import Navbar from "../../Componets/Navbar";

const initialLanguages = [
  { value: "en", label: "English", flag: "https://flagcdn.com/us.svg" },
  { value: "es", label: "Spanish", flag: "https://flagcdn.com/es.svg" },
  { value: "fr", label: "French", flag: "https://flagcdn.com/fr.svg" },
];

const TutorListing = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subjectFromQuery = queryParams.get("subject");
  const { t } = useTranslation();
  localStorage.setItem("class_type", 1);

  const getAllTeachers = async (type) => {
    const response = await apiNonAuthService({
      method: "GET",
      endpoint: `teachers/tutors-list?lesson_subject=${subjectFromQuery || ""}`,
      // endpoint: `teachers/tutors-list`,
    });

    if (response) {
      console.log("Patch Successful:", response);

      setTutors(response.results);
      setFilteredTutors(response.data);
      setLoading(false);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  const handleApplyFilter = () => {
    if (selectedSubject) {
      const filtered = tutors.filter(
        (tutor) =>
          tutor.subject?.toLowerCase() === selectedSubject.toLowerCase()
      );
      setFilteredTutors(filtered);
      setIsFilterApplied(true);
    } else {
      setFilteredTutors(tutors);
      setIsFilterApplied(false); // Reset to all tutors if no subject selected
    }
    setShowFilter(false); // Close the filter modal
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  const handleNavigation = () => {
    toast.warn("To view profile or book lesson, you have to login");
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5  px-3">
        <div className="flex justify-between py-3 col-span-5 w-full">
          <motion.div
            className="my-auto"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "tween" }}
          >
            <h2 className="text-xs lg:text-sm xl:text-base font-normal">
              <span className="text-primary text-base lg:text-xl xl:text-2xl font-semibold">
                {filteredTutors?.length}
                {t("Tutors Found")}
              </span>{" "}
              {isFilterApplied
                ? `for Subject: ${selectedSubject}`
                : t("fit your Choices")}
            </h2>
          </motion.div>
          <div className="my-auto">
            <button
              onClick={() => setShowFilter(true)}
              className="bg-primary p-1 px-3 rounded text-xs lg:text-sm xl:text-lg font-semibold text-white"
            >
              {t("Filters")}
            </button>
          </div>
        </div>

        {filteredTutors?.map((tutor) => (
          <motion.div
            key={tutor.id}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="border-2 md:flex col-span-5 z-20 rounded-md drop-shadow-md p-2 mt-4"
          >
            <div className="md:w-3/12">
              <div className="flex md:block relative md:static space-x-2 md:space-x-0 lg:space-y-1 bg-[#F6F6F6] py-2 pb-3">
                <img
                  className="w-20 h-20 lg:size-24 xl:size-36 bg-[#F6F6F6] my-auto md:mx-auto rounded-full"
                  src={
                    `${import.meta.env.VITE_BASE_URL}${tutor?.profile_picture}` ||
                    `${placeholderImg}`
                  }
                  alt={tutor.username}
                />
                <div className="flex bg-[#F6F6F6]">
                  <div className="space-y-1 lg:space-y-2 xl:mx-auto">
                    {/* <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-center">
                      {tutor?.username || "N/A"}
                    </h2> */}
                    {/* <p className="font-semibold text-[13px] md:text-[15px] xl:text-base text-center">
                      5.0
                      <span className="font-normal pl-1 text-[10px] md:text-[11px] xl:text-xs">
                        ({tutor.rating})
                      </span>
                    </p> */}
                    <div className="flex text-primary md:space-x-1 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <IoMdStar key={i} className="md:size-5 xl:size-7" />
                      ))}
                    </div>
                    <p className="flex text-xs font-medium md:text-sm xl:text-lg text-black/70 xl:pr-10 whitespace-nowrap md:whitespace-normal">
                      <LuClock3 className="my-auto md:my-0 mr-1 md:size-5 xl:size-6" />
                      {tutor.hours || "N/A"} {t("hours teaching students")}
                    </p>
                  </div>
                </div>
                <div className="absolute -right-2 md:top-7 lg:top-6 md:right-1">
                  <div className="relative space-y-2">
                    <div className="flex mr-3 -mt-2">
                      <FaRegHeart className="size-4 md:size-5 xl:size-7" />
                    </div>
                    <button className="md:hidden absolute p-1 -bottom-12 text-base font-medium px-2 right-0 bg-[#056FD2] inline rounded-l-lg text-white">
                      {t("Certified")}
                    </button>
                    <button className="md:hidden absolute p-1 -bottom-[95px] text-base font-medium right-0 text-right inline rounded-l-lg bg-[#60AD56] text-white">
                      {tutor.subject || "N/A"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-10/12">
              <div className="py-2 space-y-1 bg-white">
                <div className="flex justify-between md:pr-14">
                  <h2 className="text-[19px] md:text-xl xl:text-4xl font-semibold">
                    {/* {tutor.username || "N/A"} */}
                    {tutor.first_name} {tutor.last_name}
                  </h2>
                  <p className="text-[22px] md:text-[24px] xl:text-3xl font-bold">
                    ${tutor?.teacher_details?.hourly_rate || "N/A"}
                  </p>
                </div>
                <p className="text-primary text-sm md:text-base xl:text-2xl">
                  Skills: {tutor?.skill || t("No skills listed")}
                </p>
                {/* <p className="text-primary text-sm md:text-base xl:text-2xl">
                  {t("Credentialed multiple subject teacher")}
                </p> */}
                <p className="text-[9.73px] md:text-[13px] xl:text-lg text-black/60 font-normal">
                  {tutor?.teacher_details?.description ||
                    "No description provided."}
                </p>
              </div>

              <div className="flex justify-between py-2">
                <div className="flex space-x-1 my-auto">
                  <p className="text-[12px] md:text-xs xl:text-sm font-semibold my-auto">
                    <p className="text-sm text-gray-700">
                      {tutor?.languages
                        ? tutor.languages
                            .split(",")
                            .map(
                              (langCode) =>
                                initialLanguages?.find(
                                  (l) => l.value === langCode
                                )?.label || langCode
                            )
                            .join(", ")
                        : t("Language not specified")}
                    </p>
                  </p>
                  <div className="pl-2">
                    <button className=" md:inline p-1 px-1 text-[14px] xl:text-lg font-medium rounded-lg bg-[#60AD56] text-white">
                      {tutor?.teacher_details?.lesson_subject || "N/A"}
                    </button>
                  </div>
                </div>

                <div className="w-full md:w-auto" onClick={handleNavigation}>
                  <Link
                    // to={`tutordetails/${tutor.teacher_id}`}
                    className="block text-center p-2 rounded-md text-xs md:text-sm font-semibold text-white bg-primary w-full md:w-[130px]"
                  >
                    {t("View Profile")}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {showFilter && (
          <div className="fixed top-0 left-0 w-full h-full font-urbanist py-5 px-3 bg-black bg-opacity-60 z-50 flex justify-center items-center">
            <div className="bg-white space-y-4 rounded-xl p-5 shadow-xl w-full lg:w-5/12 xl:w-2/6">
              <h2 className="text-2xl font-semibold">{t("Filters")}</h2>
              <div className="space-y-2">
                {/* Subject Select */}
                <h3 className="text-2xl font-semibold">Subject</h3>
                <select
                  className="w-full text-lg border-[1px] rounded-md p-2 border-black/50"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="">All Subjects</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Math">Math</option>
                  <option value="Physics">Physics</option>
                  <option value="English">English</option>
                </select>
              </div>

              {/* Filter Action Buttons */}
              <div className="flex justify-center space-x-3">
                <button
                  className="p-1 px-2 text-xl font-bold rounded-md text-white bg-primary"
                  onClick={handleApplyFilter}
                >
                  Apply
                </button>
                <button
                  className="p-1 px-2 rounded-md text-xl font-bold text-primary border-primary border-[1px]"
                  onClick={() => setShowFilter(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TutorListing;
