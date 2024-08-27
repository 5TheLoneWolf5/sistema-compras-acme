import styled from "styled-components";

const Input = styled.input`

    display: block;
    width: 50%;
    padding: 5px;
    margin: 15px auto;
    font-size: 90%;

`;

const Filter = (props) => {

    const handleChange = (e) => props.setFilter(e.target.value);

    return (
        <Input type="text" placeholder={props.placeholder} value={props.filter} onChange={handleChange} />
    );

};

export default Filter;