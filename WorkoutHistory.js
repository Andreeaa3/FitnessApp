import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//cheie de acces la date
const WORKOUTS_STORAGE_KEY = '@fitnessApp:workouts';

export default function WorkoutHistory() {
  const [history, setHistory] = useState([]);
  const [newWorkout, setNewWorkout] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  //functie care incarca istoricul antrenamentelor
  const loadWorkoutHistory = async () => {
    try {
      const data = await AsyncStorage.getItem(WORKOUTS_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        
        const withDate = parsed.map(item => ({
          ...item,
          date: item.date || new Date().toLocaleDateString('ro-RO')
        }));
        setHistory(withDate);
      }
    } catch (e) {
      console.error("Error loading history", e);
    } finally {
      setIsLoading(false);
    }
  };

  //functie de salvare a antrenamentului in memoria locala
  const saveWorkoutHistory = async (updated) => {
    try {
      await AsyncStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving history', e);
    }
  };

  //functie de adaugare antrenament
  const addWorkout = () => {
    if (newWorkout.trim() === '') return;
    const today = new Date();
    const dateString = today.toLocaleDateString('ro-RO');
    const newItem = { id: Date.now().toString(), name: newWorkout, date: dateString };
    const updated = [...history, newItem];
    setHistory(updated);
    saveWorkoutHistory(updated);
    setNewWorkout('');
  };

  //functie de stergere antrenament
  const deleteWorkout = (id) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    saveWorkoutHistory(updated);
  };

  //functie care sterge toate antrenamentele
  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem(WORKOUTS_STORAGE_KEY);
      setHistory([]);
    } catch (e) {
      console.error('Error clearing history', e);
    }
  };

  useEffect(() => {
    loadWorkoutHistory();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7b2cbf" />
      </View>
    );
  }

  
  const ListHeader = () => (
    <View>
      <Text style={styles.title}>🏋️ Workout History</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new workout"
          placeholderTextColor="#888"
          value={newWorkout}
          onChangeText={setNewWorkout}
        />
        <TouchableOpacity style={styles.addButton} onPress={addWorkout}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {history.length === 0 && (
        <Text style={styles.emptyText}>No workout history available.</Text>
      )}
    </View>
  );

  
  const ListFooter = () => (
    history.length > 0 ? (
      <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
        <Text style={styles.clearButtonText}>🗑️ Clear History</Text>
      </TouchableOpacity>
    ) : null
  );

  return (
  <View style={styles.container}>
    <Text style={styles.title}>🏋️ Workout History</Text>

    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add new workout"
        placeholderTextColor="#888"
        value={newWorkout}
        onChangeText={setNewWorkout}
      />
      <TouchableOpacity style={styles.addButton} onPress={addWorkout}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>

    {history.length === 0 && (
      <Text style={styles.emptyText}>No workout history available.</Text>
    )}

    <FlatList
      data={history.slice().reverse()}
      keyExtractor={(item) => item.id}
      ListFooterComponent={
        history.length > 0 ? (
          <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
            <Text style={styles.clearButtonText}>🗑️ Clear History</Text>
          </TouchableOpacity>
        ) : null
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View>
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteWorkout(item.id)}
          >
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  </View>
);

}

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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#5a189a',
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
    borderRadius: 10,
    backgroundColor: '#f3f0ff',
    fontSize: 16,
    color: '#1c1c1e',
  },
  addButton: {
    backgroundColor: '#c77dff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#e0c3fc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: '#240046',
  },
  deleteButton: {
    backgroundColor: '#ff5c5c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: '#ffccd5',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#d00000',
    fontWeight: '700',
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginTop: 30,
  },
  dateText: {
    fontSize: 12,
    color: '#6e6e6e',
    marginTop: 4,
  },
});
