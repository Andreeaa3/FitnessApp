import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//cheie de acces la date
const SESSIONS_STORAGE_KEY = '@fitnessApp:stopwatchSessions';

export default function StopWatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);

  //functie de incarcare din memorie a sesiunilor
  const loadSessions = async () => {
    try {
      const stored = await AsyncStorage.getItem(SESSIONS_STORAGE_KEY);
      if (stored !== null) {
        setSessions(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading sessions", e);
    } finally {
      setIsLoading(false);
    }
  };

  //functie salvare sesiune
  const saveSessions = async (data) => {
    try {
      await AsyncStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving sessions", e);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveSessions(sessions);
    }
  }, [sessions, isLoading]);

  //cronometru
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  //functie ce transforma secundele in format mm:ss
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  //functie ce comuta intre start si stop
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  //functie care salveaza o sesiune si reseteaza cronometrul
  const handleReset = () => {
    if (seconds > 0) {
      const newSession = {
        id: Date.now().toString(),
        duration: formatTime(seconds),
        date: new Date().toLocaleDateString('ro-RO'), 
      };
      setSessions([newSession, ...sessions]);
    }
    setIsRunning(false);
    setSeconds(0);
  };

  //functie de stergere a tuturor sesiunilor
  const clearSessions = () => {
    setSessions([]);
  };

  //functie de stergere a unei sesiuni
  const deleteSession = (id) => {
    const filtered = sessions.filter(session => session.id !== id);
    setSessions(filtered);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7b2cbf" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏱ Stopwatch</Text>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.startStopButton} onPress={handleStartStop}>
          <Text style={styles.buttonText}>{isRunning ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Previous Sessions</Text>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.sessionItem}>
            <View>
              <Text style={styles.sessionText}>⏱ {item.duration}</Text>
              <Text style={styles.sessionDate}>{item.date}</Text>
            </View>
            <TouchableOpacity
              onPress={() => deleteSession(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No sessions yet.</Text>}
        ListFooterComponent={
          sessions.length > 0 ? (
            <TouchableOpacity style={styles.clearButton} onPress={clearSessions}>
              <Text style={styles.clearButtonText}>🗑️ Clear History</Text>
            </TouchableOpacity>
          ) : null
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#5a189a',
  },
  timer: {
    fontSize: 52,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7b2cbf',
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  startStopButton: {
    backgroundColor: '#7b2cbf',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  resetButton: {
    backgroundColor: '#c77dff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#240046',
  },
  sessionItem: {
    backgroundColor: '#e0c3fc',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  sessionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#240046',
  },
  deleteButton: {
    backgroundColor: '#ff5c5c',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: '#ffccd5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#d00000',
    fontWeight: '700',
    fontSize: 18,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginTop: 40,
  },
  sessionDate: {
    fontSize: 14,
    color: '#5f5f5f',
    marginTop: 4,
    fontWeight: '500',
  },
});
