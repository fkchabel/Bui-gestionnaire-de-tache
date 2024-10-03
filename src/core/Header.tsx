import { Button } from "@nextui-org/react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="w-screen fixed z-10 top-0 bg-white h-[100px] flex flex-row items-center justify-between py-4 px-[15px] md:px-[50px]">
      <img src={logo} alt="bui" className="h-[50px] w-[50px]" />

      <div>
        <Button
          style={{ fontFamily: "mona" }}
          className="bg-transparent text-md"
          onClick={() => navigate("/")}
        >
          Accueil
        </Button>
        <Button
          style={{ fontFamily: "mona" }}
          className="bg-transparent text-md"
          onClick={() => navigate("/todo")}
        >
          Tâches
        </Button>
      </div>
    </div>
  );
}
