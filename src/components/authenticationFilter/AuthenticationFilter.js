import React, { useEffect, useState } from "react";
import api from '../../api/axiosConfig';

function AuthenticationFilter({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const userToken = window.sessionStorage.getItem("userToken");
    if (userToken != null) {
      // Comprobamos si el usuario está autenticado
      try {
        const response = api.post("/auth/check", {}, 
            {
                headers: {
                'Authorization': `Bearer ${window.sessionStorage.getItem('userToken')}` 
                }
            })
            .then(response => {
                if(response.data == "autorizado"){
                    //console.log("Autorizado por el servidor");
                    setAuthenticated(true);
                } else if(response.data == "no-autorizado") {
                    if(window.location.pathname != "/login" && window.location.pathname != "/register"){
                        window.sessionStorage.removeItem('userToken');
                        //console.log("No autorizado por el servidor");
                        window.location.href = "/login";
                    }
                } else {
                    //console.log("error al comprobar la sesion");
                    window.location.href = "/login";
                }
            })
        } catch (err) {
            window.sessionStorage.removeItem('userToken');
            console.log(err);
            //hubo un error o no ha sido autorizado
            if(window.location.pathname != "/login" && window.location.pathname != "/register"){
                window.sessionStorage.removeItem('userToken');
                window.location.href = "/login";
            }
        };
    } else {
        // Si el usuario no está autenticado, redirigir al usuario a la página de login
        //console.log('No hay sesión guardada');
        if(window.location.pathname != "/login" && window.location.pathname != "/register"){
            window.location.href = "/login";
        }
    }
    setAuthenticated(true);
  });

  // Renderizar los hijos solo si el usuario está autenticado
  return authenticated ? <>{children}</> : null;
}

export default AuthenticationFilter;
