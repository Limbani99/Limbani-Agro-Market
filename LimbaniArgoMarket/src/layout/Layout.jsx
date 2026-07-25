import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"
import SellEquipmentModal from "../components/SellEquipmentModal";

const Layout = () => {
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);

    return (
        <>
            <Navbar onOpenSellModal={() => setIsSellModalOpen(true)} />
            <Outlet context={{ openSellModal: () => setIsSellModalOpen(true) }} />
            <Footer />
            <SellEquipmentModal 
                isOpen={isSellModalOpen} 
                onClose={() => setIsSellModalOpen(false)} 
            />
        </>
    )
}

export default Layout
