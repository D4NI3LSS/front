import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import EscolasScreen from './src/screens/EscolasScreen';
import LocalizacaoScreen from './src/screens/LocalizacaoScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';
import { colors } from './src/styles/global';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Escolas') iconName = 'school-outline';
            else if (route.name === 'Localização') iconName = 'location-outline';
            else if (route.name === 'Histórico') iconName = 'time-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textLight,
          tabBarStyle: { backgroundColor: colors.card },
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: 'bold' },
        })}
      >
        <Tab.Screen name="Escolas" component={EscolasScreen} />
        <Tab.Screen name="Localização" component={LocalizacaoScreen} />
        <Tab.Screen name="Histórico" component={HistoricoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}