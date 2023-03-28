import Image from "next/image";

export default function RoomCard({ room, typeName, cost, getMap }) {
    return (
        <li 
            key={room.id} 
            className="shrink-0 w-80 min-h-min h-5/6 max-h-96 p-2 bg-fa rounded-xl cursor-pointer shadow-md hover:shadow-sm hover:scale-95 hover:bg-ec transition-all overflow-hidden"
            ref={node => {
                const map = getMap();

                if (node)
                    map.set(room.id, node);
                else map.delete(room.id);
            }}>
            <div className="relative h-4/5 w-full rounded-lg overflow-hidden">
                <Image
                    className="object-cover  "
                    src={room.imgSrc}
                    fill
                    alt="room iamge"
                />
            </div>
            <div className="mt-2 px-2 flex justify-between items-center">
                    <p>Room <span className="font-bold">#{room.id}</span></p>
                    <p>{typeName}</p>
            </div>
            <div className="mt-2 px-2 flex justify-between items-center">
                    <p className="text-zinc-500"><span className="font-bold text-b">{room.available}</span> beds left</p>
                    <p><span className="font-bold">{cost}</span> đ/month</p>
            </div>
        </li>
    )
}