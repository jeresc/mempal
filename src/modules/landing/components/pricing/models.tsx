import {LucideCheck} from "lucide-react";
import {ReactNode} from "react";
import {IoCloseOutline} from "react-icons/io5";

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

export function PricingCard({
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
  viewPricingOnClick,
}: PricingCardProps) {
  return (
    <div
      className={`relative flex w-[100%] cursor-default flex-col rounded-lg border p-6 ${
        recommended ? "border-blue-400" : "border-gray-300"
      } ${active ? "bg-white" : "bg-gray-100"} ${order}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {recommended ? (
        <div className='absolute left-0 top-0 w-full rounded-t-lg bg-gray-800 py-1 text-center text-white'>
          Recommended
        </div>
      ) : null}
      <div className='flex-grow p-4'>
        <h2 className='mb-2 text-2xl font-bold'>{title}</h2>
        <p className='text-md mb-4 text-gray-700 sm:text-lg'>{price}</p>
        <button className='mb-2 rounded bg-[#2563EB] px-4 py-2 text-white transition-transform duration-300 hover:scale-105'>
          {buttonText}
        </button>
        <p className='mb-4 text-sm text-gray-500'>{note}</p>
        <p className='mb-4 text-gray-700'>{description}</p>
        <ul className='space-y-2 text-gray-700'>
          {features.map((feature, index) => (
            <li key={index} className='flex items-start'>
              <div className='h-6 w-6 flex-shrink-0'>
                <LucideCheck />
              </div>
              <span className='ml-2'>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-auto'>
        <button
          className='inline-block cursor-pointer py-2 text-blue-400'
          onClick={viewPricingOnClick}
        >
          View pricing
        </button>
      </div>
    </div>
  );
}

//view pricing modal

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function Modal({isOpen, onClose, title, children}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='z-60 w-11/12 rounded-lg bg-white p-6 md:w-1/2'>
        <div className='mb-4 flex items-center justify-between border-b pb-2'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <button className='text-gray-700' onClick={onClose}>
            <IoCloseOutline size={30} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
