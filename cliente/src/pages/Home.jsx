
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from '@mui/material';

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

  const exportarPDF = () => {

    const doc = new jsPDF();
    const tabelaDados = usuarios.map((usuario) =>[
     usuario.nome,
     usuario.email,
    ]);

    doc.text("Lista de Usuarios", 10, 10);
    doc.autoTable({
      head:[["Nome", "Email"]],
      body: tabelaDados,
    });

    doc.save("alunosIFMS.pdf");
  };

  return (
    <table border= '1' >
      <Button variant="contained" size="large" onClick={exportarPDF}>Exportar PDF</Button>
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
}