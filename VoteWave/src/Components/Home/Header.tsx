import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="relative">
      <img
        src="https://img.freepik.com/premium-photo/close-up-vote-word-business-concept-idea_352439-1408.jpg"
        className="absolute inset-0 object-cover w-full h-full  bg-opacity-10"
        alt=""
      />
      <div className="relative bg-opacity-75 bg-deep-purple-accent-700">
        <svg
          className="absolute inset-x-0 bottom-0 text-white"
          viewBox="0 0 1160 163"
        >
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>
        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                Let your voice be strong, <br className="hidden md:block" />
                let your choice be right.
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                Let your voice be strong, let your choice be right. In the
                democratic process, every vote counts, shaping the future of
                communities and nations.
              </p>
              <Link
                to="/campaigns"
                aria-label=""
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-1000 focus:shadow-outline focus:outline-none hover:translate-x-2 duration-700 w-1/3"
              >
                Campaigns
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </Link>
            </div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Sign up for updates
                </h3>
                {/* Paste Charts here */}
                <p className="text-xs text-gray-600 sm:text-sm">
                  We respect your privacy. We do respect of your opinion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
