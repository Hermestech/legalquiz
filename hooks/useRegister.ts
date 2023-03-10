import { useEffect, useState } from "react";

export const useRegisterUser = (user:any) => { 
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (user && !isRegistered) { 
    const registerUser = async () => { 
      try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await res.json();
        if (data.statusCode === 400) {
          return;
        }
        if (res.status === 200) {
          setIsRegistered(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    registerUser();
    }
  }, [user, isRegistered]);
}
