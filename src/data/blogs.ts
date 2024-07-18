export interface Blog {
  title: string;
  author: string;
  date: string;
  summary: string;
  image: string;
}

export const blogs: Blog[] = [
  {
    title: 'Electric Cars: The Future of Transportation',
    author: 'Alice Green',
    date: 'July 5, 2024',
    summary: 'Exploring the advancements and benefits of electric cars in modern transportation.',
    image: 'https://i.pinimg.com/originals/d7/f5/31/d7f531a1e7cf5ccaba4f947a630d6d90.jpg',
  },
  {
    title: 'Top 10 Luxury Cars of 2024',
    author: 'David Brown',
    date: 'June 30, 2024',
    summary: 'A list of the top luxury cars of 2024 with their standout features.',
    image: 'https://i.pinimg.com/originals/16/b9/bb/16b9bbc702b962ee303b31086deafa53.jpg',
  },
  {
    title: 'The Rise of Autonomous Vehicles',
    author: 'Emma Wilson',
    date: 'June 25, 2024',
    summary: 'An overview of the current state and future potential of autonomous vehicles.',
    image: 'https://i.pinimg.com/564x/a2/05/5e/a2055e86768dda3b4599c32823851716.jpg',
  },
  {
    title: 'SUVs vs. Sedans: Which is Right for You?',
    author: 'Chris Evans',
    date: 'June 20, 2024',
    summary: 'A comparative guide to help you choose between SUVs and sedans based on your needs.',
    image: 'https://i.pinimg.com/564x/81/0b/84/810b84d2514fcd672d41ed55935e8bc5.jpg',
  },
  {
    title: 'Hybrid Cars: Pros and Cons',
    author: 'Laura Johnson',
    date: 'June 15, 2024',
    summary: 'An in-depth look at hybrid cars, discussing their benefits and drawbacks.',
    image: 'https://i.pinimg.com/474x/78/ed/d6/78edd6802a32882592f110c7c9c24300.jpg',
  },
  {
    title: 'Best Cars for Families in 2024',
    author: 'Michael Davis',
    date: 'June 10, 2024',
    summary: 'A guide to the best family-friendly cars available in 2024.',
    image: 'https://i.pinimg.com/564x/fb/8f/0e/fb8f0ef7ca02d2ae8574c9eac3dd1c05.jpg',
  },
];
