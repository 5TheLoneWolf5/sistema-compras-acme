import DataTable from "react-data-table-component";

const ListContatos = (props) => {

    const handleSelected = ({ selectedRows }) => {

        // console.log(props.data);
        const idLastSelected = selectedRows[0]?.id;

        idLastSelected ? props.setSelectedData(idLastSelected) : props.setSelectedData("");
        // console.log(idLastSelected);

    };

    const columns = [
        {
            name: "Nome",
            selector: row => row.nome,
            sortable: true,
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
        },
        {
            name: "Número",
            selector: row => row.numero,
            sortable: true,
        },
        
    ];

    return (
        <>
            <DataTable
                columns={columns}
                data={props.data}
                pagination
                paginationPerPage={10}
                dense
                responsive
                striped
                noDataComponent="Sem dados."
                paginationComponentOptions={{ rowsPerPageText: "Por página: ", rangeSeparatorText: "de" }}
                defaultSortFieldId={1}
                selectableRows
                selectableRowsHighlight
                selectableSingle
                onSelectedRowsChange={handleSelected}
             />
        </>
    );

};

export default ListContatos;