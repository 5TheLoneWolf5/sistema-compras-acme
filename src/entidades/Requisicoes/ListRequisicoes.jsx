import DataTable from "react-data-table-component";
import { formatDate } from "../../utils/functions";
import Cotacoes from "./Cotacoes";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

const ListRequisicoes = (props) => {

    const [activateModal, setActivateModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const possibleStatus = ["Aberta", "Em Cotação", "Cotada"];

    const auth = useContext(AuthContext);

    useEffect(() => {

        if (!activateModal && selectedRow) {
            // console.log(JSON.stringify(selectedRow));
            props.setSelectedData(JSON.stringify(selectedRow)); // If selectedRow is changed, data will be once again be fetched, and table outside will get updated.
        }

    }, [activateModal]);

    const handleSelected = ({ selectedRows }) => {

        // if (props.toggledClearRows) {
        //     props.setToggleClearRows(false);
        // }

        // console.log(props.data);

        if (selectedRows?.length > 0) { 

            window.scrollTo(0, 0);
            props.setSelectedStatus(() => {
                let tempArray = [possibleStatus[0]];

                if (selectedRows[0].cotacoes.length >= 1) {
                    tempArray.push(possibleStatus[1]);
                }

                if (selectedRows[0].cotacoes.length === 3) {
                    tempArray.push(possibleStatus[2]);
                }

                return tempArray;
            });

         }
        
        // console.log(idLastSelected);

        const idLastSelected = selectedRows[0]?.id;

        if (idLastSelected) {
            props.setSelectedData(idLastSelected)
        } else {
            props.setSelectedData("");
            props.setSelectedStatus([])
        }

    };

    const handleCotacoes = (row, event) => {
        // console.log(event);
        // console.log(row);
        setActivateModal(true);
        setSelectedRow(row);
    };

    const columns = [
        {
            name: "Data de Abertura",
            selector: row => formatDate(row.dataAbertura),
            sortable: true,
        },
        {
            name: "Requisição",
            selector: row => row.requisicao,
            sortable: true,
        },
        {
            name: "Justificativa",
            selector: row => row.justificativa,
            sortable: true,
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true,
        },
        
    ];

    if (auth.userAuth.role === "admin") {
        columns.splice(1, 0, {
            name: "Usuário",
            selector: row => row.emailUsuario,
            sortable: true,
        });
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={props.data}
                pagination
                paginationPerPage={10}
                // dense
                responsive
                highlightOnHover
                pointerOnHover
                striped
                noDataComponent="Sem dados."
                onRowClicked={handleCotacoes}
                paginationComponentOptions={{ rowsPerPageText: "Por página: ", rangeSeparatorText: "de" }}
                defaultSortFieldId={1}
                selectableRows
                selectableRowsHighlight
                selectableSingle
                selectableRowsSingle
                clearSelectedRows={props.selectedRow}
                onSelectedRowsChange={handleSelected}
             />
             {activateModal && <Cotacoes data={selectedRow} activateModal={activateModal} setActivateModal={setActivateModal} sizes={props.sizes} setSelectedRow={setSelectedRow} selectedRow={selectedRow} />}
        </>
    );

};

export default ListRequisicoes;