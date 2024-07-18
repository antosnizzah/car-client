export interface Car {
  image: string;
  name: string;
  specifications: string;
}

export const cars: Car[] = [
  {
      image: 'https://i.pinimg.com/564x/33/b5/51/33b5514815eef0d9fd3e618ceb74d9ba.jpg',
      name: 'Tesla Model S',
      specifications: 'Range: 396 miles, Top Speed: 200 mph, 0-60 mph: 1.99 seconds'
  },
  {
      image: 'https://i.pinimg.com/564x/2e/8a/5c/2e8a5ce2acd146751070fedc8c0387e2.jpg',
      name: 'Porsche Taycan',
      specifications: 'Range: 227 miles, Top Speed: 161 mph, 0-60 mph: 2.4 seconds'
  },
  {
      image: 'https://i.pinimg.com/564x/a5/92/38/a59238885c81f7ba56e9aaccfef6822a.jpg',
      name: 'Audi e-tron GT',
      specifications: 'Range: 238 miles, Top Speed: 152 mph, 0-60 mph: 3.9 seconds'
  },
  {
      image: 'https://i.pinimg.com/564x/c5/5c/e5/c55ce5c5f44fda4bb6bd2ad0ea931cc1.jpg',
      name: 'Ford Mustang Mach-E',
      specifications: 'Range: 300 miles, Top Speed: 114 mph, 0-60 mph: 3.5 seconds'
  },
  {
      image: 'https://i.pinimg.com/564x/45/6d/f1/456df127518cd9fb0757120058e5ade1.jpg',
      name: 'Chevrolet Bolt EV',
      specifications: 'Range: 259 miles, Top Speed: 93 mph, 0-60 mph: 6.5 seconds'
  },
  {
      image: 'https://i.pinimg.com/564x/84/da/e2/84dae2bcf9528783825fd8339469dab3.jpg',
      name: 'Nissan Leaf',
      specifications: 'Range: 226 miles, Top Speed: 98 mph, 0-60 mph: 7.4 seconds'
  },
  {
      image: 'https://i.pinimg.com/564x/79/d0/1f/79d01f48825765d2d7896192dca5fc2e.jpg',
      name: 'BMW i4',
      specifications: 'Range: 300 miles, Top Speed: 118 mph, 0-60 mph: 3.8 seconds'
  },
  {
      image: 'https://i.pinimg.com/564x/22/f5/e5/22f5e52c5bc8dde7dceb0161d5e58f19.jpg',
      name: 'Hyundai Kona Electric',
      specifications: 'Range: 258 miles, Top Speed: 104 mph, 0-60 mph: 6.4 seconds'
  },
  {
      image: 'https://i.pinimg.com/564x/33/e1/51/33e151d495674a5ea4a773104e489cdc.jpg',
      name: 'Jaguar I-PACE',
      specifications: 'Range: 234 miles, Top Speed: 124 mph, 0-60 mph: 4.5 seconds'
  }
];
