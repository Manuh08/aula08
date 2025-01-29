import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Form.module.css';

export default function Registrar() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [cor, setCor] = useState('');

  const navigate = useNavigate();

  const registro = async (event) => {
    event.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/animais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          idade,
          especie,
          raca,
          cor
        })
      });

      if (resposta.ok) {
        navigate('/');
      } else {
        alert('Erro no registro!');
      }
    } catch (err) {
      alert('Erro no registro!', err);
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={registro} className={styles.form}>
      <img className={styles.image} src="https://cdn-icons-png.flaticon.com/512/12/12638.png"></img>
        <input
          placeholder="Nome do PET"
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          className={styles.input}
          required
        />
        <input
          placeholder="Idade do PET"
          type="text"
          value={idade}
          onChange={(event) => setIdade(event.target.value)}
          className={styles.input}
        />
        <input
          placeholder="Espécie do PET"
          type="text"
          value={especie}
          onChange={(event) => setEspecie(event.target.value)}
          className={styles.input}
        />
        <input
          placeholder="Raça do PET"
          type="text"
          value={raca}
          onChange={(event) => setRaca(event.target.value)}
          className={styles.input}
        />
        <input
          placeholder="Cor do PET"
          type="text"
          value={cor}
          onChange={(event) => setCor(event.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Salvar</button>
      </form>
    </main>
  );
}