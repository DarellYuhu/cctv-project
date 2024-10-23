"use client";

import Player from "./components/Player";

const Cctv = () => {
  return (
    <div className="">
      <div className="w-[320px] h-[144px] bg-white">
        <Player streamUrl="http://localhost:3001/hls-output/stream.m3u8" />
      </div>
    </div>
  );
};

export default Cctv;
