import { NextRequest, NextResponse } from 'next/server';
import { hostGame, searchGames } from '../../../backend/games/gameUtils';
import { Timestamp } from 'firebase/firestore';

// Helper functions to parse address components
function parseCity(address: string): string {
  if (!address) return 'Unknown City';
  
  const parts = address.split(',');
  if (parts.length >= 2) {
    return parts[parts.length - 2].trim();
  }
  return 'Unknown City';
}

function parseState(address: string): string {
  if (!address) return 'Unknown State';
  
  const parts = address.split(',');
  if (parts.length >= 1) {
    const lastPart = parts[parts.length - 1].trim();
    // Extract state from "State ZIP" format
    const stateMatch = lastPart.match(/([A-Z]{2})\s+\d{5}/);
    if (stateMatch) {
      return stateMatch[1];
    }
    // If no ZIP, try to get first 2 characters if they're uppercase
    if (lastPart.length >= 2 && /^[A-Z]{2}/.test(lastPart)) {
      return lastPart.substring(0, 2);
    }
  }
  return 'Unknown State';
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const gameType = formData.get('gameType') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const maxPlayers = parseInt(formData.get('maxPlayers') as string);
    const buyIn = parseFloat(formData.get('buyIn') as string);
    const location = formData.get('location') as string;
    const description = formData.get('description') as string;
    const amenities = formData.get('amenities') as string;
    const hostId = formData.get('hostId') as string;
    const hostName = formData.get('hostName') as string;
    const photo = formData.get('photo') as File | null;

    // Validate required fields
    if (!title || !gameType || !date || !time || !maxPlayers || !buyIn || !location || !hostId || !hostName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Parse amenities array
    const chosenAmenities = amenities ? JSON.parse(amenities) : [];

    // Combine date and time into a single Timestamp
    const gameDateTime = new Date(`${date}T${time}`);
    const gameTimestamp = Timestamp.fromDate(gameDateTime);

    // Create game data object
    const gameData = {
      gameTitle: title,
      gameType,
      hostId,
      hostName,
      photo,
      date: gameTimestamp,
      maxPlayers,
      buyIn,
      address: location,
      chosenAmenities,
      description
    };

    // Call the hostGame function
    const gameId = await hostGame(gameData);

    if (gameId) {
      return NextResponse.json(
        { success: true, gameId },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to create game' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating game:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const games = await searchGames({});
    
    if (games) {
      // Transform the data to match the frontend format
      const transformedGames = games.map((game: any) => {
        const gameDate = game.date.toDate();
        
        return {
          id: game.id,
          title: game.gameTitle,
          host: game.hostName,
          image: game.photoURL || 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=400&h=200&fit=crop',
          location: {
            city: parseCity(game.address),
            state: parseState(game.address),
            address: game.address
          },
          date: gameDate.toISOString().split('T')[0],
          time: gameDate.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          currentPlayers: game.guests ? game.guests.length : 0,
          maxPlayers: game.maxPlayers,
          buyIn: game.buyIn,
          gameType: game.gameType,
          skillLevel: 'Intermediate', // You might want to add this field to your database
          amenities: game.chosenAmenities || [],
          description: game.description,
          hostId: game.hostId
        };
      });

      return NextResponse.json(transformedGames);
    } else {
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}
