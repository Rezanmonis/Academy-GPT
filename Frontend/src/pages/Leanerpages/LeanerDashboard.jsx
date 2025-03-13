import { useEffect } from "react";
import { IoIosPhonePortrait } from "react-icons/io";
import question from "../../assets/Image/question.png";
import answer from "../../assets/Image/answer.png";
import { FaAngleRight } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import person1 from "../../assets/Image/person1.png";
import person2 from "../../assets/Image/person2.png";
import person3 from "../../assets/Image/person3.png";
import whatapp from "../../assets/Image/whatsapp.png";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../features/userSlice";
import { Link } from "react-router-dom";

const LeanerDashboard = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  // Fetch user data only if it's null and not already loading
  useEffect(() => {
    if (!user && !loading && !error) {
      dispatch(fetchUserData());
    }
  }, [dispatch, loading, error]); // Remove `user` from dependencies to prevent infinite loop

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error) return <div className="text-red-500 text-center">{error.message}</div>;

  return (
    <div className="font-urbanist lg:flex gap-x-8 px-2 lg:px-5 z-20">
      <div className="lg:w-2/6">
        <div className="grid grid-cols-4 lg:grid-cols-4 space-y-4">
          <div className="border-2 flex lg:block lg:space-y-4 justify-around shadow-md drop-shadow-lg p-4 w-full col-span-4 lg:col-span-4 lg:row-span-2 rounded-lg">
            <div className="space-y-2">
              <h2 className="text-2xl lg:text-3xl font-semibold">Dashboard</h2>
              <p className="text-primary text-sm lg:text-[18px] font-medium whitespace-nowrap">
                Welcome, {user?.username || "User"}.
              </p>
            </div>
            <div className="border-l-2 lg:border-t-2 border-black"></div>
            <div>
              <div className="space-y-2 my-auto">
                <h4 className="flex whitespace-nowrap text-sm lg:text-lg font-medium">
                  <IoIosPhonePortrait className="my-auto size-6" />
                  Get the Simex app
                </h4>
                <div className="lg:flex lg:justify-center">
                  <Link to={"/leanernavbar/whiteboard"}>
                    <button className="bg-primary text-sm lg:text-[20px] font-bold text-white p-2 rounded-md my-auto whitespace-nowrap">
                      Try Our Whiteboard
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between col-span-4 lg:row-span-1 lg:col-span-4 shadow-md drop-shadow-lg border-2 p-2 w-full rounded-lg">
            <h2 className="whitespace-nowrap my-auto text-sm md:text-base lg:text-xl font-semibold">
              My Budget:
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold my-auto">$250</h3>
          </div>
        </div>
      </div>

      <div className="lg:w-4/6">
        <div className="lg:grid-rows-8 space-y-4 lg:space-y-10">
          <div className="relative mt-5 lg:mt-0 space-y-1 col-span-4 lg:col-span-5 shadow-md drop-shadow-lg border-2 p-3 px-4 w-full rounded-lg">
            <h2 className="text-base md:text-lg lg:text-[24px] font-semibold">
              Instant Connect with Tutors
            </h2>
            <p className="text-[9.49px] md:text-sm lg:text-lg text-black/80">
              Get the Simex app for Android and iPhone. Chat with tutors in real-time and book lessons on the go.
            </p>
            <button className="flex text-[10px] md:text-sm lg:text-base font-medium text-primary">
              Get the App <FaAngleRight className="my-auto text-black ml-1" />
            </button>
            <CgClose className="flex absolute top-2 right-3" size={20} />
          </div>

          <div className="col-span-4 lg:col-span-5 lg:space-y-5">
            <div className="flex justify-between">
              <h2 className="text-base md:text-lg lg:text-[28px] font-semibold">Lessons</h2>
              <h4 className="flex text-sm md:text-base lg:text-[20px] my-auto font-medium">
                All Lessons <FaAngleRight className="my-auto" />
              </h4>
            </div>

            {/* Lesson Card */}
            {[person1, person2, person3].map((personImg, index) => (
              <div key={index} className="flex mt-2 justify-between shadow-md drop-shadow-lg border-2 p-2 w-full rounded-lg">
                <div className="flex space-x-2">
                  <img className="w-10 h-10 lg:w-16 lg:h-16 my-auto" src={personImg} alt="Tutor" />
                  <div className="flex space-x-2">
                    <div className="my-auto">
                      <h4 className="flex text-base md:text-lg lg:text-2xl font-semibold whitespace-nowrap">
                        Ether Khal
                      </h4>
                      <p className="text-[9.9px] md:text-xs lg:text-base font-medium text-black/60 whitespace-nowrap">
                        Elementary Math
                      </p>
                    </div>
                    <img className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 my-auto" src={whatapp} alt="WhatsApp" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-right text-[9.9px] md:text-xs lg:text-base font-medium">
                    {index === 0 ? "One on One" : index === 1 ? "Group 4" : "Group 4+"}
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button className="text-[9.9px] md:text-xs px-2 rounded-md font-medium text-white bg-primary p-1">
                      <Link to={"paymentmethod"}>Pay Now</Link>
                    </button>
                    <IoMdCheckmarkCircle className="my-auto text-[#A4A4A4] size-5 lg:size-6" />
                  </div>
                  <p className="text-[9.5px] md:text-xs whitespace-nowrap xl:text-base font-medium text-black/60">
                    Wed, Apr 8 at 3:00 pm CDT
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default LeanerDashboard;
