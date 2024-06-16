import DataTable from "react-data-table-component";

const FormContatos = (props) => {


    const columns = [];

    return (
        <>
            <DataTable 
                columns={columns}
                data={props.data}
                pagination
                paginationPerPage={10}
                dense
                responsivestriped
                selectableRows
                selectableRowsHighlight
                selectableSingle
             />
        </>
    );

};

export default FormContatos;