/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { PencilSimple } from "phosphor-react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button, Input, Switch } from "@nextui-org/react";
import { Item } from "../../types";

export default function EditTodo({ data, ind, refresh }: any) {
  //data: recuperation de l'element clique
  //refresh: le mutateur pour rafraichir la page de listing des todoList
  //ind: l'index de l'element sur lequel un click a ete fait
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [todo, setTodo] = useState({
    id: data?.id,
    title: data?.title,
    isFinished: data?.isFinished,
  });

  useEffect(() => {
    const storedItems: Item[] = JSON.parse(
      localStorage.getItem("items") || "[]"
    );
    setItems(storedItems);
  }, []);

  const handleEditTodo = useCallback(() => {
    setLoading(true);
    const updatedItems = items.map((item, index) =>
      index === ind ? todo : item
    );
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setTimeout(() => {
      refresh(updatedItems);
      onClose();
      setLoading(false);
    }, 3000);
  }, [ind, todo]);
  return (
    <div>
      <PencilSimple onClick={onOpen} size={24} className="cursor-pointer" />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modifier
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  defaultValue={data.title}
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
                      setTodo({ ...todo, isFinished: !data.isFinished })
                    }
                  >
                    Votre tâche est-elle terminée ?
                  </Switch>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Annuler
                </Button>
                <Button
                  isLoading={loading}
                  color="primary"
                  onPress={handleEditTodo}
                >
                  Modifier
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
