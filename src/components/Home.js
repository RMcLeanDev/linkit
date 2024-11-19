import React,{useState} from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import moment from 'moment';
import Google from './Google';

function Home(){
      
    const [file,setFile] = useState(null)
    const [sorted, setSorted] = useState(false)
    
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
            let newObj = {}
            for(let i=0; i< file.length; i++){
                if(file[i][0] && file[i][0] != "Date" && file[i][7] !== "Daily Total"){
                    let key = file[i][1]; 
                    if(newObj[key] && newObj[key][5] === file[i][5]){
                        if(file[i][11] || file[i][8] === 0 || file[i][9] === 0){
                            newObj[key][8] = newObj[key][8] + file[i][8]
                            newObj[key][9] = newObj[key][9] + file[i][9]
                        }
                    }  else {
                        newObj[key] = file[i];
                    }
                }
            }
            setSorted(newObj)
        }
    }

    return(
        <div>
            <h1>This is the home component</h1>
            <Google />
            <form onSubmit={pushToDataBase}>
                <input type='file' onChange={e => excelToJSON(e.target.files)}/>
                <br/>
                <button type='submit'>Submit</button>
            </form>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr"}}>
                <p>Date:</p>
                <p>Business Name:</p>
                <p>Contact:</p>
                <p>Venue:</p>
                <p>Amount Sold:</p>
                <p>Collected:</p>
                <p>Reamaining Balance:</p>
            </div>
            {sorted ? Object.keys(sorted).map(sort => {
                let sortedItem = sorted[sort];
                let reamining = parseInt(sortedItem[8]) - parseInt(sortedItem[9]);
                if(reamining !== 0){
                    return <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr", border:"1px solid black"}}>
                        <p>{sortedItem[0]}</p>
                        <p>{sortedItem[1]}</p>
                        <p>{sortedItem[2]}</p>
                        <p>{sortedItem[7]}</p>
                        <p>${sortedItem[8]}</p>
                        <p>${sortedItem[9]}</p>
                        <p>${reamining}</p>
                    </div>
                }
            }):null}
        </div>
    )
}

export default Home;