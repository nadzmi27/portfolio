import { useRef, useState, type CSSProperties } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// const images = [
//   { src: 'https://swiperjs.com/demos/images/abstract-1.jpg', caption: 'Abstract one' },
//   { src: 'https://swiperjs.com/demos/images/abstract-2.jpg', caption: 'Abstract two' },
//   { src: 'https://swiperjs.com/demos/images/abstract-3.jpg', caption: 'Abstract three' },
//   { src: 'https://swiperjs.com/demos/images/abstract-4.jpg', caption: 'Abstract four' },
//   { src: 'https://swiperjs.com/demos/images/abstract-5.jpg', caption: 'Abstract five' },
//   { src: 'https://swiperjs.com/demos/images/abstract-6.jpg', caption: 'Abstract six' },
//   { src: 'https://swiperjs.com/demos/images/abstract-7.jpg', caption: 'Abstract seven' },
//   { src: 'https://swiperjs.com/demos/images/abstract-8.jpg', caption: 'Abstract eight' },
//   { src: 'https://swiperjs.com/demos/images/abstract-9.jpg', caption: 'Abstract nine' },
//   { src: 'https://swiperjs.com/demos/images/abstract-10.jpg', caption: 'Abstract ten' },
// ];

interface ImageGalleryProps {
  images: Image[];
  height?: string | number;
  thumbHeight?: string | number;
}

export default function ImageGallery({ images, height, thumbHeight }: ImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const slideHeight = height !== undefined
    ? (typeof height === 'number' ? `${height}px` : height)
    : undefined;

  const thumbH = thumbHeight !== undefined
    ? (typeof thumbHeight === 'number' ? `${thumbHeight}px` : thumbHeight)
    : undefined;

  return (
    <div className={`my-6 ${height ? 'flex justify-center' : 'w-full max-w-3xl mx-auto'}`}>
      {/* Main image swiper */}
      <Swiper
        style={
          ({
            "--swiper-navigation-color": "#fff",
            "--swiper-navigation-size": "24px",
          } as unknown) as CSSProperties
        }
        loop={true}
        slidesPerView={height ? 'auto' : 1}
        centeredSlides={height ? true : false}
        spaceBetween={10}
        navigation={true}
        grabCursor={true}
        mousewheel={{
          sensitivity: 1,
          thresholdDelta: 30,
          thresholdTime: 500,
          releaseOnEdges: true,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
        className={`overflow-hidden ${height ? '' : 'w-full'}`}
      >
        {images.map((img, i) => (
          <SwiperSlide
            key={i}
            className="relative bg-neutral-800 aspect-video"
            style={slideHeight ? { height: slideHeight } : undefined}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-3">
              <p className="text-white text-sm font-medium">{img.caption}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`mt-3 box-border py-1 ${thumbH ? '' : 'h-20'}`}
        style={thumbH ? { height: thumbH } : undefined}
      >
        {images.map((img, i) => (
          <SwiperSlide
            key={i}
            className="h-full opacity-40 cursor-pointer transition-opacity [&.swiper-slide-thumb-active]:opacity-100"
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
