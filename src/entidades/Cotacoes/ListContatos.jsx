import { useRef } from "react";
import DataTable from "react-data-table-component";

const ListContatos = (props) => {

    const onlyLastSelected = useRef({});
    const undesiredData = useRef({});

    const handleSelected = ({ selectedRows }) => {

        // // console.log(props.data);

        // console.log(selectedRows);

        if (selectedRows.length > 1) {
            onlyLastSelected.current = selectedRows[0];
            undesiredData.current = selectedRows[1];
            selectedRows = new Array(onlyLastSelected.current);
        }
        
        if (Object.hasOwn(undesiredData.current, "id") && (undesiredData.current?.id === selectedRows[0]?.id) && props.actionDelete) { // Edge cases for when every row is unselected and stale data is not deleted from the object. Checking if it is filled first.
            

            console.log("Undesired data is lurking around. Changing the code flow so past selected data doesn't get in the mix. React Data Table issue: deleted data doesn't get unselected and lurks around.");
            props.setSelectedData("");

        } else {

            // console.log("Undesired data: " + undesiredData.current);

            // console.log(selectedRows[0]?.id);

            const idLastSelected = selectedRows[0]?.id;

            idLastSelected ? props.setSelectedData(idLastSelected) : props.setSelectedData("");

            // console.log(idLastSelected);

        }

    };

    // Also indirectly related to Fornecedor.

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
            name: "Preço",
            selector: row => row.preco,
            sortable: true,
        },
        {
            name: "Data da Compra",
            selector: row => row.dataCompra,
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