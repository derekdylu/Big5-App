import React from 'react'
import PersonalPage from '../Components/PersonalPage/PersonalPage'
import Navigation from '../Components/Navigation'
import Login from '../Components/Login'

const Home = () => {

  const login = null

  const name_fake = "Isabelle"
  const picURL_fake = "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"

  return (
    <>
      <Navigation />
      {
        login ?
          <PersonalPage
            username = {name_fake}
            img = {picURL_fake}
          /> :
          <Login />
      }
      {/* <PersonalPage
        username = {name_fake}
        img = {picURL_fake}
      /> */}
    </>
  )
}

export default Home