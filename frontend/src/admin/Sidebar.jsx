import React, { useEffect, useState } from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill,BsBoxArrowRight}
 from 'react-icons/bs'

 import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { getRole } from '../utills/CustomFunctions';
function Sidebar({openSidebarToggle, OpenSidebar,getRole,roleAuth}) {

    useEffect(  () =>{
        getRole();
    },[roleAuth])

    const navigate = useNavigate();
    
    const handelLogout = async ()=>{
         const isUser = localStorage.getItem('user');

         if(isUser){
            try {
                localStorage.removeItem("user");
                toast.success("Logout successfully");
                navigate('/login');
            } catch (error) {
                
            }
         }
    }


  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/dashboard">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            {
                roleAuth === 5 ? (
                    <li className='sidebar-list-item'>
                    <a href="/project">
                        <BsFillArchiveFill className='icon'/> Projects
                    </a>
                </li>
                ) : null // If roleAuth is not 5, render nothing (or you can render an alternative element)
            }

            {
                roleAuth === 5 ? (
                    <li className="sidebar-list-item">
                    <a href="/employee">
                        <BsPeopleFill className="icon" /> Employee
                    </a>
                    </li>
                ) : null // If roleAuth is not 5, render nothing (or you can render an alternative element)
            }

            {
                roleAuth === 1 || roleAuth === 2 || roleAuth === 3 || roleAuth === 4 || roleAuth === 5 ? (
                    <li className='sidebar-list-item'>
                    <a href="/task">
                        <BsFillGrid3X3GapFill className='icon'/> Task
                    </a>
                </li>
                ) : null // If roleAuth is not 5, render nothing (or you can render an alternative element)
            }
         
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Customers
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Inventory
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>

            <li className='sidebar-list-item' onClick={handelLogout}>
                   <a href="#">
                    <BsBoxArrowRight className='icon'/> Logout
                    </a>
            </li>

        </ul>
    </aside>
  )
}

export default Sidebar