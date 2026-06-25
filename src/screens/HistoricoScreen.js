import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList,
  ActivityIndicator, TouchableOpacity
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { globalStyles, colors } from '../styles/global';
import { buscarHistorico } from '../services/backend';

export default function HistoricoScreen() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useFocusEffect(
    useCallback(() => {
      carregarHistorico();
    }, [])
  );

  async function carregarHistorico() {
    try {
      setLoading(true);
      setErro(null);
      const json = await buscarHistorico();
      setRegistros(json);
    } catch (e) {
      setErro('Erro ao carregar histórico. Verifique o backend.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={globalStyles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={globalStyles.subtitle}>Carregando histórico...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={globalStyles.centered}>
        <Text style={globalStyles.subtitle}>{erro}</Text>
        <TouchableOpacity style={globalStyles.button} onPress={carregarHistorico}>
          <Text style={globalStyles.buttonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (registros.length === 0) {
    return (
      <View style={globalStyles.centered}>
        <Text style={globalStyles.subtitle}>
          Nenhum registro ainda. Vá até a aba Localização e selecione uma escola!
        </Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.screenTitle}>Histórico de Visitas</Text>
      <FlatList
        data={registros}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.title}>{item.escolaNome}</Text>

            <Text style={globalStyles.subtitle}>
              📍 {item.escolaEndereco} — {item.escolaBairro}
            </Text>

            <Text style={globalStyles.label}>
              Lat: {item.latitude.toFixed(6)} | Long: {item.longitude.toFixed(6)}
            </Text>

            <Text style={globalStyles.label}>
              🕐 {new Date(item.criadoEm).toLocaleString('pt-BR')}
            </Text>
          </View>
        )}
      />
    </View>
  );
}