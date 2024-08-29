import styled from "styled-components";

const CrudButtonsElements = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    & > label {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }

    & > label > input {
        flex: 0.9 1 auto;
        cursor: pointer;
    }

    & > label > img {
        width: 30px;
    }
`;

const CrudButtons = (props) => {
    
    return (
        <CrudButtonsElements>
            <label>
                <input type="submit" value="Criar" size={100} />
                <img src="./src/assets/add.svg" title="Criar" />
            </label>
            <label>
                <input type="button" value="Editar" onClick={props.functionedit}/>
                <img src="./src/assets/edit.svg" title="Editar" />
            </label>
            <label>
                <input type="button" value="Remover" onClick={props.functionremove} />
                <img src="./src/assets/remove.svg" title="Remover" />
            </label>
        </CrudButtonsElements>
    );

};

export default CrudButtons;