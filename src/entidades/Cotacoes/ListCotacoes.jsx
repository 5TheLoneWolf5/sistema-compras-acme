import DataTable from "react-data-table-component";
import { formatDate } from "../../utils/functions";

const ListCotacoes = (props) => {

    const handleSelected = ({ selectedRows }) => {

        // if (props.toggledClearRows) {
        //     props.setToggleClearRows(false);
        // }

        // console.log(props.data);
        const idLastSelected = selectedRows[0]?.id;

        idLastSelected ? props.setSelectedData(idLastSelected) : props.setSelectedData("");
        // console.log(idLastSelected);

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
            name: "Preço",
            selector: row => row.preco,
            sortable: true,
        },
        {
            name: "Data da Compra",
            selector: row => formatDate(row.dataCompra),
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
                clearSelectedRows={props.toggledClearRows}
                onSelectedRowsChange={handleSelected}
             />
        </>
    );

};

export default ListCotacoes;