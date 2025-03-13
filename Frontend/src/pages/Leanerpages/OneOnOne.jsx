import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { LuClock3 } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import placeholderImg from "../../assets/Image/person.png";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const OneOnOne = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const subjectFromQuery = queryParams.get("subject");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        if (!token) {
          console.error("Token not available. Please log in.");

          return;
        }

        const response = await fetch("https://academy-gpt-backend.onrender.com/teachers/", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching tutors:", errorData.detail);

          return;
        }

        const data = await response.json();

        if (data?.data) {
          const enrichedTutors = await Promise.all(
            data.data.map(async (tutor) => {
              const userResponse = await fetch(
                `https://academy-gpt-backend.onrender.com/users/${tutor.user}/`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!userResponse.ok) {
                return tutor; // Return tutor data without enrichment if the user fetch fails
              }

              const userDetails = await userResponse.json();
              return {
                ...tutor,
                username: `${userDetails?.data?.first_name || "N/A"} ${
                  userDetails?.data?.last_name || ""
                }`.trim(),
                profile_picture:
                  userDetails?.data?.profile_picture || placeholderImg,
                email: userDetails?.data?.email || "",
                subject: tutor.subject || "N/A",
              };
            })
          );

          setTutors(enrichedTutors);
          setFilteredTutors(enrichedTutors);

          // Apply subject filter if subject is present in the query
          if (subjectFromQuery) {
            const filtered = enrichedTutors.filter(
              (tutor) =>
                tutor.subject?.toLowerCase() === subjectFromQuery.toLowerCase()
            );
            setFilteredTutors(filtered);
            setSelectedSubject(subjectFromQuery); // Set the selected subject
            setIsFilterApplied(true);
          }
        }
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [token, subjectFromQuery]);

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

 

  return (
    <>
      <div className="grid grid-cols-5  px-3">
        <div className="flex justify-between py-3 col-span-5 w-full">
          <motion.div
            className="my-auto"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "tween" }}>
            <h2 className="text-xs lg:text-sm xl:text-base font-normal">
              <span className="text-primary text-base lg:text-xl xl:text-2xl font-semibold">
                {filteredTutors.length} Tutors Found
              </span>{" "}
              {isFilterApplied
                ? `for Subject: ${selectedSubject}`
                : "fit your Choices"}
            </h2>
          </motion.div>
          <div className="my-auto">
            <button
              onClick={() => setShowFilter(true)}
              className="bg-primary p-1 px-3 rounded text-xs lg:text-sm xl:text-lg font-semibold text-white">
              Filters
            </button>
          </div>
        </div>

        {filteredTutors.map((tutor) => (
          <motion.div
            key={tutor.id}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="border-2 md:flex col-span-5 z-20 rounded-md drop-shadow-md p-2 mt-4">
            <div className="md:w-3/12">
              <div className="flex md:block relative md:static space-x-2 md:space-x-0 lg:space-y-1 bg-[#F6F6F6] py-2 pb-3">
                <img
                  className="w-20 h-20 lg:size-24 xl:size-36 bg-[#F6F6F6] my-auto md:mx-auto rounded-full"
                  src={tutor.profile_picture}
                  alt={tutor.username}
                />
                <div className="flex bg-[#F6F6F6]">
                  <div className="space-y-1 lg:space-y-2 xl:mx-auto">
                    <h2 className="text-lg md:text-xl xl:text-2xl font-semibold">
                      {tutor?.username || "N/A"}
                    </h2>
                    <p className="font-semibold text-[13px] md:text-[15px] xl:text-base">
                      5.0
                      <span className="font-normal pl-1 text-[10px] md:text-[11px] xl:text-xs">
                        ({tutor.rating})
                      </span>
                    </p>
                    <div className="flex text-primary md:space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <IoMdStar key={i} className="md:size-5 xl:size-7" />
                      ))}
                    </div>
                    <p className="flex text-xs font-medium md:text-sm xl:text-lg text-black/70 xl:pr-10 whitespace-nowrap md:whitespace-normal">
                      <LuClock3 className="my-auto md:my-0 mr-1 md:size-5 xl:size-6" />
                      {tutor.hours || "N/A"} hours teaching students
                    </p>
                  </div>
                </div>
                <div className="absolute -right-2 md:top-7 lg:top-6 md:right-1">
                  <div className="relative space-y-2">
                    <div className="flex mr-3 -mt-2">
                      <FaRegHeart className="size-4 md:size-5 xl:size-7" />
                    </div>
                    <button className="md:hidden absolute p-1 -bottom-12 text-base font-medium px-2 right-0 bg-[#056FD2] inline rounded-l-lg text-white">
                      Certified
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
                    {tutor.username || "N/A"}
                  </h2>
                  <p className="text-lg md:text-xl xl:text-3xl font-medium">
                    ${tutor.hourly_rate || "N/A"}
                  </p>
                </div>
                <p className="text-primary text-sm md:text-base xl:text-2xl">
                  {tutor?.skill || "No skills listed"}
                </p>
                <p className="text-primary text-sm md:text-base xl:text-2xl">
                  Credentialed multiple subject teacher
                </p>
                <p className="text-[9.73px] md:text-[13px] xl:text-lg text-black/60 font-normal">
                  {tutor.description || "No description provided."}
                </p>
              </div>

              <div className="flex justify-between py-2">
                <div className="flex space-x-1 my-auto">
                  <p className="text-[10px] md:text-xs xl:text-sm font-semibold my-auto">
                    {tutor.language || "Language not specified"}
                  </p>
                  <div className="pl-10">
                    <button className="hidden md:inline p-1 px-2 text-base xl:text-lg font-medium rounded-lg bg-[#60AD56] text-white">
                      {tutor.subject || "N/A"}
                    </button>
                  </div>
                </div>

                <div>
                  <Link
                    to={`tutordetails/${tutor.id}`}
                    className="p-2 rounded-md text-xs md:text-sm xl:text-lg font-semibold text-white bg-primary">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {showFilter && (
          <div className="fixed top-0 left-0 w-full h-full font-urbanist py-5 px-3 bg-black bg-opacity-60 z-50 flex justify-center items-center">
            <div className="bg-white space-y-4 rounded-xl p-5 shadow-xl w-full lg:w-5/12 xl:w-2/6">
              <h2 className="text-2xl font-semibold">Filter</h2>
              <div className="space-y-2">
                {/* Subject Select */}
                <h3 className="text-2xl font-semibold">Subject</h3>
                <select
                  className="w-full text-lg border-[1px] rounded-md p-2 border-black/50"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}>
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
                  onClick={handleApplyFilter}>
                  Apply
                </button>
                <button
                  className="p-1 px-2 rounded-md text-xl font-bold text-primary border-primary border-[1px]"
                  onClick={() => setShowFilter(false)}>
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

export default OneOnOne; 