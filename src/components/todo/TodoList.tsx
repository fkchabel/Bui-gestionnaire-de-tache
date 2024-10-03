import { Button, Chip } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import { Item } from "../../types";
import DeleteTodo from "./DeleteTodo";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const [items, setItems] = useState<Item[]>([]);
  const [option, setOption] = useState("all");
  const navigate = useNavigate();

  const newTODO = items?.filter((data) => !data?.isFinished);
  useEffect(() => {
    const storedItems: Item[] = JSON.parse(
      localStorage.getItem("items") || "[]"
    );
    setItems(storedItems);
  }, []);

  const handleFilterTodo = useCallback((selected: string) => {
    const storedItems: Item[] = JSON.parse(
      localStorage.getItem("items") || "[]"
    );
    setOption(selected);
    if (selected === "all") {
      setItems(storedItems);
    }
    if (selected === "finished") {
      const newdata = storedItems?.filter((data) => data?.isFinished);
      setItems(newdata);
    }
    if (selected === "not_finished") {
      const newdata = storedItems?.filter((data) => !data?.isFinished);
      setItems(newdata);
    }
  }, []);

  return (
    <div className="w-full pt-[100px]">
      <div className="w-full h-[200px] md:h-[300px] rounded-b-[100px] flex flex-col items-center justify-center bg-[#2848b9]">
        <h1
          className="text-lg text-white text-[30px] md:text-[72px]"
          style={{ fontFamily: "mona-bold" }}
        >
          {items?.length} {items?.length > 1 ? "tâches" : "tâche"}
        </h1>
      </div>
      {items?.length > 0 && (
        <div className="w-full container mx-auto p-4 flex flex-row items-center justify-center md:justify-end">
          <div>
            <Button
              onClick={() => handleFilterTodo("all")}
              style={{
                fontFamily: "mona",
                background: option === "all" ? "#2848b9" : "",
                color: option === "all" ? "#fff" : "",
              }}
              className="bg-transparent rounded-full"
            >
              Tout
            </Button>
            <Button
              onClick={() => handleFilterTodo("finished")}
              style={{
                fontFamily: "mona",
                background: option === "finished" ? "#2848b9" : "",
                color: option === "finished" ? "#fff" : "",
              }}
              className="bg-transparent rounded-full"
            >
              Terminées
            </Button>
            <Button
              onClick={() => handleFilterTodo("not_finished")}
              style={{
                fontFamily: "mona",
                background: option === "not_finished" ? "#2848b9" : "",
                color: option === "not_finished" ? "#fff" : "",
              }}
              className="bg-transparent rounded-full"
            >
              Non terminées
            </Button>
          </div>
        </div>
      )}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-blue-100 text-[#2848b9] min-h-[100px] flex flex-col items-center gap-4 rounded-[80px] p-4 rounded-lg shadow-md"
            >
              <h4 className="text-xl" style={{ fontFamily: "mona-bold" }}>
                {item.title}
              </h4>
              <div className="w-full flex flex-row items-center justify-around">
                <div className="flex bg-blue-200 py-1 px-2 rounded-full flex-row gap-4">
                  <EditTodo ind={i} data={item as Item} refresh={setItems} />

                  <DeleteTodo data={item as Item} refresh={setItems} />
                </div>
                <Chip
                  style={{ fontFamily: "mona" }}
                  color={item.isFinished ? "success" : "warning"}
                  variant="shadow"
                >
                  {item.isFinished ? "terminée" : "à faire"}
                </Chip>
              </div>
            </div>
          ))}
        </div>

        {items?.length === 0 && (
          <div className="h-[30vh] w-full flex flex-col items-center justify-center">
            <Button
              style={{ fontFamily: "mona" }}
              className="text-md"
              onClick={() => navigate("/")}
            >
              Ajouter une tâche
            </Button>
          </div>
        )}
        {items?.length > 0 && (
          <div className="w-full  py-16 flex flex-col items-center justify-center">
            <h4 className="text-xl" style={{ fontFamily: "mona-bold" }}>
              {newTODO?.length} tâches non terminées !
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}
