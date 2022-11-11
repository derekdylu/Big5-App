import React from 'react'
import PersonalPage from '../Components/PersonalPage'
import Navigation from '../Components/Navigation'

const Home = () => {

  const name_fake = "Isabelle"
  const picURL_fake = "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"

  return (
    <>
      <Navigation />
      <PersonalPage
        username = {name_fake}
        img = {picURL_fake}
      />
      <div>Home</div>
    </>
  )
}

export default Home