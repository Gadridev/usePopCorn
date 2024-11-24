// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";

export default function App() {
    const [text, settext] = useState(1)
    const [select, setselect] = useState('EUR')
    const [selectMony, setMoney] = useState('USD')
    const [results, setresults] =useState('')
    useEffect(function(){
        async function fetchMoney(){
                const res= await fetch(`https://api.frankfurter.app/latest?amount=${Number(text)}&from=${select}&to=${selectMony}`)
                const data=await res.json()
                setresults(data.rates)
                console.log(selectMony,select)
                if(select===selectMony){
                    return setresults(1)
                }
               
                
        }
        fetchMoney();

    },[select,selectMony,text])
    return (
      <div>
        <input type="text" value={text} onChange={(e)=>settext(e.target.value)} />
        <select defaultValue={select} onChange={(e)=>setselect(e.target.value)}>
          <option  value="USD">USD</option>
          <option selected value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select  defaultValue={selectMony} onChange={(e)=>setMoney(e.target.value)}>
          <option selected value="USD">USD</option>
          <option  value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p> {results}
            {selectMony === 'USD' && <p>{`${results.USD} USD`}</p>}
            {selectMony === 'EUR' && <p>{`${results.EUR} EUR`}</p>}
            {selectMony === 'CAD' && <p>{`${results.CAD} CAD`}</p>}
            {selectMony === 'INR' && <p>{`${results.INR} INR`}</p>}


           
        </p>
      </div>
    );
  }
  