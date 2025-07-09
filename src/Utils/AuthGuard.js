export default function userIsConnected() {
  let isConnected = false;
  try {
    if (localStorage.getItem("isConnected")) {
      isConnected = true;
    } else {
      isConnected = false;
    }
  } catch (error) {
    console.error("Oups, some bad happenned bro, look===>", error);
  }
  return isConnected;
}
