import React, { useEffect, useState } from 'react'
import {
    BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsBoxArrowRight
}
    from 'react-icons/bs'

import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { getRole } from '../utills/CustomFunctions';
function Sidebar({ openSidebarToggle, OpenSidebar, getRole, roleAuth }) {

    useEffect(() => {
        getRole();
    }, [roleAuth])

    const navigate = useNavigate();

    const handelLogout = async () => {
        const isUser = localStorage.getItem('user');

        if (isUser) {
            try {
                localStorage.removeItem("user");
                toast.success("Logout successfully");
                navigate('/login');
            } catch (error) {

            }
        }
    }


    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <BsCart3 className='icon_header' /> SHOP
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <a href="/dashboard">
                    <li className='sidebar-list-item'>
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </li>
                </a>
                {
                    roleAuth === 5 ? (
                        <a href="/project">
                            <li className='sidebar-list-item'>
                                <BsFillArchiveFill className='icon' /> Projects
                            </li>
                        </a>
                    ) : null // If roleAuth is not 5, render nothing (or you can render an alternative element)
                }

                {
                    roleAuth === 5 ? (
                        <a href="/employee">
                            <li className="sidebar-list-item">
                                <BsPeopleFill className="icon" /> Employee
                            </li>
                        </a>
                    ) : null // If roleAuth is not 5, render nothing (or you can render an alternative element)
                }

                {
                    roleAuth === 1 || roleAuth === 2 || roleAuth === 3 || roleAuth === 4 || roleAuth === 5 ? (
                        <a href="/task">
                            <li className='sidebar-list-item'>
                                <BsFillGrid3X3GapFill className='icon' /> Task
                            </li>
                        </a>
                    ) : null // If roleAuth is not 5, render nothing (or you can render an alternative element)
                }

                
                
                <a href="">
                    <li className='sidebar-list-item'>
                        <BsFillGearFill className='icon' /> Setting
                    </li>
                </a>

                <a href="#">
                    <li className='sidebar-list-item' onClick={handelLogout}>
                        <BsBoxArrowRight className='icon' /> Logout
                    </li>
                </a>

            </ul>
        </aside>
    )
}

export default Sidebar