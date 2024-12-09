
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Registrar() { 

  const[nome, setNome] = useState('');
  const[email, setEmail] = useState('');

  const navigation = useNavigate();

  const registro = async (event) => {
    event.preventDefault();
    try{
      const resposta =  await fetch('http://localhost:3000/usuarios', {
        method : 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({
          nome: nome,
          email: email
        })
      });
      if( resposta.ok){
        navigation('/');
      }
    }catch(err){
      alert('Erro no registro!', err);
     }
    }

  return (
        <main>
        <form onSubmit={registro}>
        <input type="text" value={nome} onChange={(event) => setNome(event.target.value)}/>
        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}/>
        <button>Salvar</button>
        </form>
        </main>
  );
}