import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


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
     alert('Ish, não deu certo!');
    }
  }

  const exportarPDF = () => {

    const doc = new jsPDF();
    const tabelaDados = usuarios.map((usuario) =>[
     usuario.nome,
     usuario.idade,
     usuario.especie,
     usuario.raca,
     usuario.cor,
     usuario.adotado,
     usuario.descricao
    ]);

    doc.text("Lista de Usuarios", 10, 10);
    doc.autoTable({
      head:[["Nome", "Idade", "Especie", "Raca", "Cor", "Adotado", "Descricao"]],
      body: tabelaDados,
    });

    doc.save("Adopt a Friend.pdf");
  };

  return (
    <table border= '1' >
      <Button variant="contained" style={{backgroundColor:"salmon"}} size="large" onClick={exportarPDF}>Exportar PDF</Button>
      <tr>
        <td>Nome</td>
        <td>Idade</td>
        <td>Especie</td>
        <td>Raca</td>
        <td>Cor</td>
        <td>Adotado</td>
        <td>Descricao</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.idade}</td>
          <td>{usuario.especie}</td>
          <td>{usuario.raca}</td>
          <td>{usuario.cor}</td>
          <td>{usuario.adotado}</td>
          <td>{usuario.descricao}</td>

          <td>
             <Button onClick={() => deletar(usuario.id)} > <DeleteForeverIcon /> </Button>
             </td>
          <Link to={'/alterar/' + usuario.id}>
          <button>Alterar</button>
          </Link>
        </tr>
      )}
      
    </table>
    
  );
}