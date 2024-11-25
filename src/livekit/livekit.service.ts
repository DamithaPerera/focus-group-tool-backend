import { Injectable } from '@nestjs/common';

@Injectable()
export class LiveKitService {
  private serverUrl = process.env.LIVEKIT_SERVER_URL!;
  private apiKey = process.env.LIVEKIT_API_KEY!;
  private secretKey = process.env.LIVEKIT_SECRET_KEY!;

  async generateToken(roomName: string, identity: string, role: 'moderator' | 'participant' | 'observer'): Promise<string> {
    // Dynamically import the ES Module
    const { AccessToken } = await import('livekit-server-sdk');
    const at = new AccessToken(this.apiKey, this.secretKey, { identity });
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: role !== 'observer',
      canSubscribe: true,
    });
    return await at.toJwt();
  }

  getServerUrl(): string {
    return this.serverUrl;
  }
}
