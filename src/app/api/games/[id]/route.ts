import { NextRequest, NextResponse } from 'next/server';
import { getGameById } from '../../../../backend/games/gameUtils';

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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    const game = await getGameById(id);
    
    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    // Transform the game data for the frontend
    const transformedGame = {
      id: game.id,
      title: game.gameTitle,
      host: game.hostName,
      hostId: game.hostId,
      image: game.photoURL || 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=400&h=200&fit=crop',
      location: {
        address: game.address,
        // Better address parsing
        city: parseCity(game.address),
        state: parseState(game.address),
      },
      // Convert Firestore Timestamp to proper date/time format
      date: game.date?.toDate ? game.date.toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      time: game.date?.toDate ? game.date.toDate().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }) : '19:00',
      datetime: game.date?.toDate ? game.date.toDate().toISOString() : new Date().toISOString(),
      currentPlayers: game.guests ? game.guests.length + 1 : 1, // +1 for host
      maxPlayers: game.maxPlayers,
      buyIn: game.buyIn,
      gameType: game.gameType,
      description: game.description,
      amenities: game.chosenAmenities || [],
      players: [
        {
          id: game.hostId,
          name: game.hostName,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
          status: 'host'
        },
        // Add guest players if they exist
        ...(game.guests || []).map((guestId: string, index: number) => ({
          id: guestId,
          name: `Player ${index + 2}`, // Simple placeholder name
          avatar: `https://images.unsplash.com/photo-${1494790108755 + index}?w=50&h=50&fit=crop&crop=face`,
          status: 'confirmed'
        }))
      ]
    };

    return NextResponse.json(transformedGame);
  } catch (error) {
    console.error('Error fetching game:', error);
    return NextResponse.json(
      { error: 'Failed to fetch game' },
      { status: 500 }
    );
  }
}
