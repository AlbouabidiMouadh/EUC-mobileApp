import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.buttonContainer,
        isLoading && styles.loadingOpacity,
        containerStyles,
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.buttonText, textStyles]}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.activityIndicator}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#161616', // Utilisation de la couleur de fond personnalisée
    borderRadius: 15, // Bordures arrondies
    minHeight: 62, // Hauteur minimale
    flexDirection: 'row', // Affichage en ligne
    justifyContent: 'center', // Centrer les éléments horizontalement
    alignItems: 'center', // Centrer les éléments verticalement
  },
  loadingOpacity: {
    opacity: 0.5, // Opacité réduite lorsqu'un chargement est en cours
  },
  buttonText: {
    color: '#FF4B4B', // Couleur du texte
    fontFamily: 'Poppins-SemiBold', // Police personnalisée
    fontSize: 18, // Taille du texte
  },
  activityIndicator: {
    marginLeft: 8, // Marge à gauche pour l'indicateur d'activité
  },
});

export default CustomButton;
