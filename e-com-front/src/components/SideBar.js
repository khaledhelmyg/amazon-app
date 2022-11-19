//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  Sidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu
} from "react-pro-sidebar";
import { Link } from "react-router-dom";

//import icons from react icons
// import { FaList, FaRegHeart } from "react-icons/fa";
// import {
//   FiHome,
//   FiLogOut,
//   FiArrowLeftCircle,
//   FiArrowRightCircle
// } from "react-icons/fi";
// import { RiPencilLine } from "react-icons/ri";
// import { BiCog } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css
// import "./Header.css";

const SideBar = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
        <Sidebar className="sidebar bg-dark h-100 mw-25 sm-sidebar"  collapsed={menuCollapse}> 
            <Menu iconShape="square">
            <MenuItem routerLink={<Link to='/' />} icon={<i class="fa fa-fw fa-home"/>}>Home</MenuItem>
            <MenuItem routerLink={<Link to='/admin/dashboard' />} icon={<i class="fa fa-fw fa-dashboard"/>}>Dashboard</MenuItem>
            <SubMenu icon={<i class="fa fa-fw fa-shop"/>} label="Products">
              <MenuItem 
               routerLink={<Link to='/admin/products' />}
               className="text-dark"
               >all </MenuItem>
              <MenuItem 
              className="text-dark"
              routerLink={<Link to='/admin/product/new' />}
              ><i className="fas fa-plus "></i>  Create </MenuItem>
            </SubMenu>
            <SubMenu icon={<i className="fa fa-product-hunt"/>} label="Category">
              <MenuItem className="text-dark">all </MenuItem>
              <MenuItem 
              className="text-dark"
              routerLink={<Link to='/admin/order/new' />}
              ><i class="fas fa-plus "></i>  Create </MenuItem>
            </SubMenu>
      
              <MenuItem 
                routerLink={<Link to='/admin/orders' />}
                icon={<i className="fas fa-shopping-cart" />
                }>Orders</MenuItem>
              <MenuItem 
                routerLink={<Link to='/admin/users' />}
                icon={<i className="fas fa-users" />}>Users</MenuItem>
              <MenuItem icon={<i className='fas fa-grin-stars' />}>Reviews</MenuItem>
            </Menu>
        </Sidebar>
      
  );
};

export default SideBar;
