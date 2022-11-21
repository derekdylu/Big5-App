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
    // getUserInfo("6357d9eb8c4455fbfb9d9bd2");
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    console.log("start GET")
    // const userData = await axios.get(`http://localhost:8000//user/${id}`);
    const userData = await axios.get(`http://localhost:8000//users`);
    console.log("end GET")
    // console.log("response", userData)

    // const data = await userData.json();
    // console.log("data", data);
  };

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