import React,{useState} from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import moment from 'moment';

function Home(){
      
    const [file,setFile] = useState(null)

    function excelToJSON(file){
        const [files] = file;
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_row_object_array(ws, { header: 1 });
            setFile(data);
        };

        reader.readAsBinaryString(files)
    }

    function pushToDataBase(e){
        e.preventDefault()
        if(file){
            console.log(file)
        }
    }

    return(
        <div>
            <h1>This is the home component</h1>
            <h1>weoifewofin</h1>
            <form onSubmit={pushToDataBase}>
                <input type='file' onChange={e => excelToJSON(e.target.files)}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Home;