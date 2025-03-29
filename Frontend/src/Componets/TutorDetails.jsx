import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import oneimg from "../assets/Image/oneon.png";
import { IoMdStar } from "react-icons/io";
import { LuClock3 } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import flag from "../assets/Image/UK Flag.png";
import { IoLocationOutline } from "react-icons/io5";
import whatapp from "../assets/Image/whatsapp.png";
import { useTranslation } from "react-i18next";
import SlotCalendarStudent from "./SlotCalendarStudent";

const TutorDetails = () => {
  const { id } = useParams(); // Fetch ID from route params
  const location = useLocation(); // Access passed state
  const tutorFromState = location.state; // Get tutor data passed via Link's state

  const [tutor, setTutor] = useState(tutorFromState || null); // Initialize with passed state
  const [loading, setLoading] = useState(!tutor); // Show loading if tutor is null
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  // Fetch tutor data if not passed via state
  useEffect(() => {
    const fetchTutor = async () => {
      if (tutor) return; // Skip fetching if we already have the data

      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        const response = await fetch(
          `https://academy-gpt-backend.onrender.com/teachers/tutors-list?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Failed to fetch tutor details.");
        }
        const data = await response.json();
        console.log("response", data)
        
        const tutorData = data.data[0];
        // console.log(tutorData.results[0].id,  "tutorData")
        //         // Fetch user data to enrich tutor information
        //         const userResponse = await fetch(
        //           // `https://academy-gpt-backend.onrender.com/users/${tutorData?.results[0]?.user}`,
        //           `https://academy-gpt-backend.onrender.com/users/me`,
        //           {
        //             headers: {
        //               Authorization: `Bearer ${token}`,
        //               "Content-Type": "application/json",
        //             },
        //           }
        //         );

        //         if (!userResponse.ok) {
        //           throw new Error("Failed to fetch user details.");
        //         }

        // const userData = await userResponse.json();

        // Combine tutor and user data
        console.log("tutorData", tutorData);
        setTutor({
          ...tutorData.data,
          username: `${tutorData.first_name || "N/A"} ${
            tutorData.last_name || ""
          }`.trim(),
          profile_picture: tutorData.profile_picture || oneimg,
          languages: tutorData.languages || [],
          teacher_id: tutorData.teacher_id || "",
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [id, tutor]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
console.log("tu", tutor)
  return (
    <>
      <div className="px-2 py-2">
        <div className="border-2 md:border-0 md:space-x-5 md:flex font-urbanist col-span-5 z-20 rounded-md drop-shadow-md p-2">
          {/* Left Section: Profile Picture and Details */}
          <div className="md:w-4/12 h-fit md:rounded-md md:border-2 md:drop-shadow-md md:space-x-2 relative md:px-3 bg-[#F6F6F6]">
            <div className="flex md:block relative mt-16 md:static space-x-2 md:space-x-0 md:space-y-2 py-2 md:py-0 pb-3">
              <img
                className="w-20 h-20 lg:size-24 xl:size-36 my-auto md:mx-auto"
                src={tutor.profile_picture}
                alt={tutor.username}
              />
              <button className="hidden md:flex absolute px-3 xl:px-4 top-3 p-1 left-0 font-medium xl:text-lg bg-[#056FD2] rounded-r-lg text-white">
                Certified
              </button>
              <button className="hidden md:flex absolute p-1 right-0 top-10 text-base font-medium text-right xl:text-lg xl:px-3 rounded-l-lg bg-[#60AD56] text-white">
                {tutor.subject || "N/A"}
              </button>
              <div className="flex bg-[#F6F6F6]">
                <div className="space-y-1 md:space-y-2 xl:mx-auto">
                  <h2 className="text-lg md:text-xl xl:text-2xl font-semibold">
                    {tutor.username}
                  </h2>
                  <div className="flex space-x-2">
                    <p className="font-semibold text-[13px] md:text-[15px] xl:text-base">
                      5.0
                      <span className="font-normal pl-1 text-[10px] md:text-[11px] xl:text-xs">
                        ({tutor.rating || 0})
                      </span>
                    </p>
                    <div className="flex text-primary md:space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <IoMdStar key={i} className="md:size-5 xl:size-7" />
                      ))}
                    </div>
                  </div>
                  <p className="flex text-xs font-medium md:text-sm xl:text-lg text-black/70 xl:pr-10 whitespace-nowrap md:whitespace-normal">
                    <LuClock3 className="my-auto md:my-0 mr-1 md:size-5 xl:size-6" />
                    {tutor.hours || "N/A"} {t("hours teaching students")}
                  </p>
                  <p className="flex text-xs font-medium md:text-sm xl:text-lg text-black/70 xl:pr-10 whitespace-nowrap md:whitespace-normal">
                    <IoLocationOutline className="my-auto md:my-0 mr-1 md:size-5 xl:size-6" />{" "}
                    {tutor.address || t("Location not provided")}
                  </p>
                  <p className="text-xs md:text-sm xl:text-lg text-black/70">
                    {t("Languages")}:{" "}
                    {Array.isArray(tutor.languages)
                      ? tutor.languages.join(", ")
                      : tutor.languages || "No languages specified"}
                  </p>
                  <hr className="border-black/70 mt-3 border-t-[1px]" />
                </div>
                <hr className="w-72 md:hidden absolute bottom-0 left-0 border-black/70 border-t-[1px]" />
              </div>
            </div>
            <div>
              <p className="text-xs xl:text-base font-normal w-60 md:w-full">
                {t("Your First Lesson is Backed by our Good Fit Guarantee")}
              </p>
              <div className="md:flex py-2 md:justify-between">
                <h2 className="text-lg md:text-xl xl:text-2xl md:my-auto font-bold">
                  {t("Hourly")}: ${tutor.hourly_rate || "N/A"}
                </h2>
                <div className="my-auto hidden md:flex">
                  <img
                    className="md:w-8 xl:w-10"
                    src={whatapp}
                    alt="whatsapp"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Tutor Details */}
          <div className="md:w-9/12">
            <div className="py-2 space-y-1 bg-white">
              <div>
                <div className="flex justify-between">
                  <div className="my-auto">
                    <h2 className="text-[19px] md:text-xl xl:text-4xl font-semibold">
                      {t("Excellent Tutor")}!
                    </h2>
                  </div>
                  <p className="text-lg md:text-xl xl:text-3xl font-medium">
                    {/* <button className="p-1 px-2 text-xs md:text-base xl:text-xl font-semibold rounded-md bg-primary text-white">
                      {t("Book Lesson")}
                    </button> */}
                    <SlotCalendarStudent tutorId={tutor.teacher_id}/>
                  </p>
                </div>
                <div>
                  <p className="text-[9.73px] md:text-[13px] xl:text-lg text-black/60 font-normal">
                    {tutor.description || t("No description provided.")}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between md:pr-14">
                  <div className="my-auto">
                    <h2 className="text-[19px] md:text-xl xl:text-4xl font-semibold">
                      About
                    </h2>
                  </div>
                  <img
                    className="w-7 h-4 md:w-9 md:h-6 my-auto"
                    src={flag}
                    alt="flag"
                  />
                </div>
                <div>
                  <p className="text-[9.73px] md:text-[13px] xl:text-lg text-black/60 font-normal">
                    {tutor.description || "No description provided."}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-between md:pr-14">
                  <div className="my-auto">
                    <h2 className="text-[19px] md:text-xl xl:text-4xl font-semibold">
                      {t("Education")}
                    </h2>
                  </div>
                </div>
                <div>
                  <p className="text-[9.73px] md:text-[13px] xl:text-lg text-black/60 font-normal">
                    {tutor.education || t("No education details available.")}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-between md:pr-14">
                  <div className="my-auto">
                    <h2 className="text-[19px] md:text-xl xl:text-4xl font-semibold">
                      {t("Policies")}
                    </h2>
                  </div>
                </div>
                <div>
                  <p className="text-[9.73px] md:text-[13px] xl:text-lg text-black/60 font-normal">
                    {tutor.policy || t("No policies provided.")}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-between md:pr-14">
                  <div className="my-auto">
                    <h2 className="text-[19px] md:text-xl xl:text-4xl font-semibold">
                      {t("Schedule")}
                    </h2>
                  </div>
                </div>
                <div>
                  <p className="text-[9.73px] md:text-[13px] xl:text-lg text-black/60 font-normal">
                    {tutor.schedule || t("No schedule available.")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorDetails;
