import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import "../../components/NavBarIcon.css"
import "../../components/SearchBar.css";
import "../../components/ProductsRow.css";
import "./home.css";
import ProductsRow from "../../components/ProductsRow.jsx"
import NavBar from "../../components/NavBar.jsx";

const GetProducts = () => {
  //TODO IA PRODUSE
  // asat sfjsilhfishfhsbfshfojshfhsjfwjefjer 0000000000000000000000000000000000000000000000000000000000
  //ana are mere
  //ana nu are mere e adhsahdashasd
  const placeHolderImage = "../../../public/item.png" ;
  const products =[
  {name: "Bec", image: placeHolderImage},
  {name: "Lingura", image: placeHolderImage},
  {name: "Hartie", image: placeHolderImage},
  {name: "Stilou", image: placeHolderImage},
  {name: "Pix", image: placeHolderImage},
  {name: "Coca-Cola", image: placeHolderImage},
  {name: "Pepsi", image: placeHolderImage},
  {name: "Ciuperca", image: placeHolderImage},
  {name: "Priza", image: placeHolderImage}
 ] ;
  return products ;
}

const GetFoodProducts = () => { //FUNCTIE PLACEHOLDER
  const placeHolderImage = "../../../public/item.png" ;
  const products =[
  {name: "Carne de pui", image: placeHolderImage},
  {name: "Ou", image: placeHolderImage},
  {name: "Lapte", image: placeHolderImage},
  {name: "Sare", image: placeHolderImage},
  {name: "Orez", image: placeHolderImage},
  {name: "Paste", image: placeHolderImage},
  {name: "Cartof", image: placeHolderImage},
  {name: "Ciuperca", image: placeHolderImage},
  {name: "Cipsuri Lay's", image: placeHolderImage}
 ] ;
  return products ;
}

const GetClothingProducts = () => { //FUNCTIE PLACEHOLDER
  const placeHolderImage = "../../../public/item.png" ;
  const products =[
    {name: "Pantof Gucci", image: placeHolderImage},
    {name: "Rochie Chanel", image: placeHolderImage},
    {name: "Cămașă Armani", image: placeHolderImage},
    {name: "Fustă Versace", image: placeHolderImage},
    {name: "Pantaloni Adidas", image: placeHolderImage},
    {name: "Geacă Burberry", image: placeHolderImage},
    {name: "Pulover Louis Vuitton", image: placeHolderImage},
    {name: "Șapcă Nike", image: placeHolderImage},
    {name: "Ciorapi Dior", image: placeHolderImage},
    {name: "Palton Gucci", image: placeHolderImage},
    {name: "Sacou Prada", image: placeHolderImage},
    {name: "Pantaloni scurți Calvin Klein", image: placeHolderImage},
    {name: "Cămașă cu mânecă lungă Tommy Hilfiger", image: placeHolderImage},
    {name: "Pijama Victoria's Secret", image: placeHolderImage},
    {name: "Costum de baie Dolce & Gabbana", image: placeHolderImage}
 ] ;
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

  const HandleAddItemToCart = (productName) => {
    setCartNotifications(cartNotifications+1) ;
    alert('Added ' + productName + ' to your cart!') ;
  }

  const [profileNotifications,setProfileNotifications] = useState(1) ;
  const [favoritesNotifications,setFavoritesNotifications] = useState(0) ;
  const [cartNotifications,setCartNotifications] = useState(0) ;

  return (

    <div className="home">
      <NavBar
        HandleProfileClick = {HandleProfileClick}
        HandleFavoritesClick = {HandleFavoritesClick}
        HandleShoppingCartClick = {HandleShoppingCartClick}
        notifications={[profileNotifications,favoritesNotifications,cartNotifications]}
      />
      <ProductsRow maxDisplayedItems={5} products={GetProducts()} HandleAddItemToCart = {HandleAddItemToCart} category='Chestii random'/>
      <ProductsRow maxDisplayedItems={5} products={GetFoodProducts()} HandleAddItemToCart = {HandleAddItemToCart} category='Mancare'/>
      <ProductsRow maxDisplayedItems={5} products={GetClothingProducts()} HandleAddItemToCart = {HandleAddItemToCart} category='Haine'/>
    </div>
  );
};

export default Home;
