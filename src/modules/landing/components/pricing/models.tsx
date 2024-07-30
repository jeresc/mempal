import { LucideCheck } from 'lucide-react';
import { ReactNode } from 'react';
import { IoCloseOutline } from "react-icons/io5";

type PricingCardProps = {
    title: string;
    price: string;
    description: string;
    features: string[];
    buttonText: string;
    note: string;
    recommended?: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    active: boolean;
    order: string;
    viewPricingOnClick: () => void;
};

export const PricingCard = ({
    title,
    price,
    description,
    features,
    buttonText,
    note,
    recommended,
    onClick,
    onMouseEnter,
    onMouseLeave,
    active,
    order,
    viewPricingOnClick
}: PricingCardProps) => (
    <div
        className={`relative w-[100%] border rounded-lg cursor-default p-6 flex flex-col ${recommended ? "border-blue-400" : "border-gray-300"
            } ${active ? "bg-white" : "bg-gray-100"} ${order}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {recommended && (
            <div className="bg-gray-800 text-white text-center py-1 rounded-t-lg absolute top-0 left-0 w-full">
                Recommended
            </div>
        )}
        <div className="p-4 flex-grow">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-md sm:text-lg text-gray-700 mb-4">{price}</p>
            <button className="bg-[#2563EB] text-white py-2 px-4 rounded mb-2 transition-transform duration-300 hover:scale-105">
                {buttonText}
            </button>
            <p className="text-sm text-gray-500 mb-4">{note}</p>
            <p className="text-gray-700 mb-4">{description}</p>
            <ul className="text-gray-700 space-y-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <div className='flex-shrink-0 w-6 h-6'>
                            <LucideCheck />
                        </div>
                        <span className='ml-2'>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="mt-auto">
            <button onClick={viewPricingOnClick} className="text-blue-400 py-2 inline-block cursor-pointer">
                View pricing
            </button>
        </div>
    </div>
);


//view pricing modal

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 z-60">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <button onClick={onClose} className="text-gray-700">
                    <IoCloseOutline size={30} />
                </button>
            </div>
            <div>
                {children}
            </div>
        </div>
    </div>
    );
};

