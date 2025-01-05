import { createContext, useEffect, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthContext Provider Component
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [taskTimer, setTaskTimer] = useState(JSON.parse(localStorage.getItem("timer")) || null);

  // Effect to keep user data in sync with localStorage
  useEffect(() => {
    if (currentUser) {
      if(currentUser.expiry < Date.now()){
        localStorage.removeItem("user");
      }else{
        localStorage.setItem("user", JSON.stringify(currentUser));
      }
    } else {
      localStorage.removeItem("user");
    }

    // if (taskTimer) {
    //   if(taskTimer.timerexpiry < Date.now()){
    //     localStorage.removeItem("timer");
    //   }else{
    //     localStorage.setItem("timer", JSON.stringify(taskTimer));
    //   }
    // } else {
    //   localStorage.removeItem("timer");
    // }

  }, [currentUser]);

  // Context value to be passed down
  const value = {
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
