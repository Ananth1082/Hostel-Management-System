import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <>
      <h1>Oops.... you are not authorized to open this page</h1><Link to="/auth/signin">Go back</Link>
    </>
  );
}
