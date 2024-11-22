import firebase from "firebase/compat/app";
import { getDatabase, ref, remove } from "firebase/database";
import "firebase/compat/database";

// Update playlist name
export const updatePlaylistName = (playlistId, newName) => {
  const database = firebase.database().ref(`playlists/${playlistId}`);
  return database
    .update({ name: newName })
    .then(() => {
      console.log(`Playlist ${playlistId} name updated to "${newName}"`);
    })
    .catch((error) => {
      console.error("Error updating playlist name: ", error);
    });
};

// Add new item to a playlist
export const addNewItem = (playlistId, newItem) => {
  const database = firebase.database().ref(`playlists/${playlistId}/items`);
  const newItemRef = database.push();
  return newItemRef
    .set(newItem)
    .then(() => {
      console.log("New item added successfully!");
    })
    .catch((error) => {
      console.error("Error adding item: ", error);
    });
};

// Remove an item from a playlist
export const removeItem = (playlistId, itemId) => {
  const database = firebase.database().ref(`playlists/${playlistId}/items/${itemId}`);
  return database
    .remove()
    .then(() => {
      console.log(`Item ${itemId} removed successfully from playlist ${playlistId}`);
    })
    .catch((error) => {
      console.error("Error removing item: ", error);
    });
};

// Fetch all screens (pairings) from Firebase
export const getScreensFromFirebase = async () => {
  const ref = firebase.database().ref("pairings");
  const snapshot = await ref.get();
  return snapshot.val();
};

// Add a new screen (pairing) to Firebase
export const addScreenToFirebase = async (pairingCode, screenName) => {
  const ref = firebase.database().ref(`pairings/${pairingCode}`);
  const screenData = {
    name: screenName,
    playlistId: null, // Initially no playlist assigned
  };
  await ref.update(screenData);
};

// Update screen details (e.g., playlist assignment)
export const updateScreenDetails = async (screenCode, details) => {
  const databaseRef = firebase.database().ref(`pairings/${screenCode}`);
  try {
    await databaseRef.update(details);
    console.log(`Screen ${screenCode} updated successfully!`);
  } catch (error) {
    console.error(`Failed to update screen ${screenCode}:`, error);
    throw error;
  }
};

// Assign a playlist to a pairing code
export const assignPairingCodeToDevice = async (pairingCode, playlistId) => {
  const ref = firebase.database().ref(`pairings/${pairingCode}`);
  try {
    await ref.update({ playlistId });
    console.log(`Playlist ${playlistId} assigned to pairing code ${pairingCode}`);
  } catch (error) {
    console.error(`Failed to assign playlist:`, error);
    throw error;
  }
};

// Fetch all playlists
export const getPlaylists = async () => {
  const ref = firebase.database().ref("playlists");
  const snapshot = await ref.get();
  return snapshot.val();
};

export const removeScreenFromFirebase = async (pairingCode) => {
  const db = getDatabase();

  // Delete from 'pairings' node
  const pairingRef = ref(db, `pairings/${pairingCode}`);
  await remove(pairingRef);

  // Optionally, delete from 'devices' node if needed
  const deviceRef = ref(db, `devices/${pairingCode}`);
  await remove(deviceRef);
};