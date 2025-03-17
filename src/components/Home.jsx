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

  let myMeeting = async (element) => {
    // Generate Kit Token
    const appID = 740155524;
    const serverSecret = "6f2bb83b004eaabeced49ec04ac20f64";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5), // User ID
      randomID(5)  // User Name
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
      showNonVideoUser: true, // Shows users even if their camera is off
      turnOnRemoteCameraWhenJoining: true, // Enables remote users' video
      turnOnMicrophoneWhenJoining: true, // Enables microphone automatically
      showRoomTimer: true, // Displays call duration timer
      showUserList: true, // Shows participant list
      showLeavingConfirmDialog: true, // Confirms before leaving the room
      layout: "Auto", // Adjusts video layout dynamically
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
