import React from 'react';
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native';

export default function VegetarianVeganMealPlan() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>🥦 Vegetarian / Vegan Meal Plan</Text>

      <Text style={styles.paragraph}>
        This plant-based meal plan is designed to provide balanced nutrition, rich in protein, fiber, and essential vitamins — perfect for vegetarians and vegans aiming for a healthy lifestyle.
      </Text>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🌅 Breakfast</Text>
        <Text style={styles.mealText}>
          - Overnight oats with almond milk, chia seeds, berries, and a drizzle of maple syrup.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1665529555367-8a4672d97641?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🥗 Lunch</Text>
        <Text style={styles.mealText}>
          - Quinoa salad with chickpeas, cherry tomatoes, cucumber, parsley, and lemon-tahini dressing.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://plus.unsplash.com/premium_photo-1705207702013-368450377046?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🍛 Dinner</Text>
        <Text style={styles.mealText}>
          - Stir-fried tofu with broccoli, bell peppers, carrots, and brown rice.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1544519685-86ccb2dab444?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🥒 Snacks</Text>
        <Text style={styles.mealText}>
          - Hummus with veggie sticks, mixed nuts, or a vegan protein smoothie.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://plus.unsplash.com/premium_photo-1700084621410-941e5aa5d1e4?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0' }}
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
