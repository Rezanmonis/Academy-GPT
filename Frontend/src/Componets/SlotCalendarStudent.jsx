import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Modal from "./CustomModel";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DottedLoader from "./Loader";
import { Trash } from "lucide-react";
import apiService from "../services/apiServices";
import { useTranslation } from "react-i18next";

const baseURL = import.meta.env.VITE_BASE_URL;

export default function MeetingSchedulerModalStudent({ tutorId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewSlots, setViewSlots] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-4 mt-2">Your Schedule</h2> */}

      <div className="">
        <button
          className="p-1 px-2 text-xs md:text-base xl:text-xl font-semibold rounded-md bg-primary text-white"
          onClick={() => {
            setIsModalOpen(true);
            setViewSlots(true);
          }}
        >
          {t("Book Lesson")}
        </button>
        {/* <button
          className="bg-orange-500 hover:bg-orange-600 text-white w-[200px] rounded flex justify-center h-[40px] items-center"
          onClick={() => {
            setIsModalOpen(true);
            setViewSlots(false);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Meeting Slot
        </button> */}
      </div>

      {/* Custom Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule a Meeting"
      >
        <MeetingScheduler
          onCancel={() => setIsModalOpen(false)}
          viewSlots={viewSlots}
          tutorId={tutorId}
        />
      </Modal>
    </div>
  );
}

function MeetingScheduler({ onCancel, viewSlots, tutorId }) {
  const [viewMode, setViewMode] = useState("day");
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 30)) // September 26, 2023
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedTimeValue, setSelectedTimeValue] = useState(null);
  const [selectedDateValue, setSelectedDateValue] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]); // Store all selected slots
  const [scheduledSlots, setScheduledSlots] = useState([]);
  const { teacher, loading, error } = useSelector((state) => state.teacher);
  const [dataLoading, setDataLoading] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);
  const [slotsToDelete, setSlotsToDelete] = useState([]); // Tracks scheduled slots selected for deletion

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
    // Get the selected date object
    const selectedDateObj = dates[dateIndex];

    // Convert time string (e.g., "10:00 AM") to 24-hour format
    const [hour, minute] = time.split(/[:\s]/);
    let parsedHour = parseInt(hour);
    const isPM = time.includes("PM");

    if (isPM && parsedHour !== 12) parsedHour += 12;
    if (!isPM && parsedHour === 12) parsedHour = 0; // Handle 12 AM case

    // Create the full start_time date object
    const startDateTime = new Date(selectedDateObj);
    startDateTime.setHours(parsedHour, parseInt(minute), 0, 0);

    // Find if this slot is already scheduled
    const matchingScheduledSlot = scheduledSlots.find(
      (slot) => new Date(slot.start_time).getTime() === startDateTime.getTime()
    );

    // Only allow selection if the slot is already scheduled
    if (matchingScheduledSlot) {
      // Update UI selection state
      setSelectedTimeSlot(`${dateIndex}-${timeIndex}`);
      setSelectedTimeValue(time);

      // Set the selected date value for display
      setSelectedDateValue(
        `${formatDate(selectedDateObj)} (${formatDayOfWeek(selectedDateObj)})`
      );

      // Clear previous selections and set only this slot
      setSelectedSlots([
        {
          day_of_week: selectedDateObj.getDay(),
          start_time: matchingScheduledSlot.start_time,
          end_time: matchingScheduledSlot.end_time,
          prices: matchingScheduledSlot.prices || [
            { group_size: "1", price: "50.00" },
            { group_size: "1 to 4", price: "120.00" },
            { group_size: "4+", price: "150.00" },
          ],
          id: matchingScheduledSlot.id,
        },
      ]);
    } else {
      // If the slot is not scheduled, don't allow selection
      // Optionally show a message that only scheduled slots can be selected
      console.log("This slot is not available for booking");
    }
  };

  const handleDone = async () => {
    const classType = localStorage.getItem("class_type");
    console.log("classType ===>", classType);

    // Find the matching price object from the selectedSlots prices array
    // and assign its id to class_type based on the group_size match
    let selectedClassType = classType;
    if (selectedSlots.length > 0 && selectedSlots[0]?.prices) {
      const matchingPrice = selectedSlots[0].prices.find(
        (price) => price.group_size === classType
      );
      if (matchingPrice && matchingPrice.id) {
        selectedClassType = matchingPrice.id;
      }
    }
    
    setApiLoading(true);
    try {
      const authToken = sessionStorage.getItem("token"); // Retrieve token (example)

      const response = await axios.post(
        `${baseURL}teachers/bookings`,
        {
          class_type: selectedClassType,
          availability: selectedSlots[0]?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Attach token
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );

      if (response?.data.status) {
        toast.success(response?.data?.message);
        onCancel();
        getSlots();
        setScheduledSlots([]);
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

  console.log("tutorId ===>", tutorId);
  const getSlots = async () => {
    try {
      const authToken = sessionStorage.getItem("token"); // Retrieve token (example)

      const response = await axios.get(
        `${baseURL}teachers/availabilities?teacher_id=${tutorId}&is_booked=0`,
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

  console.log("selectedSlots ===>", selectedSlots);
  console.log("scheduledSlots ===>", scheduledSlots);
  console.log("delte ===>", slotsToDelete);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-8">
        When would you like to meet?
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
      </div>

      {/* Calendar view */}
      <div className="w-full flex items-center justify-center mb-8">
        {/* Previous button */}
        <button
          onClick={() => navigateDates("prev")}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 mr-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {dataLoading ? (
          <DottedLoader color="orange" size={40} />
        ) : (
          <div className="flex-1 grid grid-cols-3 gap-2">
            {dates.map((date, dateIndex) => (
              <div key={dateIndex} className="flex flex-col items-center">
                <div className="text-[12px] font-medium text-gray-700 mb-1">
                  {formatDate(date)}
                </div>
                <div className="text-base text-[12px] text-gray-500 mb-4">
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
                    const isSlotDeleted = slotsToDelete.some(
                      (slot) =>
                        new Date(slot.start_time).getTime() ===
                        timeString.getTime()
                    );

                    // Determine the button style based on whether it's selected or scheduled
                    return (
                      <button
                        key={slotId}
                        className={`w-full py-3 border border-gray-300 rounded-md text-gray-700 transition-colors text-[12px]
            ${
              isSlotSelected
                ? "bg-green-500 text-white border-green-500 border-2"
                : isSlotScheduled
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
          className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white ml-4"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

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
          {apiLoading ? <DottedLoader /> : "Book Now"}
        </button>
      </div>
    </div>
  );
}
