import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

export default function WorkoutIdeas() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  //functie pentru idei de exercitii
  const getWorkoutIdeas = async () => {
    try {
      const response = await fetch("https://exercisedb.p.rapidapi.com/exercises", {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "a0a4153079msh7298d5667ba20b8p105f99jsn3e186959af58",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setData(json.slice(0, 30));
    } catch (e) {
      console.error("Failed to fetch workout ideas:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorkoutIdeas();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5a189a" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching data: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🏋️ Workout Ideas</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.label}>Muscle Group:</Text>
            <Text style={styles.value}>{item.target}</Text>
            <Text style={styles.label}>Equipment:</Text>
            <Text style={styles.value}>{item.equipment}</Text>
            <Text style={styles.label}>Instructions:</Text>
            <Text style={styles.value}>
              {item.instructions?.length > 0 ? item.instructions : 'No instructions available.'}
            </Text>
          </View>
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff0f3',
  },
  errorText: {
    color: '#b00020',
    fontSize: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5a189a',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f3f0ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#240046',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#3c096c',
    marginTop: 6,
  },
  value: {
    fontSize: 14,
    color: '#1c1c1e',
  },
});
