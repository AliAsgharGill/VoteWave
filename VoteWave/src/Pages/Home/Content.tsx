export const Content = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid max-w-screen-lg gap-8 lg:grid-cols-2 sm:mx-auto">
        <div className="grid grid-cols-2 gap-5">
          <img
            className="object-cover w-full h-56 col-span-2 rounded shadow-lg"
            src="https://images.unsplash.com/photo-1598802777393-751e5387ecd1?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <img
            className="object-cover w-full h-48 rounded shadow-lg"
            src="https://plus.unsplash.com/premium_photo-1676618539981-eeb34965ca5d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <img
            className="object-cover w-full h-48 rounded shadow-lg"
            src="https://images.unsplash.com/photo-1616442830389-0ad5a8489dfc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="pb-4 mb-4 border-b">
            <h6 className="mb-2 font-semibold leading-5">Vote Responsibly</h6>
            <p className="text-sm text-gray-900">
              Vote based on your own judgment and beliefs. Do not let others
              influence your decision.
            </p>
          </div>
          <div className="pb-4 mb-4 border-b">
            <h6 className="mb-2 font-semibold leading-5">
              Secure Your Account
            </h6>
            <p className="text-sm text-gray-900">
              Keep your account login information safe and secure. Do not share
              your password with anyone.
            </p>
          </div>
          <div>
            <h6 className="mb-2 font-semibold leading-5">
              Read Instructions Carefully
            </h6>
            <p className="text-sm text-gray-900">
              Make sure to read all instructions and information before voting
              to ensure you understand the process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
