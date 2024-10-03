/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { Trash } from "phosphor-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { Item } from "../../types";

export default function DeleteTodo({ data, refresh }: any) {
  //data: recuperation de l'element clique
  //refresh: le mutateur pour rafraichir la page de listing des todoList
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleRemoveTodo = useCallback(() => {
    const storedItems: Item[] = JSON.parse(
      localStorage.getItem("items") || "[]"
    );
    setLoading(true);
    const updatedItems = storedItems.filter((index) => index.id !== data.id);
    //rafraichissement des nouvelles data dans le stockage local du navigateur
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setTimeout(() => {
      refresh(updatedItems);
      onClose();
      toast.success("Tâche supprimée !");
      setLoading(false);
    }, 3000);
  }, [data]);
  return (
    <div>
      <Trash
        onClick={onOpen}
        color="red"
        size={24}
        className="cursor-pointer"
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Supprimer
              </ModalHeader>
              <ModalBody>
                <p>Voulez-vous vraiment supprimer cette tache ?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Annuler
                </Button>
                <Button
                  isLoading={loading}
                  color="primary"
                  onPress={handleRemoveTodo}
                >
                  Supprimer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div>
        {" "}
        <ToastContainer />
      </div>
    </div>
  );
}
