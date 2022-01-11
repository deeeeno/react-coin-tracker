import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';

function App() {
  const [loading,setLoading] = useState(true);
  const [coins,setCoins] = useState([]);
  const [selectCoinIndex,setSelectCoinIndex] = useState(0);
  const [selectCoin,setSelectCoin] = useState({});
  const [usd,setUsd] = useState(0);

  const onCoinChange = (event)=>{
    setSelectCoinIndex(event.target.value);
    setSelectCoin(coins[event.target.value]);
  };

  const onUsdChange = (event)=>{
    setUsd(event.target.value);
  }
  //only one
  useEffect(()=>{
    /* using await
    let data = await fetch('https://api.coinpaprika.com/v1/tickers');
    data = await data.json();
    console.log(data);
    setCoins(data);
    */
    fetch('https://api.coinpaprika.com/v1/tickers').then((res)=>res.json())
      .then((json)=>{
        setCoins(json);
        setSelectCoin(json[0]);
        setSelectCoinIndex(0);
        setLoading(false);
      });
  },[]);

  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ?
        <strong>Loading.....</strong>
        : <div>
        <select value={selectCoinIndex} onChange={onCoinChange}>
          {
            coins.map((ele,idx)=>{
              return <option key={idx} value={idx}>{ele.name} ({ele.symbol}) : ${ele.quotes.USD.price}</option>
            })
          }
        </select><br></br>
        <strong>USD</strong><input value={usd} onChange={onUsdChange}/>
        <strong>{selectCoin.name} : {usd/selectCoin.quotes.USD.price} {selectCoin.symbol}</strong>
      </div>}
    </div>
  );
}

export default App;
