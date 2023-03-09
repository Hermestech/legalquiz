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
        console.log(data);
        if (data.statusCode === 400) {
          console.log(data.message);
          return;
        }
        if (res.status === 200) {
          console.log("User created successfully");
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
