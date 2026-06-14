import { useState } from "react";
import Home from "./pages/Home";
import LoginScreen from "./components/LoginScreen";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  if (!loggedIn) {
    return (
      <LoginScreen
        onLogin={() => setLoggedIn(true)}
      />
    );
  }

  return <Home />;
}