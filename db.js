import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists menuitems (id integer primary key not null, name text, price text, description text, category text, image text);"
      );
    }, reject, resolve);
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("select * from menuitems", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  let query = "INSERT INTO menuitems (name, price, description, category, image) VALUES ";
  for (let i = 0; i < menuItems.length; i++) {
    query += `("${menuItems[i]['name']}", "${menuItems[i]['price']}", "${menuItems[i]['description']}", "${menuItems[i]['category']}", "${menuItems[i]['image']}")${(i < menuItems.length - 1) ? ', ': ';'}`;
  }
  
  db.transaction((tx) => {
    tx.executeSql(query,
    null,
    null,
    (_, ErrorObject) => {
      console.error(ErrorObject)
    });
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM menuitems WHERE category IN (${activeCategories.map(x => `"${x}"`).join(', ').toLowerCase()}) AND name LIKE "%${query}%";`,
      [],
      (_, { rows }) => {
        resolve(rows._array);
      },
      (_, ErrorObject) => {
        console.error(ErrorObject);
      })
    });
  });
}

export function deleteDatabase() {
  db.deleteAsync();
}
