import { Injectable } from '@nestjs/common';
import { AccessToken, RoomServiceClient } from 'livekit-server-sdk';

@Injectable()
export class LivekitService {
  private roomService: RoomServiceClient;

  constructor() {
    this.roomService = new RoomServiceClient(
      process.env.LIVEKIT_SERVER_URL,
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_SECRET_KEY,
    );
  }

  // Generate LiveKit token for room access
  async generateToken(identity: string, roomName: string, role: string): Promise<string> {
    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_SECRET,
      { identity },
    );

    // Grant room access based on role
    const grantOptions = {
      roomJoin: true,
      roomName,
      canPublish: role !== 'observer',  // Participants and moderators can publish
      canSubscribe: true,               // Everyone can subscribe (view)
    };

    token.addGrant(grantOptions);  // Add the grant to the token

    // Return the generated token as a promise
    return token.toJwt();
  }

  // Create room in LiveKit
  async createRoom(roomName: string): Promise<void> {
    // Create the room in LiveKit
    await this.roomService.createRoom({
      name: roomName,
      emptyTimeout: 300, // Timeout for empty room (in seconds)
      maxParticipants: 50, // Maximum number of participants in the room
    });
  }

  // Mute participant in the room (Prevent publishing)
  async muteParticipant(roomName: string, identity: string): Promise<void> {
    try {
      // Mute participant by updating their publish permission
      await this.roomService.updateParticipant(roomName, identity, 'false'); // Disallow publishing audio/video
    } catch (error) {
      console.error('Error muting participant:', error);
      throw new Error('Error muting participant');
    }
  }

  // Unmute participant in the room (Allow publishing)
  async unmuteParticipant(roomName: string, identity: string): Promise<void> {
    try {
      // Unmute participant by allowing them to publish audio/video
      await this.roomService.updateParticipant(roomName, identity, 'true'); // Allow publishing audio/video
    } catch (error) {
      console.error('Error unmuting participant:', error);
      throw new Error('Error unmuting participant');
    }
  }

  // Remove a participant from the room
  async removeParticipant(roomName: string, identity: string): Promise<void> {
    try {
      await this.roomService.removeParticipant(roomName, identity);
    } catch (error) {
      console.error('Error removing participant:', error);
      throw new Error('Error removing participant');
    }
  }

  // Get active participants in a room
  async getParticipants(roomName: string): Promise<any> {
    try {
      const participants = await this.roomService.listParticipants(roomName);
      return participants;
    } catch (error) {
      console.error('Error getting participants:', error);
      throw new Error('Error fetching participants');
    }
  }
}
