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
      <Text style={globalStyles.subtitle}>{escola.endereco}</Text>
      <Text style={globalStyles.label}>Bairro: {escola.bairro}</Text>
      {!disabled && (
        <Text style={[globalStyles.label, { color: colors.primary }]}>
          Toque para registrar visita →
        </Text>
      )}
    </TouchableOpacity>
  );
}