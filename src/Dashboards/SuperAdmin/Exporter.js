const Exporter = ({ jsonData, fileName }) => {
    const exportToCsv = () => {
      const csvContent = convertJsonToCsv(jsonData);
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}`.csv);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    const convertJsonToCsv = (jsonData) => {
      if (jsonData.length === 0) return "";
  
      const keys = Object.keys(jsonData[0]);
      const csvContent = [
        keys.join(","),
        ...jsonData.map((row) =>
          keys.map((key) => JSON.stringify(row[key])).join(",")
        ),
      ].join("\n");
  
      return csvContent;
    };
  
    return <button className="bg-red-700 rounded-md px-2 py-2 text-white mt-2" onClick={exportToCsv}>Export to CSV</button>;
  };
  
  export default Exporter;