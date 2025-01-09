import {react, useEffect,useState} from 'react'

export const setLoginDataInLocalStorage = (propItem)=>{
    const now = new Date();
    const item = {
      value: propItem.token,
      role: propItem.role,
      expiry: now.getTime() + 15 * 24 * 60 * 60 * 1000,  // Expiry time in milliseconds
    };
    localStorage.setItem("user", JSON.stringify(item));
}

export const getRole = async ()=>{
        const logedInUser = localStorage.getItem('user');
        if(logedInUser){
            const role = JSON.parse(logedInUser).role;
            return role;
        }
    }
