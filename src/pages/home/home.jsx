import React from "react";
import "./home.css";
import { useNavigate } from 'react-router-dom';
import Row from "../../components/Row.jsx"
import "../../components/Row.css"
import "../../components/IconWithText.css"
import "../../components/SearchBar.css";
import SearchBar from "../../components/SearchBar.jsx";
import IconWithText from "../../components/IconWithText.jsx";

const Home = () => {
  const navigate = useNavigate() ;
  
  const HandleProfileClick = () =>
  {
    navigate('/profile') ;
  }

  const HandleFavoritesClick = () =>
  {
    navigate('/favorites') ;
  }
  
  const HandleShoppingCartClick = () =>
  {
    navigate("/shopping_cart") ;
  }

  return (
    <>
    <Row style = {{display : "flex",flexWrap: "nowrap",justifyContent : "start",  alignItems : "center", height : "10vh", width: "100vw",  backgroundColor : "green", padding: "0vh 20vh 0vh 20vh" }}>
      <img src = "../../../public/logo.png" style={{height: "100%", width:"10%", objectFit : 'contain', marginRight: '20px'}}/>
      <SearchBar className="mainSearchBar centered"></SearchBar>
      <IconWithText onClick = {HandleProfileClick} className = "noShrink navBarIcon" text="Profile" imgSrc="../../../public/profile.png"></IconWithText>
      <IconWithText onClick = {HandleFavoritesClick} className = "noShrink navBarIcon" text="Favorites" imgSrc="../../../public/favorites.png"></IconWithText>
      <IconWithText onClick = {HandleShoppingCartClick} className = "noShrink navBarIcon" text="Shopping Cart" imgSrc="../../../public/shopping_cart.png"></IconWithText>
    </Row>
    
    </>
  );
};

export default Home;
