import { useState, useEffect } from "react";

const useDataFilter = (data, filters) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filterData = () => {
      return data.filter((item) => {
        return (
          (!filters.state || item.State === filters.state) &&
          (!filters.year || item["Model Year"] === parseInt(filters.year)) &&
          (!filters.make || item.Make === filters.make) &&
          (!filters.model || item.Model === filters.model) &&
          (!filters.range || item["Electric Range"] >= parseInt(filters.range))
        );
      });
    };

    setFilteredData(filterData());
  }, [data, filters]);

  return filteredData;
};

export default useDataFilter;
