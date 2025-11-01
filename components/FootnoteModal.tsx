import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';

interface FootnoteModalProps {
  isVisible: boolean;
  footnoteNumber: number | null;
  footnoteText: string | null;
  onClose: () => void;
}

export default function FootnoteModal({
  isVisible,
  footnoteNumber,
  footnoteText,
  onClose,
}: FootnoteModalProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Dipnot {footnoteNumber}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={COLORS.textSecondary} />
            </Pressable>
          </View>
          <Text style={styles.modalBody}>{footnoteText}</Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.text,
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
});
