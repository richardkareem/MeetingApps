import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Ava = ({ name, size = 60, backgroundColor, textColor, style, role, showInfo = true }) => {
  const getInitials = (nameString) => {
    if (!nameString) return '?';
    const names = nameString.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    const colors = [
      '#6366f1',
      '#8b5cf6',
      '#ec4899',
      '#f59e0b',
      '#10b981',
      '#3b82f6',
      '#ef4444',
    ];
    if (!name) return colors[0];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const initials = getInitials(name);
  const bgColor = getBackgroundColor();
  const defaultTextColor = textColor || '#ffffff';
  const displayName = name || 'Yosi';
  const displayRole = role || 'Web Developer';

  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={[
          styles.avatarContainer,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bgColor,
          },
        ]}
      >
        <Text
          style={[
            styles.initials,
            {
              fontSize: size * 0.4,
              color: defaultTextColor,
            },
          ]}
        >
          {initials}
        </Text>
      </View>
      {showInfo && (
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.role}>{displayRole}</Text>
        </View>
      )}
    </View>
  );
};

export default Ava;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 12,
  },
  initials: {
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  role: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
