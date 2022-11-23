import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

import slider1 from "../public/images/slider-removebg-preview.png";
import slider2 from "../public/images/slider.png";
import slider3 from "../public/images/slider4-removebg-preview.png";

const Slider = [
  {
    title: "test",
    description: "test",
    image: slider3,
  },
  {
    title: "test",
    description: "test",
    image: slider2,
  },
  {
    title: "test",
    description: "test",
    image: slider1,
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
      // modules={[Pagination, Autoplay]}
      className="container m-auto max-h-[500px] bg-[#faebd7] !z-[-1]"
    >
      {Slider.map((slider, index) => {
        return (
          <SwiperSlide
            key={index}
            className="relative flex justify-center items-center"
          >
            <div className="absolute z-10 left-12">
              <h1 className=" text-3xl font-medium">{slider.title}</h1>
              <p className="mb-5 mt-2">{slider.description}</p>
              <button className=" bg-black rounded-md w-32 text-white px-4 py-2 hover:opacity-80 ">
                SHOP NOW
              </button>
            </div>
            <Image
              src={slider.image}
              alt=""
              className="w-[100%] h-[100%] object-contain opacity-40"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Sliders;
