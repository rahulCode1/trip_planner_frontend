import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerifyLogin = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/me`,
          {
            credentials: "include",
          },
        );

        const data = await res.json();

        console.log(data.token);

        localStorage.setItem("token", data.token);
        return navigate("/");
      } catch (error) {
        console.log(error);
      }
    };

    handleVerifyLogin();
  }, [navigate]);

  return (
    <>
      <h1>Verifying...</h1>
    </>
  );
};

export default VerifyLogin;
