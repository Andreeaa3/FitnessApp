import React from 'react';
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native';

export default function EnergyPerformanceMealPlan() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>⚡ Energy & Performance Meal Plan</Text>

      <Text style={styles.paragraph}>
        This meal plan is designed to support high levels of physical and mental performance.
        It includes complex carbohydrates, quality protein, and healthy fats to fuel intense training and aid recovery.
      </Text>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🍓 Breakfast</Text>
        <Text style={styles.mealText}>
          - Oatmeal with milk, mixed berries, chia seeds, and honey.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://plus.unsplash.com/premium_photo-1675013206520-20c7a215e918?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🥤 Morning Snack</Text>
        <Text style={styles.mealText}>
          - A smoothie with strawberries, spinach, Greek yogurt, and almond butter.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1622597468158-27733896a49d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🍽️ Lunch</Text>
        <Text style={styles.mealText}>
          - Grilled turkey breast with quinoa, steamed vegetables, and avocado.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1598514983195-94d7470a4241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🍏 Afternoon Snack</Text>
        <Text style={styles.mealText}>
          - Raw almonds and an apple.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1626196340006-f89d9bedf1c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🐟 Dinner</Text>
        <Text style={styles.mealText}>
          - Baked salmon with sweet potatoes and a green salad with olive oil.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1730725512479-45452912fa13?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🌙 Evening Snack (optional)</Text>
        <Text style={styles.mealText}>
          - Greek yogurt with pumpkin seeds and cinnamon.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1595787572590-545171362a1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0' }}
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
