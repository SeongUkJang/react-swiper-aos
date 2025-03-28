import Slider from './components/Slider'
import Section1 from './components/Section1'
import Section2 from './components/Section2'
import './App.scss'
import Nav from './components/Nav'
import { useState, useRef, useEffect } from 'react'

function App() {

  const sliderRef = useRef(null)
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)

  const sections=[
    {name:'Home',ref:sliderRef},
    {name:'Section1',ref:section1Ref},
    {name:'Section2',ref:section2Ref}
  ]

  const [activeSection, setActiveSection]=useState('home')


  useEffect(()=>{


    const handleScroll=()=>{

      for(const {name, ref}  of sections){
        const rect= ref.current.getBoundingClientRect()
        if(rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2){
          setActiveSection(name)
          break;
        }
      }

    }

    window.addEventListener('scroll',handleScroll)
    handleScroll()

    return ()=>window.removeEventListener('scroll',handleScroll)

  },[sections])


  return (
    <div>
      <Nav sections={sections} active={activeSection}/>
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
