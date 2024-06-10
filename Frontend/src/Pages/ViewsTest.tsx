import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewsTest() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user") || "";
  if (userStr) {
    var user = JSON.parse(userStr);
    useEffect(() => {
      if (user) var token = user.accessToken;
      console.log(token);
      const myHeaders = new Headers();

      myHeaders.append("x-access-token", token);

      fetch("http://localhost:8080/api/test/all", {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      })
        .then((res) => {
          if (!res.ok) navigate("/404");
        })

        .catch((_) => false);
    });
  } else
    useEffect(() => {
      navigate("/404");
    });
}
