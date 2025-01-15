import { useState, useEffect } from "react";
import { fetchExcelData } from "../Utils/fetchExcelData";

const useFetchExcelData = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchExcelData(url);
      setData(result);
    };
    loadData();
  }, [url]);

  return data;
};

export default useFetchExcelData;
