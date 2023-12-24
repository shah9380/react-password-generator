import { useState, useEffect } from "react";

const Main = () => {
  const obj = {
    upperCase: {
      min: 65,
      max: 90,
    },
    lowerCase: {
      min: 97,
      max: 122,
    },
    symbols: {
      min: 33,
      max: 47,
    },
    numbers: {
      min: 48,
      max: 57,
    },
  };
  let [passwordArray,setPasswordArray] = useState([]);
  function asciiToChar(asciiValue) {
    return String.fromCharCode(asciiValue);
  }
  const getRandomAscii = (min, max) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
  };

  const getRandomChar = (category) => {
    return asciiToChar(getRandomAscii(obj[category].min, obj[category].max));
  };

//   const number1 = getRandomChar("numbers");
//   const symbol1 = getRandomChar("symbols");
//   const upper1 = getRandomChar("upperCase");
//   const lower1 = getRandomChar("lowerCase");
//   passwordArray.push(number1);
//   passwordArray.push(symbol1);
//   passwordArray.push(upper1);
//   passwordArray.push(lower1);

  let [isUpperChecked, setUpperChecked] = useState(false);
  let [isLowerChecked, setLowerChecked] = useState(false);
  let [isNumberChecked, setNumberChecked] = useState(false);
  let [isSymbolChecked, setSymbolChecked] = useState(false);

  let [passKey, setPassKey] = useState([]);

  let[compo,setCompo]= useState(8);
  let[btn,setBtn]= useState(false);

  if(compo>50){
    alert("Don't be greedy yaar")
  }

  useEffect(() => {
    setPassKey([]);
    // console.log("isUpperChecked:", isUpperChecked);
    // console.log("isLowerChecked:", isLowerChecked);
    // console.log("isNumberChecked:", isNumberChecked);
    // console.log("isSymbolChecked:", isSymbolChecked);
    if (isUpperChecked) {
        passKey.push("upperCase");
      }
      if (isLowerChecked) {
        passKey.push("lowerCase");
      }
      if (isSymbolChecked) {
        passKey.push("symbols");
      }
      if (isNumberChecked) {
        passKey.push("numbers");
      }
      const pswdArray = [];
      if(passKey.length>0){
        passKey.map((data)=>{
            let chart = getRandomChar(data);
            pswdArray.push(chart);
        })
        for(let i=passKey.length;i<compo;i++){
            let idx = getRandomAscii(0,passKey.length-1);
            let chart = getRandomChar(passKey[idx]);
            pswdArray.push(chart);
        }
      }
      setPasswordArray(pswdArray);
      setBtn(false);
      setPassword(passwordArray.join(''));
  }, [btn]);

  let [password,setPassword] = useState(passwordArray.join(''));
  const handleCopyClick = async () => {
    try {
      // Use navigator.clipboard.writeText to write text to the clipboard
      await navigator.clipboard.writeText(password);

      // Alert or perform other actions to indicate successful copy
      alert('Password copied to clipboard!');
    } catch (err) {
      // Handle any errors that may occur during copying
      console.error('Unable to copy to clipboard:', err);
    }
  };
    
    return(
        <>
            <h1 className="text-3xl font-medium text-blue-700 py-4">Password Generator</h1>
            <div className="max-w-[1200px] px-8 mx-auto">
                <div className="flex relative justify-center items-center gap-2"><p className="bg-rose-200 overflow-hidden grow h-6 items-start max-w-[80%] md:grow border border-black">{passwordArray.join('')}</p><p onClick={handleCopyClick} className="cursor-pointer p-2 rounded-lg bg-cyan-400 hover:bg-cyan-500 active:scale-[0.86]"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path fill="#141414" d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/></svg></p></div>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p>Select Password length(<strong>8-50 characters</strong>)</p>
                    <input type="number" placeholder="8" step={1} min={8} max={50} className="border border-rose-900" onChange={(event)=>{setCompo(event.target.value)}}></input>
                </div>
                <div className="flex flex-col justify-center items-start p-4">
                    <div><input type="checkbox" className="h-4 w-4" checked={isUpperChecked} onChange={(event)=>{
                    setUpperChecked(event.target.checked);
                    }}></input><label> Include upper case</label></div>
                    <div><input type="checkbox" className="h-4 w-4" checked={isLowerChecked} onChange={(event)=>{setLowerChecked(event.target.checked);
                    }}></input><label> Include lower case</label></div>
                    <div><input type="checkbox" className="h-4 w-4" checked={isNumberChecked} onChange={(event)=>{setNumberChecked(event.target.checked);
                    }}></input><label> Include numbers</label></div>
                    <div><input type="checkbox" className="h-4 w-4" checked={isSymbolChecked} onChange={(event)=>{setSymbolChecked(event.target.checked);
                    }}></input><label> Include symbols</label></div>
                </div>
                <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded active:scale-[0.96] duration-300" onClick={()=>{setBtn(true);
                if(!isLowerChecked && !isNumberChecked && !isUpperChecked && !isSymbolChecked){alert('all checks are empty')}}}>Generate Password</button>
            </div>
        </>
    )
};
export default Main;