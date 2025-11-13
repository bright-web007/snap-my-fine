import Image from "next/image";
import { ReactNode } from "react";

const deviceRestrictedIcon = "/landing/deviceRestrictedIcon.svg";

interface DeviceRestrictionProps {
    children: ReactNode;
}

export function DeviceRestriction({ children }: DeviceRestrictionProps) {
    return (
        <>
            {/* Desktop restriction view - shown on md and above */}
            <div className="hidden md:flex min-h-screen items-center justify-center px-6 bg-gray-50">
                <div className="flex flex-col items-center text-center max-w-lg">
                    {/* Circular background with icon */}
                    <div className="relative mb-12">
                        <div className="w-96 h-96 rounded-full bg-gray-200/40 flex items-center justify-center">
                            <Image
                                src={deviceRestrictedIcon}
                                width={542}
                                height={602}
                                alt="SnapMyFine app mockup"
                                // className={styles.heroPhone}
                            />
                        </div>
                    </div>

                    {/* Restriction message */}
                    <p className="text-gray-700 text-lg leading-relaxed">
                        This page is not accessible on Desktop. Please login with a mobile or tablet device
                    </p>
                </div>
            </div>

            {/* Main content - shown on mobile and tablet (below md breakpoint) */}
            <div className="block md:hidden">
                {children}
            </div>
        </>
    );
}