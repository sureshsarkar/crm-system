import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill,BsBoxArrowRight}
 from 'react-icons/bs'
 import axios from 'axios'

 import { useNavigate } from 'react-router-dom'
function Sidebar({openSidebarToggle, OpenSidebar}) {

const navigate = useNavigate();
    const handelLogout = async ()=>{
         const isUser = localStorage.getItem('user');
      

         if(isUser){

            try {
            const { data } = await axios.get("/api/auth/logout");
       
            localStorage.removeItem("user");
            navigate('/login')
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
            <li className='sidebar-list-item'>
                <a href="/project">
                    <BsFillArchiveFill className='icon'/> Projects
                </a>
            </li>

            <li className='sidebar-list-item'>
                <a href="/employee">
                    <BsPeopleFill className='icon'/> Employee
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/task">
                    <BsFillGrid3X3GapFill className='icon'/> Task
                </a>
            </li>
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

            <li className='sidebar-list-item'>
                   <a href="#">
                    <BsBoxArrowRight className='icon' onClick={handelLogout}/> Logout
                    </a>
            </li>

        </ul>
    </aside>
  )
}

export default Sidebar