import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, MEAL_COLORS } from '@/constants/colors';
import { Ayah, Footnote } from '@/constants/surahs';
import FootnoteModal from './FootnoteModal';

type AyahItemProps = {
  ayah: Ayah;
  selectedMeal: string;
};

export default function AyahItem({ ayah, selectedMeal }: AyahItemProps) {
  const mealAccentColor = MEAL_COLORS[selectedMeal] || COLORS.primary;
  const dynamicBgColor = `${mealAccentColor}1A`;

  const [isFootnoteModalVisible, setIsFootnoteModalVisible] = useState(false);
  const [currentFootnoteNumber, setCurrentFootnoteNumber] = useState<number | null>(null);
  const [currentFootnoteText, setCurrentFootnoteText] = useState<string | null>(null);

  const handleFootnotePress = (footnoteNumber: number) => {
    console.log(`[AyahItem] Dipnot referansına tıklandı: [${footnoteNumber}]`);
    console.log(`[AyahItem] Ayah'ın tüm dipnotları (detaylı):`, JSON.stringify(ayah.footnotes, null, 2));

    // Düzeltme: Dipnotu 'id' yerine 'number' alanına göre bul
    const footnote = ayah.footnotes?.find(f => f.number === footnoteNumber);
    
    if (footnote) {
      console.log(`[AyahItem] Dipnot bulundu:`, footnote);
      setCurrentFootnoteNumber(footnote.number); // Modal'a da 'number' alanını gönderiyoruz
      setCurrentFootnoteText(footnote.text);
      setIsFootnoteModalVisible(true);
      console.log(`[AyahItem] Modal görünürlüğü true olarak ayarlandı.`);
    } else {
      console.log(`[AyahItem] Dipnot bulunamadı: number=${footnoteNumber}. Ayah'ın dipnotları arasında yok.`);
    }
  };

  const renderMealTextWithFootnotes = (text: string, footnotes: Footnote[] | undefined) => {
    const parts: React.ReactNode[] = [];
    const regex = /(\[\d+\])/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const footnoteRef = match[0];
      const footnoteNumber = parseInt(match[0].replace(/\[|\]/g, ''), 10);

      if (match.index > lastIndex) {
        parts.push(
          <Text key={`text-${lastIndex}`} style={styles.mealText}>
            {text.substring(lastIndex, match.index)}
          </Text>
        );
      }

      parts.push(
        <Pressable
          key={`footnote-${footnoteNumber}`}
          onPress={() => handleFootnotePress(footnoteNumber)}
          style={styles.footnotePressable}
        >
          <Text style={styles.footnoteText}>{footnoteRef}</Text>
        </Pressable>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(
        <Text key={`text-${lastIndex}`} style={styles.mealText}>
          {text.substring(lastIndex)}
        </Text>
      );
    }

    return <Text>{parts}</Text>;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[
          styles.numberCircle, 
          { 
            borderColor: mealAccentColor, 
            backgroundColor: dynamicBgColor 
          }
        ]}>
          <Text style={styles.numberText}>{ayah.ayahId}.</Text>
        </View>
        <Text style={styles.ayahLabel}>Ayet</Text>
      </View>

      <Text style={styles.arabicText}>{ayah.arabic}</Text>

      <View style={styles.mealContainer}>
        {renderMealTextWithFootnotes(ayah.meals[selectedMeal], ayah.footnotes)}
      </View>

      <FootnoteModal
        isVisible={isFootnoteModalVisible}
        footnoteNumber={currentFootnoteNumber}
        footnoteText={currentFootnoteText}
        onClose={() => {
          console.log(`[AyahItem] Modal kapatılıyor.`);
          setIsFootnoteModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  numberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  numberText: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  ayahLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginLeft: 8,
    color: COLORS.textSecondary,
  },
  arabicText: {
    color: COLORS.text,
    fontSize: 24,
    fontFamily: 'Inter_400Regular',
    textAlign: 'right',
    lineHeight: 40,
    marginBottom: 20,
  },
  mealContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  mealText: {
    color: COLORS.text,
    fontSize: 17,
    fontFamily: 'Inter_400Regular',
    lineHeight: 28,
  },
  footnotePressable: {
    // Tıklanabilir alan için görsel bir stil yok, sadece metin için
  },
  footnoteText: {
    color: COLORS.primary,
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    lineHeight: 28,
  },
});
