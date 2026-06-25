import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles, colors } from '../styles/global';

export default function EscolaCard({ escola, selecionada, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[
        globalStyles.card,
        selecionada && {
          borderColor: colors.primary,
          borderWidth: 2,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={globalStyles.title}>{escola.nome}</Text>
      <Text style={globalStyles.subtitle}>📍 {escola.endereco}</Text>
      <Text style={globalStyles.label}>Tipo: {escola.bairro}</Text>

      {escola.distancia !== undefined && (
        <Text style={[globalStyles.label, { color: colors.primary }]}>
          📏 {escola.distancia < 1
            ? `${(escola.distancia * 1000).toFixed(0)} metros de você`
            : `${escola.distancia.toFixed(2)} km de você`}
        </Text>
      )}

      {!disabled && (
        <Text style={[globalStyles.label, { color: colors.primary, marginTop: 4 }]}>
          Toque para registrar visita →
        </Text>
      )}
    </TouchableOpacity>
  );
}
