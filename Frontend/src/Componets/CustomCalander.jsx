"use client";

import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Modal from "./CustomModel";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DottedLoader from "./Loader";

const baseURL = import.meta.env.VITE_BASE_URL;

export default function MeetingSchedulerModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduledSlots, setScheduledSlots] = useState([]);
  const [notification, setNotification] = useState(null);
  const { teacher, loading, error } = useSelector((state) => state.teacher);
  const [viewSlots, setViewSlots] = useState(false);

  // Function to show a notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Function to handle scheduling a slot
  const handleScheduleSlot = (date, time) => {
    const newSlot = { date, time };
    setScheduledSlots([...scheduledSlots, newSlot]);
    setIsModalOpen(false);
    showNotification(`Your meeting is scheduled for ${date} at ${time}`);
  };

  const getSlots = async () => {
    try {
      const authToken = sessionStorage.getItem("token"); // Retrieve token (example)

      const response = await axios.get(
        `${baseURL}teachers/availabilities?teacher_id=${teacher?.data?.teacher_id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Attach token
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );
      const teacherData = response.data;
      if (teacherData?.statusCode === 200) {
        setScheduledSlots(teacherData?.data);
      }
    } catch (error) {
      console.error("error ===>", error);
    }
  };

  useEffect(() => {
    getSlots();
  }, []);

  function formatTimestamp(isoString) {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${day}-${month}-${year} \n${formattedTime}`;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 mt-2">Your Schedule</h2>

      {/* Notification */}
      {notification && (
        <div
          className={`p-3 mb-4 rounded-md ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.message}
        </div>
      )}
      <div className="">
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white w-[200px] rounded flex justify-center h-[40px] items-center mb-4"
          onClick={() => {
            setIsModalOpen(true);
            setViewSlots(true);
          }}
        >
          View Meeting Slots
        </button>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white w-[200px] rounded flex justify-center h-[40px] items-center"
          onClick={() => {
            setIsModalOpen(true);
            setViewSlots(false);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Meeting Slot
        </button>
      </div>

      {/* Custom Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule a Meeting"
      >
        <MeetingScheduler
          onSchedule={handleScheduleSlot}
          onCancel={() => setIsModalOpen(false)}
          showNotification={showNotification}
          // getSlots={getSlots}
          viewSlots={viewSlots}
        />
      </Modal>
    </div>
  );
}

function MeetingScheduler({
  onSchedule,
  onCancel,
  showNotification,
  // getSlots,
  viewSlots,
}) {
  const [viewMode, setViewMode] = useState("day");
  const [selectedDate, setSelectedDate] = useState(new Date(2023, 8, 26)); // September 26, 2023
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedTimeValue, setSelectedTimeValue] = useState(null);
  const [selectedDateValue, setSelectedDateValue] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]); // Store all selected slots
  const [scheduledSlots, setScheduledSlots] = useState([]);
  const { teacher, loading, error } = useSelector((state) => state.teacher);
  const [dataLoading, setDataLoading] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);

  // Generate dates for the current view (3 consecutive days)
  const dates = Array.from({ length: 3 }, (_, i) => {
    const date = new Date(selectedDate);
    date.setDate(selectedDate.getDate() - 1 + i);
    return date;
  });

  // Format date as "Month Day"
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  // Format day of week
  const formatDayOfWeek = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  // Navigate to previous/next set of dates
  const navigateDates = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === "next" ? 3 : -3));
    setSelectedDate(newDate);
  };

  // Time slots (in a real app, these would be dynamic)
  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 AM", "1:00 PM"];

  const handleTimeSlotSelect = (dateIndex, timeIndex, time) => {
    setSelectedTimeSlot(`${dateIndex}-${timeIndex}`);
    setSelectedTimeValue(time);

    const selectedDateObj = dates[dateIndex]; // Get selected date
    const dayOfWeek = selectedDateObj.getDay(); // Get day index (0-6)

    // Convert time string (e.g., "10:00 AM") to 24-hour format
    const [hour, minute] = time.split(/[:\s]/);
    let parsedHour = parseInt(hour);
    const isPM = time.includes("PM");

    if (isPM && parsedHour !== 12) parsedHour += 12;
    if (!isPM && parsedHour === 12) parsedHour = 0; // Handle 12 AM case

    // Create the full start_time date object
    const startDateTime = new Date(selectedDateObj);
    startDateTime.setHours(parsedHour, parseInt(minute), 0, 0);

    // Calculate end_time (assuming 1-hour slot)
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 1);

    // Format data for backend
    const formattedSlot = {
      day_of_week: dayOfWeek,
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
      prices: [
        { group_size: "1", price: "50.00" },
        { group_size: "1 to 4", price: "120.00" },
        { group_size: "4+", price: "150.00" },
      ],
    };
    setSelectedSlots((prevSlots) => [...prevSlots, formattedSlot]);

    setSelectedDateValue(
      `${formatDate(selectedDateObj)} (${formatDayOfWeek(selectedDateObj)})`
    );
  };

  const handleDone = async () => {
    setApiLoading(true);
    try {
      const authToken = sessionStorage.getItem("token"); // Retrieve token (example)

      const response = await axios.post(
        `${baseURL}teachers/availabilities`,
        selectedSlots,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Attach token
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );

      if (response?.data?.statusCode) {
        onCancel();
        getSlots();
      }
      setApiLoading(false);
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.error(error?.response?.data?.non_field_errors[0]);
      }
      console.error("error ===>", error?.response?.data?.non_field_errors[0]);
      console.error("error ===>", error);
    }
    setApiLoading(false);
  };

  const getSlots = async () => {
    try {
      const authToken = sessionStorage.getItem("token"); // Retrieve token (example)

      const response = await axios.get(
        `${baseURL}teachers/availabilities?teacher_id=${teacher?.data?.teacher_id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Attach token
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );
      const teacherData = response.data;
      if (teacherData?.status) {
        setScheduledSlots(teacherData?.data);
        setDataLoading(false);
      }
    } catch (error) {
      console.error("error ===>", error);
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getSlots();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-8">
        {viewSlots ? "Your selected slots " : "When would you like to meet?"}
      </h1>

      {/* View toggle buttons */}
      <div className="flex gap-4 mb-8">
        <button
          className={`w-32 rounded-md text-lg font-medium ${
            viewMode === "day"
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "bg-white text-black border border-orange-500 hover:bg-orange-50"
          }`}
          onClick={() => setViewMode("day")}
        >
          Day
        </button>
        {/* <button
          className={`w-32 rounded-md text-lg font-medium ${
            viewMode === "month"
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "bg-white text-black border border-orange-500 hover:bg-orange-50"
          }`}
          onClick={() => setViewMode("month")}
        >
          Month
        </button> */}
      </div>

      {/* Calendar view */}
      <div className="w-full flex items-center justify-center mb-8">
        {/* Previous button */}
        <button
          onClick={() => navigateDates("prev")}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 mr-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {dataLoading ? (
          <DottedLoader color="orange" size={40} />
        ) : (
          <div className="flex-1 grid grid-cols-3 gap-4">
            {dates.map((date, dateIndex) => (
              <div key={dateIndex} className="flex flex-col items-center">
                <div className="text-lg font-medium text-gray-700 mb-1">
                  {formatDate(date)}
                </div>
                <div className="text-base text-gray-500 mb-4">
                  {formatDayOfWeek(date)}
                </div>

                <div className="w-full space-y-4">
                  {timeSlots.map((time, timeIndex) => {
                    const slotId = `${dateIndex}-${timeIndex}`;

                    // Convert time to 24-hour format for comparison
                    const [hour, minute] = time.split(/[:\s]/);
                    let parsedHour = parseInt(hour);
                    const isPM = time.includes("PM");

                    if (isPM && parsedHour !== 12) parsedHour += 12;
                    if (!isPM && parsedHour === 12) parsedHour = 0; // Handle 12 AM case

                    // Create a time string to compare with scheduled slots' start_time
                    const timeString = new Date(date);
                    timeString.setHours(parsedHour, parseInt(minute), 0, 0);

                    // Check if the current slot is in the scheduled slots
                    const isSlotScheduled = scheduledSlots.some(
                      (slot) =>
                        new Date(slot.start_time).getTime() ===
                        timeString.getTime()
                    );

                    // Check if the current slot is in the selectedSlots array (user-selected)
                    const isSlotSelected = selectedSlots.some(
                      (slot) =>
                        new Date(slot.start_time).getTime() ===
                        timeString.getTime()
                    );

                    // Determine the button style based on whether it's selected or scheduled
                    return (
                      <button
                        key={slotId}
                        className={`w-full py-3 border border-gray-300 rounded-md text-gray-700 transition-colors
            ${
              isSlotSelected || isSlotScheduled
                ? "bg-orange-500 text-white border-orange-500 border-2"
                : "hover:border-orange-500 hover:bg-orange-100"
            }`}
                        onClick={() =>
                          handleTimeSlotSelect(dateIndex, timeIndex, time)
                        }
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Next button */}
        <button
          onClick={() => navigateDates("next")}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-500 text-white ml-4"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {!viewSlots && (
        <div className="flex gap-4 w-full justify-center">
          <button
            variant="outline"
            className="w-40 text-lg font-medium h-[40px] flex items-center justify-center "
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="w-40 py-6 text-lg font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-md h-[40px] flex items-center justify-center"
            onClick={handleDone}
          >
            {apiLoading ? <DottedLoader /> : "Done"}
          </button>
        </div>
      )}
    </div>
  );
}

// import { useState } from "react";
// import { IoIosArrowBack, IoIosArrowForward,  } from "react-icons/io";
// import { IoMdClose } from "react-icons/io";

// // CalendarModal component for full-screen display
// const CalendarModal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50  p-5 flex items-center justify-center z-50">
//       <div className="bg-white w-full h-full md:w-1/2  md:rounded-lg relative overflow-auto">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10">
//           <IoMdClose className="w-8 h-8" />
//         </button>
//         <div className="p-4 w-full h-full">{children}</div>
//       </div>
//     </div>
//   );
// };

// // Rest of the calendar components remain the same...
// const ClassTypeButton = ({ time, type }) => {
//   const getTypeStyles = () => {
//     switch (type) {
//       case "one-on-one":
//         return "bg-blue-100 border-black/60 text-black/60";
//       case "group-4":
//         return "bg-blue-100 border-black/60 text-black/60";
//       case "group-4-plus":
//         return "bg-blue-100 border-black/60 text-black/60";
//       default:
//         return "border-black/60 text-black/60";
//     }
//   };

//   return (
//     <button
//       className={`w-full p-2 rounded-lg border ${getTypeStyles()} text-sm hover:opacity-80 transition-opacity`}>
//       {time}
//       {type && (
//         <span className="block text-xs mt-1">
//           {type === "one-on-one"
//             ? "1-on-1"
//             : type === "group-4"
//             ? "Group (4)"
//             : "Group (4+)"}
//         </span>
//       )}
//     </button>
//   );
// };

// const DayView = ({ currentDate, onNavigate, isFullScreen }) => {
//   const getDates = () => {
//     const dates = [];
//     for (let i = 0; i < 3; i++) {
//       const date = new Date(currentDate);
//       date.setDate(currentDate.getDate() + i);
//       dates.push(date);
//     }
//     return dates;
//   };

//   const sampleSchedule = (date) => [
//     { time: "9:00 AM", type: "one-on-one" },
//     { time: "10:00 AM", type: "group-4" },
//     { time: "2:00 PM", type: "group-4-plus" },
//     { time: "4:00 PM", type: "" },
//   ];

//   const arrowClasses = isFullScreen ? "-translate-x-5" : "-translate-x-6";

//   return (
//     <div className="relative">
//       <button
//         onClick={() => onNavigate(-3)}
//         className={`absolute left-0 top-1/2 -translate-y-1/2 ${arrowClasses} w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors`}>
//         <IoIosArrowBack size={24} />
//       </button>

//       <div className="grid grid-cols-3 gap-4 px-4">
//         {getDates().map((date) => (
//           <div key={date.toISOString()} className="space-y-4">
//             <div className="text-center">
//               <h3 className="text-lg whitespace-nowrap font-semibold">
//                 {date.toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </h3>
//               <p className="text-gray-500">
//                 {date.toLocaleDateString("en-US", { weekday: "long" })}
//               </p>
//             </div>
//             <div className="space-y-2">
//               {sampleSchedule(date).map((session, idx) => (
//                 <ClassTypeButton
//                   key={idx}
//                   time={session.time}
//                   type={session.type}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={() => onNavigate(3)}
//         className={`absolute right-0 top-1/2 -translate-y-1/2 ${
//           arrowClasses === "-translate-x-5" ? "translate-x-6" : "translate-x-6"
//         } w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors`}>
//         <IoIosArrowForward size={24} />
//       </button>
//     </div>
//   );
// };

// const MonthView = ({ currentDate, onNavigate, onDayClick, isFullScreen }) => {
//   // ... MonthView implementation remains the same ...
//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const firstDayOfWeek = firstDay.getDay();

//     return { daysInMonth, firstDayOfWeek };
//   };

//   const { daysInMonth, firstDayOfWeek } = getDaysInMonth(currentDate);

//   const handleDayClick = (day) => {
//     const selectedDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       day
//     );
//     onDayClick(selectedDate);
//   };

//   const arrowClasses = isFullScreen ? "-translate-x-8" : "-translate-x-4";

//   return (
//     <div className="relative">
//       <button
//         onClick={() => onNavigate(-1, "month")}
//         className={`absolute left-0 top-1/2 -translate-y-1/2 ${arrowClasses} w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors`}>
//         <IoIosArrowBack size={24} />
//       </button>

//       <div className="px-4">
//         <h3 className="text-xl font-semibold text-center mb-4">
//           {currentDate.toLocaleDateString("en-US", {
//             month: "long",
//             year: "numeric",
//           })}
//         </h3>
//         <div className="grid grid-cols-7 gap-1 text-center mb-2">
//           {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//             <div key={day} className="font-semibold">
//               {day}
//             </div>
//           ))}
//         </div>
//         <div className="grid grid-cols-7 gap-1">
//           {Array(firstDayOfWeek)
//             .fill(null)
//             .map((_, idx) => (
//               <div key={`empty-${idx}`} className="aspect-square" />
//             ))}
//           {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
//             <div
//               key={day}
//               onClick={() => handleDayClick(day)}
//               className="border rounded-lg p-1 aspect-square hover:bg-gray-50 cursor-pointer">
//               <div className="text-sm font-medium mb-1">{day}</div>
//               <div className="space-y-1">
//                 {day % 3 === 0 && <div className="h-1 bg-primary/70 rounded" />}
//                 {day % 4 === 0 && <div className="h-1 bg-primary/70 rounded" />}
//                 {day % 5 === 0 && <div className="h-1 bg-primary/70 rounded" />}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={() => onNavigate(1, "month")}
//         className={`absolute right-0 top-1/2 -translate-y-1/2 ${
//           arrowClasses === "-translate-x-4" ? "translate-x-4" : "translate-x-6"
//         } w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors`}>
//         <IoIosArrowForward size={24} />
//       </button>
//     </div>
//   );
// };

// const CustomCalendar = ({ isFullScreen = false, onClose }) => {
//   const [view, setView] = useState("day");
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const handleNavigate = (amount, type = "day") => {
//     const newDate = new Date(currentDate);
//     if (type === "month") {
//       newDate.setMonth(newDate.getMonth() + amount);
//     } else {
//       newDate.setDate(newDate.getDate() + amount);
//     }
//     setCurrentDate(newDate);
//   };

//   const handleDayClick = (date) => {
//     setCurrentDate(date);
//     setView("day");
//   };

//   const calendarContent = (
//     <div
//       className={`bg-white rounded-xl shadow-lg p-4 ${
//         isFullScreen ? "h-full" : ""
//       }`}>
//       <h1 className="text-2xl font-bold text-center mb-4">My Schedule</h1>

//       <div className="flex justify-center space-x-4 mb-6">
//         <button
//           onClick={() => setView("day")}
//           className={`px-6 py-2 rounded-lg transition-colors ${
//             view === "day"
//               ? "bg-orange-500 text-white"
//               : "border border-orange-500 text-orange-500"
//           }`}>
//           Day
//         </button>
//         <button
//           onClick={() => setView("month")}
//           className={`px-6 py-2 rounded-lg transition-colors ${
//             view === "month"
//               ? "bg-orange-500 text-white"
//               : "border border-orange-500 text-orange-500"
//           }`}>
//           Month
//         </button>
//       </div>

//       {view === "day" ? (
//         <DayView
//           currentDate={currentDate}
//           onNavigate={handleNavigate}
//           isFullScreen={isFullScreen}
//         />
//       ) : (
//         <MonthView
//           currentDate={currentDate}
//           onNavigate={handleNavigate}
//           onDayClick={handleDayClick}
//           isFullScreen={isFullScreen}
//         />
//       )}
//       <div className="my-2 flex justify-center">
//         <button className="p-2 bg-primary px-4 w-20 font-bold rounded-md text-white">Set</button>
//       </div>
//     </div>
//   );

//   return isFullScreen ? (
//     <CalendarModal isOpen={true} onClose={onClose}>
//       {calendarContent}
//     </CalendarModal>
//   ) : (
//     <div className="max-w-4xl mx-auto transform scale-75 md:scale-90">
//       {calendarContent}
//     </div>
//   );
// };

// export default CustomCalendar;
