import { ArrowRightOutlined } from "@ant-design/icons";
import { Modal, Card, message, Button } from "antd";

const User = () => {
  const { Meta } = Card;
  const adminString = localStorage.getItem("admin");
  const admin = adminString ? JSON.parse(adminString) : null;

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const userData = admin ? admin : user;
  const fullName: string = userData.firstName + " " + userData.secondName;
  // console.log(fullName);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <Card
          key={userData.id}
          style={{ width: 300 }}
          className="outline outline-gray-200 outline-1 hover:-translate-y-2 duration-700 transition "
          cover={
            <img style={{ height: 200 }} alt="example" src={userData.image} />
          }
          hoverable
        >
          <Meta
            style={{ textAlign: "justify", height: "120px" }}
            title={fullName}
            description={userData.email}
          />
        </Card>
      </div>
    </>
  );
};

export default User;
