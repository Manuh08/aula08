import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styles from "../styles/Table.module.css";

export default function Home() {
  const [animais, setAnimais] = useState([]);
  useEffect(() => {
    const buscarAnimais = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/animais");
        const dados = await resposta.json();
        setAnimais(dados);
      } catch {
        alert("Ocorreu um erro ao buscar os dados!");
      }
    };
    buscarAnimais();
  }, []);

  const deletar = async (id) => {
    try {
      await fetch("http://localhost:3000/animais/" + id, {
        method: "DELETE",
      });
      setAnimais(animais.filter((animal) => animal.id !== id));
    } catch {
      alert("Erro ao deletar o registro!");
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabelaDados = animais.map((animal) => [
      animal.nome,
      animal.idade,
      animal.especie,
      animal.raca,
      animal.cor,
    ]);

    doc.text("Lista de Animais", 10, 10);
    doc.autoTable({
      head: [["Nome", "Idade", "Espécie", "Raça", "Cor"]],
      body: tabelaDados,
    });

    doc.save("Animais_Registrados.pdf");
  };

  return (
    <div>
      <a href="/registro">
      <Button
      variant="contained"
      style={{ backgroundColor: "salmon" }}
      size="large"
      className={styles.button}
      >Registrar Animal</Button>
      </a>
      <br></br><br></br>
      <Button
        variant="contained"
        style={{ backgroundColor: "salmon" }}
        size="large"
        onClick={exportarPDF}
        className={styles.button}
      >
        Exportar PDF
      </Button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Espécie</th>
            <th>Raça</th>
            <th>Cor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {animais.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.nome}</td>
              <td>{animal.idade}</td>
              <td>{animal.especie}</td>
              <td>{animal.raca}</td>
              <td>{animal.cor}</td>
              <td>
                <button
                  onClick={() => deletar(animal.id)}
                  className={styles.deleteButton}
                >
                  <DeleteForeverIcon />
                </button>
                <Link to={`/alterar/${animal.id}`} className={styles.linkButton}>
                  Alterar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
