import { useEffect } from "react";
import { listFornecedores } from "../entidades/Fornecedores/CrudFornecedores";
import { listRequisicoes } from "../entidades/Requisicoes/CrudRequisicoes";

const ColumnChart = (props) => {

    useEffect(() => {

      google.charts.load('current', {'packages':['corechart']});

      const drawChart = async () => {

        const requisicoes = await listRequisicoes();
        const fornecedores = await listFornecedores();
        // console.log(requisicoes);

        const data = new google.visualization.DataTable();
        data.addColumn("string", "Fornecedor");
        data.addColumn("number", "Quantidade de Cotações");

        for (let i = 0; i < fornecedores.length; i++) {

          let tempArray = [];

          for (let j = 0; j < requisicoes.length; j++) {

            if (requisicoes[j]?.cotacoes.length > 0) {
                tempArray.push(...requisicoes[j].cotacoes.filter(y => y.idFornecedor === fornecedores[i].id));
            }

          }

          data.addRows([[fornecedores[i].nome, tempArray.length]]);

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