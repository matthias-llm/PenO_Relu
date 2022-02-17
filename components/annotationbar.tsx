import AnnotationCard from "./annotationcard";
import { ICard } from "../types";

type AnnotationBarProps = {
	cards: ICard[]
}

export default function AnnotationBar({ cards }: AnnotationBarProps) {

	const deleteCard = (cardID) => {
		cards = cards.filter((card) => card._id != cardID)
	}
	
	return (
		<div className="w-1/4 min-h-screen border-black border rounded-r-[5rem] flex flex-col items-center ">
			<div id="title_annobar" className='flex justify-center text-6xl my-4 border-b-2 border-black h-fit pb-4 w-80'>
				Annotaties
			</div>

			<div className="divide-y-2 ">
				{cards.map((item, index) =>{
					return <AnnotationCard key={index} card={item} deleteCard={deleteCard}/>
				})}
			</div>
		</div>
	)
}