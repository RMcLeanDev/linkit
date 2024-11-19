import firebase from "firebase/compat/app";
import "firebase/compat/database";

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

// Fetch screens from Firebase
export const getScreensFromFirebase = async () => {
    const ref = firebase.database().ref("pairings");
    const snapshot = await ref.get();
    return snapshot.val();
  };
  
  // Add screen to Firebase
  export const addScreenToFirebase = async (pairingCode, screenName) => {
    const ref = firebase.database().ref(`pairings/${pairingCode}`);
    const screenData = {
      name: screenName,
      playlistId: null, // Initially no playlist assigned
    };
    await ref.update(screenData);
  };

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