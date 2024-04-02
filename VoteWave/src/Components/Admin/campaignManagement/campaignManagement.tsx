import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, message, Card, Modal } from "antd";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { campaignSliceActions } from "../../../Slices/campaignSlice";
import { candidatesSliceAction } from "../../../Slices/CandidateSlice";
import {
  DeleteOutlined,
  EditOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const CampaignManagementPage = () => {
  const { Meta } = Card;
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/admins?email=${admin.email}`
        );
        setIsAdmin(!!response.data.length);
      } catch (error) {
        console.log("Error Fetching Admins", error);
      }
    };

    if (admin) {
      fetchAdmins();
    } else {
      navigate("/login/admin");
      message.info("Please Login First As Admin");
    }
  }, [admin, navigate]);

  const [view, setView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignID, setCampaignID] = useState(null);
  const campaigns = useSelector((state) => state.campaigns.list);
  // console.log("Campagins", campaigns);
  const candidates = useSelector((state) => state.candidates.list);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [participants, setParticipants] = useState(null);

  const manageCandidates = (campaign) => {
    const campaignExist = campaigns.find((camp) => camp.id === campaign.id);
    console.log("Campaign Exist:", campaignExist);

    const contestants = candidates.filter(
      (can) => can.campaignID === campaignExist.id
    );
    setParticipants(contestants);
    if (campaignExist) {
      const data = campaignExist.candidates;
      setSelectedCampaign(data);
      setView(true);
    }
    console.log("contestants", contestants);

    if (campaignExist) {
      setSelectedCampaign(campaignExist.candidates);
      setCampaignID(campaignExist.id);
      setView(true);
    }
  };

  const handleDeleteCampaign = (id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want delete?",
      okButtonProps: { style: { backgroundColor: "#F09A60" } },
      onOk() {
        dispatch(campaignSliceActions.deleteCampaign(id));

        // Delete candidates with the same campaignID
        const candidatesToDelete = candidates.filter(
          (candidate) => candidate.campaignID === id
        );
        candidatesToDelete.forEach((candidate) => {
          dispatch(candidatesSliceAction.deleteCandidate(candidate.id));
        });
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    dispatch(campaignSliceActions.fetchCampaigns());
  }, [dispatch]);

  const onFinish = (values) => {
    console.log("Success:", values);
    setView(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishFrom = async (values) => {
    console.log("Success:", values);
    formRef.current.resetFields();
    dispatch(
      candidatesSliceAction.addCandidate({
        ...values,
        campaignID: campaignID,
        votes: 0,
      })
    );
    setIsModalOpen(false);
    message.success("Candidate Added Successfully!");
  };

  const onFinishEdit = async (values) => {
    console.log("Values", values);
    dispatch(candidatesSliceAction.updateCandidate(values));
  };

  const onFinishCampaignEdit = async (values) => {
    console.log("Values", values);
    dispatch(campaignSliceActions.updateCampaign(values));
    setCampaignView(false);
  };

  const onFinishFailedFrom = (errorInfo) => {
    console.log("Failed:", errorInfo);
    formRef.current.resetFields();
  };

  const handleAddCandidate = (campaign) => {
    console.log("Campaign Is:", campaign);
    setIsModalOpen(true);
  };

  const [edit, setEdit] = useState<string | null>(null);
  const [viewModal, setViewModal] = useState(false);
  interface EditCampaign {
    name: string;
    description: string;
  }
  // const [editCampaign, setEditCampaign] = useState<EditCampaign | null>(null);
  const [editCampaign, setEditCampaign] = useState({
    name: "",
    description: "",
  });

  const handleFormChange = (changedValues) => {
    setEditCampaign({
      ...editCampaign,
      ...changedValues,
    });
  };
  const [campaignView, setCampaignView] = useState(false);

  const handleEdit = (id) => {
    const findCandidate = candidates.find((candidate) => candidate.id === id);
    if (findCandidate) {
      setEdit(findCandidate);
      setViewModal(true);
    }
  };

  // const [edit, setEdit] = useState(false)

  const handleEditCampaign = (campaign) => {
    const findCampaign = campaigns.find((camp) => camp.id === campaign.id);
    setCampaignView(true);
    if (findCampaign) {
      setEditCampaign(findCampaign);
      console.log("Campaign ya ha:", findCampaign);
    }
  };

  const handleUpdateCandidate = () => {
    console.log("Befor Send");
    dispatch(candidatesSliceAction.updateCandidate(edit));
    setViewModal(false);
    setEdit(null);
  };

  const handleDelete = (id: number | string) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want delete?",
      okButtonProps: { style: { backgroundColor: "#F09A60" } },
      onOk() {
        dispatch(candidatesSliceAction.deleteCandidate(id));
      },
      onCancel() {},
    });
  };
  return (
    <>
      {isAdmin && (
        <div>
          <div className=" mt-20 sm:mt-10">
            <h2 className="font-bold text-3xl mx-auto justify-center text-primaryColor-900">
              Campaign Management
            </h2>
            {/* Fetching Existing campaigns */}
            <div className=" p-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
              {campaigns.map((campaign) => (
                <Card
                  key={campaign.id}
                  style={{ width: 300 }}
                  className="outline outline-gray-100 outline-1 "
                  hoverable
                  cover={
                    <img
                      style={{
                        height: 200,
                      }}
                      alt="example"
                      src={campaign.image}
                    />
                  }
                  actions={[
                    <>
                      <div className="flex justify-around space-x-3">
                        <IdcardOutlined
                          onClick={() => {
                            manageCandidates(campaign);
                          }}
                          key="view"
                          style={{ color: "skyblue" }}
                        />
                        ,
                        <EditOutlined
                          key="edit"
                          style={{ color: "blue" }}
                          onClick={() => handleEditCampaign(campaign)}
                        />
                        ,
                        <DeleteOutlined
                          onClick={() => handleDeleteCampaign(campaign.id)}
                          key="delete"
                          style={{ color: "#c13584" }}
                        />
                      </div>
                    </>,
                  ]}
                >
                  <Meta
                    style={{ textAlign: "justify", height: "120px" }}
                    title={campaign.name}
                    description={campaign.description}
                  />
                </Card>
              ))}
            </div>
          </div>
          {/* Modal for dispaying candidates */}
          <Modal
            Modal
            open={view}
            title="Canditates"
            onCancel={() => setView(false)}
            onOk={() => setView(false)}
            onFinish={onFinish}
            width={1000}
            onFinishFailed={onFinishFailed}
            className="w-screen"
          >
            <div className="p-4 space-x-5">
              <Button
                onClick={() => handleAddCandidate(selectedCampaign)}
                type="primary"
                key="button"
                className="bg-primaryColor-900"
                icon={<FaRegUserCircle />}
              >
                Add Candidate
              </Button>
            </div>
            <div className="grid  sm:grid-cols-1 md:grid-cols-3 gap-4">
              {participants &&
                // console.log("Camp Cand", selectedCampaign),
                participants.map((participant) => (
                  <Card
                    key={participant.id}
                    className=""
                    actions={[
                      <EditOutlined
                        key="edit"
                        style={{ color: "blue" }}
                        onClick={() => handleEdit(participant.id)}
                      />,

                      <DeleteOutlined
                        key="delete"
                        style={{ color: "#c13584" }}
                        onClick={() => handleDelete(participant.id)}
                      />,
                    ]}
                    hoverable={true}
                  >
                    <div
                      key={participant.id}
                      className="bg-gray-300 flex justify-center items-center flex-col p-8 rounded h-[350px]"
                    >
                      <img
                        src={participant.candidateSymbol}
                        alt="Symbol"
                        className="rounded-full flex justify-center items-center"
                      />
                      ,
                      <div className="font-bold  font-serif  ">
                        {participant.candidateName}
                      </div>
                      <div className="font-bold  font-serif  ">
                        ID:{participant.id}
                      </div>
                      <div className="font-serif  ">
                        Votes:{participant.votes}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </Modal>
          {/* Modal For Adding Candidate */}
          <Modal
            Modal
            open={isModalOpen}
            title="Add Candidate/Product"
            onCancel={() => setIsModalOpen(false)}
            onOk={() => setIsModalOpen(false)}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            footer={null}
          >
            <Form
              ref={formRef}
              name="Add Candidate"
              onFinish={onFinishFrom}
              onFinishFailed={onFinishFailedFrom}
              layout="vertical"
              className={`bg-gray-300 p-10 rounded`}
            >
              <Form.Item
                label="Name"
                name="candidateName"
                rules={[
                  {
                    required: true,
                    message: (
                      <span className="font-bold text-red-500 ">
                        Please enter your first name!
                      </span>
                    ),
                  },
                  {
                    min: 3,
                    message: (
                      <span className="font-bold text-red-500">
                        Name must be at least 3 characters long!
                      </span>
                    ),
                  },
                  {
                    max: 15,
                    message: (
                      <span className="font-bold text-red-500">
                        Keep Less than 15 characters!
                      </span>
                    ),
                  },
                ]}
              >
                <Input placeholder="Name" prefix={<FaRegUserCircle />} />
              </Form.Item>
              <Form.Item
                label="Symbol Image Link"
                name="candidateSymbol"
                rules={[
                  { required: true, message: "Please Input Link of Symbol!" },
                ]}
              >
                <Input placeholder="Symbol Link" prefix={<FaLink />} />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-gray-900 w-full"
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          {/* Campaign Edit Modal Code */}
          <Modal
            open={campaignView}
            title="Edit Campaign"
            onCancel={() => setCampaignView(false)}
            onOk={() => onFinishCampaignEdit(editCampaign)}
            okButtonProps={{ style: { backgroundColor: "blue" } }}
          >
            {editCampaign ? (
              <Form
                ref={formRef}
                name="Edit Campaign"
                // onFinish={() => onFinishCampaignEdit(editCampaign)}
                onFinish={() =>
                  onFinishCampaignEdit({
                    ...editCampaign,
                    name: editCampaign.name,
                    description: editCampaign.description,
                  })
                }
                initialValues={editCampaign}
                onValuesChange={handleFormChange}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className={`bg-gray-300 p-10 rounded`}
                initialValues={{
                  name: `${editCampaign?.name}`,
                  description: `${editCampaign?.description}`,
                }}
              >
                <Form.Item
                  label="Campaign Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter campaign Name!" },
                  ]}
                >
                  <Input
                    placeholder="Name"
                    onChange={(e) => setEditCampaign(e.target.value)}
                    prefix={<FaRegUserCircle />}
                  />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    { required: true, message: "Please Input Link of Symbol!" },
                  ]}
                >
                  <Input
                    placeholder="Symbol Link"
                    prefix={<FaLink />}
                    onChange={(e) => setEditCampaign(e.target.value)}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-gray-900 w-full"
                  >
                    Add
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              "No Data"
            )}
          </Modal>

          {/* Candidate Edit Modal Code */}
          <Modal
            open={viewModal}
            title="Edit Candidate"
            onCancel={() => setViewModal(false)}
            onOk={() => onFinishEdit(edit)}
            okButtonProps={{ style: { backgroundColor: "blue" } }}
          >
            {edit ? (
              <Form
                ref={formRef}
                name="Edit Candidate"
                onFinish={() => onFinishEdit(edit)}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className={`bg-gray-300 p-10 rounded`}
                // initialValues={
                //         candidateName: 'edit.name',
                // candidateSymbol: 'edit.candidateSymbol'
                // }
              >
                <Form.Item
                  label="Name"
                  name="candidateName"
                  rules={[
                    { required: true, message: "Please enter your Name!" },
                  ]}
                >
                  <Input
                    placeholder="Name"
                    onChange={(e) => setEdit(e.target.value)}
                    prefix={<FaRegUserCircle />}
                  />
                </Form.Item>
                <Form.Item
                  label="Symbol Image Link"
                  name="candidateSymbol"
                  rules={[
                    { required: true, message: "Please Input Link of Symbol!" },
                  ]}
                >
                  <Input
                    placeholder="Symbol Link"
                    prefix={<FaLink />}
                    onChange={(e) => setEdit(e.target.value)}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-gray-900 w-full"
                  >
                    Add
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              "No Data"
            )}
          </Modal>
        </div>
      )}
    </>
  );
};

// new

export default CampaignManagementPage;
