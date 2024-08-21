import { useEffect } from "react";
import { listFornecedores } from "../entidades/Fornecedores/CrudFornecedores";
import { listCotacoes } from "../entidades/Cotacoes/CrudCotacao";

const ColumnChart = (props) => {

    useEffect(() => {

      google.charts.load('current', {'packages':['corechart']});

      const drawChart = async () => {

        const cotacoes = await listCotacoes();
        const fornecedores = await listFornecedores();

        const data = new google.visualization.DataTable();
        data.addColumn("string", "Fornecedor");
        data.addColumn("number", "Quantidade de Cotações");

        for (let i = 0; i < fornecedores.length; i++) {

          data.addRows([
            [fornecedores[i].nome, cotacoes.filter(y => y.idFornecedor === fornecedores[i].id).length],
          ]);

        }

        const options = {'title':'Quantidade de Cotações por Fornecedor',
                       'width':599,
                       'height':300};

        const chart = new google.visualization.ColumnChart(document.getElementById('column_div'));
        chart.draw(data, options);

        }

        google.charts.setOnLoadCallback(drawChart);

    }, []);

    return (
        <>
          <div id="column_div"></div>
        </>
    );

};

export default ColumnChart;