import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";



function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then( response => {
      setRepositories(response.data);
    });
  }, [handleRemoveRepository]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: '',
      url: '',
      techs: '',
    });
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`, {});
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => 
          <li key={repository.id}>
            {repository.title}
          
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
