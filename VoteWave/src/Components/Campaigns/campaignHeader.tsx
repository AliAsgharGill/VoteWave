export const CampaignContent = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-primaryColor-900 sm:text-4xl sm:leading-none">
              Your Vote Matters
              <br className="hidden md:block" />
              Every vote
              <span className="relative px-1">
                <div className="absolute inset-x-0 bottom-0 h-3 transform -skew-x-12 bg-teal-accent-400" />
                <span className="relative inline-block text-deep-purple-accent-400">
                  makes a difference
                </span>
              </span>
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Every vote makes a difference. By participating in these
              campaigns, you are helping to shape the future of our community.
              Thank you for being an active and engaged citizen
            </p>
          </div>
          <div className="grid gap-5 row-gap-8 sm:grid-cols-2">
            <div className="bg-white border-l-4 shadow-sm border-primaryColor-900 hover:translate-y-2 duration-1000 ">
              <div className="h-full p-5 border border-l-0 rounded-r">
                <h6 className="mb-2 font-semibold leading-5">Duration</h6>
                <p className="text-sm text-gray-900">
                  Campaigns typically have a set duration, during which
                  candidates actively engage with voters to gain support.
                </p>
              </div>
            </div>
            <div className="bg-white border-l-4 shadow-sm border-primaryColor-900 hover:translate-y-2 duration-1000  ">
              <div className="h-full p-5 border border-l-0 rounded-r">
                <h6 className="mb-2 font-semibold leading-5">Vote</h6>
                <p className="text-sm text-gray-900">
                  Once you've decided, cast your vote for your preferred
                  candidate or cause. Your vote is your voice, so make it count!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
            src="https://news.uchicago.edu/sites/default/files/images/2019-07/Mobile%20voting.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
