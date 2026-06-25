import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList,
  ActivityIndicator, TouchableOpacity
} from 'react-native';
import { globalStyles, colors } from '../styles/global';
import { buscarEscolas } from '../services/api';

export default function EscolasScreen() {
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarEscolas();
  }, []);

  async function carregarEscolas() {
    try {
      setLoading(true);
      setErro(null);
      const dados = await buscarEscolas();
      setEscolas(dados);
    } catch (e) {
      setErro('Erro ao carregar escolas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={globalStyles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={globalStyles.subtitle}>Carregando escolas...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={globalStyles.centered}>
        <Text style={globalStyles.subtitle}>{erro}</Text>
        <TouchableOpacity style={globalStyles.button} onPress={carregarEscolas}>
          <Text style={globalStyles.buttonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.screenTitle}>Escolas do Recife</Text>
      <FlatList
        data={escolas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.title}>{item.nome}</Text>
            {item.endereco ? (
              <Text style={globalStyles.subtitle}>📍 {item.endereco}</Text>
            ) : null}
            {item.bairro ? (
              <Text style={globalStyles.label}>Tipo: {item.bairro}</Text>
            ) : null}
            {item.latitude ? (
              <Text style={globalStyles.label}>
                Lat: {item.latitude.toFixed(4)} | Long: {item.longitude.toFixed(4)}
              </Text>
            ) : null}
          </View>
        )}
      />
    </View>
  );
}