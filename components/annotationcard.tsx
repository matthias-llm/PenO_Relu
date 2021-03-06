import { ICard, IFile } from "../types";
import { AiOutlineEdit, AiOutlineSave, AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { addcolor, onDblClick, removecolor, sphere } from "./stlviewer";
import DeleteModal from "./deleteModal";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  controls,
  scene,
  theline,
  loader,
  Skull,
  Stlviewer,
} from "./stlviewer";
import { Sprite } from "three";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type AnnotationCardProps = {
  card: ICard;
  deleteCard: Function;
  file: IFile;
  setAnnoClick: Function;
  annoClick: boolean;
  setSelectedTooth: Function;
  selectedTooth: String;
};

export default function AnnotationCard({
  card,
  deleteCard,
  file,
  setSelectedTooth,
  selectedTooth,
}: AnnotationCardProps) {
  const [editing, setEdit] = useState(card.new);
  const [title, setTitle] = useState(card.title);
  const [text, setText] = useState(card.text);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenToothSelected, setIsOpenToothSelected] = useState(false);

  const deleteAnnoCard = () => {
    if (file.selected) {
      removecolor(file);
    }
    file.selected = null;
    scene.children = scene.children.filter(
      (child) => !(child instanceof Sprite)
    );
    if (theline) {
      scene.remove(theline);
      if (scene.getObjectByProperty("name", "sphere") != undefined) {
        const object = scene.getObjectByProperty("name", "sphere");
        object.geometry.dispose();
        object.material.dispose();
        scene.remove(object);
      }
    }
  };

  const toggleEdit = () => {
    if (editing && typeof card.position == "undefined") {
      toast.error("Selecteer eerst een tand en sla dan opnieuw op.", {
        className: "text-lg",
      });
    } else {
      if (editing && (title != card.title || text != card.text)) {
        card.title = title;
        card.text = text;

        fetch("/api/write_anno", {
          method: "POST",
          body: JSON.stringify({ card }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      file.time = new Date().toLocaleString();
      fetch("/api/update_file", {
        method: "POST",
        body: JSON.stringify({ file }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (editing) {
        onDblClick(file);
      }
      setSelectedTooth(file.selected.intersect);
      setEdit(editing ? false : true);
    }
  };

  const onDelete = () => {
    deleteCard(card._id);

    if (card.intersect == selectedTooth) {
      deleteAnnoCard();
      setSelectedTooth("");
    }

    fetch("/api/delete_anno", {
      method: "POST",
      body: JSON.stringify({ card }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    file.card_ids = file.card_ids.filter((ID) => ID != card._id);
    fetch("/api/update_file", {
      method: "POST",
      body: JSON.stringify({ file: file }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const onAnnotation = () => {
    if (!editing) {
      removecolor(file);
      file.selected = card;
      setSelectedTooth(file.selected.intersect);
      onDblClick(file);
      addcolor(file);
      fetch("/api/update_file", {
        method: "POST",
        body: JSON.stringify({ file }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  return (
    <div className="flex items-center min-w-full">
      <div className="overflow-x-auto" style={{ width: "100%" }}>
        <form
          className="text-gray-700 px-3"
          onSubmit={toggleEdit}
          onClick={() => onAnnotation()}
        >
          <div className="text-2xl mb-2">
            {editing ? (
              <input
                className="border-2"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && toggleEdit()}
              />
            ) : (
              <div className="large">{title}</div>
            )}
          </div>
          <div>
            {editing ? (
              <textarea
                className="w-full border-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && toggleEdit()}
              />
            ) : (
              <div className="small">{text}</div>
            )}
          </div>
        </form>
      </div>
      <div className="text-gray-700 text-xl flex items-center flex-col">
        <button className="m-2" onClick={toggleEdit}>
          {editing && typeof card.position == "undefined" ? (
            <AiOutlineSave />
          ) : editing && typeof card.position != "undefined" ? (
            <AiOutlineSave />
          ) : (
            <AiOutlineEdit />
          )}
        </button>
        {isOpen ? (
          <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
            <DeleteModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              onDelete={onDelete}
              string={"Wilt u deze annotatie verwijderen?"}
            ></DeleteModal>
          </Modal>
        ) : (
          <button onClick={() => setIsOpen(true)}>
            <AiOutlineDelete className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
}
