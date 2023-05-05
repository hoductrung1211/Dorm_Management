export default function InputImageEditing({
    // handleChangeFile,
    handleChange,
}) {
    
    function loadFile(e){
        handleChange(e)
        var image = document.getElementById('display_upload');
        image.src = URL.createObjectURL(e.target.files[0]);
    }

    return (
        <label className="h-full w-full cursor-pointer  transition">
            <img id="display_upload" src="" alt="" />
            <input 
                type="file" name="file" onChange={loadFile} accept="image/gif, image/jpeg, image/png"
            />
        </label>
    )
}