
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Registrar() { 

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [cor, setCor] = useState('');
  const [adotado, setAdotado] = useState("");
  const [descricao, setDescricao] = useState('');


  const navigation = useNavigate();

  const registro = async (event) => {
    event.preventDefault();
    try{
      const resposta =  await fetch('http://localhost:3000/usuarios', {
        method : 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({
          nome: nome,
          idade: idade,
          especie: especie,
          raca: raca,
          cor: cor,
          adotado: adotado,
          descricao: descricao
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
        <input type="text" value={idade} onChange={(event) => setIdade(event.target.value)}/>
        <input type="text" value={especie} onChange={(event) => setEspecie(event.target.value)}/>
        <input type="text" value={raca} onChange={(event) => setRaca(event.target.value)}/>
        <input type="text" value={cor} onChange={(event) => setCor(event.target.value)}/>
        <input type="text" value={adotado} onChange={(event) => setAdotado(event.target.value)}/>
        <input type="text" value={descricao} onChange={(event) => setDescricao(event.target.value)}/>
        <button>Salvar</button>
        </form>
        </main>
  );
}