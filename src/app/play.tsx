// "use client";
// import { useEffect, useRef, useState } from "react";
// import { Button } from "@/component/ui/button/index";
// import { Upload, Camera, ArrowLeft } from "lucide-react";

// export default function Home() {
//   const [showCamera, setShowCamera] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const streamRef = useRef<MediaStream | null>(null);

//   // ✅ Start camera feed
//   const startCamera = async () => {
//     try {
//       setErrorMsg("");
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "environment" }, // Use back camera on mobile if available
//         audio: false,
//       });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play(); // ensure playback starts
//       }
//       streamRef.current = stream;
//       setCameraActive(true);
//     } catch (err) {
//       console.error("Camera error:", err);
//       setErrorMsg("Camera access denied or unavailable. Please allow permissions.");
//     }
//   };

//   // ✅ Stop camera feed
//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//     setCameraActive(false);
//   };

//   // stop camera when leaving
//   useEffect(() => {
//     return () => stopCamera();
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-2">
//       {/* 1️⃣ FIRST SECTION */}
//       {!showCamera && (
//         <div className="flex flex-col gap-[38px] p-2">
//           <div className="flex flex-col gap-[4px] text-center">
//             <h1 className="text-[#105AE2] text-[32px] font-bold leading-[100%]">SnapMyFine</h1>
//             <p className="text-[#B2B2B3] text-[16px] leading-[24px]">Pay your parking fine in seconds</p>
//           </div>

//           <div className="w-full max-w-md flex flex-col items-center gap-6">
//             <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
//               <Button
//                 className="p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full"
//                 onClick={() => setShowCamera(true)}
//               >
//                 <Camera className="w-[24px] h-[24px] text-[white]" />
//                 <p>Scan Ticket</p>
//               </Button>
//               <Button className="p-[12px] text-[14px] text-[#323333] border border-[#7B8084] w-full">
//                 <Upload className="w-[24px] h-[24px] text-[#323333]" />
//                 <p>Upload from Gallery</p>
//               </Button>
//             </div>

//             <div className="text-[#19191A] bg-[#F1F7FE] p-[16px] w-full rounded-[12px]">
//               <h2 className="text-[16px] font-medium font-inter leading-[24px]">How it works</h2>
//               <ol className="text-[11px] font-medium font-inter list-decimal list-inside">
//                 <li>Pay us securely through your bank.</li>
//                 <li>We process your payment and handle paperwork.</li>
//                 <li>You receive a confirmation once payment is made.</li>
//               </ol>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 2️⃣ CAMERA SECTION */}
//       {showCamera && (
//         <div className="w-full">
//           <div className="w-full flex flex-col gap-[1px]">
//             <button
//               className="flex items-center gap-[16px] text-gray-700 hover:text-black"
//               onClick={() => {
//                 stopCamera();
//                 setShowCamera(false);
//               }}
//             >
//               <div className="p-[12px] rounded-full bg-[#E7EFFD]">
//                 <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
//               </div>
//               <p className="flex flex-col text-left">
//                 <span className="text-[#19191A] text-[20px] leading-[28px] font-inter font-semibold">
//                   SnapMyFine
//                 </span>
//                 <span className="text-[#4A4C4F] text-[16px] leading-[24px] font-inter font-regular">
//                   Pay your parking fine in seconds
//                 </span>
//               </p>
//             </button>

//             <div className="w-full px-[12px] py-[15px]">
//               <div className="bg-[#EAE9FC] w-full h-[423px] flex flex-col items-center justify-center gap-1 rounded-[12px] overflow-hidden">
//                 {!cameraActive ? (
//                   <>
//                     <Camera className="w-[48px] h-[48px] text-[#105AE2]" />
//                     <p className="text-[black] text-[12px] font-inter font-regular">
//                       Position ticket within frame
//                     </p>
//                   </>
//                 ) : (
//                   <video
//                     ref={videoRef}
//                     autoPlay
//                     playsInline
//                     muted
//                     className="w-full h-full object-cover rounded-[12px]"
//                   />
//                 )}
//               </div>
//               {errorMsg && (
//                 <p className="text-red-600 text-sm mt-2 text-center">{errorMsg}</p>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
//             {!cameraActive ? (
//               <Button
//                 className="p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full"
//                 onClick={startCamera}
//               >
//                 <Camera className="w-[24px] h-[24px] text-[white]" />
//                 <p>Capture Ticket</p>
//               </Button>
//             ) : (
//               <Button
//                 className="p-[12px] text-[14px] text-[white] bg-red-500 w-full"
//                 onClick={stopCamera}
//               >
//                 Stop Camera
//               </Button>
//             )}

//             <Button className="p-[12px] text-[14px] text-[#323333] border border-[#7B8084] w-full">
//               <Upload className="w-[24px] h-[24px] text-[#323333]" />
//               <p>Upload from Gallery</p>
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";
// import { useRef, useState } from "react";

// export default function CameraWithPreview() {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [snapshot, setSnapshot] = useState<string | null>(null);
//   const [showPreview, setShowPreview] = useState(false);

//   const startCamera = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     if (videoRef.current) {
//       videoRef.current.srcObject = stream;
//       await videoRef.current.play();
//     }
//   };

//   const takeSnapshot = () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imgData = canvas.toDataURL("image/png");
//     setSnapshot(imgData);
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 p-6">
//       {/* Live Camera Feed */}
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         className="w-full max-w-md rounded-lg border border-gray-300"
//       ></video>

//       <canvas ref={canvasRef} className="hidden"></canvas>

//       {/* Buttons */}
//       <div className="flex gap-4">
//         <button
//           onClick={startCamera}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//         >
//           Start Camera
//         </button>
//         <button
//           onClick={takeSnapshot}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg"
//         >
//           Take Snapshot
//         </button>
//       </div>

    //   {/* Snapshot Preview */}
    //   {snapshot && (
    //     <div className="mt-4 flex flex-col items-center">
    //       <p className="text-gray-600 text-sm mb-2">📸 Snapshot Preview</p>
    //       <img
    //         src={snapshot}
    //         alt="Captured snapshot"
    //         onClick={() => setShowPreview(true)}
    //         className="w-full max-w-md rounded-lg border border-gray-400 cursor-pointer hover:opacity-80 transition"
    //       />
    //       <p className="text-xs text-gray-500 mt-2">Click image to enlarge</p>
    //     </div>
    //   )}

    //   {/* Fullscreen Modal Preview */}
    //   {showPreview && snapshot && (
    //     <div
    //       className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    //       onClick={() => setShowPreview(false)}
    //     >
    //       <img
    //         src={snapshot}
    //         alt="Full preview"
    //         className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg border border-gray-200"
    //       />
    //       <button
    //         onClick={() => setShowPreview(false)}
    //         className="absolute top-5 right-5 text-white bg-black/50 px-3 py-1 rounded-md text-sm"
    //       >
    //         ✕ Close
    //       </button>
    //     </div>
    //   )}
//     </div>
//   );
// }


// "use client";
// import { useEffect, useRef, useState } from "react";
// import { Button } from "@/component/ui/button/index";
// import { Upload, Camera, ArrowLeft, X } from "lucide-react";

// export default function Home() {
//   const [showCamera, setShowCamera] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const streamRef = useRef<MediaStream | null>(null);

//   // ✅ Start camera feed
//   const startCamera = async () => {
//     try {
//       setErrorMsg("");
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: { ideal: "environment" } },
//         audio: false,
//       });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         await videoRef.current.play();
//       }
//       streamRef.current = stream;
//       setCameraActive(true);
//     } catch (err) {
//       console.error("Camera error:", err);
//       setErrorMsg("Camera access denied or unavailable. Please allow permissions.");
//     }
//   };

//   // ✅ Stop camera feed
//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//     setCameraActive(false);
//   };

//   // ✅ Capture snapshot
//   const captureImage = () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataUrl = canvas.toDataURL("image/png");
//     setCapturedImage(dataUrl);
//     stopCamera();
//   };

//   // ✅ Automatically start camera when `showCamera` is true
//   useEffect(() => {
//     if (showCamera) {
//       startCamera();
//     } else {
//       stopCamera();
//     }
//     return () => stopCamera();
//   }, [showCamera]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-2 relative">
//       {/* 🩵 1️⃣ FIRST SECTION */}
//       {!showCamera && (
//         <div className="flex flex-col gap-[38px] p-2">
//           <div className="flex flex-col gap-[4px] text-center">
//             <h1 className="text-[#105AE2] text-[32px] font-bold leading-[100%]">SnapMyFine</h1>
//             <p className="text-[#B2B2B3] text-[16px] leading-[24px]">
//               Pay your parking fine in seconds
//             </p>
//           </div>

//           <div className="w-full max-w-md flex flex-col items-center gap-6">
//             <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
//               <Button
//                 className="p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full"
//                 onClick={() => setShowCamera(true)}
//               >
//                 <Camera className="w-[24px] h-[24px] text-[white]" />
//                 <p>Scan Ticket</p>
//               </Button>
//               <Button className="p-[12px] text-[14px] text-[#323333] border border-[#7B8084] w-full">
//                 <Upload className="w-[24px] h-[24px] text-[#323333]" />
//                 <p>Upload from Gallery</p>
//               </Button>
//             </div>

//             <div className="text-[#19191A] bg-[#F1F7FE] p-[16px] w-full rounded-[12px]">
//               <h2 className="text-[16px] font-medium font-inter leading-[24px]">How it works</h2>
//               <ol className="text-[11px] font-medium font-inter list-decimal list-inside">
//                 <li>Pay us securely through your bank.</li>
//                 <li>We process your payment and handle paperwork.</li>
//                 <li>You receive a confirmation once payment is made.</li>
//               </ol>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🟦 2️⃣ CAMERA SECTION */}
//       {showCamera && (
//         <div className="w-full">
//           <div className="w-full flex flex-col gap-[1px]">
//             <button
//               className="flex items-center gap-[16px] text-gray-700 hover:text-black"
//               onClick={() => setShowCamera(false)}
//             >
//               <div className="p-[12px] rounded-full bg-[#E7EFFD]">
//                 <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
//               </div>
//               <p className="flex flex-col text-left">
//                 <span className="text-[#19191A] text-[20px] leading-[28px] font-inter font-semibold">
//                   SnapMyFine
//                 </span>
//                 <span className="text-[#4A4C4F] text-[16px] leading-[24px] font-inter font-regular">
//                   Pay your parking fine in seconds
//                 </span>
//               </p>
//             </button>

//             {/* ✅ Live Camera Feed */}
//             <div className="w-full px-[12px] py-[15px]">
//               <div className="bg-[#EAE9FC] w-full h-[423px] flex items-center justify-center rounded-[12px] overflow-hidden">
//                 {cameraActive ? (
//                   <video
//                     ref={videoRef}
//                     autoPlay
//                     playsInline
//                     muted
//                     className="w-full h-full object-cover rounded-[12px]"
//                   />
//                 ) : (
//                   <div className="flex flex-col items-center justify-center">
//                     <Camera className="w-[48px] h-[48px] text-[#105AE2]" />
//                     <p className="text-black text-[12px]">Initializing camera...</p>
//                   </div>
//                 )}
//                 <canvas ref={canvasRef} className="hidden" />
//               </div>
//               {errorMsg && <p className="text-red-600 text-sm mt-2 text-center">{errorMsg}</p>}
//             </div>
//           </div>

//           {/* 🧠 Camera Action Buttons */}
//           <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
//             {cameraActive && (
//               <Button
//                 className="p-[12px] text-[14px] text-[white] bg-green-600 w-full"
//                 onClick={captureImage}
//               >
//                 <Camera className="w-[24px] h-[24px] text-[white]" />
//                 <p>Take Snapshot</p>
//               </Button>
//             )}
//             <Button className="p-[12px] text-[14px] text-[#323333] border border-[#7B8084] w-full">
//               <Upload className="w-[24px] h-[24px] text-[#323333]" />
//               <p>Upload from Gallery</p>
//             </Button>
//           </div>

//           {/* 🖼️ Captured Image Preview */}
//           {capturedImage && (
//             <div className="mt-4 w-full flex justify-center">
//               <img
//                 src={capturedImage}
//                 alt="Captured ticket"
//                 className="w-40 h-40 object-cover rounded-lg border border-gray-300 cursor-pointer"
//                 onClick={() => setShowModal(true)}
//               />
//             </div>
//           )}
//         </div>
//       )}

//       {/* 🪟 Modal */}
//       {showModal && capturedImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             className="relative bg-white p-2 rounded-lg max-w-[90%] max-h-[90%]"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-black"
//               onClick={() => setShowModal(false)}
//             >
//               <X className="w-6 h-6" />
//             </button>
//             <img
//               src={capturedImage}
//               alt="Full preview"
//               className="max-w-full max-h-[80vh] object-contain rounded-md"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
















// "use client";
// import Image from "next/image";
// import { Button } from "@/component/ui/button/index";
// import { Upload, Camera, ArrowLeft } from "lucide-react";
// import { useState, useRef } from "react";

// export default function Home() {
//   const [showCamera, setShowCamera] = useState(false);
//   const [isVideoVisible, setIsVideoVisible] = useState(false);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [snapshot, setSnapshot] = useState<string | null>(null);
//   const [showPreview, setShowPreview] = useState(false);

//   const startCamera = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     if (videoRef.current) {
//       videoRef.current.srcObject = stream;
//       await videoRef.current.play();
//       setIsVideoVisible(true); // Show video, hide position text
//     }
//   };

//   const takeSnapshot = () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imgData = canvas.toDataURL("image/png");
//     setSnapshot(imgData);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-2">
//       {/* 1st section */}
//       {!showCamera && (
//         <div className="flex flex-col gap-[38px] p-2">
//           <div className="flex flex-col gap-[4px] text-center">
//             <h1 className="text-[#105AE2] text-[32px] font-bold leading-[100%]">SnapMyFine</h1>
//             <p className="text-[#B2B2B3] text-[16px] leading-[24px]">Pay your parking fine in seconds</p>
//           </div>

//           <div className="w-full max-w-md flex flex-col items-center gap-6">
//             <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
//               <Button
//                 className="p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full"
//                 onClick={() => setShowCamera(true)}
//               >
//                 <Camera className="w-[24px] h-[24px] text-[white]" />
//                 <p>Scan Ticket</p>
//               </Button>
//               <Button className="p-[12px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full">
//                 <Upload className="w-[24px] h-[24px] text-[#323333]" />
//                 <p>Upload from Gallery</p>
//               </Button>
//             </div>

//             <div className="text-[#19191A] bg-[#F1F7FE] p-[16px] w-full">
//               <h2 className="text-[16px] font-medium font-inter leading-[24px]">How it works</h2>
//               <ol className="text-[11px] font-medium font-inter list-decimal list-inside">
//                 <li>Pay us securely through your bank.</li>
//                 <li>We process your payment and take care of all the paperwork.</li>
//                 <li>You receive a confirmation once the payment is made.</li>
//               </ol>
//             </div>
//             <p className="text-[14px] text-[#105AE2] font-medium font-inter text-center">Need help?</p>
//           </div>
//         </div>
//       )}

//       {/* 2nd section  */}
//       {showCamera && (
//         <div className="w-full">
//           <div className="w-full flex flex-col gap-[1px]">
//             <button
//               className="flex items-center gap-[16px] text-gray-700 hover:text-black"
//               onClick={() => setShowCamera(false)}
//             >
//               <div className="p-[12px] rounded-full bg-[#E7EFFD]">
//                 <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
//               </div>
//               <p className="flex flex-col text-left">
//                 <span className="text-[#19191A] text-[20px] leading-[28px] font-inter font-semibold">SnapMyFine</span>
//                 <span className="text-[#4A4C4F] text-[16px] leading-[24px] font-inter font-regular">Pay your parking fine in seconds</span>
//               </p>
//             </button>

//             <div className="w-full px-[12px] py-[15px]">
//               {/* Position ticket div - Hidden when video is visible */}
//               <div className={`bg-[#EAE9FC] w-full h-[423px] flex flex-col items-center justify-center gap-1 rounded-[12px] ${isVideoVisible ? 'hidden' : ''}`}>
//                 <Camera className="w-[48px] h-[48px] text-[#105AE2]" />
//                 <p className="text-[black] text-[12px] font-inter font-regular">Position ticket within frame</p>
//               </div>
              
//               {/* Video div - Visible when video is active */}
//               <div className={`${isVideoVisible ? '' : 'hidden'}`}>
//                 <video
//                   ref={videoRef}
//                   autoPlay
//                   playsInline
//                   className="w-full h-[423px] rounded-[12px] object-cover"
//                 ></video>
//               </div>

//               <canvas ref={canvasRef} className="hidden"></canvas>
//             </div>
//           </div>
//           <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
//             {/* Capture Ticket button - Visible when video is NOT showing */}
//             <Button 
//               onClick={startCamera} 
//               className={`p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full ${isVideoVisible ? 'hidden' : ''}`}
//             >
//               <Camera className="w-[24px] h-[24px] text-[white]" />
//               <p>Capture Ticket</p>
//             </Button>
            
//             {/* Take Snapshot button - Visible when video IS showing */}
//             <Button
//               onClick={takeSnapshot}
//               className={`p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full ${isVideoVisible ? '' : 'hidden'}`}
//             >
//               <Camera className="w-[24px] h-[24px] text-[white]" />
//               <p>Take Snapshot</p>
//             </Button>
            
//             <Button className="p-[12px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full">
//               <Upload className="w-[24px] h-[24px] text-[#323333]" />
//               <p>Upload from Gallery</p>
//             </Button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }
















// "use client";
// import Image from "next/image";
// import { Button } from "@/component/ui/button/index";
// import { Upload, Camera, ArrowLeft } from "lucide-react";
// import { useState, useRef } from "react";

// export default function Home() {
//   const [showCamera, setShowCamera] = useState(false);
//   const [isVideoVisible, setIsVideoVisible] = useState(false);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [snapshot, setSnapshot] = useState<string | null>(null);
//   const [showPreview, setShowPreview] = useState(false);

//   const startCamera = async () => {
//     try {
//       // Mobile-optimized camera settings
//       let stream;
//       try {
//         // Try back camera first (ideal for mobile document scanning)
//         stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             facingMode: 'environment', // Use back camera on mobile
//             width: { ideal: 1280 },
//             height: { ideal: 720 }
//           }
//         });
//       } catch (backCameraError) {
//         // Fallback to any available camera if back camera fails
//         stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             width: { ideal: 1280 },
//             height: { ideal: 720 }
//           }
//         });
//       }

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         await videoRef.current.play();
//         setIsVideoVisible(true); // Show video, hide position text
//       }
//     } catch (error: any) {
//       console.error('Camera access failed:', error);
//       if (error.name === 'NotAllowedError') {
//         alert('Camera permission denied. Please allow camera access in your browser settings.');
//       } else {
//         alert('Unable to access camera. Make sure your device has a camera and try again.');
//       }
//     }
//   };

//   const takeSnapshot = () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imgData = canvas.toDataURL("image/png");
//     setSnapshot(imgData);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-2">
//       {/* 1st section */}
//       {!showCamera && (
//         <div className="flex flex-col gap-[38px] p-2">
//           <div className="flex flex-col gap-[4px] text-center">
//             <h1 className="text-[#105AE2] text-[32px] font-bold leading-[100%]">SnapMyFine</h1>
//             <p className="text-[#B2B2B3] text-[16px] leading-[24px]">Pay your parking fine in seconds</p>
//           </div>

//           <div className="w-full max-w-md flex flex-col items-center gap-6">
//             <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
//               <Button
//                 className="p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full"
//                 onClick={() => setShowCamera(true)}
//               >
//                 <Camera className="w-[24px] h-[24px] text-[white]" />
//                 <p>Scan Ticket</p>
//               </Button>
//               <Button className="p-[12px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full">
//                 <Upload className="w-[24px] h-[24px] text-[#323333]" />
//                 <p>Upload from Gallery</p>
//               </Button>
//             </div>

//             <div className="text-[#19191A] bg-[#F1F7FE] p-[16px] w-full">
//               <h2 className="text-[16px] font-medium font-inter leading-[24px]">How it works</h2>
//               <ol className="text-[11px] font-medium font-inter list-decimal list-inside">
//                 <li>Pay us securely through your bank.</li>
//                 <li>We process your payment and take care of all the paperwork.</li>
//                 <li>You receive a confirmation once the payment is made.</li>
//               </ol>
//             </div>
//             <p className="text-[14px] text-[#105AE2] font-medium font-inter text-center">Need help?</p>
//           </div>
//         </div>
//       )}

//       {/* 2nd section  */}
//       {showCamera && (
//         <div className="w-full">
//           <div className="w-full flex flex-col gap-[1px]">
//             <button
//               className="flex items-center gap-[16px] text-gray-700 hover:text-black"
//               onClick={() => setShowCamera(false)}
//             >
//               <div className="p-[12px] rounded-full bg-[#E7EFFD]">
//                 <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
//               </div>
//               <p className="flex flex-col text-left">
//                 <span className="text-[#19191A] text-[20px] leading-[28px] font-inter font-semibold">SnapMyFine</span>
//                 <span className="text-[#4A4C4F] text-[16px] leading-[24px] font-inter font-regular">Pay your parking fine in seconds</span>
//               </p>
//             </button>

//             <div className="w-full px-[12px] py-[15px]">
//               {/* Position ticket div - Hidden when video is visible */}
//               <div className={`bg-[#EAE9FC] w-full h-[423px] flex flex-col items-center justify-center gap-1 rounded-[12px] ${isVideoVisible ? 'hidden' : ''}`}>
//                 <Camera className="w-[48px] h-[48px] text-[#105AE2]" />
//                 <p className="text-[black] text-[12px] font-inter font-regular">Position ticket within frame</p>
//               </div>

//               {/* Video div - Visible when video is active */}
//               <div className={`${isVideoVisible ? '' : 'hidden'}`}>
//                 <video
//                   ref={videoRef}
//                   autoPlay
//                   playsInline
//                   muted
//                   className="w-full h-[423px] rounded-[12px] object-cover"
//                 ></video>
//               </div>

//               <canvas ref={canvasRef} className="hidden"></canvas>
//             </div>

//           </div>
//           <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
//             {/* Capture Ticket button - Visible when video is NOT showing */}
//             <Button
//               onClick={startCamera}
//               className={`p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full ${isVideoVisible ? 'hidden' : ''}`}
//             >
//               <Camera className="w-[24px] h-[24px] text-[white]" />
//               <p>Capture Ticket</p>
//             </Button>

//             {/* Take Snapshot button - Visible when video IS showing */}
//             <Button
//               onClick={takeSnapshot}
//               className={`p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full ${isVideoVisible ? '' : 'hidden'}`}
//             >
//               <Camera className="w-[24px] h-[24px] text-[white]" />
//               <p>Take Snapshot</p>
//             </Button>

//             <Button className="p-[12px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full">
//               <Upload className="w-[24px] h-[24px] text-[#323333]" />
//               <p>Upload from Gallery</p>
//             </Button>
//           </div>
//         </div>
//       )}


//       {/* 3rd section */}
//       <div className="w-full hidden">
//         {/* Snapshot Preview */}
//         {snapshot && (
//           <div className="mt-4 flex flex-col items-center">
//             <p className="text-gray-600 text-sm mb-2">📸 Snapshot Preview</p>
//             <img
//               src={snapshot}
//               alt="Captured snapshot"
//               onClick={() => setShowPreview(true)}
//               className="w-full max-w-md rounded-lg border border-gray-400 cursor-pointer hover:opacity-80 transition"
//             />
//             <p className="text-xs text-gray-500 mt-2">Click image to enlarge</p>
//           </div>
//         )}

//         {/* Fullscreen Modal Preview */}
//         {showPreview && snapshot && (
//           <div
//             className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
//             onClick={() => setShowPreview(false)}
//           >
//             <img
//               src={snapshot}
//               alt="Full preview"
//               className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg border border-gray-200"
//             />
//             <button
//               onClick={() => setShowPreview(false)}
//               className="absolute top-5 right-5 text-white bg-black/50 px-3 py-1 rounded-md text-sm"
//             >
//               ✕ Close
//             </button>
//           </div>
//         )}

//         <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
//           <Button
//             onClick={takeSnapshot}
//             className={`p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full ${isVideoVisible ? '' : 'hidden'}`}
//           >
//             <Camera className="w-[24px] h-[24px] text-[white]" />
//             <p>Retake</p>
//           </Button>

//           <Button className="p-[12px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full">
//             <Upload className="w-[24px] h-[24px] text-[#323333]" />
//             <p>Upload from Gallery</p>
//           </Button>
//         </div>
//       </div>

//     </div>
//   );
// }