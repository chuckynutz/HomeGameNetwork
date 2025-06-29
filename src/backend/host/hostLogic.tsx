import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {doc, setDoc, getDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { storage, db } from '../../lib/firebase'
import { hostGame, searchGames, getGameById, deleteGame } from '../games/gameUtils';

// Re-export the functions from gameUtils for consistency
export { hostGame, searchGames, getGameById, deleteGame };