// import { Outlet } from "react-router-dom";
// import Rodape from "../Rodape";
// import Navbar from "../Navbar";
// import Home from "../Home";
// import { useEffect } from "react";

// const Pagina = (props) => {

//     // "Pagina" renders the "/" root and contains all routes as its children. It always renders the header and footer, but it asks if pathname is the root first, before rendering Home. Else, it will render the page.

//     useEffect(() => {

//         props.setPathName(window.location.pathname);

//     }, []);

//     return (
//         <>
//             <div id="header-and-main">
//                 <Navbar sizes={props.sizes} />
//                 {props.pathName === "/" ? <Home /> : null}
//             </div>
//             <Rodape />
//         </>
//     );

// };

// export default Pagina;