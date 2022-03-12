import AnnotationCard from "./annotationcard";
import { ICard, IFile } from "../types";
import { GrAdd } from "react-icons/gr";
import { useState } from "react";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineRightCircle,
  AiOutlineLeftCircle,
} from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

type AnnotationBarProps = {
  file: IFile;
  cardsInput: ICard[]
};

export default function AnnotationBar({ file, cardsInput }: AnnotationBarProps) {
  const [swiped, setSwipe] = useState(false);
  const fileCardInput = cardsInput.filter((card) => file.card_ids.includes(card._id));
  const [cards, setCards] = useState(fileCardInput);
  const inputIDs = file.card_ids;

  const deleteCard = (cardID) => {
    setCards(cards.filter((card) => card._id != cardID));
    file.card_ids = file.card_ids.filter((IDs) => cardID != IDs);

    fetch('/api/update_file', {
      method: 'POST',
      body: JSON.stringify({ file }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

  };

  const newCard = () => {
    const new_card: ICard = {
      _id: uuidv4(),
      title: "",
      text: "",
      new: true,
    };

    file.card_ids.push(new_card._id);
    fetch('/api/update_file', {
      method: 'POST',
      body: JSON.stringify({ file }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setCards([...cards, new_card]);
  };

  const onSwipe = () => {
    setSwipe(!swiped);
  };

  return (
    <div className="flex items-center">
      {!swiped ? (
        <div className="min-h-screen border-black bg-gray-100 border flex flex-col items-center ">
          <div id="header_annobar" className="flex justify-center items-center">
            <div className="flex justify-center text-6xl my-4 border-b-2 border-black h-fit pb-4 w-80">
              Annotaties
            </div>
            <button onClick={newCard}>
              <GrAdd className="text-3xl m-5 text-gray-700" />
            </button>
          </div>
          <div className="divide-y-2 ">
            {cards.map((item, index) => {
              return (
                <AnnotationCard
                  key={index}
                  card={item}
                  deleteCard={deleteCard}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-1/8 min-h-screen border-black border rounded-r-[5rem] flex flex-col items-center "></div>
      )}
      <button className="flex items-center text-4xl" onClick={onSwipe}>
        {!swiped ? <AiOutlineLeftCircle /> : <AiOutlineRightCircle />}
      </button>
    </div>
  );
}
