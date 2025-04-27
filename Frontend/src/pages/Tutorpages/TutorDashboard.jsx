import { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeacherData } from "../../features/teacherSlice";
import { useTranslation } from "react-i18next";
import apiService from "../../services/apiServices";

const TutorDashboard = () => {
  const dispatch = useDispatch();
  const { teacher, loading, error } = useSelector((state) => state.teacher);
  const { t } = useTranslation();
  const [bookingDetails, setBookingDetails] = useState([]);

  // Fetch teacher data if not already fetched
  useEffect(() => {
    if (!teacher && !loading && !error) {
      dispatch(fetchTeacherData());
    }
    // For debugging purposes
    console.log("Current teacher data:", teacher);
  }, [dispatch, teacher, loading, error]);

  // Helper function to get display name
  const getSlots = async () => {
    try {
      const response = await apiService({
        method: "GET",
        endpoint: `teachers/availabilities?teacher_id=${teacher?.data?.teacher_id}&is_booked=1`,
      });
      const teacherData = response.data;
      console.log("teacherData", teacherData);
      if (response?.status) {
        console.log("response?.data.booking_details", response?.data);
        setBookingDetails(response?.data);
      }
    } catch (error) {
      console.error("error ===>", error);
      setDataLoading(false);
    }
  };

  const confirmSlotCompletion = async (slotId) => {
    try {
      const response = await apiService({
        method: "PATCH",
        endpoint: `teachers/bookings/${slotId}`,
        data: { status: "Confirmed" },
      });

      if (response?.status) {
        console.log("Slot marked as completed:", response);
        // Refresh the slots after updating
        toast.success("Slot confirmed successfully");
        getSlots();
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error confirming slot completion:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center">{error.message}</div>;

  useEffect(() => {
    getSlots();
  }, []);
  console.log("bookingDetails", bookingDetails);
  return (
    <div className="font-urbanist lg:flex gap-x-8 px-2 py-2 lg:px-5 z-20">
      {/* Left Section */}
      <div className="lg:w-2/6">
        <div className="grid grid-cols-4 lg:grid-cols-4 space-y-4">
          {/* Dashboard Header Card */}
          <div className="border-2 flex lg:block lg:space-y-4 justify-around shadow-md drop-shadow-lg p-4 w-full col-span-4 lg:col-span-4 lg:row-span-2 rounded-lg">
            <div className="space-y-2">
              <h2 className="text-2xl lg:text-3xl font-semibold">
                {t("Dashboard")}
              </h2>
              <p className="text-primary text-sm lg:text-[18px] font-medium whitespace-nowrap">
                {t("Welcome")}, {teacher.data?.username || "Teacher"}.
              </p>
            </div>
            <div className="border-l-2 lg:border-t-2 border-black"></div>
            <div>
              <div className="space-y-2 mx-auto my-auto">
                <h4 className="flex whitespace-nowrap text-sm lg:text-lg font-medium">
                  <IoIosPhonePortrait className="my-auto mx-auto size-6" />
                  {t("Get the Academy GPT app")}
                </h4>
                <div className="lg:flex lg:justify-center">
                  <Link to={"/tutornavbar/whiteboard"}>
                    <button className="bg-primary text-sm lg:text-[20px] font-bold text-white p-2 rounded-md my-auto whitespace-nowrap">
                      {t("Try Our Whiteboard")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Card */}
          <div className="flex justify-between col-span-4 lg:row-span-1 lg:col-span-4 shadow-md drop-shadow-lg border-2 p-2 w-full rounded-lg">
            <h2 className="whitespace-nowrap my-auto text-sm md:text-base lg:text-xl font-semibold">
              {t("My Budget")}:
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold my-auto">
              ${teacher?.data?.balance || "00"}
            </h3>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-4/6">
        <div className="lg:grid-rows-8 space-y-4 lg:space-y-10">
          {/* Instant Connect Card */}
          <div className="relative mt-5 lg:mt-0 space-y-1 col-span-4 lg:col-span-5 shadow-md drop-shadow-lg border-2 p-3 px-4 w-full rounded-lg">
            <h2 className="text-base md:text-lg lg:text-[24px] font-semibold">
              {t("Instant Connect with Tutors")}
            </h2>
            <p className="text-[9.49px] md:text-sm lg:text-lg text-black/80">
              {t(
                "Get the Academy GPT app for Android and iPhone. Chat with students in real-time and book lessons on the go."
              )}
            </p>
            <button className="flex text-[10px] md:text-sm lg:text-base font-medium text-primary">
              {t("Get the App ")}
              <FaAngleRight className="my-auto text-black ml-1" />
            </button>
            <CgClose className="flex absolute top-2 right-3" size={20} />
          </div>

          {/* Lessons Section */}
          <div className="col-span-4 lg:col-span-5 lg:space-y-5">
            <div className="flex justify-between">
              <h2 className="text-base md:text-lg lg:text-[28px] font-semibold">
                {t("Lessons")}
              </h2>
              <h4 className="flex text-sm md:text-base lg:text-[20px] my-auto font-medium">
                {t("All Lessons")} <FaAngleRight className="my-auto" />
              </h4>
            </div>

            {/* Lesson Cards */}
            {bookingDetails?.map((student, index) => (
              <div
                key={index}
                className="flex mt-2 justify-between shadow-md drop-shadow-lg border-2 p-2 w-full rounded-lg"
              >
                <div className="flex space-x-2">
                  <img
                    className="w-10 h-10 lg:w-16 lg:h-16 my-auto"
                    src={person1}
                    alt="Student"
                  />
                  <div className="flex space-x-2">
                    <div className="my-auto">
                      <h4 className="flex text-base md:text-lg lg:text-2xl font-semibold whitespace-nowrap">
                        {student.booking_details.student_first_name}
                      </h4>
                      <p className="text-[9.9px] md:text-xs lg:text-base font-medium text-black/60 whitespace-nowrap">
                        {t("Subject Name")}
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/${student?.availability_display?.teacher_contact}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 my-auto"
                        src={whatapp}
                        alt="WhatsApp"
                      />
                    </a>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-right text-[9.9px] md:text-xs lg:text-base font-medium">
                    {student.booking_details.class_type_display == 1
                      ? t("One on One")
                      : student.booking_details.class_type_display == "1 to 4"
                      ? t("Group 4")
                      : t("Group 4+")}
                  </p>
                  <div className="flex justify-end space-x-4">
                    {student.booking_details.status !== "Confirmed" &&
                      student.booking_details.status !== "Completed" && (
                        <button
                          className="text-[9.9px] md:text-xs px-2 rounded-md font-medium text-white bg-primary p-1"
                          onClick={() =>
                            confirmSlotCompletion(student.booking_details.id)
                          }
                        >
                          <Link to={"#"}>{t("Confirm Slot")}</Link>
                        </button>
                      )}

                    <IoMdCheckmarkCircle className="my-auto text-[#A4A4A4] size-5 lg:size-6" />
                  </div>
                  <p className="text-[9.5px] md:text-xs whitespace-nowrap xl:text-base font-medium text-black/60">
                    {student?.start_time
                      ? new Date(student.start_time).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          }
                        ) +
                        " at " +
                        new Date(student.start_time).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )
                      : "No date available"}
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

export default TutorDashboard;
