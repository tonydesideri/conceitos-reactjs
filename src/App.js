import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories');

      setRepositories(response.data);
    }

    loadRepositories();
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repositório ${Date.now()}`,
      url: 'https://github.com/tonydesideri/conceitos-reactjs',
      techs: ['reactjs', 'axios']
    })

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
         <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
         </li>
        ))}   
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
