import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MenuOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { GoDotFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import logo from "../assets/Image/Logo.png";
import person from "../assets/Image/person.png";
import { fetchTeacherData } from "../features/teacherSlice";

const TutorNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  

  const [collapsed, setCollapsed] = useState(true);
  const [activeComponent, setActiveComponent] = useState("");

  const { teacher: combinedProfile, loading, error, isFetched } = useSelector(
    (state) => state.teacher
  );
  
  useEffect(() => {
    if (!isFetched && !loading && !error) {
      dispatch(fetchTeacherData());
    }
  }, [dispatch, isFetched, loading, error]);

  useEffect(() => {
    const pathToKey = {
      "/tutornavbar/dashboard": "dashboard",
      "/tutornavbar/tutorleanerquestion": "tutorlearnerquestions",
      "/tutornavbar/contact": "contact",
      "/tutornavbar/review": "review",
      "/aboutpage": "aboutus",
    };
    setActiveComponent(pathToKey[location.pathname] || "dashboard");
  }, [location]);

  const handleProfileClick = () => {
    navigate("/tutornavbar/tutorprofile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/loginpage");
  };

  const toggleDrawer = () => setCollapsed(!collapsed);

  const isWhiteBoardPage = () => window.location.href.includes("whiteboard");

  const menuItems = [
    { label: "DASHBOARD", key: "dashboard", path: "/tutornavbar/dashboard" },
    {
      label: "LEARNER QUESTIONS",
      key: "learnerquestions",
      path: "/tutornavbar/tutorleanerquestion",
    },
    { label: "CONTACT", key: "contact", path: "/tutornavbar/contact" },
    { label: "REVIEW", key: "review", path: "/tutornavbar/review" },
    { label: "ABOUT US", key: "aboutus", path: "/aboutpage" },
  ];

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

  return isWhiteBoardPage() ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <div className="flex font-urbanist relative">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-black text-white fixed">
        <div className="p-6 text-center">
        <h2 className="text-white my-auto font-bold text-xl lg:text-2xl justify-center items-center py-2 mt-1">
            Academy GPT
          </h2>
        </div>
        <div className="flex-1">
          <ul className="space-y-1 text-center">
            <div className="px-10 space-y-2 font-semibold">
              {menuItems.map((item) => (
                <li
                  key={item.key}
                  className={`cursor-pointer p-2 ${
                    activeComponent === item.key
                      ? "bg-primary relative rounded-md  text-white"
                      : ""
                  } transition-all`}
                  onClick={() => navigate(item.path)}>
                  {activeComponent === item.key && (
                    <span className="absolute -left-10 rounded-r-xl top-0 bottom-0 w-1 bg-primary"></span>
                  )}
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </div>
          </ul>
        </div>
        <div onClick={handleLogout} className="px-12 p-4">
          <button className="bg-primary font-semibold w-full text-white py-2 rounded-md">
            Logout
          </button>
        </div>
      </aside>

      {/* Drawer for mobile/tablet */}
      <div className="lg:hidden fixed top-0 px-5 left-0 w-full z-50 bg-black text-white flex items-center justify-between p-2">
        <div className="items-center">
        <h2 className="text-white my-auto font-bold text-xl lg:text-2xl justify-center items-center py-2 mt-1">
            Academy GPT
          </h2>
        </div>
        <div className="flex space-x-4">
          <img
            src={combinedProfile.data?.profile_picture || person}
            alt="User"
            onClick={handleProfileClick}
            className={`w-9 h-9 my-auto  bg-white rounded-full ${
              activeComponent === "profile " ? "border-2 border-primary" : ""
            }`}
          />
          <IoSearch className="my-auto mt-1" size={25} />
          <button onClick={toggleDrawer}>
            <MenuOutlined className="text-white text-2xl" />
          </button>
        </div>
      </div>

      <div
        className={`${
          collapsed ? "hidden" : "block"
        } fixed inset-0 bg-white bg-opacity-75 z-40 lg:hidden`}
        onClick={toggleDrawer}>
        <div
          className="w-72 bg-black rounded-bl-[55px] p-6 absolute top-16 right-0 z-50"
          onClick={(e) => e.stopPropagation()}>
          <button
            onClick={toggleDrawer}
            className="rounded mx-auto inline-flex">
            <CgClose className="flex text-white" size={30} />
          </button>
          <ul className="mt-2 font-bold text-black space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={`cursor-pointer flex list-inside text-white bg-[#212121] px-4 p-1 ${
                  activeComponent === item.key
                    ? "bg-primary text-white relative"
                    : ""
                } hover:bg-primary rounded-md transition-all`}
                onClick={() => navigate(item.path)}>
                <GoDotFill
                  className={`my-auto mr-3 ${
                    activeComponent === item.key ? "text-white" : "text-primary"
                  }`}
                />
                {item.label}
              </li>
            ))}
          </ul>
          <button
            onClick={handleLogout}
            className="bg-primary flex text-left p-1 font-bold w-full mt-6 text-white py-1 rounded-md">
            <GoDotFill className="my-auto ml-3 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-0 lg:ml-64 pt-5 lg:pt-6 w-full relative">
        <div className="hidden lg:flex lg:absolute shadow-md drop-shadow-md top-0 left-0 lg:w-full bg-gray-100 p-4 items-center lg:justify-between">
          <div className="flex-1 relative mx-4">
            <input
              type="text"
              placeholder="Search"
              className="lg:w-80 p-2 pl-12 bg-[#F5F6FA] placeholder:text-[#626264] focus:outline-primary border border-black/30 placeholder:font-medium rounded-3xl border-gray-300"
            />
            <IoSearch
              className="my-auto text-[#626264] absolute top-3 left-4"
              size={20}
            />
          </div>
          <div className="flex items-center">
            <img
              src={combinedProfile.data?.profile_picture || person}
              alt="User"
              onClick={handleProfileClick}
              className={`w-9 h-9 my-auto rounded-full ${
                activeComponent === "profile" ? "border-2 border-primary" : ""
              }`}
            />
            <div>
              <span className="px-2 text-base font-semibold">
                {combinedProfile.data?.first_name || "Guest"}{" "}
                {combinedProfile.data?.last_name || "User"}
              </span>
              <div className="px-2 flex justify-between">
                <p className="font-medium text-black/70">Profile</p>
                <IoIosArrowDropdown className="my-auto text-black/70 size-6" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 w-full lg:py-5 lg:w-full relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TutorNavbar;