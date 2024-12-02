<<<<<<< HEAD
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
=======
import { useEffect, useState } from "react";
export default function registrar(){
    const [usuarios, setUsuarios] = useState([]);         
    const [gmail, setGmail] = useState([]);
    useEffect(() => {
      const buscarUsuario = async () => {
        try {
          const resposta = await fetch("http://localhost:3000/usuarios");
          const dados = await resposta.json();
          setUsuarios(dados);
          setGmail(dados);
        } catch {
          alert('Ocorreu um erro no app!');
        }
      }
      buscarUsuario();
    }, [])
    return(
        <>
    <table>
        <div className="todos">
        <div className="pagina1">
        <tr>
          <td className="border">Nome</td>
        </tr>
        
        {
            usuarios.map((usuario) =>
                <tr key={usuario.id}>
            
          <div className="separar">
            <td>{usuario.nome}</td>
          </div>
          </tr>
          )}
          </div>
          
        <div className="pagina2">
  
          <tr>
          <td className="border">E-mail</td>
        </tr>
        {
            gmail.map((gmail) =>
                <tr key={gmail.id}>
              
          <div className="separar">
            <td>{gmail.email}</td>
          </div>
          </tr>
        )}
        </div>
        </div>  
      </table>
        </>
    )
>>>>>>> 6ca085b7d00140c3104c5a9dc21d84b024eb0fc5
}