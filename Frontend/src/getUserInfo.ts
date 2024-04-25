export function getUserInfo(navigate:any) {
  const userStr = localStorage.getItem("user");
  let user:any;
  if (userStr == null) {
    navigate("/404");
  } else {
    user = JSON.parse(userStr);
  }
  return user;
}