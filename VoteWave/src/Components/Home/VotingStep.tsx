import { Link, NavLink } from "react-router-dom";

export const Step = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Steps To Follow
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="d0d83814-78b6-480f-9a5f-7f637616b267"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#d0d83814-78b6-480f-9a5f-7f637616b267)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">When</span>
          </span>{" "}
          the time comes, step up and let your voice be heard vote for the
          right.
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          By casting your vote thoughtfully and conscientiously, you contribute
          to the collective voice of society, helping to create a more just and
          equitable future for all.
        </p>
      </div>
      <div className="relative grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-4 sm:grid-cols-2">
        <div className="absolute inset-0 flex items-center justify-center sm:hidden lg:flex">
          <div className="w-px h-full bg-gray-300 lg:w-full lg:h-px" />
        </div>
        <div className="p-5 duration-300 transform bg-white border border-primaryColor-900 rounded shadow-sm hover:-translate-y-2 hover:shadow-2xl ">
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg font-bold leading-5">Believe</p>
            <p className="flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-indigo-50">
              1
            </p>
          </div>
          <p className="text-sm text-gray-900">
            Trust in the power of your vote to make a difference
          </p>
        </div>
        <div className="p-5 duration-300 transform bg-white border border-primaryColor-900 rounded shadow-sm hover:-translate-y-2 hover:shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg font-bold leading-5">Registration</p>
            <p className="flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-indigo-50">
              2
            </p>
          </div>
          <p className="text-sm text-gray-900">
            Sign up to become a registered voter for your worthy vote.
          </p>
        </div>
        <div className="p-5 duration-300 transform bg-white border border-primaryColor-900 rounded shadow-sm hover:-translate-y-2 hover:shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg font-bold leading-5">Cast Vote</p>
            <p className="flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-indigo-50">
              3
            </p>
          </div>
          <p className="text-sm text-gray-900">
            Exercise your right to vote by selecting your preferred candidates
          </p>
        </div>
        <div className="p-5 duration-300 transform bg-white border border-primaryColor-900 rounded shadow-sm hover:-translate-y-2 hover:shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg font-bold leading-5">Live Result</p>
            <p className="flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-indigo-50">
              4
            </p>
          </div>
          <p className="text-sm text-gray-900">
            Stay tuned for the live announcement of election results.
          </p>
        </div>
      </div>
      <div className="text-center">
        <Link
          to="/result"
          className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none hover:translate-y-1 duration-700 hover:shadow-2xl  w-1/2 "
        >
          See Live Result Now!
        </Link>
      </div>
    </div>
  );
};
