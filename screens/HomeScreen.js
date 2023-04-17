import { View, Text, TextInput, Pressable, SectionList, Image } from "react-native";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";

import SplashScreen from "./SplashScreen";
import Filters from "../components/Filters";
import Item from "../components/Item";

import { createTable, getMenuItems, saveMenuItems, filterByQueryAndCategories, deleteDatabase } from "../db";
import getSectionListData from "../utils";

import { styles, homeScreenStyles } from "./styles";

const API_URL = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const sections = ['Starters', 'Mains', 'Desserts'];

export default function HomeScreen() {
  const [loaded, setLoaded] = useState(false);

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchBarText, setSearchBarText] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchData = async () => {
    const response = await fetch(API_URL);
    const json = await response.json();

    return json.menu;
  }

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();

        if (!menuItems.length) {
          const menuItems = await fetchData();
          saveMenuItems(menuItems);
        }

        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        console.error(e)
      }
      finally {
        setLoaded(true);
      }
    })();
  }, []);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
    else {
      (async () => {
        const activeCategories = sections.filter((s, i) => {
          if (filterSelections.every((item) => item === false)) {
            return true;
          }
          return filterSelections[i];
        });
        try {
          const menuItems = await filterByQueryAndCategories(query, activeCategories);
          setData(getSectionListData(menuItems));
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  if (!loaded) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={homeScreenStyles.bannerBackground}>
        <View style={homeScreenStyles.bannerContainer}>
          <View style={styles.rowContainer}>
            <View>
              <Text style={homeScreenStyles.bannerTitle}>Little Lemon</Text>
              <Text style={homeScreenStyles.bannerSubtitle}>Chicago</Text>
              <Text style={homeScreenStyles.bannerText}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist</Text>
            </View>
            <Image style={homeScreenStyles.bannerImage} source={require('../assets/banner-image.png')} defaultSource={require('../assets/placeholder-image.png')} />
          </View>
          <TextInput style={homeScreenStyles.searchBar} placeholder="Search..." onChangeText={handleSearchChange} value={searchBarText} />
        </View>
      </View>
      <Text style={homeScreenStyles.orderText}>ORDER FOR DELIVERY!</Text>
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <View style={homeScreenStyles.menuItems}>
        <SectionList
          sections={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item name={item.name} price={item.price} description={item.description} image={item.image} />
          )}
        />
      </View>
    </View>
  );
}
