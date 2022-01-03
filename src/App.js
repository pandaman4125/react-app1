import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import { postData } from './ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {

    const [inputConfig, setInputConfig] = useState(null);
    const [xml, setXML] = useState("");
    const toast = useRef(null);

    const onClick1 = () => {
        postData({ "config": inputConfig })
            .then((value) => setXML(value.xml))
    }

    return (
        <div className="datatable-crud-demo surface-card p-4 border-round shadow-2">
            <Toast ref={toast} />

            <div className="text-3xl text-800 font-bold mb-4">SAOS 6x to SAOS 10x Converter</div>
            <InputTextarea rows={10} cols={150} onChange={(e) => setInputConfig(e.target.value)} />
            <br />
            <Button label="Convert" className="p-button-rounded" onClick={onClick1} />
            <br />
            <InputTextarea rows={10} cols={150} value={xml} />
            <br />
            
        </div>
    );
}

export default App;