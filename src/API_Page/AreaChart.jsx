// import { useEffect } from "react";
// import { listRequisicoes } from "../entidades/Requisicoes/CrudRequisicoes";
// import { formatDate } from "../utils/functions";

// const AreaChart = (props) => {

//     useEffect(() => {

//       google.charts.load('current', {'packages':['corechart']});

//       const returnYearFromUnix = (time) => { { return (new Date(formatDate(time)).getFullYear()).toString() } };

//       const drawChart = async () => {

//         const cotacoes = await listRequisicoes();

//         const data = new google.visualization.DataTable();
//         data.addColumn("string", "Ano");
//         data.addColumn("number", "Preço total de Cotações por Ano");

//         const groupedValues = [];
//         // console.log(cotacoes);

//         // console.time("Loop");

//         for (let i = 0; i < cotacoes.length ; i++) {

//           let repeatedDate = false;

//           // Verifying if year has already been counted.

//           // console.log(cotacoes[i].dataCompra + " data");
//           for (let j = 0; j < groupedValues.length ; j++) {
//             // console.log(groupedValues[j].year);
//             if (returnYearFromUnix(cotacoes[i].dataCompra) === groupedValues[j].year) {
//               // console.log(cotacoes[i].dataCompra);
//               repeatedDate = true;
//               break;
//             }
//           }

//           if (repeatedDate) continue;

//           // Compounding the total price for the respective year inside this iteration.

//           let totalYearPrice = 0;

//           for (let j = 0; j < cotacoes.length ; j++) {
//             if (returnYearFromUnix(cotacoes[i].dataCompra) === returnYearFromUnix(cotacoes[j].dataCompra)) {
//               totalYearPrice += cotacoes[j].preco;
//             }
//           }

//           // console.log(totalYearPrice);

//           groupedValues.push({ year: returnYearFromUnix(cotacoes[i].dataCompra), totalPrice: totalYearPrice });

//         };

//         // console.timeEnd("Loop");

//         // const reducedYears = [...new Set(years)];

//         groupedValues.sort((a, b) => +a.year - +b.year);
//         // console.log(groupedValues);

//         for (let i = 0; i < groupedValues.length; i++) {

//           data.addRows([
//             [groupedValues[i].year, groupedValues[i].totalPrice],
//           ]);

//         }

//         const options = {'title':'Preço total de Cotações por Ano',
//                         'hAxis': { title: 'Ano' },
//                         'vAxis': { title: 'Preço' },
//                         'width':599,
//                         'height':300};

//         const chart = new google.visualization.AreaChart(document.getElementById('area_div'));
//         chart.draw(data, options);

//         }

//         google.charts.setOnLoadCallback(drawChart);

//     }, []);

//     return (
//         <>
//           <div id="area_div"></div>
//         </>
//     );

// };

// export default AreaChart;