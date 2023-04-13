import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed, faFaucetDrip, faBolt, faBox, faTv, faMoneyBill } from "@fortawesome/free-solid-svg-icons"

export default function TypeInfoBlock({
    children,
    typeInfo,
}) {
    const icons= [faBed, faFaucetDrip, faBolt, faBox, faTv]
    return (
        <>
            <div className="flex flex-col p-5 border-b-2 border-ec">
                <div className="flex items-center justify-between">
                    {children}
                    <div className="flex items-center gap-5 w-72 h-12 px-5 border-2 border-ec rounded-md">
                    {icons.map((icon, index) =>
                        <FontAwesomeIcon key={index} className="text-2xl" icon={icon} />
                    )}
                    </div>
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <p className="w-3/5 italic">
                        {typeInfo.description}
                    </p>

                    <div className="gap-4 px-5 flex items-center">
                        <div className="flex items-center gap-2 text-p">
                            <FontAwesomeIcon className="text-2xl" icon={faBed} />
                            <span className="font-bold">{typeInfo.soGiuong}</span> beds
                        </div>

                        <div className="flex items-center gap-2 text-p ">
                            <FontAwesomeIcon className="text-2xl" icon={faMoneyBill} />
                            <span className="font-bold">{typeInfo.giaPhong}</span> đ/month
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}