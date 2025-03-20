import { useState } from "react";
import { IoStarOutline, IoStar } from "react-icons/io5";
import { GoPlusCircle } from "react-icons/go";
import { useTranslation } from "react-i18next";

const Writereview = () => {
  // State to store the selected number of stars
  const [selectedStars, setSelectedStars] = useState(1); // Default is 1 star
const { t } = useTranslation();

  // Function to handle star click
  const handleStarClick = (starIndex) => {
    setSelectedStars(starIndex); // Update state with the number of selected stars
  };

  // Function to add a star when plus button is clicked
  const handleAddStar = () => {
    if (selectedStars < 5) {
      setSelectedStars((prev) => prev + 1); // Increment the stars, but not beyond 5
    }
  };

  return (
    <>
      <div className="font-urbanist">
        <div className="p-5 lg:flex space-x-8">
          <div className="px-5 drop-shadow-md bg-[#F9F9F9] rounded-xl py-4 space-y-3 border-2 xl:space-y-6 lg:w-1/2">
            <div>
              <h2 className="text-primary lg:text-black font-semibold text-xl xl:text-3xl text-center lg:text-left">
                {t("Write a Review")}
              </h2>
              <p className="text-center lg:text-left text-black/80">
                {t("Clearly state the issue or topic you need help with")}
              </p>
            </div>
            <div className="py-2 space-y-3">
              <input
                className="p-2 border-[1px] border-black/60 w-full rounded-md focus:outline-primary"
                type="text"
                name="Title"
                id="title"
                placeholder={t("Title")}
              />
              <textarea
                className="p-2 border-[1px] border-black/60 w-full rounded-md focus:outline-primary"
                name="message"
                id="message"
                cols="20"
                rows="8"
                placeholder={t("Message")}></textarea>
            </div>

            {/* Star Rating Section */}
            <div className="flex space-x-5 text-black/80">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleStarClick(index + 1)} // Set stars based on the clicked index
                  className="cursor-pointer">
                  {index < selectedStars ? (
                    <IoStar className="size-10 text-primary" />
                  ) : (
                    <IoStarOutline className="size-10" />
                  )}
                </div>
              ))}
            </div>

            {/* Plus Button */}
            <div className="py-2">
              <button
                onClick={handleAddStar}
                className="w-full text-center rounded-md bg-black text-white p-2">
                <GoPlusCircle className="mx-auto size-8" />
              </button>
            </div>

            {/* Post Button */}
            <div className="flex justify-center">
              <button className="p-1 px-4 text-lg font-semibold w-32 text-white bg-primary rounded-md">
                {t("Post")}
              </button>
            </div>
          </div>

          {/* Review Guidelines */}
          <div className="lg:w-1/2 hidden h-fit drop-shadow-md bg-[#F9F9F9] rounded-xl py-2 border-2 lg:flex">
            <div className="px-2">
              <div>
                <h2 className="text-xl font-semibold xl:text-3xl">
                  Review Guidelines
                </h2>
                <p className="text-base xl:text-lg text-black/80">
                  Provide an honest assessment of the product or service.
                  Highlight particular features or aspects you liked or
                  disliked. Suggest improvements where necessary, focusing on
                  solutions. Use respectful and professional language throughout
                  the review. Keep your review clear and to the point, avoiding
                  unnecessary details.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold xl:text-3xl">
                  Review Tips
                </h2>
                <ul className="text-base xl:text-lg list-disc list-inside text-black/80">
                  <li>
                    Give a brief overview of your experience in the first few
                    lines.
                  </li>
                  <li>
                    Mention what you liked and disliked about the product.
                  </li>
                  <li>
                    Avoid being overly critical or overly positive; aim for a
                    balanced review.
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold xl:text-3xl">
                  Answer & Comments
                </h2>
                <p className="text-base xl:text-lg text-black/80">
                  We’ll notify you by email whenever a tutor answers your
                  question or when you receive comments for more clarification.
                </p>
              </div>
              <hr className="w-full border-t-2 border-black/70" />
              <p className="text-base xl:text-lg text-black/80">
                Remember to follow the{" "}
                <span className="text-primary">academic honesty</span> policy
                when composing your question.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Writereview;
