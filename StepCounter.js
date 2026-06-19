import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//cheie de acces la date
const STEPS_STORAGE_KEY = '@fitnessApp:stepSessions';

export default function StepCounter() {
  const [steps, setSteps] = useState(0);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //functie de incarcare din memorie a sesiunilor, fiecare are o data
  const loadSessions = async () => {
    try {
      const stored = await AsyncStorage.getItem(STEPS_STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
      
        const withDate = parsed.map(item => ({
          ...item,
          date: item.date || new Date().toLocaleDateString('ro-RO'),
        }));
        setSessions(withDate);
      }
    } catch (e) {
      console.error("Error loading step sessions", e);
    } finally {
      setIsLoading(false);
    }
  };

  //functie salvare sesiuni
  const saveSessions = async (data) => {
    try {
      await AsyncStorage.setItem(STEPS_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving step sessions", e);
    }
  };

  //incarca datele
  useEffect(() => {
    loadSessions();
  }, []);

  //salveaza datele
  useEffect(() => {
    if (!isLoading) {
      saveSessions(sessions);
    }
  }, [sessions, isLoading]);

  //adaugare pasi
  const handleAddSteps = () => {
    setSteps(prev => prev + 100);
  };

  //functia creaza o seiune noua cu data curenta si o adauga la lista
  const handleSaveSession = () => {
    if (steps > 0) {
      const today = new Date();
      const dateString = today.toLocaleDateString('ro-RO');
      const newSession = {
        id: Date.now().toString(),
        steps,
        date: dateString,
      };
      setSessions([newSession, ...sessions]);
      setSteps(0);
    }
  };

  //stergere sesiune
  const deleteSession = (id) => {
    const filtered = sessions.filter(session => session.id !== id);
    setSessions(filtered);
  };

  //sterge toate sesiunile
  const clearSessions = () => {
    setSessions([]);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7b2cbf" />
      </View>
    );
  }

  const ListHeader = () => (
    <View>
      <Text style={styles.title}>🚶 Step Counter</Text>
      <Text style={styles.stepsCount}>{steps} steps</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddSteps}>
          <Text style={styles.addButtonText}>+100 Steps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSession}>
          <Text style={styles.saveButtonText}>Save Session</Text>
        </TouchableOpacity>
      </View>
      {sessions.length === 0 && (
        <Text style={styles.emptyText}>No step sessions yet.</Text>
      )}
    </View>
  );

  const ListFooter = () => (
    sessions.length > 0 ? (
      <TouchableOpacity style={styles.clearButton} onPress={clearSessions}>
        <Text style={styles.clearButtonText}>🗑️ Clear History</Text>
      </TouchableOpacity>
    ) : null
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.cardText}>{item.steps} steps</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteSession(item.id)}
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
  stepsCount: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7b2cbf',
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#c77dff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
    elevation: 3,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#5a189a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  saveButtonText: {
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
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    color: '#6e6e6e',
    marginTop: 4,
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
    fontSize: 16,
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
});
