import React from 'react';
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native';

export default function MuscleGainMealPlan() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>💪 Muscle Gain Meal Plan</Text>

      <Text style={styles.paragraph}>
        This meal plan is designed to support muscle growth with a calorie surplus, high protein intake, and balanced nutrients.
        Meals are rich in complex carbs, healthy fats, and lean proteins.
      </Text>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🍳 Breakfast</Text>
        <Text style={styles.mealText}>
          - Scrambled eggs with whole grain toast, avocado, and a banana.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://plus.unsplash.com/premium_photo-1700948867117-6f306eb2d112?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🍗 Lunch</Text>
        <Text style={styles.mealText}>
          - Grilled chicken breast with brown rice, steamed broccoli, and olive oil drizzle.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1568717099337-5aaecc090548?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🐟 Dinner</Text>
        <Text style={styles.mealText}>
          - Salmon fillet with quinoa, roasted sweet potatoes, and mixed green salad.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🥤 Snacks</Text>
        <Text style={styles.mealText}>
          - Greek yogurt with mixed nuts and honey, or a protein shake.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1707588435406-74ef5f056e4d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#5a189a',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#4a4a4a',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f3f0ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#240046',
    marginBottom: 8,
  },
  mealText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
});
