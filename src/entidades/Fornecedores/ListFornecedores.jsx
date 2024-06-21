import DataTable from "react-data-table-component";

const ListFornecedores = (props) => {

    const handleSelected = ({ selectedRows }) => {

        props.setSelectedNome(selectedRows[0]?.nome);

        const idLastSelected = selectedRows[0]?.id;

        idLastSelected ? props.setSelectedData(idLastSelected) : props.setSelectedData("");

    };

    const columns = [
        {
            name: "Empresa",
            selector: row => row.nome,
            sortable: true,
        },
        {
            name: "Nome da Pessoa",
            selector: row => row.nomePessoa,
            sortable: true,
        },
        {
            name: "Setor",
            selector: row => row.setor,
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