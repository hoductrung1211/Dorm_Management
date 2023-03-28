import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import RoomCard from "./card-room";
import { useRef } from "react";

export default function ShowRoomsBlock({ 
    typeInfo,
}) {
    const cardsRef = useRef(null);
    const cardViewId = useRef(0);

    function scrollToId(id) {
        const map = getMap();
        const node = map.get(id);

        node.scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
        })
    }

    function getMap() {
        if (!cardsRef.current)
            cardsRef.current = new Map();
        return cardsRef.current;
    }

    function handlePreviousView() {
        let size = getMap().size;
        cardViewId.current -= 2;

        if (cardViewId.current < 1)
            cardViewId.current = size - 1;
        
        scrollToId(cardViewId.current);
    }

    function handleNextView() {
        let size = getMap().size;
        cardViewId.current += 2;

        if (cardViewId.current >= size)
            cardViewId.current = 1;
        
        scrollToId(cardViewId.current);
    }

    return (
        <section className="relative h-full p-2">
            <h4 className="absolute top-6 left-1/2 -translate-x-1/2 text-xl">Available rooms</h4>

            <ul className="h-full flex items-center gap-5 overflow-x-hidden">
            {typeInfo.rooms.map(room =>
                // Card 
                <RoomCard room={room} typeName={typeInfo.name} cost={typeInfo.cost} getMap={getMap} />
            )}
            </ul>

            <button 
                className="absolute grid place-items-center top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 h-16 w-16 bg-fa rounded-full active:bg-ec shadow-md active:scale-90 transition"
                onClick={handlePreviousView}>
                <FontAwesomeIcon className="text-xl" icon={faAngleLeft} />
            </button>
            <button 
                className="absolute grid place-items-center top-1/2 -translate-y-1/2 right-0 translate-x-1/2 h-16 w-16 bg-fa rounded-full active:bg-ec shadow-md active:scale-90 transition"
                onClick={handleNextView}>
                <FontAwesomeIcon className="text-xl" icon={faAngleRight} />
            </button>

            <p className="absolute right-6 bottom-4">© 2023 Cube Dormitory. All rights reserved</p>
        </section>
    )
}