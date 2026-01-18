import { Suspense } from 'react'
import Hero from '../components/Hero'
import MotivationalSection from '../components/MotivationalSection'
import BestProjects from '../components/BestProjects'

const Home = () => {
  return (
    <>
      <Hero />
      <MotivationalSection />
      <BestProjects />
    </>
  )
}

export default Home
