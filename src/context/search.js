import { useState, useContext, createContext } from "react";


const SearchContext = createContext()
const Searchrovider = ({children}) => {
    const [auth, setAuth] = useState({
        keyword:"",
        result: [],
    });
    

    return(
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}

//Custom Hook
const useSearch = () => useContext(SearchContext);
export {useSearch, Searchrovider};