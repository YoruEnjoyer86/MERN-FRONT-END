import React from 'react'
import Row from './Row.jsx'
import SearchBar from './SearchBar.jsx'
import NavBarIcon from './NavBarIcon'
import './NavBar.css'

const NavBar = ({HandleFavoritesClick,HandleProfileClick,HandleShoppingCartClick, notifications}) => {
  return (
    <Row className='nav_bar'>
        <img className="imagineLogo" src = "../../../public/logo.png" />
        <SearchBar className="mainSearchBar centered"></SearchBar>
        <NavBarIcon nrNotifications = {notifications[0]} onClick = {HandleProfileClick} className = "noShrink" text="Profile" imgSrc="../../../public/profile.png" hoverImgSrc="../../../public/profile_hover.png"></NavBarIcon>
        <NavBarIcon nrNotifications = {notifications[1]} onClick = {HandleFavoritesClick} className = "noShrink" text="Favorites" imgSrc="../../../public/favorites.png" hoverImgSrc="../../../public/favorites_hover.png"></NavBarIcon>
        <NavBarIcon nrNotifications = {notifications[2]} onClick = {HandleShoppingCartClick} className = "noShrink" text="Shopping Cart" imgSrc="../../../public/shopping_cart.png" hoverImgSrc="../../../public/shopping_cart_hover.png"></NavBarIcon>
    </Row>
  )
}

export default NavBar