import React, { useEffect } from 'react'
import PersonalPage from '../Components/PersonalPage/PersonalPage'
import Navigation from '../Components/Navigation'
import Login from '../Components/Login'
// import axios from '../Axios'
import axios from 'axios'

const Home = () => {

  const login = null

  const name_fake = "Isabelle"
  const picURL_fake = "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"

  useEffect( () => {
    console.log("start")
    fetchAllUsers();
    console.log("end")
  }, []);

  const fetchAllUsers = async () => {
    console.log('function: fetchAllUsers')
    // const response = await fetch("/users/")
    // console.log('response:', response.json())
    // const fetchedTasks = await response.json()
    // console.log('hi, this is', fetchedTasks)

    const userData = await axios.get(`http://127.0.0.1:8000//users`);
    console.log("response", userData)

    // const data = await userData.json();
    // console.log("data", data);
  }


  return (
    <>
      <Navigation />
      {/* {
        login ?
          <PersonalPage
            username = {name_fake}
            img = {picURL_fake}
          /> :
          <Login />
      } */}
      <PersonalPage
        username = {name_fake}
        img = {picURL_fake}
      />
    </>
  )
}

export default Home