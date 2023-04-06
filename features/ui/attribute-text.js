export default function AttributeText({ title, children, mtSize="lg" }) {
    let mt = "mt-8";
    if (mtSize == 'sm')
        mt = "mt-4"
    else if (mtSize == 'md') 
        mt = "mt-6"
    else if (mtSize == "lg")
        mt = "mt-8"
    else if (mtSize == "xl")
        mt = "mt-10"

    return (
        <>
            <h4 className={mt + "  mb-2 text-xl font-bold first:mt-0"}>
                {title}
            </h4>
            {children}
        </>
    )
}