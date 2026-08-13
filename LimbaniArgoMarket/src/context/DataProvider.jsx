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
    const [loadingUser, setLoadingUser] = useState(true);

    const fetchUserProfile = async (userId) => {
        if (!userId) return null;
        try {
            const res = await axios.post(`${API_URL}/api/user/get-profile`, { id: userId });
            if (res.data) {
                const mergedUser = {
                    ...res.data,
                    id: res.data._id || userId
                };
                setUserData(mergedUser);
                localStorage.setItem("user", JSON.stringify(mergedUser));
                return mergedUser;
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
        return null;
    };

    const login = (user, authToken) => {
        localStorage.setItem("user", JSON.stringify(user));
        if (authToken) localStorage.setItem("token", authToken);
        setUserData(user);
        if (authToken) setToken(authToken);
        setRole(user?.role || null);
        setIsLoggedIn(true);

        const uId = user?._id || user?.id;
        if (uId) {
            fetchUserProfile(uId);
        }
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
            return res.data?.products || (Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    //all dealer data
    const getAllDealer = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/user/get-all-dealer`);
            return res.data;
        } catch (error) {
            console.log("Error fetching dealers:", error);
            return [];
        }
    };

    //all product data
    const getAllProduct = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/product/get-all-product`);
            return res.data?.products || (Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    //get product by category data
    const getProductByCategory = async (category) => {
        try {
            const res = await axios.get(`${API_URL}/api/product/get-product-by-category/${category}`);
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

                const uId = parsedUser._id || parsedUser.id;
                if (uId) {
                    fetchUserProfile(uId).finally(() => setLoadingUser(false));
                } else {
                    setLoadingUser(false);
                }
            } catch (e) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setLoadingUser(false);
            }
        } else {
            setToken(null);
            setUserData(null);
            setRole(null);
            setIsLoggedIn(false);
            setLoadingUser(false);
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
        loadingUser,
        fetchUserProfile,
        login,
        logout,
        getAllEquipment,
        getAllDealer,
        getAllProduct,
        getProductByCategory,
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