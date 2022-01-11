# REACT TUTORIAL 2. Coin Tracker

Nomad coder의 React 두번째 튜토리얼입니다.   

### 주요 내용
* API Fetch   
이번엔 useEffect를 사용해서 Component가 처음 로딩될 때 API call하는 법이 주 내용이었다.
```
//only one
  useEffect(()=>{
    fetch('https://api.coinpaprika.com/v1/tickers').then((res)=>res.json())
      .then((json)=>{
        setCoins(json);
        setSelectCoin(json[0]);
        setSelectCoinIndex(0);
        setLoading(false);
      });
  },[]);
```
fetch함수는 첫 번째 인자로 URL, 두 번째 인자로 option을 받고, Promise 객체를 반환하게 된다. resolve로 Response, reject로 error를 준다.   
데이터인 Response Object에 대해서 json 메소드는 resolve로 json객체를 반환하기에 위처럼 두개의 then절을 이용하였다.   
한번 이 부분을 await하도록 수정도 해보았다.
```
//only one
  useEffect(async ()=>{
    let data = await fetch('https://api.coinpaprika.com/v1/tickers');
    data = await data.json();
    //await를 통해 resolve를 그대로 받아버리기.
    setCoins(data);
  },[]);
```

* Challenge   
노마드 아저씨는 첼린지 항목으로 코인을 설정하고 USD를 입력받으면 이게 몇 개의 코인을 의미하는지 알려주는 기능을 만들어보라고 하였다. 이 부분에 3개의 state를 만들었는데 다음과 같다.   
```
1. selectCoinIndex : 선택한 코인의 인덱스
2. selectCoin : 선택한 코인 정보
3. usd : 입력한 USD
```
선택한 코인의 인덱스와 정보를 나눈 이유는, 처음엔 코인 정보 자체를 select의 value로 두었지만, [Object Object]로 정보가 되어버려서 인덱스를 받고 그걸 통해 데이터를 가져오도록 했기 떄문이다.