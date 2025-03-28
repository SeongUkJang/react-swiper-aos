import React, { useEffect } from 'react'
import './Section2.scss'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Section2 = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000
        })

    }, [])
    return (
        <section className='s2'>
            <div className="rel">
                <div className="tit-wrap" data-aos="fade-right">

                    <h2>section2 title</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam rem magni fugit delectus harum provident optio officia voluptate sunt itaque accusamus eveniet, repudiandae, fuga veniam, illo modi. Repellendus, sed itaque?
                    </p>
                </div>
                <div className="img-wrap" data-aos="fade-left">

                </div>
            </div>
        </section>
    )
}

export default Section2