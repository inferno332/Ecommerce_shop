import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

import slider1 from "../public/images/slider-removebg-preview.png";
import slider2 from "../public/images/slider2-removebg-preview.png";
import slider3 from "../public/images/slider4-removebg-preview.png";

const Slider = [
  {
    title: "test",
    description: "test",
    image: slider1,
  },
  {
    title: "test",
    description: "test",
    image: slider2,
  },
  {
    title: "test",
    description: "test",
    image: slider3,
  },
];

function Sliders() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Autoplay]}
      className="flex items-center max-h-[500px] bg-[#faebd7] !z-[-1]"
    >
      {Slider.map((slider) => {
        return (
          <SwiperSlide className="flex justify-center items-center">
            <div className="">
              <h1 className=" text-3xl font-medium">{slider.title}</h1>
              <p>{slider.description}</p>
              <button className=" bg-black rounded-md text-white px-4 py-2 hover:opacity-80 ">
                SHOP NOW
              </button>
            </div>
            <Image
              src={slider.image}
              alt=""
              width="100%"
              height="100%"
              className=""
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Sliders;
