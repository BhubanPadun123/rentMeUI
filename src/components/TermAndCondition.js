import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Button from './Button/Button';

const TermsAndConditions = ({onAccept}) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Terms & Conditions</Text>

            <Text style={styles.sectionTitle}>1. User Registration</Text>
            <Text style={styles.text}>
                By registering, you agree to provide accurate information and abide by our terms and privacy policy.
            </Text>

            <Text style={styles.sectionTitle}>2. Data Privacy</Text>
            <Text style={styles.text}>
                Your personal information is stored securely and will not be used for marketing or shared without your consent.
            </Text>

            <Text style={styles.sectionTitle}>3. Platform Fee</Text>
            <Text style={styles.text}>
                A non-refundable platform fee is applied per booking to support our services and platform maintenance.
            </Text>

            <Text style={styles.sectionTitle}>4. Policy Updates</Text>
            <Text style={styles.text}>
                We may update these terms periodically. Continued use implies acceptance of the new terms.
            </Text>
            <Button
               text={"Accept"}
               onPress={onAccept}
            />
        </ScrollView>
    );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        gap:8
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 5,
        color: '#444',
    },
    text: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});
