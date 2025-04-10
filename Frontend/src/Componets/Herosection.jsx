import { IoIosSearch } from "react-icons/io";
import headerimg from "../assets/Image/headerimage.png";
import reg1 from "../assets/Image/Rectangle1.png";
import reg2 from "../assets/Image/Rectangle2.png";
import img1 from "../assets/Image/Group.png";
import img2 from "../assets/Image/Group1.png";
import img3 from "../assets/Image/Group2.png";
import img4 from "../assets/Image/Group3.png";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";

const Herosection = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const courses = ["Math", "Chemistry", "Physics", "English"];


 const handleSearchChange = (e) => {
   const query = e.target.value;
   setSearchQuery(query);

   if (query.trim()) {
     const filtered = courses.filter((course) =>
       course.toLowerCase().includes(query.toLowerCase())
     );
     setFilteredCourses(filtered);
   } else {
     setFilteredCourses([]);
   }
 };

 const handleSearch = () => {
   if (searchQuery.trim()) {
     navigate(
       `/tutorlisting?subject=${encodeURIComponent(
         searchQuery.trim()
       )}`
     );
   } else {
     navigate("/oneonone");
   }
 };

 const handleCourseClick = (course) => {
   setSearchQuery(course);
   setShowSuggestions(false); 
   navigate(
    `/tutorlisting?subject=${encodeURIComponent(
      course.trim()
    )}`
  );// Close the dropdown after selection
 };

  return (
    <>
      <div className="font-urbanist px-2 md:px-3 lg:px-14 xl:px-10">
        <div className="lg:flex">
          <div className="mt-8 lg:mt-0 lg:w-4/6 space-y-3">
            <motion.h2
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
              className="text-[28px] md:text-6xl lg:text-5xl xl:text-7xl lg:ml-14 xl:ml-8  lg:leading-[70px] xl:leading-snug lg:mt-16 font-bold">
              {t("hero_text")}
            </motion.h2>
            <motion.div
              className="lg:hidden relative"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}>
              <input
                className="w-full p-2 pl-10 bg-primary text-white border-4 border-white shadow-lg placeholder:text-white placeholder:text-lg placeholder:pl-4 rounded-3xl focus:outline-none"
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Prevent immediate close
                placeholder={t("search_placeholder")}
              />
              <IoIosSearch
                onClick={handleSearch}
                className="text-white absolute top-3 left-4 lg:top-24 lg:left-[350px]"
                size={21}
              />
              {showSuggestions && filteredCourses.length > 0 && (
                <ul className="absolute w-full bg-white rounded-md shadow-md z-10 max-h-48 overflow-auto">
                  {filteredCourses.map((course, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCourseClick(course)}>
                      {course}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>
          <div className="mx-auto relative lg:w-2/6">
            <motion.img
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
              className="mx-auto"
              src={headerimg}
              alt={t("hero_image_alt")}
            />
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
              className="absolute lg:right-96 lg:-translate-x-16 xl:-translate-x-10 lg:bottom-2 lg:w-[calc(100%-20px)]">
              <input
                className="hidden lg:block w-[500px] text-white p-2 lg:p-[10px] bg-primary border-4 lg:pl-12 border-white shadow-lg placeholder:text-white placeholder:text-lg lg:placeholder:pl-1 rounded-3xl focus:outline-none"
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Prevent immediate close
                placeholder={t("search_placeholder")}
              />
              <IoIosSearch
                onClick={handleSearch}
                className="text-white absolute left-4 top-1/2 transform -translate-y-1/2"
                size={21}
              />
              {showSuggestions && filteredCourses.length > 0 && (
                <ul className="absolute w-full bg-white rounded-md shadow-md z-10 max-h-48 overflow-auto">
                  {filteredCourses.map((course, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCourseClick(course)}>
                      {course}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 lg:gap-x-8 mt-8">
          <div className="border-2 p-1 lg:p-3 rounded-lg shadow-lg">
            <div className="flex justify-center">
              <img className="w-10" src={reg1} alt={t("review_icon_alt")} />
            </div>
            <h4 className="text-lg whitespace-nowrap lg:text-3xl text-center">
              {t("statistic_1_text")}
            </h4>
            <h5 className="text-primary lg:text-3xl text-center text-xl font-semibold">
              {t("statistic_1_subtext")}
            </h5>
          </div>

          <div className="border-2 p-2 rounded-lg shadow-lg">
            <div className="flex justify-center">
              <img className="w-10" src={reg2} alt={t("tutor_icon_alt")} />
            </div>
            <h4 className="text-lg lg:text-3xl whitespace-nowrap text-center">
              {t("statistic_2_text")}
            </h4>
            <h5 className="text-center lg:text-3xl text-xl font-semibold">
              {t("statistic_2_subtext")}
            </h5>
          </div>
          <div className="border-2 hidden lg:block p-2 lg:w-72 rounded-lg shadow-lg">
            <div className="flex justify-center">
              <img className="w-10" src={reg1} alt="Match icon" />
            </div>
            <h4 className="text-lg lg:text-3xl whitespace-nowrap text-center">
              {t("statistic_3_text")}
            </h4>
            <h5 className="text-primary lg:text-3xl text-center text-xl font-semibold">
              {t("statistic_1_subtext")}
            </h5>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="bg-black w-full flex justify-around p-4 my-auto">
          <img
            className="w-20 lg:w-40 my-auto"
            src={img1}
            alt={t("logo_1_alt")}
          />
          <img
            className="w-20 lg:w-40 my-auto"
            src={img2}
            alt={t("logo_2_alt")}
          />
          <img
            className="w-20 lg:w-40 my-auto"
            src={img3}
            alt={t("logo_3_alt")}
          />
          <img
            className="w-20 lg:w-40 my-auto"
            src={img4}
            alt={t("logo_4_alt")}
          />
        </div>
      </div>
    </>
  );
};

export default Herosection;
