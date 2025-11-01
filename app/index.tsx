import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Search, ChevronDown, BookCopy } from 'lucide-react-native';
import { COLORS, MEAL_COLORS } from '@/constants/colors';
import { SURAHS } from '@/constants/surahs';
import { MEAL_DISPLAY_NAMES } from '@/constants/mealNames';
import SurahCard from '@/components/SurahCard';
import MealDropdown from '@/components/MealDropdown'; // Yeni import

export default function HomeScreen() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(Object.keys(MEAL_COLORS)[0]); // İlk mealle başlat

  const handleSelectMeal = (meal: string) => {
    setSelectedMeal(meal);
    setIsMenuVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable><Menu color={COLORS.text} size={28} /></Pressable>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <BookCopy color={COLORS.primary} size={24} />
          </View>
          <Text style={styles.appName}>KUR'AN MEAL</Text>
        </View>
        <Pressable><Search color={COLORS.text} size={28} /></Pressable>
      </View>

      {/* Go to Ayah */}
      <View style={styles.section}>
        <Pressable style={styles.dropdownButton}>
          <Text style={styles.dropdownButtonText}>Ayete Git</Text>
          <ChevronDown color={COLORS.textSecondary} size={20} />
        </Pressable>
      </View>

      {/* Surah List Header */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Sure Listesi</Text>
        <View style={styles.headerActions}>
          <View>
            {/* MealDropdown bileşenini kullan */}
            <MealDropdown
              selectedMeal={selectedMeal}
              onSelectMeal={handleSelectMeal}
              isMenuVisible={isMenuVisible}
              setIsMenuVisible={setIsMenuVisible}
            />
          </View>

          <Pressable style={styles.orderButton}>
            <Text style={styles.dropdownText}>Mushaf Sırası</Text>
          </Pressable>
        </View>
      </View>

      {/* Surah List */}
      <FlatList
        data={SURAHS}
        renderItem={({ item }) => (
          <SurahCard
            item={item}
            mealColor={MEAL_COLORS[selectedMeal]}
            selectedMeal={selectedMeal}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onScroll={() => isMenuVisible && setIsMenuVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  appName: {
    color: COLORS.text,
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  dropdownButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdownButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
    zIndex: 1,
  },
  listTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdownText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  // MealDropdown bileşenine taşınan stiller buradan kaldırıldı
});
