React로 작성된 웹 애플리케이션의 구조입니다. 
Swiper, AOS, scss 를 이용하였습니다.
각 컴포넌트는 서로 독립적이고, 페이지의 스크롤 및 애니메이션을 효과적으로 처리하는 방식으로 구성되어 있습니다.

---

### **App.js**

`App.js`는 전체 웹 페이지의 구조를 관리하는 루트 컴포넌트입니다. 각 섹션을 스크롤 시, 해당 섹션을 자동으로 탐지하여 활성화된 섹션을 상태로 관리합니다.

```jsx
import Slider from './components/Slider'
import Section1 from './components/Section1'
import Section2 from './components/Section2'
import './App.scss'
import Nav from './components/Nav'
import { useState, useRef, useEffect } from 'react'

function App() {

  // 각 섹션을 참조할 ref 설정
  const sliderRef = useRef(null)
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)

  // 섹션들을 배열로 관리 (이름과 ref를 포함)
  const sections = [
    { name: 'Home', ref: sliderRef },
    { name: 'Section1', ref: section1Ref },
    { name: 'Section2', ref: section2Ref }
  ]

  // 현재 활성화된 섹션을 관리하는 state
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    // 스크롤 시 활성 섹션을 변경하는 함수
    const handleScroll = () => {
      for (const { name, ref } of sections) {
        const rect = ref.current.getBoundingClientRect()
        // 화면 가운데가 섹션에 포함되면 해당 섹션을 활성화
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(name)
          break;
        }
      }
    }

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll)
    handleScroll() // 최초 실행 시에도 활성 섹션을 업데이트

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <div>
      {/* 네비게이션 컴포넌트, active 상태와 섹션 정보를 전달 */}
      <Nav sections={sections} active={activeSection} />

      {/* 각 섹션 컴포넌트들 */}
      <div ref={sliderRef}>
        <Slider />
      </div>
      <div ref={section1Ref}>
        <Section1 />
      </div>
      <div ref={section2Ref}>
        <Section2 />
      </div>
    </div>
  )
}

export default App

```

### **App.scss**

전체 레이아웃과 섹션들이 100vh(뷰포트 높이)로 설정되어 화면에서 각 섹션이 하나씩 보이도록 설정합니다.

```scss
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

ul {
    list-style-type: none;
}

section {
    height: 100vh;
    position: relative;
    .rel {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 0 100px;

        h2 {
            font-size: 60px;
            text-transform: uppercase;
        }
    }
}

```

---

### **Slider.js**

`Slider.js`는 슬라이더 기능을 구현하는 컴포넌트입니다. Swiper 라이브러리를 사용하여 슬라이드를 처리하고, 각 슬라이드는 배경 이미지와 텍스트로 구성됩니다.

```jsx
import React from 'react'
import './Slider.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const Slider = () => {

  // 슬라이드 데이터
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
          slidesPerView={1}
          pagination={{ clickable: true }} // 페이지네이션 사용
          modules={[Pagination]}
        >
          {/* 슬라이드 렌더링 */}
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

```

### **Slider.scss**

슬라이드의 배경 이미지를 설정하고, 텍스트가 중앙에 오도록 조정합니다.

```scss
.slider {
    .rel {
        flex-direction: column;
        gap: 30px;
        .gallery {
            width: 600px;
            height: 400px;

            .slide-bg {
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                display: flex;
                justify-content: center;
                align-items: center;

                &.slide1 {
                    background-image: url(/public/1.jpeg);
                }
                &.slide2 {
                    background-image: url(/public/2.jpeg);
                }
                &.slide3 {
                    background-image: url(/public/3.jpeg);
                }

                h3 {
                    font-size: 50px;
                    color: #fff;
                }
            }
        }
    }
}

```

---

### **Section1.js**

`Section1.js`는 첫 번째 섹션을 구성합니다. 각 항목은 애니메이션을 통해 순차적으로 나타나며, `AOS` 라이브러리를 사용하여 애니메이션을 처리합니다.

```jsx
import React, { useEffect } from 'react'
import './Section1.scss'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Section1 = () => {

    // AOS 초기화
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

  return (
    <section className='s1'>
        <div className="rel">
            <h2>section1 title</h2>
            <ul className="content">
                {/* 각 항목은 순차적으로 나타나도록 설정 */}
                <li data-aos="fade-up">1</li>
                <li data-aos="fade-up" data-aos-delay="100">2</li>
                <li data-aos="fade-up" data-aos-delay="200">3</li>
                <li data-aos="fade-up" data-aos-delay="300">4</li>
                <li data-aos="fade-up" data-aos-delay="400">5</li>
            </ul>
        </div>
    </section>
  )
}

export default Section1

```

### **Section1.scss**

각 항목의 애니메이션과 디자인을 조정합니다.

```scss
.s1 {
    background-color: #eee;
    .rel {
        flex-direction: column;
        gap: 50px;

        ul.content {
            display: flex;
            gap: 20px;
            li {
                width: 100px;
                height: 100px;
                background-color: rebeccapurple;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}

```

---

### **Section2.js**

`Section2.js`는 두 번째 섹션을 구현합니다. 이 섹션에도 `AOS`를 사용하여 제목과 이미지를 나타내는 애니메이션을 추가합니다.

```jsx
import React, { useEffect } from 'react'
import './Section2.scss'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Section2 = () => {
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <section className='s2'>
            <div className="rel">
                <div className="tit-wrap" data-aos="fade-right">
                    <h2>section2 title</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit...
                    </p>
                </div>
                <div className="img-wrap" data-aos="fade-left"></div>
            </div>
        </section>
    )
}

export default Section2

```

### **Section2.scss**

이미지와 텍스트의 배치를 조정합니다.

```scss
.s2 {
    .rel {
        justify-content: space-between;
        .tit-wrap {
            max-width: 500px;
        }
        .img-wrap {
            width: 500px;
            height: 400px;
            background: url(/public/1.jpeg) no-repeat center/cover;
            border-radius: 10px;
        }
    }
}

```

---

### **Nav.js**

`Nav.js`는 페이지 네비게이션을 관리하는 컴포넌트입니다. 각 섹션을 버튼으로 나타내며, 활성화된 버튼을 강조하여 사용자에게 현재 위치를 알려줍니다.

```jsx
import React from 'react'
import './Nav.scss'

const Nav = ({ sections, active }) => {

    // 버튼 클릭 시 해당 섹션으로 스크롤
    const scrollTo = (ref) => {
        ref.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    return (
        <nav>
            {/* 섹션 목록을 버튼으로 표시 */}
            {sections.map(({ name, ref }) => (
                <button
                    onClick={() => scrollTo(ref)}
                    className={active === name ? 'active' : ''} // 활성화된 버튼은 'active' 클래스 추가
                    key={name}>
                </button>
            ))}
        </nav>
    )
}

export default Nav

```

### **Nav.scss**

네비게이션 버튼의 위치와 스타일을 설정합니다.

```scss
nav {
    position: fixed;
    z-index: 3;
    top: 50%;
    right: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    button {
        width: 15px;
        height: 15px;
        background-color: #000;
        border-radius: 50%;
        opacity: .3;

        &.active {
            opacity: 1;
        }
    }
}

```

---

### 요약

 React를 사용하여 간단한 페이지 네비게이션과 슬라이더, 애니메이션 효과를 구현하였습니다. 
각 섹션을 참조하고 스크롤에 따라 활성화된 섹션을 표시하며, `AOS`와 `Swiper` 라이브러리를 활용하여 멋진 애니메이션 효과를 추가했습니다.
