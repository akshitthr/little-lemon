export default function getSectionListData(data) {
  const sectionListData = [];

  let keyIndex;
  data.forEach(menuItem => {
    keyIndex = null;
    
    // Check if category already exists
    for (let i = 0; i < sectionListData.length; i++) {
      if (sectionListData[i].title === menuItem.category) {
        keyIndex = i;
        break;
      }
    }
    
    // Create new object under category 
    if (keyIndex === null) {
      keyIndex = sectionListData.push({
        title: menuItem.category,
        data: []
      }) - 1
    }
    
    sectionListData[keyIndex].data.push({
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      image: menuItem.image
    })
  });
  
  return sectionListData;
}
