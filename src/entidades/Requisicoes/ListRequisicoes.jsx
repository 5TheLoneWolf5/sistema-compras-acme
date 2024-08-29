import DataTable from "react-data-table-component";
import { formatDate } from "../../utils/functions";
import Cotacoes from "./Cotacoes";
import { useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import ExportTableCSV from "../../componentes/ExportTableCSV";

const ListRequisicoes = (props) => {

    const reqNoQuo = () => {

        const noQuo = structuredClone(props.data);
        // console.log(noQuo);

        for (let i in noQuo) {
            delete noQuo[i].cotacoes;
            noQuo[i].dataAbertura = formatDate(noQuo[i].dataAbertura); 
        }

        return noQuo;

    };

    const [activateModal, setActivateModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const memoReqNoQuo = useMemo(reqNoQuo, [props.data]);

    const auth = useContext(AuthContext);

    // useEffect(() => console.log(memoReqNoQuo));

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

        }
        
        // console.log(idLastSelected);

        const idLastSelected = selectedRows[0]?.id;

        if (idLastSelected) {
            props.setSelectedData(idLastSelected)
        } else {
            props.setSelectedData("");
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
                actions={<ExportTableCSV data={memoReqNoQuo} />}
             />
             {activateModal && <Cotacoes data={selectedRow} activateModal={activateModal} setActivateModal={setActivateModal} sizes={props.sizes} setSelectedRow={setSelectedRow} selectedRow={selectedRow} />}
        </>
    );

};

export default ListRequisicoes;