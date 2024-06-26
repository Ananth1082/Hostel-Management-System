export function testUser(accessToken: string){
  const myHeaders = new Headers();

  myHeaders.append("x-access-token", accessToken);

  fetch("http://localhost:8080/api/test/all", {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.text())
    .then((result) => {
      if (result === "Public Content.") {
        return true;
      } else {
        return false;
      }
    })
    .catch((_) => false);
    return false;
}
