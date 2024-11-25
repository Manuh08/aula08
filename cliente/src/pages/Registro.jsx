import { useState } from "react";


export default function Registrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  

  const registrar = () =>{
    event.preventDefault();
    await fetch ("http://localhost:3000/usuarios",{
     method: 'POST',
     headers: {'Content-type': 'Aplication/json'},
     body: JSON.stringify({
      nome: nome,
      email: email
     })
    })
  }

  return (
        <main>
          <form action="" onSubmit={registrar}>

         <input type="text"
         value={nome}
         onChange={(event) => setNome(event.target.value)}/>

         <input type="text"
         value={email}
         onChange={(event) => setEmail(event.target.value)}/>

         <button>Salvar</button>

          </form>
        </main>
  );
}