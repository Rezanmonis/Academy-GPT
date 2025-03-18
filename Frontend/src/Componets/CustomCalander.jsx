"use client";

import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Modal from "./CustomModel";
import axios from "axios";
import { useSelector } from "react-redux";

const baseURL = import.meta.env.VITE_BASE_URL;

export default function MeetingSchedulerModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduledSlots, setScheduledSlots] = useState([]);
  const [notification, setNotification] = useState(null);
  const { teacher, loading, error } = useSelector((state) => state.teacher);

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

      {/* Display scheduled slots */}
      <div className="mb-6 h-[300px] overflow-auto">
        {scheduledSlots?.length > 0 ? (
          <div className="space-y-2">
            {scheduledSlots.map((slot, index) => (
              <div
                key={index}
                className="p-3 border rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {formatTimestamp(slot.start_time)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatTimestamp(slot.end_time)}
                  </p>
                </div>
                {/* <button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setScheduledSlots(
                      scheduledSlots.filter((_, i) => i !== index)
                    );
                    showNotification("Meeting cancelled");
                  }}
                >
                  Cancel
                </button> */}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No meetings scheduled yet.</p>
        )}
      </div>

      {/* Button to open modal */}
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white w-[200px] rounded flex justify-center h-[40px] items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Meeting Slot
      </button>

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
          getSlots={getSlots}
        />
      </Modal>
    </div>
  );
}

function MeetingScheduler({
  onSchedule,
  onCancel,
  showNotification,
  getSlots,
}) {
  const [viewMode, setViewMode] = useState("day");
  const [selectedDate, setSelectedDate] = useState(new Date(2023, 8, 26)); // September 26, 2023
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedTimeValue, setSelectedTimeValue] = useState(null);
  const [selectedDateValue, setSelectedDateValue] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]); // Store all selected slots

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
    } catch (error) {
      console.error("error ===>", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-[45vw]">
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
        <button
          className={`w-32 rounded-md text-lg font-medium ${
            viewMode === "month"
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "bg-white text-black border border-orange-500 hover:bg-orange-50"
          }`}
          onClick={() => setViewMode("month")}
        >
          Month
        </button>
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

        {/* Date columns */}
        <div className="flex-1 grid grid-cols-3 gap-4">
          {dates.map((date, dateIndex) => (
            <div key={dateIndex} className="flex flex-col items-center">
              <div className="text-lg font-medium text-gray-700 mb-1">
                {formatDate(date)}
              </div>
              <div className="text-base text-gray-500 mb-4">
                {formatDayOfWeek(date)}
              </div>

              {/* Time slots */}
              <div className="w-full space-y-4">
                {timeSlots.map((time, timeIndex) => (
                  <button
                    key={`${dateIndex}-${timeIndex}`}
                    className={`w-full py-3 border border-gray-300 rounded-md text-gray-700 hover:border-orange-500 transition-colors
                      ${
                        selectedTimeSlot === `${dateIndex}-${timeIndex}`
                          ? "border-orange-500 border-2"
                          : ""
                      }`}
                    onClick={() =>
                      handleTimeSlotSelect(dateIndex, timeIndex, time)
                    }
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => navigateDates("next")}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-500 text-white ml-4"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 w-full justify-center">
        <button
          variant="outline"
          className="w-32 py-6 text-lg font-medium"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="w-40 py-6 text-lg font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-md"
          onClick={handleDone}
        >
          Done
        </button>
      </div>
    </div>
  );
}
