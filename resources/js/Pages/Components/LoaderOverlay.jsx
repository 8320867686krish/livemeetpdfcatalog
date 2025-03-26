// import { motion, AnimatePresence } from "framer-motion";
// import "./LoaderOverlay.css"; // Import custom CSS

// const LoaderOverlay = ({ isLoading }) => {
//     return (
//         // <AnimatePresence>
//             // {isLoading && (
//                 // <motion.div
//                 //     className="loader-overlay"
//                 //     initial={{ opacity: 0 }}
//                 //     animate={{ opacity: 1 }}
//                 //     exit={{ opacity: 0 }}
//                 // >
//                     <div className="loader-container">
//                         <div className="loader"></div>
//                         <span>Loading...</span>
//                         <PDFFactoryLoader />
//                     </div>
//                 // </motion.div>
//             // )}
//         // </AnimatePresence>
//     );
// };

// export default LoaderOverlay;

// import React, { useState, useEffect } from 'react';

// const PDFFactoryLoader = () => {
//   const [cycle, setCycle] = useState(0);
  
//   // Restart the animation cycle when it completes
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setCycle((prev) => (prev + 1) % 1000); // Large number to avoid issues
//     }, 6000); // Full cycle duration
    
//     return () => clearTimeout(timer);
//   }, [cycle]);

//   return (
//     <div className="w-full max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
//       <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Assembling Your PDF...</h3>
      
//       <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
//         {/* Factory background with grid */}
//         <div className="absolute inset-0 bg-gray-300">
//           <div className="w-full h-full" style={{ 
//             backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
//             backgroundSize: '20px 20px' 
//           }}></div>
//         </div>
        
//         {/* Assembly line */}
//         <div className="absolute bottom-10 left-0 right-0 h-6 bg-gray-400"></div>
        
//         {/* PDF document on assembly line */}
//         <motion.div 
//           className="absolute w-32 h-40 bg-white rounded shadow-md"
//           initial={{ left: "50%", bottom: "45px", y: 200 }}
//           animate={{ y: 0 }}
//           style={{ marginLeft: "-50px", x: "-50%" }}
//         >
//           {/* Dynamically added elements */}
//           <motion.div
//             className="absolute top-5 left-4 right-4 h-2 bg-gray-300 rounded"
//             initial={{ scaleX: 0, opacity: 0 }}
//             animate={{ 
//               scaleX: [0, 1, 1],
//               opacity: [0, 1, 1]
//             }}
//             transition={{ 
//               delay: 0.5, 
//               duration: 1,
//               times: [0, 0.7, 1],
//               repeat: Infinity,
//               repeatDelay: 4.5
//             }}
//           />
          
//           <motion.div
//             className="absolute top-10 left-4 right-4 h-2 bg-gray-300 rounded"
//             initial={{ scaleX: 0, opacity: 0 }}
//             animate={{ 
//               scaleX: [0, 1, 1],
//               opacity: [0, 1, 1]
//             }}
//             transition={{ 
//               delay: 0.8, 
//               duration: 1,
//               times: [0, 0.7, 1],
//               repeat: Infinity,
//               repeatDelay: 4.2
//             }}
//           />
          
//           <motion.div
//             className="absolute top-15 left-4 w-10 h-10 bg-blue-100 rounded"
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ 
//               scale: [0, 1, 1],
//               opacity: [0, 1, 1]
//             }}
//             transition={{ 
//               delay: 1.2, 
//               duration: 0.8,
//               times: [0, 0.7, 1],
//               repeat: Infinity,
//               repeatDelay: 4.0
//             }}
//           />
          
//           <motion.div
//             className="absolute top-15 right-4 w-6 h-6 bg-red-100 rounded-full"
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ 
//               scale: [0, 1, 1],
//               opacity: [0, 1, 1]
//             }}
//             transition={{ 
//               delay: 1.5, 
//               duration: 0.8,
//               times: [0, 0.7, 1],
//               repeat: Infinity,
//               repeatDelay: 3.7
//             }}
//           />
          
//           <motion.div
//             className="absolute top-28 left-4 right-4 h-6 bg-gray-200 rounded"
//             initial={{ scaleX: 0, opacity: 0 }}
//             animate={{ 
//               scaleX: [0, 1, 1],
//               opacity: [0, 1, 1]
//             }}
//             transition={{ 
//               delay: 2.0, 
//               duration: 1,
//               times: [0, 0.7, 1],
//               repeat: Infinity,
//               repeatDelay: 3.0
//             }}
//           />
          
//           {/* PDF completion stamp */}
//           <motion.div
//             className="absolute top-2 right-2 w-12 h-12 rounded-full border-4 border-green-500 flex items-center justify-center transform rotate-12"
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ 
//               scale: [0, 1.2, 1],
//               opacity: [0, 1, 1]
//             }}
//             transition={{ 
//               delay: 3.0, 
//               duration: 0.5,
//               times: [0, 0.6, 1],
//               repeat: Infinity,
//               repeatDelay: 2.5
//             }}
//           >
//             <motion.span 
//               className="text-green-500 text-xs font-bold"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ 
//                 delay: 3.1, 
//                 duration: 0.3,
//                 repeat: Infinity,
//                 repeatDelay: 2.6
//               }}
//             >
//               PDF
//             </motion.span>
//           </motion.div>
//         </motion.div>
        
//         {/* Robotic arms */}
        
//         {/* Left robotic arm */}
//         <div className="absolute left-8 top-6 origin-bottom-left">
//           <motion.div 
//             className="absolute w-4 h-24 bg-gray-600 rounded-t-full origin-bottom"
//             style={{ left: 0, bottom: 0 }}
//             animate={{ 
//               rotateZ: [0, -25, -45, -25, 0],
//               x: [0, 10, 40, 10, 0]
//             }}
//             transition={{ 
//               duration: 3, 
//               times: [0, 0.2, 0.5, 0.8, 1],
//               repeat: Infinity,
//               repeatDelay: 0
//             }}
//           >
//             <motion.div
//               className="absolute top-0 left-1/2 w-8 h-4 bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 rounded origin-center"
//               animate={{ 
//                 rotateZ: [0, 25, 45, 25, 0]
//               }}
//               transition={{ 
//                 duration: 3, 
//                 times: [0, 0.2, 0.5, 0.8, 1],
//                 repeat: Infinity,
//                 repeatDelay: 0
//               }}
//             >
//               <div className="absolute left-0 top-0 w-1 h-4 bg-gray-400 rounded-full"></div>
//               <div className="absolute right-0 top-0 w-1 h-4 bg-gray-400 rounded-full"></div>
//             </motion.div>
//           </motion.div>
//           <div className="w-8 h-6 bg-gray-700 rounded-t-lg"></div>
//         </div>
        
//         {/* Right robotic arm */}
//         <div className="absolute right-8 top-10 origin-bottom-right">
//           <motion.div 
//             className="absolute w-4 h-20 bg-gray-600 rounded-t-full origin-bottom"
//             style={{ right: 0, bottom: 0 }}
//             animate={{ 
//               rotateZ: [0, 30, 45, 30, 0],
//               x: [0, -10, -30, -10, 0]
//             }}
//             transition={{ 
//               duration: 3, 
//               times: [0, 0.3, 0.6, 0.8, 1],
//               repeat: Infinity,
//               repeatDelay: 0,
//               delay: 1
//             }}
//           >
//             <motion.div
//               className="absolute top-0 left-1/2 w-6 h-6 bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 rounded-full origin-center"
//               animate={{ 
//                 rotateZ: [0, -25, -45, -25, 0]
//               }}
//               transition={{ 
//                 duration: 3, 
//                 times: [0, 0.3, 0.6, 0.8, 1],
//                 repeat: Infinity,
//                 repeatDelay: 0,
//                 delay: 1
//               }}
//             >
//               <div className="absolute left-1 top-2 w-4 h-2 bg-gray-400 rounded-full"></div>
//             </motion.div>
//           </motion.div>
//           <div className="w-8 h-6 bg-gray-700 rounded-t-lg"></div>
//         </div>
        
//         {/* Top robotic arm (stamper) */}
//         <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
//           <motion.div 
//             className="absolute w-6 h-16 bg-gray-600 origin-top"
//             style={{ top: 0, left: -3 }}
//             animate={{ 
//               scaleY: [1, 1.3, 1.5, 1.3, 1],
//               y: [0, 20, 40, 20, 0]
//             }}
//             transition={{ 
//               duration: 2, 
//               times: [0, 0.3, 0.5, 0.7, 1],
//               repeat: Infinity,
//               repeatDelay: 1,
//               delay: 2.5
//             }}
//           >
//             <motion.div
//               className="absolute bottom-0 left-1/2 w-10 h-6 bg-gray-500 transform -translate-x-1/2 rounded"
//               animate={{ 
//                 scaleX: [1, 1.1, 1, 1.1, 1]
//               }}
//               transition={{ 
//                 duration: 2, 
//                 times: [0, 0.3, 0.5, 0.7, 1],
//                 repeat: Infinity,
//                 repeatDelay: 1,
//                 delay: 2.5
//               }}
//             >
//               <div className="absolute left-1/2 bottom-0 w-8 h-2 bg-green-500 transform -translate-x-1/2 rounded-b"></div>
//             </motion.div>
//           </motion.div>
//           <div className="w-12 h-4 bg-gray-700 rounded-b-lg"></div>
//         </div>
//       </div>
      
//       {/* Status indicator */}
//       <div className="mt-4 flex justify-between items-center">
//         <span className="text-sm text-gray-600">Processing components...</span>
//         <div className="w-24 h-2 bg-gray-300 rounded-full overflow-hidden">
//           <motion.div 
//             className="h-full bg-blue-500"
//             animate={{ 
//               width: ["0%", "100%"]
//             }}
//             transition={{ 
//               duration: 5,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default PDFFactoryLoader;