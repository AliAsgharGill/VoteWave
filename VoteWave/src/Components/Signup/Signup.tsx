import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RiLockPasswordFill, RiUserFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const Signup = ({ type }: { type: string }) => {
  const onFinish = async (values: FormValues) => {
    console.log("Received Values:", values);

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (!emailRegex.test(values.email)) {
    //   message.error("Invalid Email Format, Please Enter Valid Email.");
    //   return;
    // }

    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // if (!passwordRegex.test(values.password)) {
    //   message.error(
    //     "Password must have least one uppercase ,one lowercase,one digits special character (@$!%*?&)"
    //   );
    // }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <Form
          className="bg-primaryColor-900 p-10 rounded mt-20 sm:w-1/2 sm:mt-30 md:w-1/3  md:mt-0"
          name="signup-form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: (
                  <span className="error-message">Please enter your name!</span>
                ),
              },
              {
                min: 3,
                message: (
                  <span className="error-message">
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
                  <span className="error-message">
                    Please enter your email!
                  </span>
                ),
              },
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: (
                  <span className="error-message">
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
                  <span className="error-message">
                    Please enter your password!
                  </span>
                ),
              },
              {
                min: 6,
                message: (
                  <span className="error-message">
                    Password must be at least 6 characters long!
                  </span>
                ),
              },
              {
                max: 12,
                message: (
                  <span className="error-message">
                    Password must be less than 12 characters long!
                  </span>
                ),
              },
              {
                pattern: /^(?=.*[a-z])/,
                message: (
                  <span className="error-message">
                    Must have one lowercase letter
                  </span>
                ),
              },
              {
                pattern: /^(?=.*[A-Z])/,
                message: (
                  <span className="error-message">
                    Must have one uppercase letter
                  </span>
                ),
              },
              {
                pattern: /^(?=.*\d)/,
                message: (
                  <span className="error-message">Must have one digit</span>
                ),
              },
              {
                pattern: /^(?=.*[@$!%*?&])/,
                message: (
                  <span className="error-message">
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
                  <span className="error-message">Please upload an image</span>
                ),
              },
            ]}
          >
            <Upload name="image" action="/upload" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full bg-black"
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
