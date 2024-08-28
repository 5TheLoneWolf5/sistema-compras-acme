import styled from "styled-components";
import PieChart from "./PieChart";
import ColumnChart from "./ColumnChart";
// import AreaChart from "./AreaChart";

const Dashboard = styled.div`

    display: flex;
    border: 1px solid black;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;

`;

const AppAPI = (props) => {

    return (
        <div>
          <h1>Dashboard</h1>
          <p>Analise os dados do negócio!</p>
          <p><a href="/">Clique aqui</a> para acessar a página inicial.</p>
          <Dashboard>
            <PieChart />
            <ColumnChart />
            {/* <AreaChart /> */}
          </Dashboard>
        </div>
    );

};

export default AppAPI;