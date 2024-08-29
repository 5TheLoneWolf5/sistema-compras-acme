import { useMemo } from "react";
import styled from "styled-components";

const Button = styled.button`

    padding: 5px;

`;

const ButtonCSV = (props) => {

    const convertArrayOfObjectsToCSV = (array) => {
        let result;
    
        const columnDelimiter = ';';
        const lineDelimiter = '\n';
        // console.log(props.data);
        const keys = Object.keys(props.data[0]);
    
        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;
        // console.log(result);
    
        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) { result += columnDelimiter };
    
                result += item[key];
                
                ctr++;
            });
            result += lineDelimiter;
        });
    
        return result;
    };
    
    const downloadCSV = (array) => {

        const csv = convertArrayOfObjectsToCSV(array);
        const blob = new Blob([csv], { type: `data:text/csv;charset=utf-8;` });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", "ACME_Data.csv");
        link.click();
    
        // if (!csv.match(/^data:text\/csv/i)) {
        //     csv = `data:text/csv;charset=utf-8~${csv}`;
        // }

    };


    return (
        <Button onClick={() => downloadCSV(props.data)}>Exportar para CSV</Button>
    );

};

const ExportTableCSV = (props) => {
    // console.log(props);
    const exportCSV = useMemo(() => <ButtonCSV data={props.data} />, [props.data]);
    return exportCSV;
};

export default ExportTableCSV;