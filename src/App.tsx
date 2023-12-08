import './App.css';
import { useState, FormEvent } from 'react';

import logoImg from './assets/logo.png';

interface InfoProps{
  title: string;
  gasolina: string | number;
  alcool: string| number;
}


function App() {
  const [gasolinaInput, setGasInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [info, setInfo] = useState<InfoProps>()
  function calcular(event: FormEvent){
    event.preventDefault();

    const calculo = (alcoolInput / gasolinaInput);

    if(calculo <= 0.7){
      setInfo({
        title: "Compensa usar álcool",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }else{
      setInfo({
        title: "Compensa usar gasolina",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }
  }

  function formatarMoeda(valor: number){
    const valorFormatado = valor.toLocaleString("pt-br",{
      style: "currency",
      currency: "BRL"
    });
    return valorFormatado;
  }
  return (
    <>
    <main className='container'>
      <img src={logoImg}
      alt='Logo da calculadora de combustiveis'
      />
      <h1 className='title'>Qual a melhor opção?</h1>

      <form className='form' onSubmit={calcular}>
        <label>Álcool (preço por litro):</label>
        <input 
        className='input'
        type='number'
        placeholder='4,90'
        min="1"
        step="0.01"
        required
        value={alcoolInput}
        onChange={ (e) => setAlcoolInput(Number(e.target.value))}
        />
        <label>Gasolina (preço por litro):</label>
        <input 
        className='input'
        type='number'
        placeholder='4,90'
        min="1"
        step="0.01"
        required
        value={gasolinaInput}
        onChange={ (e) => setGasInput(Number(e.target.value))}
        />
        <input className='button' type="submit" value="Calcular"/>
      </form>
      {info && Object.keys(info).length > 0 && (
        <section className='result'>
        <h2 className='result-title'>{info.title}</h2>

        <span>Álcool R${alcoolInput}</span>
        <span>Gasolina R${gasolinaInput}</span>
      </section>
      )}
    </main>
    </>
  )
}

export default App
