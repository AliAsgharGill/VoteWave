import React, { useRef, useState } from "react";
import {
  message,
  Modal,
  Button,
  Form,
  type FormProps,
  Input,
  DatePicker,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { MdCopyAll } from "react-icons/md";
import axios from "axios";
import moment from "moment";
import { allowedUserSliceActions } from "../../../Redux/Slices/allowedUsersSlice";
import { deleteAllTokens } from "../../../Redux/Slices/tokenSlice";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { campaignSliceActions } from "../../../Redux/Slices/campaignSlice";
import { blue } from "@mui/material/colors";

type FieldType = {
  name?: string;
  campaign?: string;
  link?: string;
  startDate: string;
  endDate: string;
};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignDuration, setCampaignDuration] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("hidden");
  const [token, setToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    formRef.current.resetFields();
    dispatch(campaignSliceActions.addCampaign(values));
    setIsModalOpen(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    // setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const adminString = localStorage.getItem("admin");
  const admin = adminString ? JSON.parse(adminString) : null;

  React.useEffect(() => {
    if (!admin) {
      message.warning("Please login as admin to access! ");
      navigate("/login/user");
    }
  }, [admin, navigate, user]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addEmail = () => {
    setIsOpen(true);
  };

  const handleOkUser = () => {
    setIsOpen(false);
  };
  const handleCancelUser = () => {
    setIsOpen(false);
  };
  const onFinishAddUser = (values) => {
    console.log(values);

    dispatch(allowedUserSliceActions.addAllowedUser(values));
    formRef.current.resetFields();
    setIsOpen(false);
    message.success("Email Added Successfully");
  };

  const clearLocalStorage = () => {
    Modal.confirm({
      title: "Confirm Clear",
      content: "You Will Logout!",
      okButtonProps: { style: { backgroundColor: "#2D9596" } },
      onOk() {
        localStorage.clear();
        navigate("/login/user");
        message.success("Clear Successfully");
      },
      onCancel() {},
    });
  };

  const generateToken = async () => {
    setView("block");
    const newToken = uuidv4();
    // console.log("New Token", newToken);
    const expirationTime = moment().add(1, "hour").toLocaleString();

    setToken(newToken);
    setExpiresAt(expirationTime);

    await axios.post("http://localhost:3000/tokens", {
      newToken,
      expirationTime,
    });

    // localStorage.setItem('token', newToken);
    // localStorage.setItem('expiresAt', expirationTime);
  };

  const handleCopy = () => {
    message.success("Copied!");
    setView("hidden");
  };

  const clearTokens = async () => {
    try {
      dispatch(deleteAllTokens());
      setView("hidden");
      message.info("All Links Deleted");
    } catch (error) {
      console.error("Error clearing Links:", error);
      message.error("Failed to clear Links");
    }
  };

  return (
    <>
      {admin ? (
        <div className="min-h-screen">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 place-items-center gap-10 my-16 p-5">
            <Button
              className=" hover:-translate-y-1  duration-500  hover-button w-full font-bold p-10 bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline  text-lg md:text-xl = inline-flex items-center justify-center h-12 px-6 tracking-wide text-white transition rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none"
              onClick={showModal}
              style={{
                backgroundColor: "#31363F",
              }}
              onMouseEnter={(e) => (
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#2D9596"),
                ((e.currentTarget as HTMLElement).style.color = "white")
              )}
              onMouseLeave={(e) => (
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#31363F"),
                ((e.currentTarget as HTMLElement).style.color = "white")
              )}
            >
              Add Campaign
            </Button>
            <Button
              type=""
              onClick={() => navigate("/campaignsManagement")}
              className=" hover:-translate-y-1  duration-500  hover-button w-full font-bold p-10 bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline  text-lg md:text-xl = inline-flex items-center justify-center h-12 px-6 tracking-wide text-white transition rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none"
              style={{
                backgroundColor: "#31363F",
              }}
              onMouseEnter={(e) => (
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#2D9596"),
                ((e.currentTarget as HTMLElement).style.color = "white")
              )}
              onMouseLeave={(e) => (
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#31363F"),
                ((e.currentTarget as HTMLElement).style.color = "white")
              )}
            >
              Manage Campaigns
            </Button>

            <Button
              className=" hover:-translate-y-1  duration-500  hover-button w-full font-bold p-10 bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline  text-lg md:text-xl = inline-flex items-center justify-center h-12 px-6 tracking-wide text-white transition rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none"
              onClick={() => addEmail()}
              style={{
                backgroundColor: "#31363F",
              }}
              onMouseEnter={(e) => (
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#2D9596"),
                ((e.currentTarget as HTMLElement).style.color = "white")
              )}
              onMouseLeave={(e) => (
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#31363F"),
                ((e.currentTarget as HTMLElement).style.color = "white")
              )}
            >
              Add User Email
            </Button>

            <Button
              className=" hover:-translate-y-1  duration-500  hover-button w-full font-bold p-10 bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline  text-lg md:text-xl = inline-flex items-center justify-center h-12 px-6 tracking-wide text-white transition rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none"
              onClick={() => clearLocalStorage()}
              style={{
                backgroundColor: "#31363F",
              }}
              onMouseEnter={(e) => (
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#2D9596"),
                ((e.currentTarget as HTMLElement).style.color = "white")
              )}
              onMouseLeave={(e) => (
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#31363F"),
                ((e.currentTarget as HTMLElement).style.color = "white")
              )}
            >
              Clear Local Storage
            </Button>

            <Button
              type=""
              onClick={generateToken}
              className=" hover:-translate-y-1  duration-500  hover-button w-full font-bold p-10 bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline  text-lg md:text-xl = inline-flex items-center justify-center h-12 px-6 tracking-wide text-white transition rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none"
              style={{
                backgroundColor: "#31363F",
              }}
              onMouseEnter={(e) => (
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#2D9596"),
                ((e.currentTarget as HTMLElement).style.color = "white")
              )}
              onMouseLeave={(e) => (
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#31363F"),
                ((e.currentTarget as HTMLElement).style.color = "white")
              )}
            >
              Generate Link
            </Button>
            <Button
              type=""
              onClick={clearTokens}
              className=" hover:-translate-y-1  duration-500  hover-button w-full font-bold p-10 bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline  text-lg md:text-xl = inline-flex items-center justify-center h-12 px-6 tracking-wide text-white transition rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none"
              style={{
                backgroundColor: "#31363F",
              }}
              onMouseEnter={(e) => (
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#2D9596"),
                ((e.currentTarget as HTMLElement).style.color = "white")
              )}
              onMouseLeave={(e) => (
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#31363F"),
                ((e.currentTarget as HTMLElement).style.color = "white")
              )}
            >
              Delete All Links
            </Button>
            {/* <div className="w-full bg-red-500" >ok</div>  */}

            {/* Add Campaign Modal */}
            <Modal
              title="Add Campaign"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              className="p-2"
            >
              <Form
              
                name="Campaign"
                ref={formRef}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="Campaign Name"
                  name="name"                
                  rules={[
                    { required: true, message: "Please write campaign name!" },
                  ]}
                >
                  <Input autoFocus />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Campaign Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please write campaign description!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Image Link"
                  name="image"
                  rules={[
                    { required: true, message: "Please write Image Link!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label="Start Date & Time" name="startDate">
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={(date, dateString) =>
                      setCampaignDuration([dateString, ...campaignDuration[1]])
                    }
                  />
                </Form.Item>

                <Form.Item label="End Date & Time" name="endDate">
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={(date, dateString) =>
                      setCampaignDuration([...campaignDuration[0], dateString])
                    }
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                  onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#055F6D")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#31363F")
                    }
                >
                  <Button
                    
                    type="primary"
                    htmlType="submit"
                    className="inline-flex items-center justify-center  w-full px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none"
                  >
                    Add Campaign
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            {/* Add User Email Modal*/}
            <Modal
              title="Add Allowed User"
              form={form}
              open={isOpen}
              onOk={handleOkUser}
              onCancel={handleCancelUser}
              footer={null}
            >
              <Form
                ref={formRef}
                name="basic"
                labelCol={
                  {
                    // span: 10,
                  }
                }
                wrapperCol={{
                  offset: 1,
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinishAddUser}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  // className="w-full"
                  rules={[
                    {
                      required: true,
                      message: "Please input user email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 4,
                    span: 16,
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-secondaryColor-900 w-full hover-button "
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#055F6D")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#31363F")
                    }
                  >
                    Allow User
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          {token && (
            <div
              className={`flex my-10 ${view} justify-center  sm:justify-start space-x-5`}
            >
              <CopyToClipboard
                text={`http://localhost:5173/signup/user?token=${token}`}
                className="cursor-pointer"
                onClick={handleCopy}
              >
                <Tooltip
                  title="Link For Signup, Click To Copy!"
                  className="cursor-pointer"
                  color="#2D9596"
                  onClick={handleCopy}
                >
                  <Input
                    suffix={
                      <MdCopyAll
                        onClick={handleCopy}
                        style={{ cursor: "pointer" }}
                        className="hover:fill-[#2D9596] "
                      />
                    }
                    className="w-1/2 p-3 hover:border-[#2D9596] mx-auto cursor-pointer text-[#2D9596]"
                    value={`http://localhost:5173/signup/user?token=${token}`}
                    readOnly
                  />
                </Tooltip>
              </CopyToClipboard>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
