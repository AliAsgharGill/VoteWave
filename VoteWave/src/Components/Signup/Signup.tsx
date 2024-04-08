import React from 'react'
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RiLockPasswordFill, RiUserFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../../Slices/authSlice";
import axios from "axios";
import { setUser } from "../../Slices/userSlice";
import { setAdmin } from "../../Slices/adminSlice";

interface FormValues {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  image: string;
}

const Signup = ({ type }: { type: string }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const adminString = localStorage.getItem("admin");
  const admin = adminString ? JSON.parse(adminString) : null;

  React.useEffect(() => {
    if (admin || user) {
      message.warning("Please Logout First To Get Register! ");
      navigate("/");
    }
  }, [admin, navigate, user]);

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  // console.log("URL Token", token);

  const checkTokenStatus = async () => {
    // const { data: tokens } = await axios.get('http://localhost:3000/tokens')

    const tokenKey = `token_${token}`;
    const tokenUsed = localStorage.getItem(tokenKey);

    if (tokenUsed) {
      message.warning("Link Expired. Redirecting to home page...");
      navigate("/");
      return;
    } else {
      localStorage.setItem(tokenKey, "true");
    }
  };

  window.onload = checkTokenStatus;

  const onFinish = async (values: FormValues) => {
    console.log("Received Values:", values);
    // new start
    try {
      const validateToken = async (token) => {
        const { data: tokens } = await axios.get(
          "http://localhost:3000/tokens"
        );

        const now: number = Date.now();
        const findIndex: number = tokens.findIndex(
          (t: { newToken: string; expirationTime: string }) =>
            t.newToken === token && new Date(t.expirationTime).getTime() > now
        );

        // console.log("Token Index Data:", findIndex);

        // Checking if this link is already used then redirect user to home
        if (findIndex != -1) {
          const tokenKey = `token_${token}`;
          // console.log("Token Key:", tokenKey);
          const tokenUsed = localStorage.getItem(tokenKey);

          if (!tokenUsed) {
            message.info("Link Expired");
            navigate("/");
            return;
          } else {
            localStorage.setItem(tokenKey, "true");
          }

          return true;
        }
        // message.warning('Invalide Crdentials!')
        return false;
      };
      const result = await validateToken(token);
      // console.log("Result", result);

      if (result) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email)) {
          message.error("Invalid email format. Please enter a valid email.");
          return;
        }

        if (values.password.length < 6) {
          message.error("Password must be at least 6 characters long.");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/${type}s?email=${values.email}`
        );
        if (response.data.length > 0) {
          message.warning(
            `Email ${values.email} Already Exists. Please Login Instead.`
          );
          return;
        }

        await axios.post(`http://localhost:3000/${type}s`, values);
        message.success("Welcome! Registered successfully. Please login.");

        if (type === "user") {
          dispatch(setUser(response.data));
          navigate("/login/user");
        } else if (type === "admin") {
          dispatch(setAdmin(response.data));
          navigate("/login/admin");
        }
      } else {
        // Check if user is allowed to signup
        const userAllowed = await axios.get(
          `http://localhost:3000/allowedUsers?email=${values.email}`
        );
        if (!userAllowed.data.length) {
          message.warning("Not allowed to register");
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email)) {
          message.error("Invalid email format. Please enter a valid email.");
          return;
        }

        if (values.password.length < 6) {
          message.error("Password must be at least 6 characters long.");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/${type}s?email=${values.email}`
        );
        if (response.data.length > 0) {
          message.warning(
            `Email ${values.email} Already Exists. Please Login Instead.`
          );
          return;
        }

        await axios.post(`http://localhost:3000/${type}s`, values);
        message.success("Welcome! Registered successfully. Please login.");

        if (type === "user") {
          dispatch(setUser(response.data));
          navigate("/login/user");
        } else if (type === "admin") {
          dispatch(setAdmin(response.data));
          navigate("/login/admin");
        }
      }
    } catch (error) {
      message.error("Error Signing Up:", error);
    }
    // new end
  };

  //   const response = await axios.get(
  //     `http://localhost:3000/${type}s?email=${values.email}`
  //   );

  //   const userAllowed = await axios.get(
  //     `http://localhost:3000/allowedUsers?email=${values.email}`
  //   );
  //   if (!userAllowed.data.length) {
  //     message.warning("Not allowed to register");
  //     return;
  //   }

  //   if (response.data.length > 0) {
  //     message.warning(
  //       `Email ${values.email} Already Exists. Please Login Instead.`
  //     );
  //     return;
  //   }

  //   dispatch(signupUser(values));
  //   form.resetFields();
  //   navigate(`/login/${type}`);
  //   message.success("Successfully Register. Please Login");
  // };

  return (
    <>
      <div className="min-h-screen p-5 flex justify-center items-center">
        <Form
          form={form}
          className="bg-primaryColor-900 p-10 rounded mt-20 sm:w-1/2 sm:mt-30 md:w-1/3  md:mt-0"
          name="signup-form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: (
                  <span className="font-bold text-text-800 ">
                    Please enter your first name!
                  </span>
                ),
              },
              {
                min: 3,
                message: (
                  <span className="font-bold text-text-800">
                    Name must be at least 3 characters long!
                  </span>
                ),
              },
              {
                max: 9,
                message: (
                  <span className="font-bold text-text-800">
                    Keep Less than 9 characters!
                  </span>
                ),
              },
            ]}
          >
            <Input placeholder="Name" prefix={<RiUserFill />} />
          </Form.Item>

          <Form.Item
            label="Second Name"
            name="secondName"
            rules={[
              {
                required: true,
                message: (
                  <span className="font-bold text-text-800 ">
                    Please enter your second name!
                  </span>
                ),
              },
              {
                min: 3,
                message: (
                  <span className="font-bold text-text-800">
                    Name must be at least 3 characters long!
                  </span>
                ),
              },
            ]}
          >
            <Input placeholder="Name" prefix={<RiUserFill />} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: (
                  <span className="font-bold text-text-800">
                    Please enter your email!
                  </span>
                ),
              },
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: (
                  <span className="font-bold text-text-800">
                    Invalid Email Format, Please Enter Valid Email
                  </span>
                ),
              },
            ]}
          >
            <Input placeholder="Email" prefix={<MdEmail />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: (
                  <span className="font-bold text-text-800">
                    Please enter your password!
                  </span>
                ),
              },
              {
                min: 6,
                message: (
                  <span className="font-bold text-text-800">
                    Password must be at least 6 characters long!
                  </span>
                ),
              },
              {
                max: 12,
                message: (
                  <span className="font-bold text-text-800">
                    Password must be less than 12 characters long!
                  </span>
                ),
              },
              {
                pattern: /^(?=.*[a-z])/,
                message: (
                  <span className="font-bold text-text-800">
                    Must have one lowercase letter
                  </span>
                ),
              },
              {
                pattern: /^(?=.*[A-Z])/,
                message: (
                  <span className="font-bold text-text-800">
                    Must have one uppercase letter
                  </span>
                ),
              },
              {
                pattern: /^(?=.*\d)/,
                message: (
                  <span className="font-bold text-text-800">
                    Must have one digit
                  </span>
                ),
              },
              {
                pattern: /^(?=.*[@$!%*?&])/,
                message: (
                  <span className="font-bold text-text-800">
                    Must have any special character (@$!%*?&)
                  </span>
                ),
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              prefix={<RiLockPasswordFill />}
            />
          </Form.Item>

          <Form.Item
            label="Image Link"
            name="image"
            rules={[
              {
                required: true,
                message: (
                  <span className="font-bold text-text-800">
                    Please enter Image Link!
                  </span>
                ),
              },
            ]}
          >
            <Input
              placeholder="https://encrypted-tbn0.gstatic.com"
              prefix={<FaExternalLinkSquareAlt />}
            />
          </Form.Item>

          {/* <Form.Item
            name="image"
            label="Upload Your Image"
            className="font-semibold"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[
              {
                required: true,
                message: (
                  <span className="font-bold text-text-800">Please upload an image</span>
                ),
              },
            ]}
          >
            <Upload name="image" action="/upload" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item> */}

          <Form.Item>
            <Button
              className="w-full bg-black hover:'FEB73F'"
              // style={{ background: "#FEB73F" }}
              type="primary"
              htmlType="submit"
            >
              Sign Up
            </Button>
          </Form.Item>
          <Form.Item>
            <p className="text-alphaColor-900 font-bold text-center">
              Already have an account?_
              <Link
                className="text-white font-bold hover:text-secondaryColor-900 hover:underline "
                to="/login/user"
              >
                Login Now
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Signup;
