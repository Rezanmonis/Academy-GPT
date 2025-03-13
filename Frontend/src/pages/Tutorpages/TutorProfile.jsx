import { useState,useEffect } from 'react';
import profileimg from "../../assets/Image/tutorprofile.png";
import { LiaCertificateSolid } from "react-icons/lia";
import flag from "../../assets/Image/UK Flag.png";
import { MdEmail } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { FaUserGroup, FaDollarSign, FaCar } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import CustomCalendar from "../../Componets/CustomCalander";
import { fetchTeacherData } from "../../features/teacherSlice";
import { useSelector, useDispatch } from "react-redux";
import person from "../../assets/Image/person.png";


const TutorProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
   const { teacher: combinedProfile, loading, error, isFetched } = useSelector(
      (state) => state.teacher
    );

  const handleProfileAddClick = () => {
    navigate("tutoraddprofile");
  };

    useEffect(() => {
      if (!isFetched && !loading && !error) {
        dispatch(fetchTeacherData());
      }
    }, [dispatch, isFetched, loading, error]);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }
  

    if (error) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">
            {error?.message || "An error occurred. Please try again later."}
          </p>
        </div>
      );
    }
  
    if (!combinedProfile?.teacher_profile) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500">
            You are not associated with a teacher profile. Please contact support
            if you believe this is a mistake.
          </p>
        </div>
      );
    }



  return (
    <>
      <div className="font-urbanist py-5 px-5">
        <div className="px-5 space-y-5 md:space-y-0 md:space-x-5 md:flex">
          <div className="border-2 p-3 drop-shadow-md rounded-lg min-h-full md:w-4/6">
            <div className="flex space-x-3">
              <div className="w-2/6">
                <img
                  className="size-[120px] xl:size-48 rounded-md"
                 src={combinedProfile.data?.profile_picture || person}
                  alt="profile-img"
                />
              </div>
              <div className="w-4/6">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-lg xl:text-2xl font-semibold">
                      {combinedProfile.data?.username}
                    </h1>
                  </div>
                  <div>
                    <button
                      onClick={handleProfileAddClick}
                      className="p-1 px-2 text-white rounded-md bg-primary text-xs md:text-sm xl:text-lg font-bold">
                      Edit Profile
                    </button>
                  </div>
                </div>
                <div className="flex">
                  <LiaCertificateSolid className="size-6 xl:size-7 text-[#C1C1C1]" />
                  <p className="text-sm xl:text-base font-medium">
                    Your first lessons is backed by our <br />
                    <span className="text-primary">Good Fit Guarantee</span>
                  </p>
                </div>
                <div>
                  <p>Ranking</p>
                  <div className="flex text-primary space-x-1">
                    <IoMdStar className="size-6 md:size-5 xl:size-7" />
                    <IoMdStar className="size-6 md:size-5 xl:size-7" />
                    <IoMdStar className="size-6 md:size-5 xl:size-7" />
                    <IoMdStar className="size-6 md:size-5 xl:size-7" />
                    <IoMdStar className="size-6 md:size-5 xl:size-7" />
                  </div>
                </div>
                <div>
                  <hr className="hidden md:flex border-t-[2px] border-black rounded-md my-2" />
                </div>
              </div>
            </div>

            <div className="relative">
              <h2 className="hidden text-lg font-semibold md:flex">
                Policies{" "}
                <hr className="border-t-[2px] border-black rounded-tr-lg w-full mt-4 ml-2" />
              </h2>
              <div className="hidden md:flex md:space-y-4">
                <div className="space-y-3">
                  <div className="justify-between space-y-4">
                    <div className="flex space-x-2">
                      <CiLocationOn className="my-auto size-5 xl:size-6 text-[#C1C1C1]" />
                      <p className="font-medium text-[13px] xl:text-base">
                         {combinedProfile.data?.address || "N/A"}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <FaUserGroup className="my-auto size-5 text-[#C1C1C1]" />
                      <p className="font-medium text-[13px]">
                        Tutor&apos;s lessons:{" "}
                        <span className="font-medium">In-person</span>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <FaDollarSign className="my-auto size-5 xl:size-6 text-[#C1C1C1]" />
                      <p className="font-medium text-[13px] xl:text-base">
                        Hourly Rate: <span className="font-medium">$45</span>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <FaCar className="my-auto size-5 xl:size-6 text-[#C1C1C1]" />
                      <p className="font-medium text-[13px] xl:text-base">
                        Policy:{" "}
                        <span className="font-medium">
                          Within 20 miles of <br /> Auburn, WA 98002
                        </span>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <MdEmail className="my-auto size-5 xl:size-6 text-[#C1C1C1]" />
                      <p className="font-medium text-[13px] xl:text-base">
                      {combinedProfile.data?.email || "N/A"}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <RiPhoneFill className="my-auto size-5 xl:size-6 text-[#C1C1C1]" />
                      <p className="font-medium text-[13px] xl:text-base">
                      {combinedProfile.teacher_profile?.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 justify-between">
                    <div className="flex space-x-2">
                      <MdLock className="my-auto size-5 xl:size-6 text-[#C1C1C1]" />
                      <p className="font-medium text-[13px] xl:text-base">
                      {combinedProfile.data?.password|| "N/A"}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <img
                        className="md:w-7 md:h-4 xl:w-9 xl:h-6 my-auto"
                        src={flag}
                        alt="img"
                      />
                      <p className="font-medium text-[13px] xl:text-base">
                      {combinedProfile.data?.languages || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-16 md:-top-12 w-[340px] lg:w-[350px] xl:w-96 xl:-top-16 ">
                <div className="hidden md:flex">
                  <div
                    className="cursor-pointer transform scale-75 md:scale-50 lg:scale-75 hover:scale-85 transition-transform"
                    onClick={() => setIsCalendarModalOpen(true)}>
                    <CustomCalendar />
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-t-2 md:hidden border-black/70 mt-2" />

            <div className="px-2 md:hidden space-y-2 pt-2">
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <CiLocationOn className="my-auto size-5 text-[#C1C1C1]" />
                  <p className="font-medium text-[13px]">{combinedProfile.data?.address || "N/A"}</p>
                </div>
                <div className="flex text-left space-x-2">
                  <MdEmail className="my-auto size-5 text-[#C1C1C1]" />
                  <p className="font-medium text-[13px]">{combinedProfile.data?.email || "N/A"}</p>
                </div>
              </div>
              <div className="flex justify-between">
              <div className="flex space-x-2">
                  <FaDollarSign className="my-auto size-5 xl:size-6 text-[#C1C1C1]" />
                  <p className="font-medium text-[13px] xl:text-base">
                    Hourly Rate: <span className="font-medium">$45</span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <RiPhoneFill className="my-auto size-5 text-[#C1C1C1]" />
                  <p className="font-medium text-[13px]">{combinedProfile.data?.phone || "N/A"}</p>
                </div>
              </div>
              <div className="flex justify-between">
              
                <div className="flex space-x-2">
                  <MdLock className="my-auto size-5 xl:size-6 text-[#C1C1C1]" />
                  <p className="font-medium text-[13px] xl:text-base">
                  {combinedProfile.data?.password || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <FaCar className="my-auto size-5 xl:size-6 text-[#C1C1C1]" />
                  <p className="font-medium text-[13px] xl:text-base">
                    Policy:{" "}
                    <span className="font-medium">
                      Within 20 miles of <br /> Auburn, WA 98002
                    </span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <img
                    className="w-7 h-4 md:w-9 md:h-6 my-auto"
                    src={flag}
                    alt="img"
                  />
                  <p className="font-medium text-[13px] my-auto">{combinedProfile.data?.languages || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden  ">
            <div
              className=" w-full -mt-5 h-full scale-125  "
              onClick={() => setIsCalendarModalOpen(true)}>
              <CustomCalendar />
            </div>
          </div>

          <div className="border-2 p-3 drop-shadow-md rounded-lg md:w-2/6">
            <div className="md:hidden">
              <div className="flex justify-between">
                <h2 className="text-base md:text-lg flex xl:text-xl font-semibold">
                  Good Tutor
                  <div className="flex ml-2 space-x-1">
                    <IoIosStar className="text-primary" />
                    <IoIosStar className="text-primary" />
                    <IoIosStar className="text-[#A3998F]" />
                    <IoIosStar className="text-[#A3998F]" />
                    <IoIosStar className="text-[#A3998F]" />
                  </div>
                </h2>
                <div>
                  <p className="font-semibold text-base">29d</p>
                </div>
              </div>

              <p className="text-[9.49px] md:text-sm lg:text-base xl:text-lg text-black/80 font-normal">
                A Student hearts up a crucible and in the end after doing the
                math, the hydrate is 1.51 g, the dehydrate is 0.98 g and the
                water lost is 0.53 g. This needs to be converted into moles of
                copper (II) ..... <span className="text-primary">More</span>
              </p>
              <div className="justify-end">
                <p className="font-semibold text-right text-xs">
                {combinedProfile.data?.address || "N/A"}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-base md:text-lg xl:text-xl font-semibold">
                Basic Information
              </h2>
              <p className="text-[9.49px] md:text-sm lg:text-base xl:text-lg text-black/80 font-normal">
              {combinedProfile.teacher_profile?.basic_info || "N/A"}
              </p>
            </div>
            <div>
              <h2 className="text-base font-semibold md:text-lg xl:text-xl">
                Skill
              </h2>
              <p className="text-[9.49px] md:text-sm lg:text-base xl:text-lg text-black/80 font-normal">
              {combinedProfile.teacher_profile?.skill || "N/A"}
              </p>
            </div>
            <div>
              <h2 className="text-base md:text-lg xl:text-xl font-semibold">
                Education
              </h2>
              <p className="text-[9.49px] md:text-sm lg:text-base xl:text-lg text-black/80 font-normal">
              {combinedProfile.teacher_profile?.education || "N/A"}
              </p>
            </div>
            <div>
              <h2 className="text-base md:text-lg xl:text-xl font-semibold">
                Work Experience
              </h2>
              <p className="text-[9.49px] md:text-sm lg:text-base xl:text-lg text-black/80 font-normal">
              {combinedProfile.teacher_profile?.work_experience || "N/A"} 
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex p-3 border-2 mt-2 drop-shadow-md rounded-lg w-full justify-between">
          <div>
            <div className="flex justify-between">
              <h2 className="text-base md:text-lg flex xl:text-xl font-semibold">
                Good Tutor
                <div className="flex ml-2 space-x-1">
                  <IoIosStar className="text-primary" />
                  <IoIosStar className="text-primary" />
                  <IoIosStar className="text-[#A3998F]" />
                  <IoIosStar className="text-[#A3998F]" />
                  <IoIosStar className="text-[#A3998F]" />
                </div>
              </h2>
              <div>
                <p className="font-semibold text-base">29d</p>
              </div>
            </div>

            <p className="text-[9.49px] md:text-sm lg:text-base xl:text-lg text-black/80 font-normal">
              A Student hearts up a crucible and in the end after doing the
              math, the hydrate is 1.51 g, the dehydrate is 0.98 g and the water
              lost is 0.53 g. This needs to be converted into moles of copper
              (II) ..... <span className="text-primary">More</span>
            </p>
            <div className="justify-end">
              <p className="font-semibold text-right text-xs">New York City</p>
            </div>
          </div>
        </div>
      </div>
      {isCalendarModalOpen && (
        <CustomCalendar
          isFullScreen={true}
          onClose={() => setIsCalendarModalOpen(false)}
        />
      )}
    </>
  );
};

export default TutorProfile;