import { useEffect } from "react";
import { listFornecedores } from "../entidades/Fornecedores/CrudFornecedores";
import { listCotacoes } from "../entidades/Cotacoes/CrudCotacao";
import { formatDate } from "../utils/functions";

const AreaChart = (props) => {

    useEffect(() => {

      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.

      const returnYearFromUnix = (time) => { { return (new Date(formatDate(time)).getFullYear()).toString() } };

      const drawChart = async () => {

        const cotacoes = await listCotacoes();

        // Create the data table.
        const data = new google.visualization.DataTable();
        data.addColumn("string", "Ano");
        data.addColumn("number", "Preço total de Cotações por Ano");

        const groupedValues = [];
        // console.log(cotacoes);

        for (let i = 0; i < cotacoes.length ; i++) {

          let repeatedDate = false;

          // console.log(cotacoes[i].dataCompra + " data");
          for (let j = 0; j < groupedValues.length ; j++) {
            // console.log(groupedValues[j].year);
            if (returnYearFromUnix(cotacoes[i].dataCompra) === groupedValues[j].year) {
              // console.log(cotacoes[i].dataCompra);
              repeatedDate = true;
            }
          }

          if (repeatedDate) continue;

          groupedValues.push({ year: returnYearFromUnix(cotacoes[i].dataCompra), totalPrice: cotacoes[i].preco });

        };

        // const reducedYears = [...new Set(years)];

        groupedValues.sort((a, b) => +a.year - +b.year);
        console.log(groupedValues);

        for (let i = 0; i < groupedValues.length; i++) {

          data.addRows([
            [groupedValues[i].year, groupedValues[i].totalPrice],
          ]);

        }

        // Set chart options
        const options = {'title':'Preço total de Cotações por Ano',
                        'hAxis': { title: 'Ano' },
                        'vAxis': { title: 'Preço' },
                        'width':599,
                        'height':300};

        // Instantiate and draw our chart, passing in some options.
        const chart = new google.visualization.AreaChart(document.getElementById('area_div'));
        chart.draw(data, options);

        }

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

    }, []);

    return (
        <>
          <div id="area_div"></div>
        </>
    );

};

export default AreaChart;