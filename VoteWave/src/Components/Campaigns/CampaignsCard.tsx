import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Card, message, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { campaignSliceActions } from "../../Slices/campaignSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdHowToVote } from "react-icons/md";
import { candidatesSliceAction } from "../../Slices/CandidateSlice";
import { Campaign, Candidate } from "../../Types/types";



const CampaignsCard = () => {
  const { Meta } = Card;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const adminString = localStorage.getItem("admin");
  const admin = adminString ? JSON.parse(adminString) : null;

  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:3000/users?email=${user.email}&password=${user.password}`
        );
        const adminResponse = await axios.get(
          `http://localhost:3000/admins?email=${user.email}&password=${user.password}`
        );

        setIsUser(!!userResponse.data.length || !!adminResponse.data.length);
      } catch (error) {
        console.log("Error Fetching Users", error);
      }
    };

    if (user || admin) {
      fetchUsers();
    } else {
      navigate("/login/user");  
      // message.warning("Please Login First!");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(campaignSliceActions.fetchCampaigns());
  }, [dispatch]);

  const [disabledCampaigns, setDisabledCampaigns] = useState(() => {
    const storedDisabledCampaigns = localStorage.getItem("disabledCampaigns");
    return storedDisabledCampaigns ? JSON.parse(storedDisabledCampaigns) : [];
  });

  const handleVotingClick = (campaign: Campaign) => {
    Modal.confirm({
      title: "Alert Vote",
      content:
        "Are you sure you want to cast your vote? Once you confirm, you won't be able to cast your vote again.",
      okButtonProps: { style: { backgroundColor: "#2D9596" } },
      onOk() {
        handleMangeCampaign(campaign);
      },
      onCancel() {},
    });
  };

  const campaigns: Campaign = useSelector((state) => state.campaigns.list);
  const candidates = useSelector((state) => state.candidates.list);

  const [view, setView] = useState(false);
  const [participants, setParticipants] = useState(null);

  const handleMangeCampaign = (campaign: Campaign) => {
    const campaignExist = campaigns.find(
      (camp: Campaign) => camp.id === campaign.id
    );
    const contestants: Candidate = candidates.filter(
      (can: Campaign) => can.campaignID === campaignExist.id
    );
    setParticipants(contestants);
    if (campaignExist) {
      setView(true);
      const updatedDisabledCampaigns = [...disabledCampaigns, campaignExist.id];
      setDisabledCampaigns(updatedDisabledCampaigns);
      localStorage.setItem(
        "disabledCampaigns",
        JSON.stringify(updatedDisabledCampaigns)
      );
    }
  };

  const handleVoteClick = (participant: Candidate) => {
    dispatch(candidatesSliceAction.updateCandidateVotes(participant));
    message.success("Your Vote Counted Successfully");
    setView(false);
  };

  useEffect(() => {
    dispatch(candidatesSliceAction.fetchCandidates());
  }, [dispatch]);

  const onFinish = () => {
    setView(false);
  };

  const calculateRemainingTime = (endDate: string) => {
    const endDateTime = new Date(endDate).getTime();
    const currentDateTime = new Date().getTime();
    const diff = endDateTime - currentDateTime;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    let remainingTime = "";
    if (days > 0) {
      remainingTime += days + " days ";
    }
    if (hours > 0) {
      remainingTime += hours + " hours ";
    }
    if (minutes > 0) {
      remainingTime += minutes + " minutes ";
    }
    if (seconds > 0) {
      remainingTime += seconds + " seconds ";
    }

    return remainingTime.trim();
  };

  return (
    <>
      <div className="my-5">
        <div>
          <h1 className="mt-10 font-bold text-3xl w-full flex justify-center my-10 text-primaryColor-900">
            Campaigns
          </h1>
          <div className="p-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            {campaigns.map((campaign: Campaign) => {
              // here calculate and hide the campaign if time is not started or time end
              const startDate = new Date(campaign.startDate);
              const endDate = new Date(campaign.endDate);

              const currentDate = new Date();

              if (currentDate < startDate || currentDate > endDate) {
                return null;
              }
              const remainingTime = calculateRemainingTime(campaign.endDate);

              return (
                <Card
                  key={campaign.id}
                  style={{ width: 300 }}
                  className="outline outline-gray-200 outline-1 hover:-translate-y-2 duration-700 transition"
                  hoverable
                  cover={
                    <img
                      style={{ height: 200 }}
                      alt="example"
                      src={campaign.image}
                    />
                  }
                  actions={[
                    <Button
                      onClick={() => {
                        handleVotingClick(campaign);
                      }}
                      type="primary"
                      key="buttonOne"
                      className="bg-[#2D9596]"
                      icon={<ArrowRightOutlined />}
                      disabled={disabledCampaigns.includes(campaign.id)}
                    >
                      Voting
                    </Button>,
                  ]}
                >
                  <Meta
                    style={{ textAlign: "justify", height: "120px" }}
                    title={campaign.name}
                    description={campaign.description}
                  />
                  <div className="font-bold my-4">
                    <div>Campaign End In</div>
                    <div>{remainingTime}</div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <Modal
          open={view}
          title="Participants"
          width={1000}
          footer={null}
          onCancel={() => setView(false)}
          onOk={() => setView(false)}
          onFinish={onFinish}
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
            {participants ? (
              participants.map((participant: Candidate) => (
                <Card
                  key={participant.id}
                  className=""
                  actions={[
                    <div
                      className="flex justify-evenly items-center"
                      key={participant.id}
                    >
                      <MdHowToVote
                        focusable={true}
                        key={participant.id}
                        style={{ color: "green", fontSize: "30px" }}
                        className="hover:fill-green-500 rounded-lg fill-gray-500 "
                        onClick={() => handleVoteClick(participant)}
                      />
                    </div>,
                  ]}
                  onClick={() => handleVoteClick(participant)}
                  hoverable={true}
                >
                  <div
                    key={participant.id}
                    className="bg-gray-300 flex justify-center items-center flex-col p-8 rounded  h-[350px] "
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
                    <div className="font-serif">{participant.votes}</div>
                  </div>
                </Card>
              ))
            ) : (
              <div>No Candidates Yet For Voting!</div>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CampaignsCard;
