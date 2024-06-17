import DataTable from "react-data-table-component";

const ListContatos = (props) => {

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
        {
            name: "ID Funcionário",
            selector: row => row.idFuncionario,
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
                responsivestriped
                noDataComponent="Sem dados."
                selectableRows
                selectableRowsHighlight
                selectableSingle
             />
        </>
    );

};

export default ListContatos;