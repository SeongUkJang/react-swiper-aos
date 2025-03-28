import React ,{useEffect}from 'react'
import './Section1.scss'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Section1 = () => {

    useEffect(()=>{
        Aos.init({
            duration:1000
        })

    },[])
  return (
    <section className='s1'>
        <div className="rel">
            <h2>section1 title</h2>
            <ul className="content">
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