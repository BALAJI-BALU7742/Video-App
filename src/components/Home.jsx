import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const userID = randomID(5);
  const userName = "User_" + userID;

  let myMeeting = async (element) => {
    // Generate Kit Token
    const appID = 740155524;
    const serverSecret = "6f2bb83b004eaabeced49ec04ac20f64";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Start the call with updated configurations
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' + roomID,
        },
      ],
      turnOnRemoteCameraWhenJoining: true,  // Turns on remote camera
      turnOnMicrophoneWhenJoining: true,    // Turns on microphone automatically
      showNonVideoUser: true,               // Shows users even if their camera is off
      showUserList: true,                    // Shows participant list
      showRoomTimer: true,                   // Displays call duration
      showLeavingConfirmDialog: true,        // Asks before leaving
      showScreenSharingButton: true,         // Enables screen sharing
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
