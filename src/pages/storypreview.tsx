import { NextPage } from "next";
import Head from "next/head";
import Story from "../components/Landing";

const StoryPreview: NextPage = () => {
  return (
    <>
      <Head>
        <title>home - ultrasound.money</title>
      </Head>
      <Story />
    </>
  );
};
export default StoryPreview;
