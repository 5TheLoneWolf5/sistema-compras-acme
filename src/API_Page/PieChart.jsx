import { useEffect } from "react";
import { listContatos } from "../entidades/Contatos/CrudContatos";
import { listFornecedores } from "../entidades/Fornecedores/CrudFornecedores";

const PieChart = (props) => {

    useEffect(() => {


      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
        const drawChart = async () => {

        const contatos = await listContatos();
        const fornecedores = await listFornecedores();
        

        // Create the data table.
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Fornecedor');
        data.addColumn('number', 'Quantidade de Contatos');

        for (let i = 0; i < fornecedores.length; i++) {

          data.addRows([
            [fornecedores[i].nome, contatos.filter(y => y.idFornecedor === fornecedores[i].id).length],
          ]);

        }

        // Set chart options
        const options = {'title':'Quantidade de Contatos por Fornecedor',
                       'width':500,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        const chart = new google.visualization.PieChart(document.getElementById('pie_div'));
        chart.draw(data, options);

        }

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

    }, []);

    return (
        <>
          <div id="pie_div"></div>
        </>
    );

};

export default PieChart;