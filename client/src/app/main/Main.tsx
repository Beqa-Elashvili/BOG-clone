"use client";

import React, { useEffect } from "react";
import { Carousel } from "antd";
import axios from "axios";
import { storyTypes } from "../types/globaltypes";

type Props = {};

function page({}: Props) {
  const [stories, setStories] = React.useState<storyTypes[]>([]);
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const getStories = async () => {
    const resp = await axios.get(`${url}/api/story/stories`);
    setStories(resp.data);
  };
  useEffect(() => {
    getStories();
  }, []);

  return (
    <div className="p-2  text-center w-full">
      <Carousel
        slidesToScroll={2}
        centerPadding="30px 0px 0px 0px"
        centerMode={true}
        slidesToShow={4}
        dots={false}
      >
        {stories.map((story) => (
          <div key={story.id} className="p-2">
            <div className="ring-2 p-px ring-orange-600 rounded-lg">
              <img
                src={story.imageUrl}
                alt="storyImg"
                className=" h-[6rem] w-[6rem] object-cover m-auto rounded-lg"
              />
            </div>
          </div>
        ))}
      </Carousel>
      <h1>hello</h1>
    </div>
  );
}

export default page;
