import FormBlock from "./block-form";
import FormHeader from "./block-form-header";


export default function RegisterFormSection( ) {
    return (
        <main className="p-5 h-full w-full">
            <div className="flex flex-col w-full h-full py-5 px-6  border-2 border-ec rounded-xl">
                <FormHeader />
                <FormBlock />
            </div>
        </main>
    )
}