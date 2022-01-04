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
    const [activeIndex, setActiveIndex] = useState(0);
    const [inputConfig, setInputConfig] = useState(null);
    const [xml, setXML] = useState("");
    const [tables, setTables] = useState({})
    const toast = useRef(null);

    const click_convert = () => {
        postData({ "config": inputConfig })
            .then((value) => {
                setXML(value.xml)
                setTables(value.tables)
            });
    }

    function tabBuilder(tables) {
        let result = [];
        for (var k in tables) {
            if (tables.hasOwnProperty(k)) {
                let columns = []
                if (tables[k] != null) {
                    for (var d in tables[k][0]) {
                        columns.push(<Column field={d} header={d}> 
                        </Column>)
                    }
                }
                result.push(<TabPanel header={k}>
                    <DataTable value={tables[k]}>
                        {columns}
                    </DataTable>
                </TabPanel>)
            }
        }
        return result;
    }
    return (
        <div className="datatable-crud-demo surface-card p-4 border-round shadow-2">
            <Toast ref={toast} />

            <div className="text-3xl text-800 font-bold mb-4">SAOS 6x to SAOS 10x Converter</div>
            <InputTextarea rows={10} cols={150} onChange={(e) => setInputConfig(e.target.value)} />
            <br />
            <Button label="Convert" className="p-button-rounded" onClick={click_convert} />
            <br />
            <InputTextarea rows={10} cols={150} value={xml} />
            <br />
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                {tabBuilder(tables)}
            </TabView>
        </div>
    );
}

export default App;