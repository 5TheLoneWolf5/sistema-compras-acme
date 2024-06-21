import { useRef } from "react";
import DataTable from "react-data-table-component";

const ListContatos = (props) => {

    const onlyLastSelected = useRef({});
    const undesiredData = useRef({});

    const handleSelected = ({ selectedRows }) => {

        // // console.log(props.data);

        // console.log(selectedRows);

        if (selectedRows.length > 1) {
            onlyLastSelected.current = selectedRows[0]; // Data is unshifted to the array, not pushed, so latest value is the first one.
            undesiredData.current = selectedRows[1];
            // console.log(selectedRows[0]);
            // console.log("Selected undesired data: " + selectedRows[1]);
            selectedRows = new Array(onlyLastSelected.current); // I can't use state here, because the code needs to wait for the render.
        }

        // console.log(onlyLastSelected.current.nome, undesiredData.current.nome, selectedRows[0]?.nome, selectedRows.length);
        // console.log(Object.hasOwn(undesiredData.current, "id"));
        
        if (Object.hasOwn(undesiredData.current, "id") && (undesiredData.current?.id === selectedRows[0]?.id) && props.actionDelete) { // Edge cases for when every row is unselected and stale data is not deleted from the object. Checking if it is filled first.
            
            // Object.hasOwn(undesiredData.current, "id") may not be needed.

            console.log("Undesired data is lurking around. Changing the code flow so past selected data doesn't get in the mix. React Data Table issue: deleted data doesn't get unselected and lurks around.");
            props.setSelectedData(""); // In case there's data still selected.

        } else {

            // console.log("Undesired data: " + undesiredData.current);

            // console.log(selectedRows[0]?.id);

            const idLastSelected = selectedRows[0]?.id;

            idLastSelected ? props.setSelectedData(idLastSelected) : props.setSelectedData("");

            // console.log(idLastSelected);

        }

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
                selectableRowsSingle
                clearSelectedRows={props.toggledClearRows}
                selectableSingle
                onSelectedRowsChange={handleSelected}
             />
        </>
    );

};

export default ListContatos;