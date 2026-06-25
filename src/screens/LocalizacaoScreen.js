import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  ActivityIndicator, Alert, ScrollView
} from 'react-native';
import * as Location from 'expo-location';
import { globalStyles, colors } from '../styles/global';
import { salvarLocalizacao } from '../services/backend';
import { buscarEscolas } from '../services/api';
import EscolaCard from '../components/EscolaCard';

export default function LocalizacaoScreen() {
  const [localizacao, setLocalizacao] = useState(null);
  const [loading, setLoading] = useState(false);
  const [escolas, setEscolas] = useState([]);
  const [escolaSelecionada, setEscolaSelecionada] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [loadingEscolas, setLoadingEscolas] = useState(true);

  useEffect(() => {
    carregarEscolas();
  }, []);

  async function carregarEscolas() {
    try {
      setLoadingEscolas(true);
      const dados = await buscarEscolas();
      setEscolas(dados);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar as escolas.');
    } finally {
      setLoadingEscolas(false);
    }
  }

  async function obterLocalizacao() {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da sua localização para continuar.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocalizacao(loc.coords);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível obter sua localização.');
    } finally {
      setLoading(false);
    }
  }

  async function salvarRegistro(escola) {
    if (!localizacao) {
      Alert.alert('Atenção', 'Obtenha sua localização primeiro.');
      return;
    }
    setSalvando(true);
    try {
      await salvarLocalizacao({
        latitude: localizacao.latitude,
        longitude: localizacao.longitude,
        escolaNome: escola.nome,
        escolaEndereco: escola.endereco,
        escolaBairro: escola.bairro,
      });
      setEscolaSelecionada(escola);
      Alert.alert('Sucesso!', `Escola "${escola.nome}" salva com sua localização.`);
    } catch (e) {
      Alert.alert('Erro', 'Verifique sua conexão com o backend.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.screenTitle}>Minha Localização</Text>

      <TouchableOpacity style={globalStyles.button} onPress={obterLocalizacao}>
        <Text style={globalStyles.buttonText}>
          {loading ? 'Obtendo...' : 'Obter Localização'}
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator style={{ marginTop: 16 }} color={colors.primary} />
      )}

      {localizacao && (
        <View style={[globalStyles.card, { marginTop: 16 }]}>
          <Text style={globalStyles.title}>📍 Sua Localização</Text>
          <Text style={globalStyles.subtitle}>
            Latitude: {localizacao.latitude.toFixed(6)}
          </Text>
          <Text style={globalStyles.subtitle}>
            Longitude: {localizacao.longitude.toFixed(6)}
          </Text>
        </View>
      )}

      {localizacao && (
        <>
          <Text style={[globalStyles.screenTitle, { fontSize: 16, marginTop: 16 }]}>
            Selecione uma escola para registrar:
          </Text>

          {loadingEscolas ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            escolas.slice(0, 10).map((escola, index) => (
              <EscolaCard
                key={index.toString()}
                escola={escola}
                selecionada={escolaSelecionada?.nome === escola.nome}
                onPress={() => salvarRegistro(escola)}
                disabled={salvando}
              />
            ))
          )}
        </>
      )}
    </ScrollView>
  );
}