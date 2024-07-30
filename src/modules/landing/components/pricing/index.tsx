import { useState } from 'react'
import { Modal, PricingCard } from './models';
import { pricingDetails } from './viewPricingDetails';

type ModalContentType = 'Advanced' | 'Plus' | 'Basic';

function Pricing() {
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{ title: string, description: string[] } | null>(null);

    const handleCardClick = (card: string) => {
        setActiveCard(card);
    };

    const handleOnMouseLeave = () => {
        setActiveCard(null)
    }

    const handleViewPricingClick = (card: ModalContentType) => {
        setModalContent(pricingDetails[card]);
        setModalOpen(true);
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-center space-y-6 lg:space-y-0 lg:space-x-6 p-6">

                <PricingCard
                    title="Advanced"
                    price="from $45/month"
                    description="For advanced users with sophisticated text processing needs. Full access to all features."
                    features={[
                        "Up to 50k characters per document",
                        "Unlimited document uploads",
                        "Advanced flashcard generation",
                        "Priority customer support",
                        "Customizable processing options",
                    ]}
                    buttonText="Buy Now"
                    note="* Estimated based on usage"
                    onClick={() => handleCardClick("Advance")}
                    onMouseEnter={() => handleCardClick("Advance")}
                    onMouseLeave={handleOnMouseLeave}
                    active={activeCard === "Advance"}
                    order='lg:order-1'
                    viewPricingOnClick={() => handleViewPricingClick("Advanced")}
                />

                <PricingCard
                    title="Plus"
                    price="from $0.20/million characters"
                    description="Ideal for users with variable or infrequent text processing needs. Minimal configuration required."
                    features={[
                        "Up to 50k characters per document",
                        "Unlimited document uploads",
                        "Generate flashcards from documents",
                        "Pay only for the characters processed",
                        "24/7 customer support",
                    ]}
                    buttonText="Buy Now"
                    note="* Per 1 million characters"
                    recommended={true}
                    onClick={() => handleCardClick("Plus")}
                    onMouseEnter={() => handleCardClick("Plus")}
                    onMouseLeave={handleOnMouseLeave}
                    active={activeCard === "Plus"}
                    order='lg:order-2'
                    viewPricingOnClick={() => handleViewPricingClick("Plus")}
                />

                <PricingCard
                    title="Basic (Free)"
                    price="from $0/month"
                    description="For users looking to explore our text processing capabilities at no cost. Basic features included."
                    features={[
                        "Up to 50k characters per document",
                        "Limited document uploads",
                        "Generate basic flashcards",
                        "Community support",
                        "No credit card required to start",
                    ]}
                    buttonText="Get Started"
                    note="* Free forever"
                    onClick={() => handleCardClick("Basic")}
                    onMouseEnter={() => handleCardClick("Basic")}
                    onMouseLeave={handleOnMouseLeave}
                    active={activeCard === "Basic"}
                    order='order-3'
                    viewPricingOnClick={() => handleViewPricingClick("Basic")}
                />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={modalContent?.title || ''}>
                {modalContent?.description.map((desc, index) => (
                    <div key={index}>
                        <p className='text-md sm:text-lg'>
                            {desc}
                        </p>
                    </div>
                ))}
            </Modal>
        </>
    );
};

export { Pricing };
