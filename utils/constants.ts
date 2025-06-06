export const euroPoluantOptions = [
  "euro_1",
  "euro_2",
  "euro_3",
  "euro_4",
  "euro_5",
  "euro_6",
  "euro_6a",
  "euro_6b",
  "euro_6c",
  "euro_6d-temp",
  "euro_6d",
] as const;

export const tipCombustibilOptions = [
  "benzina",
  "motorina",
  "gpl",
  "cng",
  "etanol",
  "biodiesel",
  "electricitate",
  "hidrogen",
  "hibrid_clasic",
  "plug-in_hybrid",
  "mild_hybrid",
] as const;

export const CAR_IMAGES_BUCKET_URL =
  "https://rdwokiscvwvwsfkbyadb.supabase.co/storage/v1/object/public/car-images/";

//for facebook oauth
export const SCOPES =
  "pages_manage_posts,pages_read_engagement,pages_show_list,pages_read_user_content";
export const NGROK_BASE_URL = "https://ed13-188-27-128-98.ngrok-free.app/";

//CARS
export const CAR_BRANDS = {
  "alfa-romeo": "Alfa Romeo",
  audi: "Audi",
  bmw: "BMW",
  chevrolet: "Chevrolet",
  citroen: "Citroën",
  dacia: "Dacia",
  fiat: "Fiat",
  ford: "Ford",
  honda: "Honda",
  hyundai: "Hyundai",
  jaguar: "Jaguar",
  jeep: "Jeep",
  kia: "Kia",
  lexus: "Lexus",
  mazda: "Mazda",
  "mercedes-benz": "Mercedes-Benz",
  nissan: "Nissan",
  opel: "Opel",
  peugeot: "Peugeot",
  renault: "Renault",
  seat: "Seat",
  skoda: "Skoda",
  subaru: "Subaru",
  suzuki: "Suzuki",
  tesla: "Tesla",
  toyota: "Toyota",
  volkswagen: "Volkswagen",
  volvo: "Volvo",
} as const;
export type CarBrandKey = keyof typeof CAR_BRANDS;
