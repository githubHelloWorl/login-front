function saveLocalData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocalData(key) {
  return JSON.parse(localStorage.getItem(key) || "{}");
}

// 根据属性itemName取键为key的json对象中的值
function getLocalDataByItemName(key, itemName) {
  return JSON.parse(localStorage.getItem(key) || "{}")[itemName];
}

function removeLocalData(key) {
  localStorage.removeItem(key);
}

export default {
  saveLocalData: saveLocalData,
  getLocalData: getLocalData,
  getLocalDataByItemName: getLocalDataByItemName,
  removeLocalData: removeLocalData,
};
