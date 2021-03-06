import React from "react";
import { useState } from "react";
import { IFile, IPatient } from "../types";
import {
  ClipboardCopyIcon,
  MailOpenIcon,
  ShareIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import Modal from "react-modal";
import PopUpShare from "./popUpShare";

type FileCardProps = {
  file: IFile;
  patients: IPatient[];
};

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

const PopUp = ({ file, patients }: FileCardProps) => {
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <div id="Button Container">
      {showPopUp ? (
        <Modal isOpen={showPopUp} style={customStyles} ariaHideApp={false}>
          <PopUpShare
            file={file}
            patients={patients}
            setShowPopUp={setShowPopUp}
          />
        </Modal>
      ) : (
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center"
          onClick={() => setShowPopUp(true)}
        >
          <ShareIcon className="w-6 h-6" />
          Share
        </button>
      )}
    </div>
  );
};

export default PopUp;
