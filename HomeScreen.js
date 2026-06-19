import React, { useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//chei cu care salvam datele local pentru antrenamente si pasi
const WORKOUTS_STORAGE_KEY = '@fitnessApp:workouts';
const STEPS_STORAGE_KEY = '@fitnessApp:stepSessions';

//functie ce returneaza data curenta
const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export default function HomeScreen({ navigation }) {
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todaySteps, setTodaySteps] = useState(0);
  const [todaySessions, setTodaySessions] = useState([]);

  //antrenamente pe ziua curenta
  const loadWorkouts = async () => {
    try {
      const stored = await AsyncStorage.getItem(WORKOUTS_STORAGE_KEY);
      if (stored !== null) {
        const allWorkouts = JSON.parse(stored);

        const todayDate = getTodayDateString();
        const todayItems = allWorkouts.filter((item) => {
          const date = new Date(parseInt(item.id));
          return date.toISOString().split('T')[0] === todayDate;
        });

        setTodayWorkouts(todayItems);
      }
    } catch (e) {
      console.error('Error loading workouts', e);
    } finally {
      setIsLoading(false);
    }
  };

  //pasi pe ziua curenta
  const loadTodayStepSessions = async () => {
    try {
      const storedSteps = await AsyncStorage.getItem(STEPS_STORAGE_KEY);
      if (storedSteps !== null) {
        const allSessions = JSON.parse(storedSteps);
        const todayDate = getTodayDateString();

        const sessionsToday = allSessions.filter((session) => {
          const sessionDate = new Date(parseInt(session.id)).toISOString().split('T')[0];
          return sessionDate === todayDate;
        });

        const total = sessionsToday.reduce((sum, session) => sum + session.steps, 0);

        setTodaySessions(sessionsToday);
        setTodaySteps(total);
      }
    } catch (e) {
      console.error("Error loading today's step sessions", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadWorkouts();
      loadTodayStepSessions();
    }, [])
  );


  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcome}>Welcome to FitnessApp!</Text>
      <Text style={styles.title}>Daily Workout</Text>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Steps Today: {todaySteps}</Text>
        {todaySessions.length > 0 ? (
          todaySessions.map((item) => (
            <Text key={item.id} style={styles.stepItem}>
              {item.steps} steps
            </Text>
          ))
        ) : (
          <Text style={styles.stepEmpty}>No steps recorded today.</Text>
        )}
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Workouts Today: {todayWorkouts.length}</Text>
        {todayWorkouts.length > 0 ? (
          todayWorkouts.map((item) => (
            <Text key={item.id} style={styles.stepItem}>
               {item.name}
            </Text>
          ))
        ) : (
          <Text style={styles.stepEmpty}>No workouts recorded today.</Text>
        )}
      </View>


      <TouchableOpacity style={styles.cardBox} onPress={() => navigation.navigate('WorkoutIdeas')}>
        <Text style={styles.cardTitle}>💡 Need inspiration?</Text>
        <Text style={styles.cardSubtitle}>Check out our Workout Ideas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardBox} onPress={() => navigation.navigate('WeightLossMealPlan')}>
        <Text style={styles.cardTitle}>🥗 Weight Loss Meal Plan</Text>
        <Text style={styles.cardSubtitle}>See a simple and effective plan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardBox} onPress={() => navigation.navigate('MuscleGainMealPlan')}>
        <Text style={styles.cardTitle}>💪 Muscle Gain Meal Plan</Text>
        <Text style={styles.cardSubtitle}>See a muscle-building nutrition plan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardBox} onPress={() => navigation.navigate('EnergyPerformanceMealPlan')}>
        <Text style={styles.cardTitle}>⚡ Energy & Performance Plan</Text>
        <Text style={styles.cardSubtitle}>Fuel your body for peak performance</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardBox} onPress={() => navigation.navigate('VegetarianVeganMealPlan')}>
        <Text style={styles.cardTitle}>🌱 Vegetarian / Vegan Plan</Text>
        <Text style={styles.cardSubtitle}>Delicious plant-based meal ideas</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#7b2cbf',
    fontWeight: '700',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#240046',
  },
  stepContainer: {
    backgroundColor: '#f3f0ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3c096c',
    marginBottom: 10,
  },
  stepItem: {
    fontSize: 16,
    color: '#1c1c1e',
  },
  stepEmpty: {
    fontSize: 16,
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#bdb2ff',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0ff',
    fontSize: 16,
    color: '#1c1c1e',
  },
  cardBox: {
    backgroundColor: '#e0c3fc',
    padding: 18,
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5a189a',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#4a4a4a',
  },
});
