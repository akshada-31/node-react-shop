import Footer from "./Footer";
import Navbar from "./Navbar";
import React from "react";

 

const Layout=({children})=>{
    return(
        <>
        <Navbar/>
        <main>{children}</main>
        <Footer/>

        </>
    );
};

export default Layout;