import Applynow from "../../assets/Image/Applynow.png";
import { useTranslation } from "react-i18next";


const Contact = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="font-urbanist ">
        <div className="px-5 lg:flex lg:justify-between">
          <div>
            <h2 className="text-primary text-center font-semibold  lg:text-xl xl:text-2xl lg:text-left">
              {t("Contact us")}
            </h2>
          </div>
          <div className="hidden font-poppins text-black/50 lg:flex whitespace-nowrap  ">
            <p className="text-base my-auto">{t("Say something to start a live chat!")}</p>
          </div>
        </div>
        <div className="lg:flex lg:px-5">
          <div className="hidden lg:flex w-1/2">
            <img className="max-h-[700px] lg:h-[580px]" src={Applynow} alt="" />
          </div>
          <div className=" lg:w-1/2 w-full my-auto">
            <div className="space-y-3 px-10">
              <input
                type="text"
                placeholder={t("First Name")}
                className="w-full hidden lg:flex border-[1px] p-2 border-black rounded-md"
              />
              <input
                type="email"
                placeholder={t("Your Email")}
                className="w-full hidden lg:flex border-[1px] p-2 border-black rounded-md"
              />
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder={t("Subject")}
                className="w-full border-[1px] p-2 border-black rounded-md"
              />
              <textarea
                name="message"
                id="message"
                cols="20"
                rows="10"
                placeholder={t("Message")}
                className="w-full border-[1px] p-2 border-black rounded-md"
              />
              <div className="flex justify-center">
                <button className="p-2 px-3 font-semibold text-lg bg-primary rounded-md text-white">
                {t("Send Message")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
