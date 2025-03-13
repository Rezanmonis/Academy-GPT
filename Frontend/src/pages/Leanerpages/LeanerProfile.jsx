import { useEffect } from "react";
import profileimg from "../../assets/Image/profile.png";
import { LiaCertificateSolid } from "react-icons/lia";
import flag from "../../assets/Image/UK Flag.png";
import { MdEmail, MdLock } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../features/userSlice";
import person from "../../assets/Image/person.png";

const LeanerProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user data from Redux store
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user && !loading && !error) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);

  const handleProfileAddClick = () => {
    navigate("leanerprofileadd");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error) return <div className="text-red-500 text-center">{error.message}</div>;

  if (!user) return <div className="text-gray-500 text-center">No user profile found</div>;

  return (
    <>
      <div className="font-urbanist">
        <div className="px-5 space-y-5 md:space-y-0 md:space-x-5 md:flex">
          {/* Left Profile Section */}
          <div className="border-2 p-3 drop-shadow-md rounded-lg h-fit md:w-4/6">
            <div className="flex space-x-3">
              <div className="w-2/6">
                <img
                  className="size-[120px] xl:size-48 rounded-md"
                  src={user.profile_picture || person}
                  alt="profile-img"
                />
              </div>
              <div className="w-4/6">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-lg xl:text-2xl font-semibold">
                      {user.username || "User"}
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
                <div className="hidden md:flex">
                  <div className="space-y-1">
                    <div className="justify-between space-y-1">
                      <div className="flex space-x-2">
                        <MdEmail className="my-auto size-5 xl:size-6 text-[#C1C1C1]" />
                        <p className="font-medium text-[13px] xl:text-base">
                          {user.email || "Not Provided"}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <RiPhoneFill className="my-auto size-5 xl:size-6 text-[#C1C1C1]" />
                        <p className="font-medium text-[13px] xl:text-base">
                          {user.phone || "Not Provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-5 justify-between">
                      <div className="flex space-x-2">
                        <MdLock className="my-auto size-5 xl:size-6 text-[#C1C1C1]" />
                        <p className="font-medium text-[13px] xl:text-base">
                          {user.dob || "Not Provided"}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <img className="md:w-7 md:h-4 xl:w-9 xl:h-6 my-auto" src={flag} alt="flag" />
                        <p className="font-medium text-[13px] xl:text-base">
                          {user.languages?.join(", ") || "English"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-t-2 md:hidden border-black/70 mt-2" />

            {/* Mobile Details */}
            <div className="px-2 md:hidden space-y-2 pt-2">
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <MdEmail className="my-auto size-5 text-[#C1C1C1]" />
                  <p className="font-medium text-[13px]">{user.email || "Not Provided"}</p>
                </div>
                <div className="flex space-x-2">
                  <MdLock className="my-auto size-5 text-[#C1C1C1]" />
                  <p className="font-medium text-[13px]">{user.dob || "Not Provided"}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <RiPhoneFill className="my-auto size-5 text-[#C1C1C1]" />
                  <p className="font-medium text-[13px]">{user.phone || "Not Provided"}</p>
                </div>
                <div className="flex space-x-2">
                  <img className="w-7 h-4 md:w-9 md:h-6 my-auto" src={flag} alt="flag" />
                  <p className="font-medium text-[13px]">{user.languages?.join(", ") || "English"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Information Section */}
          <div className="border-2 p-3 drop-shadow-md rounded-lg md:w-3/6">
            <div>
              <h2 className="text-base md:text-lg xl:text-xl font-semibold">Basic Information</h2>
              <p className="text-sm lg:text-base xl:text-lg text-black/80 font-normal">
                {user.basic_information || "No basic information provided."}
              </p>
            </div>
            <div>
              <h2 className="text-base font-semibold md:text-lg xl:text-xl">Skill</h2>
              <p className="text-sm lg:text-base xl:text-lg text-black/80 font-normal">
                {user.skill?.join(", ") || "No skills listed."}
              </p>
            </div>
            <div>
              <h2 className="text-base md:text-lg xl:text-xl font-semibold">Education</h2>
              <p className="text-sm lg:text-base xl:text-lg text-black/80 font-normal">
                {user.education || "No education details provided."}
              </p>
            </div>
            <div>
              <h2 className="text-base md:text-lg xl:text-xl font-semibold">Goal</h2>
              <p className="text-sm lg:text-base xl:text-lg text-black/80 font-normal">
                {user.goal || "No goal set."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeanerProfile;
