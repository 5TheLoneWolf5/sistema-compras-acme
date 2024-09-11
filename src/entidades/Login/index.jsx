import { useForm } from "react-hook-form";
import ErrorSection from "../../componentes/ErrorSection";
import { signInWithEmailAndPassword } from "firebase/auth";
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
import ForgotPasswordModal from "../../componentes/Modals/ForgotPasswordModal";
import ButtonModal from "../../componentes/ButtonModal";
import { obtainUsuario } from "../Configuracoes/GerenciaUsuarios/CrudUsuarios";

const iconStyles = {
    
    flex: "1 2 50px", 
    width: "55px",
    height: "fit-content",
    cursor: "pointer",

};

const Login = (props) => {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue, getValues, setError } = useForm();
    const [togglePassword, setTogglePassword] = useState(false);
    const [fbResponse, setFbResponse] = useState("");
    const [activateModal, setActivateModal] = useState(false);
    
    const auth = useContext(AuthContext);

    useEffect(() => {

        auth.setUserAuth({ ...auth.userAuth, route: window.location.pathname });

    }, []);

    const handleLogin = async () => {

        // console.log(props.auth);
        await signInWithEmailAndPassword(props.auth, getValues("email"), getValues("password")).then(
            async (userCredentials) => {
                const user = userCredentials.user;
                const dataUser = await obtainUsuario(user.uid);
                // console.log(userCredentials, user, user.uid);
                // console.log(props.auth);

                auth.setUserAuth((data) => { 
                    return {
                    ...data,
                    ...dataUser,
                    isLogged: true,
                }});

                // console.log(auth);
                props.navigate("/");
            }
        ).catch((e) => {
            // console.log(e);
            // console.log(e.message);
            setFbResponse(<p style={{ color: "#c70000" }}>Erro no login:<br /><strong>{e.message}</strong></p>);
        });

    };

    const handlePassword = () => setTogglePassword(!togglePassword);

    return (
        <div>
            <BackgroundContainer>
                <ContainerFormAuth sizes={props.sizes}>
                    <Icon style={{ border: "1px solid black", borderRadius: "10px", margin: "10px", backgroundColor: "white" }} src="./src/assets/logo.svg" width={80} />
                    <h1>ACME<br /><span style={{ fontSize: "24px" }}>Sistema de Compras</span><hr />Login</h1>
                    <FormAuth onSubmit={handleSubmit(handleLogin)}>
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
                                    message: "A senha de login precisa haver no mínimo 8 caracteres."
                                },
                            })} type={togglePassword ? "text" : "password"}  placeholder="Senha" autoComplete="on" />
                            <Icon src={ togglePassword ? "./src/assets/visible.svg" : "./src/assets/hidden.svg"} style={iconStyles} onClick={handlePassword} />
                        </LabelAuth>
                        <LabelAuth htmlFor="botaoAuth">
                            <input id="botaoAuth" type="submit" value="Logar" />
                        </LabelAuth>
                    </FormAuth>
                    <div>
                        {(errors.email?.message) && (
                            <ErrorSection>{errors.email.message}</ErrorSection>
                        )}
                        {errors.password?.message && (
                            <ErrorSection>{errors.password.message}</ErrorSection>
                        )}
                    </div>
                    <ButtonModal activateModal={activateModal} setActivateModal={setActivateModal}>Esqueci minha senha.</ButtonModal>
                    <TextBlock><Link to="/cadastro">Clique aqui</Link> para cadastrar uma nova conta.</TextBlock>
                    {fbResponse && 
                    <TextBlock>
                        {fbResponse}
                    </TextBlock>
                    }
                </ContainerFormAuth>
            </BackgroundContainer>
            { activateModal &&
                <ForgotPasswordModal activateModal={activateModal} setActivateModal={setActivateModal} auth={props.auth} />
            }
        </div>
    );

};

export default Login;