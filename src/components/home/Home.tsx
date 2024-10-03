import { Button, Input } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";
import { uid } from "uid";

interface Item {
  title: string;
  isFinished: boolean;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [todo, setTodo] = useState({
    title: "",
    isFinished: false,
  });

  useEffect(() => {
    const storedItems: Item[] = JSON.parse(
      localStorage.getItem("items") || "[]"
    );
    setItems(storedItems);
  }, []);

  const handleAddNewTodo = useCallback(() => {
    setLoading(true);
    const payload = {
      id: uid(),
      ...todo,
    };
    const newItems = [...items, payload];
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
    setTimeout(() => {
      setTodo({
        title: "",
        isFinished: false,
      });
      toast.success("Nouvelle tâche ajoutée !");
      setLoading(false);
    }, 3000);
  }, [todo]);

  console.log(items);
  return (
    <div className="w-full flex flex-col items-center justify-center pt-16 h-screen bg-blue-50">
      <div className="w-[90%] flex flex-col items-start rounded-[50px] justify-center gap-4  bg-white md:w-[30%] border rounded-xl p-8">
        <h4 className="text-lg" style={{ fontFamily: "mona-bold" }}>
          Ajouter une nouvelle tâche à votre liste !
        </h4>
        <Input
          type="text"
          value={todo.title}
          size="lg"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          placeholder="Titre pout votre tâche"
        />
        <div className="w-full flex flex-row items-center justify-end">
          <Switch
            size="sm"
            isSelected={todo.isFinished}
            style={{ fontFamily: "mona" }}
            onValueChange={() =>
              setTodo({ ...todo, isFinished: !todo.isFinished })
            }
          >
            Votre tâche est-elle terminée ?
          </Switch>
        </div>
        <Button
          isLoading={loading}
          isDisabled={todo.title.length > 2 ? false : true}
          onClick={handleAddNewTodo}
          className="w-full bg-[#2848b9] text-white"
        >
          Ajouter
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
