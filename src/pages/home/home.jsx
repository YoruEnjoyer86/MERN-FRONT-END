import React from "react";
import { useNavigate } from 'react-router-dom';
import Row from "../../components/Row.jsx"
import "../../components/Row.css"
import "../../components/NavBarIcon.css"
import "../../components/SearchBar.css";
import "../../components/ProductsRow.css";
import "./home.css";
import SearchBar from "../../components/SearchBar.jsx";
import NavBarIcon from "../../components/NavBarIcon.jsx";
import Column from "../../components/Column.jsx" ;
import ProductsRow from "../../components/ProductsRow.jsx"

const GetProducts = () => {
  //TODO IA PRODUSE
  const products =[{name: "Bec"},{name: "Cutit"},{name: "Hartie"},{name: "Stilou"} ] ;
  return products ;
}

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
    <div className="home">
      <Row className='navBar'>
        <img className="imagineLogo" src = "../../../public/logo.png" />
        <SearchBar className="mainSearchBar centered growingElement"></SearchBar>
        <NavBarIcon onClick = {HandleProfileClick} className = "noShrink" text="Profile" imgSrc="../../../public/profile.png"></NavBarIcon>
        <NavBarIcon onClick = {HandleFavoritesClick} className = "noShrink" text="Favorites" imgSrc="../../../public/favorites.png"></NavBarIcon>
        <NavBarIcon onClick = {HandleShoppingCartClick} className = "noShrink" text="Shopping Cart" imgSrc="../../../public/shopping_cart.png"></NavBarIcon>
      </Row>
      
      <ProductsRow className='products_row' products={GetProducts()}/>
    </div>
  );
};

export default Home;
