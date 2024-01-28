import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import RedirectRoute from "./RedirectRoute";

  // context

  //While backend middleware protects against unauthorized API requests, 
  //frontend protection prevents rendering components or navigating to
  // pages that should be restricted.
  
  export default function PrivateRoute() {
    // context
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);
  
    useEffect(() => {
      if (auth?.token) getCurrentUser();
    }, [auth?.token]);
  
    const getCurrentUser = async () => {
      try {
        const { data } = await axios.get("/current-user", {
          headers: {
            Authorization: auth?.token,
          },
        });
        setOk(true);
      } catch (err) {
        setOk(false);
      }
    };
  
    return ok ? <Outlet /> : <RedirectRoute />;
  }