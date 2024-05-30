import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
function TextArea({placeholder, value, onChange}){
    return(
        <div className="mt-3 ">
            <textarea className="resize-none border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent w-[300px]" placeholder={placeholder} value={value} onChange={onChange} rows="5"></textarea>
            {/*<SimpleMDE*/}
            {/*    placeholder={placeholder}*/}
            {/*    value={value}*/}
            {/*    onChange={onChange}*/}
            {/*    options={{*/}
            {/*        spellChecker: false,*/}
            {/*        forceSync: true,*/}
            {/*        autosave: {*/}
            {/*            enabled: false,*/}
            {/*            uniqueId: 'MyUniqueID',*/}
            {/*        },*/}
            {/*    }}*/}
            {/*/>*/}

        </div>
    )
}
export default TextArea