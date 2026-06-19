import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import WorkoutHistory from './WorkoutHistory';
import StepCounter from './StepCounter';
import StopWatch from './StopWatch';
import BMICalculator from './BMICalculator';
import WorkoutIdeas from './WorkoutIdeas';
import WeightLossMealPlan from './WeightLossMealPlan';
import MuscleGainMealPlan from './MuscleGainMealPlan';
import EnergyPerformanceMealPlan from './EnergyPerformanceMealPlan';
import VegetarianVeganMealPlan from './VegetarianVeganMealPlan';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppTabs() {
  return (
    <Tab.Navigator   //bara de navigatie
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'StepCounter') {
            iconName = focused ? 'walk' : 'walk-outline';
          } else if (route.name === 'StopWatch') {
            iconName = focused ? 'stopwatch' : 'stopwatch-outline';
          } else if (route.name === 'BMICalculator') {
            iconName = focused ? 'body' : 'body-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#7b2cbf',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarStyle: {
          backgroundColor: '#f0f0ff',
          borderTopColor: '#ddd',
        },
        headerStyle: {
          backgroundColor: '#f0f0ff',
          borderBottomColor: '#ddd',
        },
        headerTintColor: '#7b2cbf',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
        },
      })}
    >
      <Tab.Screen name="History" component={WorkoutHistory} options={{ title: 'Workout History' }} />
      <Tab.Screen name="StepCounter" component={StepCounter} options={{ title: 'Step Counter' }} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="StopWatch" component={StopWatch} options={{ title: 'Stop Watch' }} />
      <Tab.Screen name="BMICalculator" component={BMICalculator} options={{ title: 'BMI Calculator' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs"
          component={AppTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WorkoutIdeas"
          component={WorkoutIdeas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WeightLossMealPlan"
          component={WeightLossMealPlan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MuscleGainMealPlan"
          component={MuscleGainMealPlan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnergyPerformanceMealPlan"
          component={EnergyPerformanceMealPlan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VegetarianVeganMealPlan"
          component={VegetarianVeganMealPlan}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}