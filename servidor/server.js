const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let animais = [];

app.post('/animais', (req, res) => {
    const { nome, idade, especie, raca, cor } = req.body;

    if (!nome) {
        return res.status(400).json({ erro: 'Nome é obrigatório' });
    }

    const novoAnimal = { id: animais.length + 1, nome, idade, especie, raca, cor };
    animais.push(novoAnimal);

    res.status(201).json(novoAnimal);
});

app.get('/animais', (req, res) => {
    res.status(200).json(animais);
});

app.get('/animais/:id', (req, res) => {
    const { id } = req.params;
    const animal = animais.find(a => a.id === parseInt(id));

    if (!animal) {
        return res.status(404).json({ erro: 'Animal não encontrado' });
    }

    res.status(200).json(animal);
});

app.put('/animais/:id', (req, res) => {
    const { id } = req.params;
    const { nome, idade, especie, raca, cor } = req.body;

    const animal = animais.find(a => a.id === parseInt(id));

    if (!animal) {
        return res.status(404).json({ erro: 'Animal não encontrado' });
    }

    animal.nome = nome || animal.nome;
    animal.idade = idade || animal.idade;
    animal.especie = especie || animal.especie;
    animal.raca = raca || animal.raca;
    animal.cor = cor || animal.cor;

    res.status(200).json(animal);
});

app.delete('/animais/:id', (req, res) => {
    const { id } = req.params;
    const index = animais.findIndex(a => a.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ erro: 'Animal não encontrado' });
    }

    animais.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});