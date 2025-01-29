import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from '../styles/alterar.module.css';

export default function Alterar() {
  const { id } = useParams();
  const [animal, setAnimal] = useState({ nome: "", idade: "", especie: "", raca: "", cor: "" });
  const navigation = useNavigate();
  useEffect(() => {
    const buscarAnimal = async () => {
      try {
        const resposta = await fetch(`http://localhost:3000/animais/${id}`);
        if (!resposta.ok) throw new Error("Erro");
        const dados = await resposta.json();
        setAnimal(dados);
      } catch (erro) {
        alert(erro.message);
      }
    };
    buscarAnimal();
  }, [id]);

  const alterar = async (evento) => {
    evento.preventDefault();
    try {
      const resposta = await fetch(`http://localhost:3000/animais/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animal)
      });
      if (!resposta.ok) throw new Error("Erro");
      navigation('/');
    } catch (erro) {
      alert(erro.message);
    }
  };

  return (
    <main className={styles.container}>
      <h2 className={styles.headeralterar}>Alterar Animal</h2>
      <form onSubmit={alterar} className={styles.form}>
        <img className={styles.image} src="https://cdn-icons-png.flaticon.com/512/12/12638.png"></img>
        <label>Nome</label>
        <input type="text" value={animal.nome} onChange={(e) => setAnimal({ ...animal, nome: e.target.value })} />
        <label>Idade</label>
        <input type="number" value={animal.idade} onChange={(e) => setAnimal({ ...animal, idade: e.target.value })} />
        <label>Espécie</label>
        <input type="text" value={animal.especie} onChange={(e) => setAnimal({ ...animal, especie: e.target.value })} />
        <label>Raça</label>
        <input type="text" value={animal.raca} onChange={(e) => setAnimal({ ...animal, raca: e.target.value })} />
        <label>Cor</label>
        <input type="text" value={animal.cor} onChange={(e) => setAnimal({ ...animal, cor: e.target.value })} />
        <button className={styles.botao}>Alterar</button>
      </form>
    </main>
  );
}
