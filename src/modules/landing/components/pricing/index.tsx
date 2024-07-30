import {useState} from "react";

import {Modal, PricingCard} from "./models";
import {pricingDetails} from "./viewPricingDetails";

type ModalContentType = "Advanced" | "Plus" | "Basic";

function Pricing() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{title: string; description: string[]} | null>(
    null,
  );

  const handleCardClick = (card: string) => {
    setActiveCard(card);
  };

  const handleOnMouseLeave = () => {
    setActiveCard(null);
  };

  const handleViewPricingClick = (card: ModalContentType) => {
    setModalContent(pricingDetails[card]);
    setModalOpen(true);
  };

  return (
    <>
      <div className='flex flex-col justify-center space-y-6 p-6 lg:flex-row lg:space-x-6 lg:space-y-0'>
        <PricingCard
          active={activeCard === "Advance"}
          buttonText='Buy Now'
          description='For advanced users with sophisticated text processing needs. Full access to all features.'
          features={[
            "Up to 50k characters per document",
            "Unlimited document uploads",
            "Advanced flashcard generation",
            "Priority customer support",
            "Customizable processing options",
          ]}
          note='* Estimated based on usage'
          order='lg:order-1'
          price='from $45/month'
          title='Advanced'
          viewPricingOnClick={() => handleViewPricingClick("Advanced")}
          onClick={() => handleCardClick("Advance")}
          onMouseEnter={() => handleCardClick("Advance")}
          onMouseLeave={handleOnMouseLeave}
        />

        <PricingCard
          recommended
          active={activeCard === "Plus"}
          buttonText='Buy Now'
          description='Ideal for users with variable or infrequent text processing needs. Minimal configuration required.'
          features={[
            "Up to 50k characters per document",
            "Unlimited document uploads",
            "Generate flashcards from documents",
            "Pay only for the characters processed",
            "24/7 customer support",
          ]}
          note='* Per 1 million characters'
          order='lg:order-2'
          price='from $0.20/million characters'
          title='Plus'
          viewPricingOnClick={() => handleViewPricingClick("Plus")}
          onClick={() => handleCardClick("Plus")}
          onMouseEnter={() => handleCardClick("Plus")}
          onMouseLeave={handleOnMouseLeave}
        />

        <PricingCard
          active={activeCard === "Basic"}
          buttonText='Get Started'
          description='For users looking to explore our text processing capabilities at no cost. Basic features included.'
          features={[
            "Up to 50k characters per document",
            "Limited document uploads",
            "Generate basic flashcards",
            "Community support",
            "No credit card required to start",
          ]}
          note='* Free forever'
          order='order-3'
          price='from $0/month'
          title='Basic (Free)'
          viewPricingOnClick={() => handleViewPricingClick("Basic")}
          onClick={() => handleCardClick("Basic")}
          onMouseEnter={() => handleCardClick("Basic")}
          onMouseLeave={handleOnMouseLeave}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        title={modalContent?.title || ""}
        onClose={() => setModalOpen(false)}
      >
        {modalContent?.description.map((desc, index) => (
          <div key={index}>
            <p className='text-md sm:text-lg'>{desc}</p>
          </div>
        ))}
      </Modal>
    </>
  );
}

export {Pricing};
