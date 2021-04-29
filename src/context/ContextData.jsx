import {createContext, useState, useEffect} from "react";

export const DataContext = createContext();





export const DataProvider = ({ children }) => {
       
    const [data, setData]= useState([]);
    useEffect( ()=> {
        
        const API = "http://localhost:8000";
        const getUsers = async () => {
            console.log(API);
            const res = await fetch(`${API}/api/users`);
            const datainicial = await res.json();
            setData(datainicial)
        };
        getUsers();
    },[]);
    
    return(
        <DataContext.Provider value={{
            data,
            setData
        }} >
            { children }
        </DataContext.Provider>
    )
}