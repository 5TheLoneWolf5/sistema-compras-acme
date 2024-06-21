import { useRef } from "react";
import DataTable from "react-data-table-component";

const ListFornecedores = (props) => {

    const onlyLastSelected = useRef({});
    const undesiredData = useRef({});

    const handleSelected = ({ selectedRows }) => {

        if (selectedRows.length > 1) {
            onlyLastSelected.current = selectedRows[0];
            undesiredData.current = selectedRows[1];
            selectedRows = new Array(onlyLastSelected.current);
        }

        props.setSelectedNome(selectedRows[0]?.nome);
        
        if (Object.hasOwn(undesiredData.current, "id") && (undesiredData.current?.id === selectedRows[0]?.id) && props.actionDelete) {
            
            console.log("Undesired data is lurking around. Changing the code flow so past selected data doesn't get in the mix. React Data Table issue: deleted data doesn't get unselected and lurks around.");
            props.setSelectedData("");

        } else {

            const idLastSelected = selectedRows[0]?.id;

            idLastSelected ? props.setSelectedData(idLastSelected) : props.setSelectedData("");

        }

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
                onSelectedRowsChange={handleSelected}
                className="dataTable"
             />
        </>
    );

};

export default ListFornecedores;