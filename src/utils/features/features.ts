import flashcardImage from '@/assets/images/featuresImages/flashcard.png'
import notesImage from '@/assets/images/featuresImages/notes.png'
import efficientImage from '@/assets/images/featuresImages/forgettingCurve.png'
import statisticsImage from '@/assets/images/featuresImages/statistics.png'

import flashcardSvg from '@/assets/svg/featuresSvg/cards-outline-svgrepo-com.svg'
import notesSvg from '@/assets/svg/featuresSvg/notes-notepad-svgrepo-com.svg'
import efficientSvg from '@/assets/svg/featuresSvg/light-bulb-idea-svgrepo-com.svg'
import statisticsSvg from '@/assets/svg/featuresSvg/beach-relax-beach-vacation-relax-svgrepo-com.svg'

const features = [
  {
    "id": 1,
    "title": "Quickly Create Flashcards",
    "description": "Instantly generate flashcards within your notes, streamlining your study process.",
    "svg": flashcardSvg,
    "image": flashcardImage
  },
  {
    "id": 2,
    "title": "Efficient Study with Spaced Repetition",
    "description": "Leverage spaced repetition to optimize learning, proven to be more effective than traditional study methods.",
    "svg": notesSvg,
    "image": notesImage
  },
  {
    "id": 3,
    "title": "Interactive Class Notes",
    "description": "Create mind-map-style notes, link ideas with references, and annotate PDFs directly in your notes.",
    "svg": efficientSvg,
    "image": efficientImage
  },
  {
    "id": 4,
    "title": "Confident Exam Preparation",
    "description": "Prepare for exams without stress, ensuring you retain information effectively.",
    "svg": statisticsSvg,
    "image": statisticsImage
  }
]


export default features
