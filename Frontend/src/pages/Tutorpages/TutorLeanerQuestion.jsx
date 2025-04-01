import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { useTranslation } from "react-i18next";

const TutorLearnerQuestions = () => {
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // Get student_id from Redux
  const { student_id } = useSelector((state) => state.user.user || {});

  useEffect(() => {
    const fetchQueries = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        alert("Login session expired. Please login again.");
        window.location.href = "/login";
        setLoading(false);
        return;
      }

      if (!student_id) {
        console.error("Student ID not found in Redux store.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://academy-gpt-backend.onrender.com/courses/student-queries",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const messages = response.data?.message || [];


        // Filter only logged-in student’s queries
        const studentQueries = messages.filter((q) => q.student === student_id);

        setQueries(studentQueries);
      } catch (error) {
        if (error.response?.status === 401) {
          alert("Session expired. Please login again.");
          window.location.href = "/login";
        } else {
          console.error("Error fetching queries:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, [student_id]);

  // Search filter
  const filteredQueries = queries.filter((query) =>
    query.query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="font-urbanist px-3 p-3">
      <div className="grid grid-cols-4 lg:grid-cols-8">
        {/* Search Bar */}
        <div className="relative lg:flex lg:justify-between w-full col-span-4 lg:col-span-8">
          <div className="lg:w-7/12 relative">
            <button className="bg-primary absolute text-[10px] lg:text-xs lg:px-6 font-semibold right-[1px] top-[1px] p-[8px] lg:p-[8.5px] px-6 xl:py-3 xl:px-9 text-white rounded-r-md">
              Search
            </button>
            <input
              className="w-full border-[1px] pl-8 placeholder:text-black placeholder:text-xs font-medium border-black p-[3.5px] lg:p-[4.5px] lg:pl-8 px-2 xl:p-2 xl:pl-8 rounded-md focus:outline-none"
              type="search"
              name="searchQuestion"
              id="searchQuestion"
              placeholder={t("Search Questions ?")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoIosSearch className="absolute top-2 left-2 lg:top-[10px] xl:top-[14px]" />
          </div>
        </div>

        {/* Display Queries */}
        {filteredQueries.map((query, index) => (
          <div
            key={index}
            className="border-2 mt-5 rounded-lg drop-shadow-lg col-span-4 lg:col-span-8"
          >
            <div className="p-2 space-y-2 lg:flex">
              <div className="col-span-4 my-auto lg:w-3/12 xl:w-2/12 space-y-2 lg:space-y-4">
                <div className=" lg:block space-x-4 lg:space-x-0 lg:my-auto lg:space-y-3 justify-between">
                  <div className="flex my-auto">
                    <button className="text-white my-auto bg-primary text-xs lg:mx-auto lg:text-base xl:text-lg font-semibold p-1 px-2 lg:px-3 rounded-md">
                      {query.subject || "General"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 lg:w-9/12 xl:w-10/12 lg:px-2">
                <div className="flex justify-between">
                  <h2 className="font-semibold text-base lg:text-lg xl:text-2xl">
                    Query Details
                  </h2>
                  <p className="font-semibold text-base lg:text-lg xl:text-2xl">
                    {new Date(query.timestamp).toLocaleDateString()}
                  </p>
                </div>

                {/* Display Image or Text */}
                <div>
                  {query.query.endsWith(".jpg") || query.query.endsWith(".png") ? (
                    <img
                      src={query.image}
                      alt="Query"
                      className="max-w-xs rounded-md border"
                    />
                  ) : (
                    <p className="text-[10px] lg:text-sm xl:text-lg text-black/80">
                      {query.query} <span className="text-primary">More</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* No Results */}
        {filteredQueries.length === 0 && !loading && (
          <div className="col-span-4 lg:col-span-8 mt-5 text-center">
            <p className="text-lg font-semibold text-black/50">
            {t("No questions found.")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorLearnerQuestions;
