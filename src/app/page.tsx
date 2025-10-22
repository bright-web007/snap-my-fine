"use client";
import { useState, useRef, useEffect } from "react";

// Import components
import HamburgerModal from "@/components/HamburgerModal";

// Import section components
import {
    HomeSection,
    CameraSection,
    ImagePreviewSection,
    ReviewSection,
    PaymentSection,
    RedirectingSection,
    PaymentReceivedSection,
    ProcessingSection,
    PaymentStatusSection,
    ReceiptSection,
    SaveFineSection,
    CheckInboxSection,
    PaymentFailedSection,
    SavedFinesSection,
    AllTransactionsSection,
    PartialPaymentStatusSection
} from "@/components/sections";

// Import types
import type { Transaction, FormData, ValidationErrors } from "@/types";

// Import stores and hooks
import { useTicketStore } from "@/lib/stores/ticketStore";
import { useTicketProcessor } from "@/lib/hooks/use-ticket";

export default function Home() {
    const { processTicket, fetchTickets } = useTicketProcessor();
    const [showCamera, setShowCamera] = useState(false);
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [showImagePreview, setShowImagePreview] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [snapshot, setSnapshot] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isProcessingTicket, setIsProcessingTicket] = useState(false);
    const [hasProcessingError, setHasProcessingError] = useState(false);
    const { savedTickets, ticketData, addSavedTicket, removeSavedTicket } = useTicketStore();

    // Fetch tickets on component mount
    useEffect(() => {
        const fetchSavedTickets = async () => {
            try {
                // You might want to get the user's email from somewhere (e.g., localStorage, auth context, etc.)
                // For now, I'll use a placeholder - you'll need to replace this with actual user email
                const userEmail = 'ogwurup@gmail.com'; // Replace with actual user email
                await fetchTickets(userEmail);
            } catch (error) {
                console.error('Error fetching saved tickets:', error);
            }
        };

        fetchSavedTickets();
    }, [fetchTickets]);

    // Sync ticketData to formData when ticketData is available
    useEffect(() => {
        if (ticketData) {
            setFormData(prev => ({
                ...prev,
                council: prev.council || ticketData.council_name || '',
                pcnNumber: prev.pcnNumber || ticketData.pcn_number || '',
                vehicleNumber: prev.vehicleNumber || ticketData.plate_number || '',
                fineAmount: prev.fineAmount || ticketData.amount?.toString() || ''
            }));
        }
    }, [ticketData]);



    // Form validation states
    const [formData, setFormData] = useState<FormData>({
        council: '',
        pcnNumber: '',
        vehicleNumber: '',
        fineAmount: '',
        email: ''
    });
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
        council: false,
        pcnNumber: false,
        vehicleNumber: false,
        fineAmount: false,
        email: false
    });

    // Transaction history state
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Section navigation state
    const [showReviewSection, setShowReviewSection] = useState(false); // 4th section
    const [showPaymentSection, setShowPaymentSection] = useState(false); // 5th section
    const [showRedirectingSection, setShowRedirectingSection] = useState(false); // 6th section
    const [showPaymentReceivedSection, setShowPaymentReceivedSection] = useState(false); // 7th section
    const [showProcessingSection, setShowProcessingSection] = useState(false); // 8th section
    const [showPaymentStatusSection, setShowPaymentStatusSection] = useState(false); // 9th section
    const [showReceiptSection, setShowReceiptSection] = useState(false); // 10th section
    const [showSaveFineSection, setShowSaveFineSection] = useState(false); // 11th section
    const [showCheckInboxSection, setShowCheckInboxSection] = useState(false); // 12th section
    const [showPaymentFailedSection, setShowPaymentFailedSection] = useState(false); // 13th section
    const [showSavedFinesSection, setShowSavedFinesSection] = useState(false); // 14th section
    const [showAllTransactionsSection, setShowAllTransactionsSection] = useState(false); // 15th section

    // Track if payment section is loaded from a saved fine
    const [isLoadedFromSavedFine, setIsLoadedFromSavedFine] = useState(false);

    // Track if user arrived at section 5 from section 14
    const [cameFromSavedFines, setCameFromSavedFines] = useState(false);  // Use the saved tickets from the store

    // Hamburger modal state
    const [showHamburgerModal, setShowHamburgerModal] = useState(false);

    // Section 16 - Partial Payment state
    const [showPartialPaymentSection, setShowPartialPaymentSection] = useState(false);
    const [partialPaymentReceived] = useState<number>(77.00); // Amount user actually paid

    // Section 6 to Section 7 transition (30 seconds) or failure after 10 seconds
    useEffect(() => {
        if (showRedirectingSection) {
            // Simulate payment failure after 10 seconds (you can adjust this or add real failure logic)
            const failureTimer = setTimeout(() => {
                // Simulate random failure (30% chance) - you can replace this with real failure detection
                const shouldFail = Math.random() < 0.3; // 30% chance of failure

                if (shouldFail) {
                    setShowRedirectingSection(false);
                    setShowPaymentFailedSection(true);
                }
            }, 10000); // Check for failure after 10 seconds

            // Normal success transition after 30 seconds
            const successTimer = setTimeout(() => {
                setShowRedirectingSection(false);
                setShowPaymentReceivedSection(true);
            }, 30000); // 30 seconds

            return () => {
                clearTimeout(failureTimer);
                clearTimeout(successTimer);
            };
        }
    }, [showRedirectingSection]);

    // Section 7 to Section 8 transition (30 seconds)
    useEffect(() => {
        if (showPaymentReceivedSection) {
            const timer = setTimeout(() => {
                setShowPaymentReceivedSection(false);
                setShowProcessingSection(true);
            }, 30000); // 30 seconds

            return () => clearTimeout(timer);
        }
    }, [showPaymentReceivedSection]);

    // Section 8 to Section 9 transition (20 seconds)
    useEffect(() => {
        if (showProcessingSection) {
            const timer = setTimeout(() => {
                setShowProcessingSection(false);
                setShowPaymentStatusSection(true);
            }, 20000); // 20 seconds

            return () => clearTimeout(timer);
        }
    }, [showProcessingSection]);

    // Section 3 to Section 4 transition (5 seconds) - only if still on section 3
    useEffect(() => {
        if (showImagePreview) {
            const timer = setTimeout(() => {
                // Only transition if still showing image preview (user hasn't manually navigated away)
                if (showImagePreview) {
                    setShowImagePreview(false);
                    setShowCamera(false); // Hide camera section
                    setShowReviewSection(true);
                }
            }, 5000); // 5 seconds

            return () => clearTimeout(timer);
        }
    }, [showImagePreview]);

    const councils = [
        "Barking and Dagenham",
        "Barnet",
        "Bexley",
        "Brent",
        "Bromley",
        "Camden",
        "Croydon",
        "Ealing",
        "Enfield",
        "Greenwich",
        "Hackney",
        "Hammersmith and Fulham",
        "Haringey",
        "Harrow",
        "Havering",
        "Hillingdon",
        "Hounslow",
        "Islington",
        "Kensington and Chelsea",
        "Kingston upon Thames",
        "Lambeth",
        "Lewisham",
        "Merton",
        "Newham",
        "Redbridge",
        "Richmond upon Thames",
        "Southwark",
        "Sutton",
        "Tower Hamlets",
        "Waltham Forest",
        "Wandsworth",
        "Westminster",
    ];

    const startCamera = async () => {
        try {
            // Mobile-optimized camera settings
            let stream;
            try {
                // Try back camera first (ideal for mobile document scanning)
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment', // Use back camera on mobile
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                });
            } catch {
                // Fallback to any available camera if back camera fails
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                });
            }

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setIsVideoVisible(true); // Show video, hide position text
            }
        } catch (error: unknown) {
            console.error('Camera access failed:', error);
            if (error instanceof Error && error.name === 'NotAllowedError') {
                alert('Camera permission denied. Please allow camera access in your browser settings.');
            } else {
                alert('Unable to access camera. Make sure your device has a camera and try again.');
            }
        }
    };

    const takeSnapshot = async () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Create high-quality JPEG for n8n processing (smaller file size, good for OCR)
        const imgDataJPEG = canvas.toDataURL("image/jpeg", 0.9); // 90% quality
        setSnapshot(imgDataJPEG);

        // Stop video stream and show 3rd section
        if (videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
        setIsVideoVisible(false);
        setShowCamera(false);
        setShowImagePreview(true);

        // Automatically send to n8n after capturing
        console.log('Camera capture: sending to n8n...');
        await sendToN8n(imgDataJPEG);
    };



    // Function to send image to n8n for processing
    const sendToN8n = async (imageData?: string) => {
        const imgData = imageData || snapshot;
        if (!imgData) return;

        setIsProcessingTicket(true);
        setHasProcessingError(false);

        try {
            // Use the hook to process the ticket which handles the API call and state management
            await processTicket(imgData);

            // Handle the response from n8n (data is now stored in the zustand store)
            setIsProcessingTicket(false);
            console.log('Ticket processed successfully!');
        } catch (error) {
            console.error('Error sending to n8n:', error);
            setIsProcessingTicket(false);
            setHasProcessingError(true);
        }
    };

    const retakePhoto = () => {
        setSnapshot(null);
        setShowImagePreview(false);
        setShowCamera(true);
        setIsProcessingTicket(false);
        setHasProcessingError(false);
    };

    // Function to handle file upload from gallery
    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Function to convert any image to JPEG format (like camera does)
    const convertToJPEG = (imageDataURL: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }

                // Set canvas size to image size
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw image to canvas
                ctx.drawImage(img, 0, 0);

                // Resize image if too large
                let targetWidth = img.width;
                let targetHeight = img.height;

                // If image is very large, resize it down
                const maxDimension = 1024; // Max width or height
                if (img.width > maxDimension || img.height > maxDimension) {
                    if (img.width > img.height) {
                        targetWidth = maxDimension;
                        targetHeight = (img.height * maxDimension) / img.width;
                    } else {
                        targetHeight = maxDimension;
                        targetWidth = (img.width * maxDimension) / img.height;
                    }
                }

                canvas.width = targetWidth;
                canvas.height = targetHeight;

                // Draw resized image to canvas
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                // Convert to JPEG with lower quality for smaller file size
                let jpegDataURL = canvas.toDataURL('image/jpeg', 0.7); // 70% quality

                // If still too large, reduce quality further
                if (jpegDataURL.length > 800000) { // If > 800KB
                    jpegDataURL = canvas.toDataURL('image/jpeg', 0.5); // 50% quality
                }

                console.log('Converted to JPEG. Original size:', imageDataURL.length, 'New size:', jpegDataURL.length);
                console.log('Image resized from', img.width + 'x' + img.height, 'to', targetWidth + 'x' + targetHeight);
                resolve(jpegDataURL);
            };

            img.onerror = () => {
                reject(new Error('Failed to load image for conversion'));
            };

            img.src = imageDataURL;
        });
    };

    // Function to handle file selection
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            console.log('Selected file:', file.name, 'Size:', file.size, 'Type:', file.type);

            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const result = e.target?.result as string;
                    console.log('File read successfully, data URL length:', result.length);

                    setSnapshot(result);
                    setShowImagePreview(true);

                    // Check file size before processing
                    const fileSizeMB = result.length / (1024 * 1024);
                    console.log('File size: ', fileSizeMB.toFixed(2), 'MB');

                    if (fileSizeMB > 5) {
                        alert('File is too large (' + fileSizeMB.toFixed(2) + 'MB). Please select a smaller image or use the camera to take a photo.');
                        return;
                    }

                    // Try converting to JPEG for consistency with camera
                    try {
                        console.log('Converting to JPEG format...');
                        const jpegResult = await convertToJPEG(result);
                        console.log('JPEG conversion successful');

                        // Wait a moment for UI to update, then send to n8n
                        setTimeout(() => {
                            console.log('Sending converted JPEG to n8n...');
                            sendToN8n(jpegResult);
                        }, 1000);

                    } catch (conversionError) {
                        console.error('JPEG conversion failed, sending original:', conversionError);

                        // Fallback: send original file if conversion fails
                        setTimeout(() => {
                            console.log('Sending original file to n8n...');
                            sendToN8n(result);
                        }, 1000);
                    }

                } catch (error) {
                    console.error('Error processing file:', error);
                    alert('Error processing the selected image.');
                }
            };

            reader.onerror = (error) => {
                console.error('FileReader error:', error);
                alert('Error reading the selected file.');
            };

            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }

        // Reset the file input so the same file can be selected again
        event.target.value = '';
    };

    // Handle form input changes
    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear validation error when user starts typing
        if (validationErrors[field as keyof typeof validationErrors]) {
            setValidationErrors(prev => ({
                ...prev,
                [field]: false
            }));
        }
    };

    // Handle form submission with validation
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check for empty fields, also considering ticketData if formData is empty
        const errors = {
            council: !(formData.council.trim() || (ticketData?.council_name || '').trim()),
            pcnNumber: !(formData.pcnNumber.trim() || (ticketData?.pcn_number || '').trim()),
            vehicleNumber: !(formData.vehicleNumber.trim() || (ticketData?.plate_number || '').trim()),
            fineAmount: !(formData.fineAmount.trim() || (ticketData?.amount?.toString() || '').trim()),
            email: false
        };

        setValidationErrors(errors);

        // If all fields are filled, proceed to payment section
        if (!Object.values(errors).some(error => error)) {
            // Ensure formData has the final values before proceeding
            setFormData(prev => ({
                ...prev,
                council: prev.council || ticketData?.council_name || '',
                pcnNumber: prev.pcnNumber || ticketData?.pcn_number || '',
                vehicleNumber: prev.vehicleNumber || ticketData?.plate_number || '',
                fineAmount: prev.fineAmount || ticketData?.amount?.toString() || ''
            }));

            setShowReviewSection(false);
            setShowPaymentSection(true);
        }
    };

    // Call this after a transaction completes (success or failed)
    const addTransaction = (status: 'success' | 'failed') => {
        setTransactions(prev => {
            const newTransaction = {
                council: formData.council,
                pcnNumber: formData.pcnNumber,
                fineAmount: formData.fineAmount,
                status,
            };

            // Add new transaction at the beginning to keep them in chronological order (newest first)
            const updatedTransactions = [newTransaction, ...prev];
            return updatedTransactions; // Keep ALL transactions
        });
    };

    // Email validation function
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to open Gmail app
    const openGmailApp = () => {
        const userAgent = navigator.userAgent || navigator.vendor;

        // Check if it's a mobile device
        const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

        if (isMobile) {
            // For mobile devices, try to open Gmail app
            if (/android/i.test(userAgent)) {
                // Android - try Gmail app first, fallback to web
                window.location.href = 'intent://mail.google.com#Intent;scheme=https;package=com.google.android.gm;end';
            } else if (/iphone|ipad|ipod/i.test(userAgent)) {
                // iOS - try Gmail app, fallback to web
                window.location.href = 'googlegmail://';
                // Fallback after a short delay
                setTimeout(() => {
                    window.open('https://mail.google.com', '_blank');
                }, 1000);
            }
        } else {
            // For desktop, open Gmail in new tab
            window.open('https://mail.google.com', '_blank');
        }
    };

    // Function to go back to section 1
    const goToHomeSection = () => {
        // Add a successful transaction when returning from receipt section
        if (showReceiptSection) {
            addTransaction('success');
        }
        // Add a failed transaction when returning from payment failed section
        if (showPaymentFailedSection) {
            addTransaction('failed');
        }
        setShowReceiptSection(false);
        setShowCamera(false);
        setShowImagePreview(false);
        setShowReviewSection(false);
        setShowPaymentSection(false);
        setShowSaveFineSection(false);
        setShowCheckInboxSection(false);
        setShowRedirectingSection(false);
        setShowPaymentReceivedSection(false);
        setShowProcessingSection(false);
        setShowPaymentStatusSection(false);
        setShowPaymentFailedSection(false);
        setShowSavedFinesSection(false);
        setShowAllTransactionsSection(false);
        setIsLoadedFromSavedFine(false);
        setCameFromSavedFines(false);
    };

    // Function to retry payment (goes back to section 6)
    const retryPayment = () => {
        setShowPaymentFailedSection(false);
        setShowRedirectingSection(true);
    };

    // Function to save fine to saved list
    const saveFineToList = () => {
        const newSavedFine = {
            council: formData.council,
            pcnNumber: formData.pcnNumber,
            vehicleNumber: formData.vehicleNumber,
            fineAmount: formData.fineAmount,
            email: formData.email,
        };

        addSavedTicket(newSavedFine); // Add to store
    };

    // Function to delete saved fine
    const deleteSavedFine = (fineId: string) => {
        removeSavedTicket(fineId);
    };

    // Function to show saved fines section
    // const showSavedFines = () => {
    //   setShowSavedFinesSection(true);
    // };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-2">
            {/* 1st section */}
            {!showCamera && !showImagePreview && !showReviewSection && !showPaymentSection && !showRedirectingSection && !showPaymentReceivedSection && !showProcessingSection && !showPaymentStatusSection && !showReceiptSection && !showSaveFineSection && !showCheckInboxSection && !showPaymentFailedSection && !showSavedFinesSection && !showAllTransactionsSection && !showPartialPaymentSection && (
                <HomeSection
                    transactions={transactions}
                    onScanTicket={() => setShowCamera(true)}
                    onUploadFromGallery={handleFileUpload}
                    onShowAllTransactions={() => setShowAllTransactionsSection(true)}
                    onHamburgerClick={() => setShowHamburgerModal(true)}
                />
            )}

            {/* 2nd section  */}
            {showCamera && !showImagePreview && (
                <CameraSection
                    isVideoVisible={isVideoVisible}
                    videoRef={videoRef}
                    canvasRef={canvasRef}
                    onBack={() => setShowCamera(false)}
                    onStartCamera={startCamera}
                    onTakeSnapshot={takeSnapshot}
                    onUploadFromGallery={handleFileUpload}
                />
            )}


            {/* 3rd section - Image Preview */}
            {showImagePreview && snapshot && (
                <ImagePreviewSection
                    snapshot={snapshot}
                    isProcessing={isProcessingTicket}
                    hasError={hasProcessingError}
                    onBack={() => {
                        setShowImagePreview(false);
                        setShowCamera(true);
                        setIsProcessingTicket(false);
                        setHasProcessingError(false);
                    }}
                    onRetakePhoto={retakePhoto}
                    onUploadFromGallery={handleFileUpload}
                />
            )}

            {/* Hidden file input for gallery upload */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                style={{ display: 'none' }}
            />

            {/* 4th section - Review Details */}
            {showReviewSection && (
                <ReviewSection
                    formData={formData}
                    validationErrors={validationErrors}
                    councils={councils}
                    onBack={() => {
                        setShowReviewSection(false);
                        setShowCamera(true);
                    }}
                    onInputChange={handleInputChange}
                    onFormSubmit={handleFormSubmit}
                />
            )}

            {/* 5th section - Payment Details */}
            {showPaymentSection && (
                <PaymentSection
                    formData={formData}
                    isLoadedFromSavedFine={isLoadedFromSavedFine}
                    onBack={() => {
                        if (cameFromSavedFines) {
                            setShowPaymentSection(false);
                            setShowSavedFinesSection(true);
                            setCameFromSavedFines(false);
                        } else {
                            setShowPaymentSection(false);
                            setShowReviewSection(true);
                        }
                    }}
                    onPayNow={() => {
                        setShowPaymentSection(false);
                        setShowRedirectingSection(true);
                    }}
                    onPayLater={() => {
                        setShowPaymentSection(false);
                        setShowSaveFineSection(true);
                    }}
                />
            )}



            {/* 6th section - Redirecting to Payment */}
            {showRedirectingSection && (
                <RedirectingSection />
            )}

            {/* 7th section - Payment Received */}
            {showPaymentReceivedSection && (
                <PaymentReceivedSection formData={formData} />
            )}

            {/* 8th section - Processing Payment */}
            {showProcessingSection && (
                <ProcessingSection />
            )}

            {/* 9th section - Payment Status */}
            {showPaymentStatusSection && (
                <PaymentStatusSection
                    formData={formData}
                    validationErrors={validationErrors}
                    onBack={() => setShowCamera(false)}
                    onInputChange={handleInputChange}
                    onSendReceipt={() => {
                        if (isValidEmail(formData.email)) {
                            setShowPaymentStatusSection(false);
                            setShowReceiptSection(true);
                        }
                    }}
                    isValidEmail={isValidEmail}
                />
            )}

            {/* 10th section */}
            {showReceiptSection && (
                <ReceiptSection
                    onClose={goToHomeSection}
                    onOpenGmail={openGmailApp}
                />
            )}

            {/* 11th section */}
            {showSaveFineSection && (
                <SaveFineSection
                    formData={formData}
                    validationErrors={validationErrors}
                    onBack={() => {
                        setShowSaveFineSection(false);
                        setShowPaymentSection(true);
                    }}
                    onInputChange={handleInputChange}
                    onCreateAccount={() => {
                        if (isValidEmail(formData.email)) {
                            saveFineToList();
                            setShowSaveFineSection(false);
                            setShowCheckInboxSection(true);
                        }
                    }}
                    isValidEmail={isValidEmail}
                />
            )}

            {/* 12th section-input email to get reciept */}
            {showCheckInboxSection && (
                <CheckInboxSection
                    formData={formData}
                    onClose={goToHomeSection}
                    onOpenGmail={openGmailApp}
                />
            )}

            {/* 13th section - Error Payment Status */}
            {showPaymentFailedSection && (
                <PaymentFailedSection
                    onBack={() => setShowCamera(false)}
                    onTryAgain={retryPayment}
                />
            )}


            {/* 14th section - Saved Fines */}
            {showSavedFinesSection && (
                <SavedFinesSection
                    savedFines={savedTickets}
                    onBack={goToHomeSection}
                    onDeleteFine={deleteSavedFine}
                    onPayFine={(fine) => {
                        setFormData({
                            council: fine.council,
                            pcnNumber: fine.pcnNumber,
                            vehicleNumber: fine.vehicleNumber,
                            fineAmount: fine.fineAmount,
                            email: fine.email
                        });
                        setShowSavedFinesSection(false);
                        setShowPaymentSection(true);
                        setIsLoadedFromSavedFine(true);
                        setCameFromSavedFines(true);
                    }}
                />
            )}

            {/* 15th section -payment reciept  */}
            {showAllTransactionsSection && (
                <AllTransactionsSection
                    transactions={transactions}
                    onBack={goToHomeSection}
                />
            )}

            {/* Hamburger Modal */}
            <HamburgerModal
                isOpen={showHamburgerModal}
                onClose={() => setShowHamburgerModal(false)}
                onSavedFines={() => {
                    setShowSavedFinesSection(true);
                    // Hide all other sections when navigating to saved fines
                    setShowCamera(false);
                    setShowImagePreview(false);
                    setShowReviewSection(false);
                    setShowPaymentSection(false);
                    setShowRedirectingSection(false);
                    setShowPaymentReceivedSection(false);
                    setShowProcessingSection(false);
                    setShowPaymentStatusSection(false);
                    setShowReceiptSection(false);
                    setShowSaveFineSection(false);
                    setShowCheckInboxSection(false);
                    setShowPaymentFailedSection(false);
                    setShowAllTransactionsSection(false);
                }}
                onPaymentHistory={() => {
                    setShowAllTransactionsSection(true);
                    // Hide all other sections when navigating to payment history
                    setShowCamera(false);
                    setShowImagePreview(false);
                    setShowReviewSection(false);
                    setShowPaymentSection(false);
                    setShowRedirectingSection(false);
                    setShowPaymentReceivedSection(false);
                    setShowProcessingSection(false);
                    setShowPaymentStatusSection(false);
                    setShowReceiptSection(false);
                    setShowSaveFineSection(false);
                    setShowCheckInboxSection(false);
                    setShowPaymentFailedSection(false);
                    setShowSavedFinesSection(false);
                }}
                onContactUs={() => {
                    console.log('Contact Us clicked');
                    // You can implement contact us functionality here
                }}
            />

            {/* 16th section - Partial Payment Status */}
            {showPartialPaymentSection && (
                <PartialPaymentStatusSection
                    partialPaymentReceived={partialPaymentReceived}
                    formData={formData}
                    isLoadedFromSavedFine={isLoadedFromSavedFine}
                    onBack={() => setShowPartialPaymentSection(false)}
                    onPayNow={() => setShowPaymentSection(true)}
                    onPayLater={() => setShowSaveFineSection(true)}
                />
            )}

        </div>
    );
}
