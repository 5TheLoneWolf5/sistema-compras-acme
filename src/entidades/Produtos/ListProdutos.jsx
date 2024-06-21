import DataTable from "react-data-table-component";

const ListFornecedores = (props) => {

    const handleSelected = ({ selectedRows }) => {

        props.setSelectedNome(selectedRows[0]?.nome);

        const idLastSelected = selectedRows[0]?.id;

        idLastSelected ? props.setSelectedData(idLastSelected) : props.setSelectedData("");

    };

    const columns = [
        {
            name: "Produto",
            selector: row => row.produto,
            sortable: true,
        },
        {
            name: "Fornecedor",
            selector: row => row.fornecedor,
            sortable: true,
        },
        {
            name: "Descrição",
            selector: row => row.descricao,
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
                selectableRowsSingle
                clearSelectedRows={props.toggledClearRows}
                onSelectedRowsChange={handleSelected}
                className="dataTable"
             />
        </>
    );

};

export default ListFornecedores;