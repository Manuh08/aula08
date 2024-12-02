
import { useEffect, useState } from "react";

export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [usuarios])
  
  const deletar = async(id) => {
    try{
    await fetch('http://localhost:3000/usuarios/'+ id,{
      method: 'DELETE'
    });
    }catch{
     alert('Ish, nã deu certo!');
    }
  }
  return (
    <table border= '1' >
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td> <button onClick={() => deletar(usuario.id)} > X</button></td>
        </tr>
      )}
    </table>
  );

import { useState } from "react";

export default function Registrar() {
 const [nome, setNome] = useState (""); 
 const [email, setEmail] = useState ("");
  const registrar = async (event) => {
  
  event.preventDefault();
    try{
      await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome,
          email: email
          })
      })
    } catch{
      alert("Ocorreu um erro na aplicação")
    }};
  return (
    <main>
      <form action="" onSubmit={registrar}>

      <div className="centraliza">
        <div className="separar">
        <input
        placeholder="Nome"
        type="text"
        value={nome}
        onChange={(event) => setNome(event.target.value)}/>
        </div>

        <div className="separar">
        <input
        className="espacamento"
        placeholder="Email"
        type='email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <button>Salvar</button>
        </div>
      </form>
    </main>
    );
}
  }