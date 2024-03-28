import { Form, Input, Button } from "antd";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ type }) => {
  const onFinish = async (values) => {
    // console.log("Values:", values);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <Form
          name="login-form"
          onFinish={onFinish}
          layout="vertical"
          className="bg-primaryColor-900 p-10 rounded mt-20 sm:mt-20 md:mt-0 sm:w-1/3"
        >
          <Form.Item
            label="Email"
            className="text-white"
            name="email"
            rules={[
              {
                required: true,
                message: (
                  <span className="error-message">
                    Please enter your email!
                  </span>
                ),
              },
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: (
                  <span className="error-message font-bold">
                    Please Enter Valid Email
                  </span>
                ),
              },
            ]}
          >
            <Input placeholder="Email" prefix={<FaRegUserCircle />} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: (
                  <span className="error-message">
                    Please enter your password!
                  </span>
                ),
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              prefix={<RiLockPasswordLine />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-black hover:bg-[#222831] w-full ant-btn"
            >
              Log In
            </Button>
          </Form.Item>

          <Form.Item>
            <p className="text-alphaColor-900 font-bold text-center">
              Dont have an account-
              <Link
                className="text-white hover:text-secondaryColor-900 font-bold  hover:underline "
                to="/signup/user"
              >
                Register Now
              </Link>
            </p>

            <Link
              className="text-blue-500 hover:text-[#F09A3E] text-center"
              to="/login/admin"
            >
              {type === "user" ? (
                <>
                  <p className="text-black hover:text-black font-bold">OR</p>
                  <p className="text-white font-bold hover:alphaColor-900 hover:underline ">
                    Login as Admin
                  </p>
                </>
              ) : (
                ""
              )}
            </Link>
            <Link
              className="text-blue-500 hover:text-[#F09A3E] text-center"
              to="/login/user"
            >
              {type === "admin" ? (
                <>
                  <p className="text-black hover:text-black font-bold">OR</p>
                  <p className="text-white font-bold hover:alphaColor-900 hover:underline ">
                    Login as User
                  </p>
                </>
              ) : (
                ""
              )}
            </Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
