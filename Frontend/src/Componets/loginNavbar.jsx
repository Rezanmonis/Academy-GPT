import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import logo from "../assets/Image/Logo.png";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-black sticky top-0 z-50  md:mt-0 font-urbanist">
      <nav>
        <div className="flex justify-between py-1 my-auto xl:py-1 px-3 xl:px-10">
          <div className="flex space-x-1 md:space-x-10 lg:space-x-12 xl:space-x-20">
            <Link to={"/"}>
              {/* <img
                className="w-16 h-6 my-auto mt-2 xl:mt-3 md:w-28 xl:w-36 xl:h-9"
                src={logo}
                alt="logo"
              /> */}
              <h2 className=" text-white my-auto whitespace-nowrap font-bold text-sm md:text-2xl lg:text-3xl justify-center items-center py-2 mt-1">
                Academy GPT
              </h2>
            </Link>
          </div>
          <div className="text-white text-xs lg:text-base my-2 flex space-x-2 lg:space-x-4">
            <button className="lg:p-2 py-1 px-2 bg-primary whitespace-nowrap rounded-md">
              <Link to={"/loginpage"}>{t("Login")}</Link>
            </button>
            <button className="lg:p-2 px-2 whitespace-nowrap rounded-md">
              <Link to={"/signuppages"}>{t("Sign Up")}</Link>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
