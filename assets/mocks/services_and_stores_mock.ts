import Service from "../../types/service";

//mock services using sample pngs from assets/images
export const services: Service[] = [
  {
    id: "1",
    name: "Barber Shop",
    description: "Get the best haircut in town!",
    imageSrc: require("@/assets/images/sample_barber.png"),
    rating: 4.5,
    tags: ["Haircut", "Barber", "Grooming"],
  },
  //sample gym
  {
    id: "2",
    name: "Local Gym",
    description: "Join our fitness community!",
    imageSrc: require("@/assets/images/sample_gym.png"),
    rating: 4.7,
    tags: ["Gym", "Fitness", "Health"],
  },
  //sample ballet class
  {
    id: "3",
    name: "Ballet Class",
    description: "Learn ballet from professional instructors.",
    imageSrc: require("@/assets/images/sample_ballet_class.png"),
    rating: 4.8,
    tags: ["Dance", "Ballet", "Class"],
  },
  //sample yoga
  {
    id: "4",
    name: "Yoga Studio",
    description: "Relax and rejuvenate with our yoga classes.",
    imageSrc: require("@/assets/images/sample_yoga.png"),
    rating: 4.6,
    tags: ["Yoga", "Wellness", "Meditation"],
  },
];
