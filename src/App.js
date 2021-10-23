import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  let [dataList, setDataList] = useState([]);
  let [filter, setFilter] = useState(false);
  let [filterList, setFilterList] = useState([]);
  let [icon,setIcon] = useState(false);

  //Fetch data from api on first render
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => setDataList(json))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Setting filter value
  function openDropDown(){
    let x = document.getElementById("optionbox").style.display;
    (x === "block")?document.getElementById("optionbox").style.display = "none":document.getElementById("optionbox").style.display = "block";
    if(x==="block"){
      setIcon(false)
    }else{
      setIcon(true)
    }
  }
    let filterresults = (e) => {
    document.getElementById("optionbox").style.display = "block";
    let input = e.target.value;
    let filterList = dataList.filter((data)=>data.title.includes(input));
    setFilterList(filterList);
    setFilter(true);
    if(input!== ""){
      setFilter(true);
    }else{
      setFilter(false);
    }
  }

  //Setting value in input box 
  function setItemValue(val){
    document.getElementById("inputbox").value= val;
    document.getElementById("optionbox").style.display = "none";
    setIcon(false);
  }

  return (
    <>
      <h4>TITLE </h4>
      <input
        type="text"
        onChange={filterresults}
        placeholder="Choose..."
        onClick={openDropDown}
        className="inputbox"
        id="inputbox"
      />
      <span className="dropdown">
        {!icon ? (
          <i className="bi bi-chevron-down"></i>
        ) : (
          <i className="bi bi-chevron-up"></i>
        )}
      </span>
      <div className="optionbox" id="optionbox">
        <ul className="resultList">
          {filter?filterList.map((data) => {
            return (
              <li value={data.title} key={data.id} className="lisitem" onClick={()=>setItemValue(data.title)}>
                {data.title}
              </li>
            );
          }):dataList.map((data) => {
            return (
              <li value={data.title} key={data.id} className="lisitem" onClick={()=>setItemValue(data.title)}>
                {data.title}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
