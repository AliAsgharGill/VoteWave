import { useState } from "react";

const Item = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded shadow-sm">
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex items-center justify-between w-full p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-medium">{title}</p>
        <div className="flex items-center justify-center w-8 h-8 border rounded-full">
          <svg
            viewBox="0 0 24 24"
            className={`w-3 text-gray-600 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          >
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="2,7 12,17 22,7"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          <p className="text-gray-700">{children}</p>
        </div>
      )}
    </div>
  );
};

export const Faq = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div className="flex flex-col mb-16 sm:text-center">
          <a href="/" className="mb-6 sm:mx-auto"></a>
          <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
            <h2 className="max-w-full mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="ec5d8ef5-b853-4714-b94f-df28ec98eeb7"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#ec5d8ef5-b853-4714-b94f-df28ec98eeb7)"
                    width="52"
                    height="24"
                  />
                </svg>
                <span className="relative">The</span>
              </span>{" "}
              Frequently Asked Questions (FAQ) Voting System
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Once you have submitted your vote in one campaign, you can then
              participate in another campaign if available.
            </p>
          </div>
        </div>
        <div className="space-y-4 ">
          <div className="hover:translate-y-2 duration-700 hover:shadow-2xl ">
            <Item title="How do I register to vote?">
              To register, navigate to the registration page and fill out the
              required information, including your name, email address, and any
              other required details. Once registered,then you can cast vote.
            </Item>
          </div>
          <div className="hover:translate-y-2 duration-700 hover:shadow-2xl ">
            <Item title="Can I change my vote after submitting it?">
              No, once you submit your vote, it cannot be changed. Please ensure
              you select your choice carefully before casting vote.
            </Item>
          </div>
          <div className="hover:translate-y-2 duration-700 hover:shadow-2xl ">
            <Item title="How do I know if my vote was successfully submitted?">
              After submitting your vote, you will receive a confirmation
              message on the voting interface.
            </Item>
          </div>
          <div className="hover:translate-y-2 duration-700 hover:shadow-2xl ">
            <Item title="Can I see live updates of the voting results?">
              Yes, you can view live updates of the voting results on the
              results page. The results will be updated in real-time as votes
              are cast.
            </Item>
          </div>
        </div>
      </div>
    </div>
  );
};
