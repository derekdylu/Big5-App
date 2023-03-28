# 5ee You

<h1 align="center">
  <br>
  <img src="https://i.ibb.co/VJVSC0p/wordmark.png" alt="logo" width="350">
</h1>

<h4 align="center">2022 台大資管專題 5ee you</h4>
<h6 align="center">
B07610008 黃茹暄 | B08705021 盧德原 | B08705027 林暐倫<br>B08705028 葉柏辰 | B08705036 朱修平 | B08705052 黃晨亘
</h6>

<p align="center">
  <a href="https://5eeyou.netlify.app/">
    <img src="https://img.shields.io/website?color=red&label=website&up_message=preview&url=https%3A%2F%2F5eeyou.netlify.app%2F"
         alt="Web">
  </a>
  <a href="https://youtu.be/4fcpOLdMnpU">
    <img src="https://img.shields.io/youtube/views/4fcpOLdMnpU?label=Introduction&style=social"
         alt="YouTube Intro">
  </a>
</p>

<p align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" height="40" align="center"  alt="react">
    <img src="https://cdn.worldvectorlogo.com/logos/redux.svg" height="39" align="center"  alt="redux">
    <img src="https://cdn.worldvectorlogo.com/logos/fastapi.svg" height="42" align="center" alt="fastAPI">
    <img src="https://img.icons8.com/color/480/mongodb.png" height="50" align="center" alt="mongoDB">
</p>

## Table of Contents

- [5ee You](#5ee-you)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Development](#development)
    - [Frontend](#frontend)
    - [Backend and Database](#backend-and-database)
    - [Deployment](#deployment)
  - [Terms of Use](#terms-of-use)
    - [Privacy Policy](#privacy-policy)
    - [Restrictions](#restrictions)

## Introduction

<p align="center">
  <a href="https://ibb.co/jzX2Wgq"><img src="https://i.ibb.co/T8F4K8k/header.png" alt="mockup" border="0" height="400"></a>
</p>

**5ee you** is a web-based application specially designed for mobile. Utilizing our machine learning model, It provides instant prediction of Big Five personality based on a 15 seconds clip containing the user's face. The five traits are openness to experience (O), conscientiousness (C), extraversion (E), agreeableness (A), and  neuroticism (N). Besides, 5ee you also calculate an overall score from those values.

## Development 
![](https://img.shields.io/badge/Platform-macOS-lightgrey)
- OS: macOS 
- PM: Yarn
- IDE: Visual Studio Code
### Frontend
<p align="left">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" height="40" align="center"  alt="react">
<img src="https://cdn.worldvectorlogo.com/logos/redux.svg" height="39" align="center"  alt="redux">
<img src="https://mui.com/static/logo.png" height="52" align="center"  alt="mui">
</p>

### Backend and Database
<p align="left">
<img src="https://pytorch.org/assets/images/pytorch-logo.png" height="55" align="center" alt="pytorch">
<img src="https://cdn.worldvectorlogo.com/logos/fastapi.svg" height="42" align="center" alt="fastAPI">
<img src="https://img.icons8.com/color/480/mongodb.png" height="50" align="center" alt="mongoDB">
</p>

```bash
  # on MacOS
  pip3 install virtualenv
  python3 -m venv venv
  . venv/bin/activate
```
```bash
  # on Windows
  pip3 install virtualenv
  virtualenv venv
  venv\Scripts\activate.bat
```
```bash
  pip3 install -r requirements.txt
  uvicorn backend.main:app --reload
```

### Deployment
<p align="left">
<img src="https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/netlify-512.png" height="42" align="center" alt="netlify">
<img src="https://cdn-icons-png.flaticon.com/512/873/873120.png" height="43" align="center" alt="mongoDB">
</p>

## Terms of Use
### Privacy Policy
1. This application serves as a research preview of machine learning model, all generated predictions can not be a valid record or document on any field, including human resourcing, psychology, or medicine.
2. The accuracy of prediction may varied from different lighting conditions or device settings. It may also be invalid because user's face doesnt't fully stay in the frame or there're more than one clear face in the frame.
3. 5ee you uses video-only material, no sound will be recorded.
4. By logging in you agreeing to our terms of use and the use of cookies
5. We may make changes to our terms of use in the future.

### Restrictions
In this version, only developers can log in through Google SSO, the others can only log in as guest. Further update will bring more functions related to maintaining account.
