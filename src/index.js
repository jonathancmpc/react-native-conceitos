/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject(){
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Jonathan Cavalcante',
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      {/* SafeAreaView é usado para ocupar a área segura de visualização, ou seja, somente dentro do campo de visualização do usuário */}
      <SafeAreaView style={styles.container}>
        <FlatList /* A FlaList é usada para termos listas mais performáticas, já vem com scroll automático e algumas outras funcionalidades */
          data={projects} /* Os dados da nossa lista */
          keyExtractor={project => project.id} /* A key que seria na primeira tag da lista quando utilizamos map */
          renderItem={({item: project}) => (
            <Text style={styles.project}>{project.title}</Text>
          )} /* O render, renderiza a lista com os itens sendo iterados, sendo que item recebe o project */
        />

        {/* Adicionando um botão que podemos estilizar, o Button é um botão que já vem estilizado, por isso não utilizaremos ele */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },

  project: {
    color: '#fff',
    fontSize: 20,
  },

  button: {
    backgroundColor: '#fdfdfd',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 20,
  },
});
