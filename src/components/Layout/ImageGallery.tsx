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

interface Image {
  src: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: Image[];
  height?: string | number;
  thumbHeight?: string | number;
  bgColor?: string;
}

export default function ImageGallery({ images, height, thumbHeight, bgColor }: ImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const slideHeight = height !== undefined
    ? (typeof height === 'number' ? `${height}px` : height)
    : undefined;

  const thumbH = thumbHeight !== undefined
    ? (typeof thumbHeight === 'number' ? `${thumbHeight}px` : thumbHeight)
    : undefined;

  return (
    <div className={`my-6 ${height ? 'flex justify-center' : 'w-full max-w-3xl mx-auto'} select-none`}>
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
            className="relative aspect-video"
            style={{ backgroundColor: bgColor ?? "rgba(0, 0, 0, 0.6)", ...slideHeight ? { height: slideHeight } : {} }}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 px-4 pt-8 pb-3">
              <p className="text-black/95 text-sm font-medium bg-white/65 py-2 px-2 w-fit">{img.caption}</p>
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
        className="mt-3 box-border py-1"
      >
        {images.map((img, i) => (
          <SwiperSlide
            key={i}
            className="relative aspect-video opacity-40 cursor-pointer transition-opacity [&.swiper-slide-thumb-active]:opacity-100"
            style={{ backgroundColor: bgColor ?? "rgba(0, 0, 0, 0.6)", ...thumbH ? { height: thumbH } : {} }}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-contain rounded-xs"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
