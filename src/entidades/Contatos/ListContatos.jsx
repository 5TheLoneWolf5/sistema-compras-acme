import DataTable from "react-data-table-component";
import ExportTableCSV from "../../componentes/ExportTableCSV";

const ListContatos = (props) => {

    const handleSelected = ({ selectedRows }) => {

        // if (props.toggledClearRows) {
        //     props.setToggleClearRows(false);
        // }

        // console.log(props.data);

        if (selectedRows?.length > 0) { 
            
            window.scrollTo(0, 0);

         }

        // console.log(idLastSelected);

        const idLastSelected = selectedRows[0]?.id;

        idLastSelected ? props.setSelectedData(idLastSelected) : props.setSelectedData("");

    };

    // Data getting sent as string in program.

    const columns = [
        {
            name: "Nome da Empresa",
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
                // dense
                responsive
                striped
                noDataComponent="Sem dados."
                paginationComponentOptions={{ rowsPerPageText: "Por página: ", rangeSeparatorText: "de" }}
                defaultSortFieldId={1}
                selectableRows
                selectableRowsHighlight
                selectableSingle
                selectableRowsSingle
                clearSelectedRows={props.selectedRow}
                onSelectedRowsChange={handleSelected}
                actions={<ExportTableCSV data={props.data} />}
             />
        </>
    );

};

export default ListContatos;