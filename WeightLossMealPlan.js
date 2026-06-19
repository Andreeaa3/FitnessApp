import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

export default function WeightLossMealPlan() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>🥗 Weight Loss Meal Plan</Text>

      <Text style={styles.paragraph}>
        This meal plan helps you create a moderate calorie deficit to lose weight healthily.
        Meals are balanced, high in protein and fiber, and low in simple carbs and saturated fats.
      </Text>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🍓 Breakfast</Text>
        <Text style={styles.mealText}>
          - Oats with plant-based milk, berries, and a tablespoon of flax seeds.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1638813133319-897c2e3eb13b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🥗 Lunch</Text>
        <Text style={styles.mealText}>
          - Grilled chicken breast with green salad, tomatoes, cucumbers, and quinoa.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1580013759032-c96505e24c1f?q=80&w=909&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🐟 Dinner</Text>
        <Text style={styles.mealText}>
          - Baked fish with steamed vegetables and an avocado salad.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://plus.unsplash.com/premium_photo-1726729537540-6f3fcebed8a8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subTitle}>🍏 Snacks</Text>
        <Text style={styles.mealText}>
          - Nuts, Greek yogurt, or an apple.
        </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://images.unsplash.com/photo-1603199476769-12b7c78485e2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
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
