import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Data = createContext();

export const DataProvider = ({ children }) => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'https://limbani-agro-market.onrender.com';
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (user, authToken) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", authToken);
        setUserData(user);
        setToken(authToken);
        setRole(user?.role || null);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUserData(null);
        setToken(null);
        setRole(null);
        setIsLoggedIn(false);
        navigate("/");
    };
    //all equipment data
    const getAllEquipment = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/product/get-all-product`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    //all dealer data
    const getAllDealer = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/dealer`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    //all category data
    const allCategory = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/category`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setToken(storedToken);
                setUserData(parsedUser);
                setRole(parsedUser.role || null);
                setIsLoggedIn(true);
            } catch (e) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        } else {
            setToken(null);
            setUserData(null);
            setRole(null);
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            (config) => {
                const storedToken = localStorage.getItem("token");
                if (storedToken) config.headers["Authorization"] = `Bearer ${storedToken}`;
                return config;
            },
            (error) => Promise.reject(error),
        );
        return () => axios.interceptors.request.eject(interceptor);
    }, []);

    const value = {
        role,
        isLoggedIn,
        userData,
        token,
        login,
        logout,
        getAllEquipment,
        getAllDealer,
        allCategory,
    };

    return (
        <Data.Provider value={value}>
            {children}
        </Data.Provider>
    );
};

export const useData = () => {
    const context = useContext(Data);
    if (!context) return {};
    return context;
};

export const UseData = useData;