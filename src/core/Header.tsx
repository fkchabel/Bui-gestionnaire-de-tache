import { Button } from "@nextui-org/react";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const route = useLocation().pathname;
  console.log(route);
  return (
    <div className="w-screen fixed z-10 top-0 bg-white h-[100px] flex flex-row items-center justify-between py-4 px-[15px] md:px-[50px]">
      <img
        src={logo}
        onClick={() => navigate("/")}
        alt="bui"
        className="h-[50px] w-[50px] cursor-pointer"
      />

      <div>
        <Button
          style={{
            fontFamily: "mona",
            borderBottom: route === "/" ? "4px solid #2848b9" : "",
          }}
          className="bg-transparent text-md rounded-none"
          onClick={() => navigate("/")}
        >
          Accueil
        </Button>
        <Button
          style={{
            fontFamily: "mona",
            borderBottom: route === "/todo" ? "4px solid #2848b9" : "",
          }}
          className="bg-transparent text-md rounded-none"
          onClick={() => navigate("/todo")}
        >
          Tâches
        </Button>
      </div>
    </div>
  );
}
