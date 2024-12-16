import firebase from "firebase/compat/app";
import { v4 as uuidv4 } from "uuid";
import "firebase/compat/database";

export const createNewPlaylist = (playlist) => {
  const database = firebase.database().ref("playlists");
  const newPlaylistRef = database.push(); 
  return newPlaylistRef
    .set({
      ...playlist,
      playlistID: newPlaylistRef.key,
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

export const sendPowerCommand = (screenId, command) => {
  firebase.database().ref(`screens/${screenId}/commands`).set({
    action: command, // 'sleep' or 'wake'
    timestamp: Date.now(),
  });
  console.log(`Sent command: ${command} to screen ${screenId}`);
};

export const firebaseUID = async () => {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    if (user) {
      resolve(user.uid);
    } else {
      reject("No user is currently authenticated.");
    }
  });
};

export const addS3LinksToFirebase = async (filesData, userId = "global", userEmail = "unknown") => {
  try {
    const filesArray = Array.isArray(filesData) ? filesData : [filesData];
    const filesRef = firebase.database().ref(`users/${userId}/files`);

    const promises = filesArray.map((fileData) => {
      const { url, type, size, width, height, duration, originalName } = fileData;

      const fileId = uuidv4();

      const fileMetadata = {
        imageId: fileId, 
        url,
        fileType: type,
        fileSize: `${(size / 1024 / 1024).toFixed(2)} MB`, 
        originalName: originalName,
        width: width || null,
        height: height || null,
        duration: duration || null,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        modifiedAt: firebase.database.ServerValue.TIMESTAMP,
        createdBy: userEmail,
        modifiedBy: userEmail,
      };

      return filesRef.child(fileId).set(fileMetadata);
    });

    await Promise.all(promises);
    console.log("File links with metadata, including original file name, added to Firebase.");
  } catch (error) {
    console.error("Error adding S3 links to Firebase:", error);
    throw error;
  }
};


export const removeItem = (playlistId, itemId) => {
  const databaseRef = firebase.database().ref(`playlists/${playlistId}/items`);

  return databaseRef
    .once("value") 
    .then((snapshot) => {
      const items = snapshot.val();
      if (!items) return;
      const keyToRemove = Object.keys(items).find((key) => items[key].id === itemId);

      if (keyToRemove) {
        return databaseRef.child(keyToRemove).remove();
      } else {
        console.warn(`Item with ID ${itemId} not found in playlist ${playlistId}`);
        return Promise.resolve();
      }
    })
    .then(() => {
      console.log(`Item ${itemId} removed successfully from playlist ${playlistId}`);
    })
    .catch((error) => {
      console.error("Error removing item: ", error);
    });
};

export const addScreenToFirebase = async (tvSerial, userID, screenName) => {
  try {
    const ref1 = firebase.database().ref(`screens/${tvSerial}`);
    const ref2 = firebase.database().ref(`users/${userID}/devices/${tvSerial}`);

    const screenData = {
      activationDate: Date.now(),
      currentPlaylistAssigned: null,
      assignedTo: userID,
      paired: true
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

export const updatePlaylistOrder = async (playlistId, reorderedItems, userID) => {
  const database = firebase.database().ref(`playlists/${playlistId}/items`);
  return database
    .set(reorderedItems)
    .then(() => {
      console.log(`Playlist ${playlistId} reordered successfully in Firebase.`);
    })
    .catch((error) => {
      console.error("Error updating playlist order in Firebase:", error);
    });
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
        paired: false
      })
    );

    await Promise.all(updates);
    console.log("Screen successfully disassociated from user and playlist.");
  } catch (error) {
    console.error("Error disassociating screen:", error);
    throw error;
  }
};
