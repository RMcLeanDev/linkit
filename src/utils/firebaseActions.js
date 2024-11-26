import firebase from "firebase/compat/app";
import { getDatabase, ref, remove } from "firebase/database";
import "firebase/compat/database";

export const createNewPlaylist = (playlist) => {
  const database = firebase.database().ref("playlists");
  const newPlaylistRef = database.push(); // Generate new playlist ID
  return newPlaylistRef
    .set({
      ...playlist,
      playlistID: newPlaylistRef.key, // Add the generated ID
    })
    .then(() => {
      console.log(`Playlist created with ID: ${newPlaylistRef.key}`);
    })
    .catch((error) => {
      console.error("Failed to create playlist:", error);
    });
};

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

export const updatePlaylistItem = (playlistId, itemId, updatedItem) => {
  const database = firebase.database().ref(
    `playlists/${playlistId}/items/${itemId}`
  );
  return database
    .update(updatedItem)
    .then(() => {
      console.log(`Item ${itemId} in playlist ${playlistId} updated successfully`);
    })
    .catch((error) => {
      console.error("Failed to update playlist item:", error);
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

//add Screen to firebase DONE
export const addScreenToFirebase = async (tvSerial, userID, screenName) => {
  try {
    const ref1 = firebase.database().ref(`screens/${tvSerial}`);
    const ref2 = firebase.database().ref(`users/${userID}/devices/${tvSerial}`);

    const screenData = {
      activationDate: Date.now(),
      currentPlaylistAssigned: null,
      assignedTo: userID,
    };

    const userData = {
      deviceName: screenName,
      deviceID: tvSerial,
    };

    await Promise.all([
      ref1.update(screenData),
      ref2.update(userData),
    ]);

    console.log(`Screen ${tvSerial} added successfully and associated with user ${userID}.`);
  } catch (error) {
    console.error("Error adding screen to Firebase:", error);
    throw error; 
  }
};

//update screen details DONE
export const updateScreenDetails = async (deviceID, playlistID, screenName, userID) => {
  try {
    const screenRef = firebase.database().ref(`screens/${deviceID}`);
    const currentScreenSnapshot = await screenRef.get();
    const currentScreen = currentScreenSnapshot.val();

    const previousPlaylistID = currentScreen?.currentPlaylistAssigned;

    const newScreenData = {
      currentPlaylistAssigned: playlistID,
    };

    const newPlaylistData = {
      userAssigned: userID,
      tvAssigned: deviceID,
    };

    const newUserData = {
      deviceName: screenName,
    };

    const newPlaylistRef = firebase.database().ref(`playlists/${playlistID}`);
    const userRef = firebase.database().ref(`users/${userID}/devices/${deviceID}`);

    if (previousPlaylistID && previousPlaylistID !== playlistID) {
      const previousPlaylistRef = firebase.database().ref(`playlists/${previousPlaylistID}`);
      await previousPlaylistRef.update({
        userAssigned: null,
        tvAssigned: null,
      });
    }

    await Promise.all([
      screenRef.update(newScreenData),
      newPlaylistRef.update(newPlaylistData), 
      userRef.update(newUserData)
    ]);

    console.log("Screen and playlist details updated successfully.");
  } catch (error) {
    console.error("Error updating screen details:", error);
    throw error;
  }
};

//assign pairing codes DONE
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

export const getPlaylists = async () => {
  const ref = firebase.database().ref("playlists");
  const snapshot = await ref.get();
  return snapshot.val();
};

export const removeScreenFromFirebase = async (deviceID, playlistID, userID) => {
  try {
    const screenRef = firebase.database().ref(`screens/${deviceID}`);
    const userDeviceRef = firebase.database().ref(`users/${userID}/devices/${deviceID}`);
    const playlistRef = playlistID
      ? firebase.database().ref(`playlists/${playlistID}`)
      : null;

    const updates = [];

    updates.push(userDeviceRef.remove());

    if (playlistRef) {
      updates.push(
        playlistRef.update({
          userAssigned: null,
          tvAssigned: null,
        })
      );
    }

    updates.push(
      screenRef.update({
        assignedTo: null,
        currentPlaylistAssigned: null,
      })
    );

    await Promise.all(updates);
    console.log("Screen successfully disassociated from user and playlist.");
  } catch (error) {
    console.error("Error disassociating screen:", error);
    throw error;
  }
};
