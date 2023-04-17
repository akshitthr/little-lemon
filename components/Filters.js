import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          onPress={() => {
            onChange(index);
          }}
          style={{
            flex: 1 / sections.length,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: selections[index] ? '#33401c' : '#E5E4E2',
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 20,
            marginHorizontal: 5
          }}
          key={section}>
          <View>
            <Text style={{
              color: selections[index] ? 'white' : 'black',
              fontSize: 15,
              fontWeight: "700"
            }}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
});

export default Filters;
