import { PhoneCallIcon, PhoneIcon, VideoIcon } from "lucide-react";

export default function CallButton({ handleVideoCall }) {
  return (
    <div className="p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0">
      <button onClick={handleVideoCall} className="btn btn-primary btn-sm text-white">
        <VideoIcon className="size-6" />
      </button>
    </div>
  );
}
// export function AudioCallButton({ handleAudioCall }) {
//   return (
//     <div className="p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0 right-15">
//       <button onClick={handleAudioCall} className="btn btn-secondary btn-sm text-white">
//         <PhoneCallIcon className="size-5" />
//       </button>
//     </div>
//   );
// }

