import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  //functia de calcul BMI
  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm -> m

    if (!w || !h || h <= 0) {
      setBmi(null);
      setCategory('');
      return;
    }

    //formula calcul bmi
    const bmiValue = w / (h * h);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue < 25) {
      setCategory('Normal weight');
    } else if (bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>BMI Calculator</Text>

        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>

        {bmi && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Your BMI is: {bmi}</Text>
            <Text style={styles.resultCategory}>Category: {category}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
    marginBottom: 30,
    textAlign: 'center',
    color: '#240046',
  },
  input: {
    borderColor: '#bdb2ff',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#f3f0ff',
    fontSize: 16,
    color: '#1c1c1e',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#c77dff',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#7b2cbf',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 25,
    backgroundColor: '#e0c3fc',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#240046',
    textAlign: 'center',
    marginBottom: 8,
  },
  resultCategory: {
    fontSize: 18,
    color: '#5a189a',
    textAlign: 'center',
    fontWeight: '600',
  },
});
