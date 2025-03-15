import { Link, useNavigate } from "react-router-dom"; 
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Navigate to the Ask Question page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/leanernavbar/askquestion");
    }, 3000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <div className="bg-black w-full sticky z-50 top-0 font-urbanist">
        <nav>
          <div className="flex justify-between py-1 my-auto xl:py-1 px-2 lg:px-8 xl:px-10">
            <div className="flex space-x-1 md:space-x-10 lg:space-x-12 xl:space-x-20">
              <Link to={"/"}>
                {" "}
                {/* <img
                  className="w-16 h-7 mt-2 lg:mt-3 lg:h-7 my-auto md:w-28 xl:w-36 xl:h-9"
                  src={logo}
                  alt="logo"
                /> */}
                <h2 className=" text-white my-auto whitespace-nowrap font-bold text-sm md:text-2xl lg:text-3xl justify-center items-center py-2 mt-1">
                  Academy GPT
                </h2>
              </Link>
            </div>

            <div className="text-white text-xs lg:text-base my-2 flex space-x-2 lg:space-x-7">
              <button className=" p-1 lg:p-2 px-1 border-primary whitespace-nowrap border-[1px] rounded-md">
                <Link to={"/leanernavbar/askquestion"}>{t("Ask Question")}</Link>
              </button>
              <button className=" lg:p-2 p-1 whitespace-nowrap bg-primary rounded-md">
                <Link to={"/applynow"}>{t("Apply Now")}</Link>
              </button>
              <button className="lg:p-2 py-1 px-1 border-primary whitespace-nowrap border-[1px] rounded-md">
                <Link to={"/loginpage"}>{t("Login")}</Link>
              </button>
              <button className="lg:p-2 px-1  bg-primary whitespace-nowrap rounded-md">
                <Link to={"/signuppages"}>{t("Sign Up")}</Link>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;