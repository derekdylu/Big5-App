import React from "react";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";

const easeSlow = css`
  transition: all 450ms ease-in-out;
`;

const navBtn = css`
  position: absolute;
  z-index: 101;
  right: 35px;
  top: 35px;
  cursor: pointer;
  
  ${easeSlow};
  &.closer {
    transform: rotate(180deg);
  }
`;

const btnLine = css`
  width: 28px;
  height: 4px;
  margin: 0 0 5px 0;
  background-color: #fff;
  ${easeSlow};
  &.closer {
    background-color: #000;  
    &:nth-child(1) {
      transform: rotate(-45deg) translate(-10px, -5px);
      width: 20px;
    }
    &:nth-child(2) {
      transform: translateX(-8px);
    }
    &:nth-child(3) {
      transform: rotate(45deg) translate(-10px, 5px);
      width: 20px;
    }
  }
`;

const navOverlay = css`
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  background-color: white;
  height: 100vh;
  width: 40vw;
  transform: translateX(100%);
  transition: all 500ms ease-in-out;
  &.show {
    background-color: #FFFFFF;
    transform: translateX(0%); 
  }
  nav {
    padding-top: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 48px;
    a {
      height: 30px;
      text-decoration: none;
      color: #000;
      font-family: 'Noto Sans CJK TC';
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 140%;
      cursor: pointer;
      transition: all 150ms ease-in-out;
    }
  }
  @media (max-width: 800px) {
    width: 100vw;
  }
`;

class Navigation extends React.Component {
  state = {
    isNavOpen: false
  };

  toggleNav = () =>
    this.setState(({ isNavOpen }) => ({ isNavOpen: !isNavOpen }));

  render() {
    const { isNavOpen } = this.state;
    return (
      <React.Fragment>
        <div
          className={`${navBtn} ${isNavOpen ? "closer" : null}`}
          onClick={this.toggleNav}
        >
          <div className={`${btnLine} ${isNavOpen ? "closer" : null}`} />
          <div className={`${btnLine} ${isNavOpen ? "closer" : null}`} />
          <div className={`${btnLine} ${isNavOpen ? "closer" : null}`} />
        </div>
        <div className={`${navOverlay} ${isNavOpen ? "show" : null}`}>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/setting">Setting</Link>
            <Link to="/about">About</Link>
            <Link to="/" onClick={(e) => this.props.logout(e)}>Logout</Link>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;