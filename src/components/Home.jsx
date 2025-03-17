import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// Function to generate a random ID
function randomID(len = 5) {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Function to get URL parameters
export function getUrlParams(url = window.location.href) {
  let params = new URLSearchParams(url.split('?')[1]);
  return params;
}

export default function App() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const userID = randomID(5);
  const userName = "User_" + userID;

  React.useEffect(() => {
    console.log(`Joining Room: ${roomID}`);
    console.log(`User ID: ${userID}, Username: ${userName}`);
  }, []);

  let myMeeting = async (element) => {
    if (!element) return;

    try {
      // ZegoCloud Credentials
      const appID = 740155524;
      const serverSecret = "6f2bb83b004eaabeced49ec04ac20f64";
      
      // Generate Kit Token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      // Create ZegoUIKitPrebuilt instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Join the video call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Invite Link',
            url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        turnOnRemoteCameraWhenJoining: true,  // Auto-enable remote camera
        turnOnMicrophoneWhenJoining: true,    // Auto-enable microphone
        showNonVideoUser: true,               // Show users even if camera is off
        showUserList: true,                   // Show participant list
        showRoomTimer: true,                   // Show room duration timer
        showLeavingConfirmDialog: true,        // Confirm before leaving
        showScreenSharingButton: true,         // Enable screen sharing
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });

    } catch (error) {
      console.error("Error initializing meeting:", error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Video Chat Room</h2>
      <p style={{ textAlign: 'center' }}>
        Share this link: <strong>{window.location.href}</strong>
      </p>
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: '100vw', height: '90vh' }}
      ></div>
    </div>
  );
}
