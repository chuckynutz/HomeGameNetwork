import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc, deleteDoc, Timestamp, collection, getDocs, addDoc } from 'firebase/firestore';
import { storage, db } from '../../lib/firebase'

export interface SearchGameOptions {
    gameTitle?: string,
    gameType?: string,
    hostId?: string,
    hostName?: string,
    photo?: File | null,
    date?: Timestamp,
    maxPlayers?: number,
    buyIn?: number,
    address?: string,
    chosenAmenities?: string[],
    description?: string,
    docId?: string
}

export interface GameImage {
    id: string,
    url: string,
    fileName: string,
    fileSize: number,
    fileType: string,
    uploadedAt: Timestamp,
    isMainImage: boolean,
    order?: number
}



export async function hostGame(data: {
    gameTitle: string,
    gameType: string,
    hostId: string,
    hostName: string,
    photo: File | null,
    date: Timestamp,
    maxPlayers: number,
    buyIn: number,
    address: string,
    chosenAmenities: string[],
    description: string
}): Promise<string | null> {
    try{
        if (data.photo && !(data.photo instanceof File)) {
            console.error('Invalid photo type. Expected a File obj.');
            return null;
        }
        
        // Create the game document first to get the ID (exclude photo from initial data)
        const { photo, ...gameDataWithoutPhoto } = data;
        const gamesRef = collection(db, 'games');
        const docRef = await addDoc(gamesRef, gameDataWithoutPhoto);
        
        let imageUrl: string | null = null;
        if (photo) {
            imageUrl = await saveImageToFirestore(photo, docRef.id);
            if (!imageUrl) {
                console.error('Failed to upload game photo');
                // Clean up the document if photo upload fails
                await deleteDoc(docRef);
                return null;
            }
        }
        
        return docRef.id;
    } catch (error) {
        console.error('Error hosting game:', error);
        return null;
    }
}

export async function updateGame(gameDocId: string, SearchGameOptions: SearchGameOptions): Promise<boolean> {
    try {
        const gameRef = doc(db, 'games', gameDocId);
        const gameDoc = await getDoc(gameRef);
        if (!gameDoc.exists()) {
            console.error('Game document does not exist');
            return false;
        }
        const gameData = gameDoc.data();
        if (!gameData) {
            console.error('Game data is undefined');
            return false;
        }
        const updatedData: any = {};
        if (SearchGameOptions.gameTitle)       updatedData.gameTitle = SearchGameOptions.gameTitle
        if (SearchGameOptions.gameType)        updatedData.gameType = SearchGameOptions.gameType;
        if (SearchGameOptions.hostId)          updatedData.hostId = SearchGameOptions.hostId;
        if (SearchGameOptions.hostName)        updatedData.hostName = SearchGameOptions.hostName;
        if (SearchGameOptions.photo)           updatedData.imageUrl = await saveImageToFirestore(SearchGameOptions.photo, gameDocId);
        if (SearchGameOptions.date)            updatedData.date = SearchGameOptions.date;
        if (SearchGameOptions.maxPlayers)      updatedData.maxPlayers = SearchGameOptions.maxPlayers;
        if (SearchGameOptions.buyIn)           updatedData.buyIn = SearchGameOptions.buyIn;
        if (SearchGameOptions.address)         updatedData.address = SearchGameOptions.address;
        if (SearchGameOptions.chosenAmenities) updatedData.chosenAmenities = SearchGameOptions.chosenAmenities;
        if (SearchGameOptions.description)     updatedData.description = SearchGameOptions.description;
        await setDoc(gameRef, { ...gameData, ...updatedData });
        return true;
    } catch (error) {
        console.error('Error updating game:', error);
        return false;
    }
}

export async function addGuest(guestId: string, gameDocId: string): Promise<boolean> {
    try {
        const gameRef = doc(db, 'games', gameDocId);
        const gameDoc = await getDoc(gameRef);
        if (!gameDoc.exists()) {
            console.error('Game document does not exist');
            return false;
        }
        const gameData = gameDoc.data();
        if (!gameData) {
            console.error('Game data is undefined');
            return false;
        }
        const guests = gameData.guests || [];
        if (guests.includes(guestId)) {
            console.warn('Guest already added to the game');
            return true; // Guest already exists, no need to add again
        }
        guests.push(guestId);
        await setDoc(gameRef, { guests }, { merge: true });
        return true;
    }
    catch (error) {
        console.error('Error adding guest to game:', error);
        return false;
    }
}

export async function searchGames(options: SearchGameOptions = {}): Promise<any | null> {
    const { gameTitle, gameType, hostId, hostName, photo, date, maxPlayers, buyIn, address, chosenAmenities, description, docId } = options;
    const games = [];
    try {
        const gamesRef = collection(db, 'games');
        const querySnapshot = await getDocs(gamesRef);
        
        // If no search criteria provided, return all games
        const hasSearchCriteria = gameTitle || gameType || hostId || hostName || date || maxPlayers || buyIn || address || docId || (chosenAmenities && chosenAmenities.length > 0) || description;
        
        for (const doc of querySnapshot.docs) {
            const game = doc.data();
            let match = true;

            if (hasSearchCriteria) {
                if (gameTitle && game.gameTitle !== gameTitle) match = false;
                if (gameType && game.gameType !== gameType) match = false;
                if (hostId && game.hostId !== hostId) match = false;
                if (hostName && game.hostName !== hostName) match = false;
                if (date && (!game.date || game.date.toMillis() !== date.toMillis())) match = false;
                if (maxPlayers && game.maxPlayers !== maxPlayers) match = false;
                if (buyIn && game.buyIn !== buyIn) match = false;
                if (address && game.address !== address) match = false;
                if (docId && doc.id !== docId) match = false;
                if (chosenAmenities && chosenAmenities.length > 0) {
                    if (!game.chosenAmenities || !chosenAmenities.every((a: string) => game.chosenAmenities.includes(a))) {
                        match = false;
                    }
                }
                if (description && game.description !== description) match = false;
            }

            if (match) {
                games.push({id:doc.id,...game});
            }
        }   
        return games; // Return all matching games (or all games if no criteria)
    }
    catch (error) {
        console.error('Error fetching games:', error);
        return null;
    }
}

export async function deleteGame(gameId: string): Promise<boolean> {
    try {
        // Delete the main game document (images are stored in Firebase Storage, not Firestore subcollections)
        const gameRef = doc(db, 'games', gameId);
        await deleteDoc(gameRef);
        
        console.log('Game deleted successfully:', gameId);
        return true;
    } catch (error) {
        console.error('Error deleting game:', error);
        return false;
    }
}

export async function getGameById(gameId: string): Promise<any | null> {
    try {
        const gameRef = doc(db, 'games', gameId);
        const gameDoc = await getDoc(gameRef);
        if (gameDoc.exists()) {
            return {
                id: gameDoc.id,
                ...gameDoc.data()
            };
        } else {
            console.log('No game found with the given ID');
            return null;
        }
    } catch (error) {
        console.error('Error fetching game by ID:', error);
        return null;
    }
}

export async function uploadPhoto(file: File, folderPath: string, gameId: string): Promise<string | null> {
    try {
        if (!file) {
            console.error('No file provided for upload');
            return null;
        }
        // Use gameId instead of gameTitle for more reliable file naming
        const storageRef = ref(storage, `${folderPath}/${gameId}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading game photo:', error);
        return null;
    }
}

export async function saveImageToFirestore(file: File, gameId: string): Promise<string | null> {
    try {
        if (!file) {
            console.error('No file provided for upload');
            return null;
        }

        // Upload to Firebase Storage at /games/gameDocId/images/filename
        const storageRef = ref(storage, `games/${gameId}/images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Save the image URL directly to the game document in Firestore
        const gameRef = doc(db, 'games', gameId);
        await setDoc(gameRef, { 
            imageUrl: downloadURL,
            imageName: file.name,
            imageUploadedAt: Timestamp.now()
        }, { merge: true });

        console.log('Image saved to Firebase Storage and URL saved to Firestore');
        return downloadURL;
    } catch (error) {
        console.error('Error saving image:', error);
        return null;
    }
}

export async function saveMultipleImagesToFirestore(files: File[], gameId: string): Promise<string[]> {
    try {
        const uploadPromises = files.map(async (file, index) => {
            // Upload to Firebase Storage at /games/gameDocId/images/filename
            const storageRef = ref(storage, `games/${gameId}/images/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            return {
                url: downloadURL,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                uploadedAt: Timestamp.now(),
                isMainImage: index === 0, // First image is main image
                order: index
            };
        });

        const uploadedImages = await Promise.all(uploadPromises);
        
        // Save all image URLs to the game document in Firestore
        const gameRef = doc(db, 'games', gameId);
        await setDoc(gameRef, { 
            images: uploadedImages,
            mainImageUrl: uploadedImages[0]?.url || null
        }, { merge: true });

        console.log('Multiple images saved to Firebase Storage and URLs saved to Firestore:', uploadedImages.length);
        return uploadedImages.map(img => img.url);
    } catch (error) {
        console.error('Error saving multiple images:', error);
        return [];
    }
}

export async function getGameTitle(gameDocId: string): Promise<string | null> {
    try {
        const game = await getGameById(gameDocId);
        return game?.gameTitle || null;
    } catch (error) {
        console.error('Error fetching game title:', error);
        return null;
    }
}

export async function getGameType(gameDocId: string): Promise<string | null> {
    try {
        const game = await getGameById(gameDocId);
        return game?.gameType || null;
    } catch (error) {
        console.error('Error fetching game type:', error);
        return null;
    }
}

export async function getHostId(gameDocId: string): Promise<string | null> {
    try {
        const game = await getGameById(gameDocId);
        return game?.hostId || null;
    } catch (error) {
        console.error('Error fetching host ID:', error);
        return null;
    }
}

export async function getHostName(gameDocId: string): Promise<string | null> {
    try {
        const game = await getGameById(gameDocId);
        return game?.hostName || null;
    } catch (error) {
        console.error('Error fetching host name:', error);
        return null;
    }
}

export async function getGamePhotoURL(gameDocId: string): Promise<string | null> {
    try {
        const game = await getGameById(gameDocId);
        return game?.imageUrl || game?.photoURL || null;
    } catch (error) {
        console.error('Error fetching game photo URL:', error);
        return null;
    }
}

export async function getGameDate(gameDocId: string): Promise<Timestamp | null> {
    try {
        const game = await getGameById(gameDocId);
        return game?.date || null;
    } catch (error) {
        console.error('Error fetching game date:', error);
        return null;
    }
}

export async function getMaxPlayers(gameDocId: string): Promise<number | null> {
    try {
        const game = await getGameById(gameDocId);
        return game?.maxPlayers || null;
    } catch (error) {
        console.error('Error fetching max players:', error);
        return null;
    }
}

export async function getBuyIn(gameDocId: string): Promise<number | null> {
    try {
        const game = await getGameById(gameDocId);
        return game?.buyIn || null;
    } catch (error) {
        console.error('Error fetching buy-in:', error);
        return null;
    }
}

export async function getGameAddress(gameDocId: string): Promise<string | null> {
    try {
        const game = await getGameById(gameDocId);
        return game?.address || null;
    } catch (error) {
        console.error('Error fetching game address:', error);
        return null;
    }
}

export async function getChosenAmenities(gameDocId: string): Promise<string[] | null> {
    try {
        const game = await getGameById(gameDocId);
        return game?.chosenAmenities || null;
    } catch (error) {
        console.error('Error fetching chosen amenities:', error);
        return null;
    }
}

export async function getGameDescription(gameDocId: string): Promise<string | null> {
    try {
        const game = await getGameById(gameDocId);
        return game?.description || null;
    } catch (error) {
        console.error('Error fetching game description:', error);
        return null;
    }
}

export async function getGameImages(gameDocId: string): Promise<GameImage[] | null> {
    try {
        const game = await getGameById(gameDocId);
        if (!game || !game.images) {
            console.log('No images found for game:', gameDocId);
            return [];
        }

        return game.images as GameImage[];
    } catch (error) {
        console.error('Error fetching game images:', error);
        return null;
    }
}

export async function getMainGameImage(gameDocId: string): Promise<string | null> {
    try {
        const game = await getGameById(gameDocId);
        if (!game) {
            return null;
        }

        // Check for imageUrl (single image) or mainImageUrl (multiple images)
        return game.imageUrl || game.mainImageUrl || null;
    } catch (error) {
        console.error('Error fetching main game image:', error);
        return null;
    }
}

