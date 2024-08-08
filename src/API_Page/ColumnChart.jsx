import { useEffect } from "react";
import { listFornecedores } from "../entidades/Fornecedores/CrudFornecedores";
import { listCotacoes } from "../entidades/Cotacoes/CrudCotacao";

const ColumnChart = (props) => {

    useEffect(() => {

      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      const drawChart = async () => {

        const cotacoes = await listCotacoes();
        const fornecedores = await listFornecedores();

        // Create the data table.
        const data = new google.visualization.DataTable();
        data.addColumn("string", "Fornecedor");
        data.addColumn("number", "Quantidade de Cotações");

        for (let i = 0; i < fornecedores.length; i++) {

          data.addRows([
            [fornecedores[i].nome, cotacoes.filter(y => y.idFornecedor === fornecedores[i].id).length],
          ]);

        }

        // Set chart options
        const options = {'title':'Quantidade de Cotações por Fornecedor',
                       'width':599,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        const chart = new google.visualization.ColumnChart(document.getElementById('column_div'));
        chart.draw(data, options);

        }

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

    }, []);

    return (
        <>
          <div id="column_div"></div>
        </>
    );

};

export default ColumnChart;