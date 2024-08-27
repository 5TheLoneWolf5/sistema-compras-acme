import { useForm } from "react-hook-form";
import ErrorSection from "../../componentes/ErrorSection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Icon from "../../componentes/Icon";
import { useContext, useEffect, useState } from "react";
import { regexEmail } from "../../utils/regex";
import AuthContext from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import BackgroundContainer from "../../componentes/BackgroundContainer";
import TextBlock from "../../componentes/TextBlock";
import FormAuth from "../../componentes/FormAuth";
import ContainerFormAuth from "../../componentes/ContainerFormAuth";
import LabelAuth from "../../componentes/LabelAuth";
import { doc, setDoc } from "firebase/firestore";

const iconStyles = {
    
    flex: "1 2 50px", 
    width: "55px",
    height: "fit-content",
    cursor: "pointer",

};

const Cadastro = (props) => {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue, getValues, setError } = useForm();
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
    const [fbResponse, setFbResponse] = useState("");

    const auth = useContext(AuthContext);

    useEffect(() => {

        auth.setUserAuth({ ...auth.userAuth, route: window.location.pathname });

    }, []);

    const handleCreate = async () => {

        // console.log(props.auth);

        let user;

        await createUserWithEmailAndPassword(props.auth, getValues("email"), getValues("password")).then(
            (userCredentials) => {
                user = userCredentials.user;
                // console.log(userCredentials, user);
                // console.log(props.auth);
                setFbResponse(<p style={{ color: "#12b000" }}>Email <strong>{user.email}</strong> cadastrado com sucesso!</p>);
                reset();
                setTimeout(() => setFbResponse(""), 10000);
            }
        ).catch((e) => {
            // console.log(e);
            // console.log(e.message);
            setFbResponse(<p style={{ color: "#c70000" }}>Erro nos dados enviados para o servidor:<br /><strong>{e.message}</strong></p>);
        });

        // console.log(user);
        await setDoc(doc(props.db, "roles", user.uid), {
            email: user.email,
            role: "user",
        })
        .catch((e) => {
            console.log(`Error when granting user role: ${e.message}.`);
        });

    };

    const handlePassword = () => setTogglePassword(!togglePassword);
    const handleConfirmPassword = () => setToggleConfirmPassword(!toggleConfirmPassword);

    return (
        <BackgroundContainer>
            <ContainerFormAuth sizes={props.sizes}>
                <Icon style={{ border: "1px solid black", borderRadius: "10px", margin: "10px", backgroundColor: "white" }} src="./src/assets/logo.svg" width={80} />
                <h1>ACME<hr />Cadastro</h1>
                <FormAuth onSubmit={handleSubmit(handleCreate)}>
                    <LabelAuth htmlFor="email">
                        <input {...register("email", {
                            require: "É necessário digitar o email.",
                            validate: (value, formValues) => regexEmail.test(value) || "Este email é inválido.",
                        })} placeholder="Email" />
                    <Icon src="./src/assets/email.svg" style={{ ...iconStyles, height: "50px", cursor: "inherit" }} />
                    </LabelAuth>
                    <LabelAuth htmlFor="password">
                        <input {...register("password", {
                            require: "É necessário digitar a senha.",
                            minLength: {
                                value: 8,
                                message: "A senha precisa ter no mínimo 8 caracteres."
                            },
                        })} type={togglePassword ? "text" : "password"}  placeholder="Senha" />
                        <Icon src={ togglePassword ? "./src/assets/visible.svg" : "./src/assets/hidden.svg"} style={iconStyles} onClick={handlePassword} />
                    </LabelAuth>
                    <LabelAuth htmlFor="confirmPassword">
                        <input {...register("confirmPassword", {
                            require: "É necessário confirmar a senha.",
                            validate: (value) => value === getValues("password") || "Senhas devem ser as mesmas.",
                        })} type={toggleConfirmPassword ? "text" : "password"} placeholder="Confirmar Senha"
                    />
                    <Icon src={ toggleConfirmPassword ? "./src/assets/visible.svg" : "./src/assets/hidden.svg"} style={iconStyles} onClick={handleConfirmPassword} />
                    </LabelAuth>
                    <LabelAuth htmlFor="botaoAuth">
                        <input id="botaoAuth" type="submit" value="Cadastrar Conta" />
                    </LabelAuth>
                </FormAuth>
                <div>
                    {(errors.email?.message) && (
                        <ErrorSection>{errors.email.message}</ErrorSection>
                    )}
                    {errors.password?.message && (
                        <ErrorSection>{errors.password.message}</ErrorSection>
                    )}
                    {errors.confirmPassword?.message && (
                        <ErrorSection>{errors.confirmPassword.message}</ErrorSection>
                    )}
                </div>
                <TextBlock><Link to="/login">Clique aqui</Link> para se logar.</TextBlock>
                {fbResponse && <TextBlock> { /* style={{ WebkitTextStroke: "1px #000000", fontWeight: "bolder" }} */ }
                    {fbResponse}
                </TextBlock>
                }
            </ContainerFormAuth>
        </BackgroundContainer>
    );

};

export default Cadastro;