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
}
