import { Header } from "./Header";
import { Step } from "./VotingStep";
import Item from "antd/es/list/Item";
import { Faq } from "./FAQ";
import { Content } from "./Content";

const Home = () => {
  return (
    <>
      <div className="">
        <Header />
        <Step />
        <Content />
        <Faq />
      </div>
    </>
  );
};

export default Home;
