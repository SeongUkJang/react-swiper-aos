import React from 'react'
import './Slider.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const Slider = () => {

  const slides = [
    { className: 'slide1', title: 'Welcome to Slide 1' },
    { className: 'slide2', title: 'Welcome to Slide 2' },
    { className: 'slide3', title: 'Welcome to Slide 3' },
  ]


  return (
    <section className='slider'>
      <div className="rel">
        <h2>hello react</h2>
        <Swiper
          className='gallery'
          // spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className={`slide-bg ${slide.className}`}>

                  <h3>{slide.title}</h3>

              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </section>
  )
}

export default Slider