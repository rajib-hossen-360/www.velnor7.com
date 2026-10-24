import productsJson from './productsData.json';

export interface ProductImage {
  kind: 'cutout' | 'studio' | 'detail' | 'tag' | 'photo';
  src: string;
  light?: string;
  w: number;
  h: number;
  alt: string;
  srcset?: string;
}

export interface ProductVariant {
  size: string;
  sku: string;
  inventory: number;
}

export interface ProductColour {
  key: string;
  name: string;
  hex: string;
  images: ProductImage[];
}

export interface Product {
  handle: string;
  title: string;
  productType: 'Coats' | 'Cardigans' | 'Embroidered Cardigans' | 'Sweaters';
  for: 'Women' | 'Men';
  tags: string[];
  isNew?: boolean;
  justIn?: boolean;
  colour: { name: string; hex: string };
  price: number;
  compareAt: number | null;
  salePct: number | null;
  description: string;
  about?: string;
  details: string[];
  care?: string;
  colours?: ProductColour[];
  images: ProductImage[];
  variants: ProductVariant[];
  related?: string[];
}

export const products: Product[] = productsJson.products as Product[];

export const saleInfo = {
  name: productsJson.sale?.name || 'Winter Sale',
  pct: productsJson.sale?.pct || 20,
  ends: 'Sunday 1 November',
  onCount: products.filter(p => p.compareAt != null).length,
};

export const categories = [
  {
    key: 'coats',
    label: 'Coats',
    handle: 'celadon-faux-fur-coat',
    image: 'https://www.velnor7.com/img/celadon-faux-fur-coat/card.webp?v=20261023',
    count: products.filter(p => p.productType === 'Coats').length,
    featured: true,
  },
  {
    key: 'embroidered-cardigans',
    label: 'Embroidered Cardigans',
    handle: 'plum-floral-cardigan',
    image: 'https://www.velnor7.com/img/plum-floral-cardigan/card.webp?v=20261023',
    count: products.filter(p => p.productType === 'Embroidered Cardigans').length,
    wide: true,
  },
  {
    key: 'cardigans',
    label: 'Cardigans',
    handle: 'zigzag-fringe-cardigan',
    image: 'https://www.velnor7.com/img/zigzag-fringe-cardigan/card.webp?v=20261023',
    count: products.filter(p => p.productType === 'Cardigans').length,
  },
  {
    key: 'sweaters',
    label: 'Sweaters',
    handle: 'textured-v-neck-sweater',
    image: 'https://www.velnor7.com/img/textured-v-neck-sweater/card.webp?v=20261023',
    count: products.filter(p => p.productType === 'Sweaters').length,
  },
];

export const guides = [
  {
    slug: 'care-faux-fur-and-knitwear',
    title: 'How to care for faux fur and knitwear',
    description: 'How to wash, dry, brush and store knit sweaters, cardigans and faux-fur collars so they stay soft and keep their shape through winter.',
    lead: 'Winter pieces last for years if they are washed gently, dried flat and stored well. This is the routine we follow for our knitwear and faux fur.',
    sections: [
      {
        heading: 'First, read the label',
        content: 'The care label sewn into your piece always comes first. The routine below is a safe default: hand wash cold, dry flat in the shade, and never wring.',
      },
      {
        heading: 'Washing knitwear',
        content: 'Turn the piece inside out before washing. Use cold water and a mild detergent made for delicates or wool. Press the water through the knit with your hands. Do not rub, twist or wring.',
      },
      {
        heading: 'Drying and reshaping',
        content: 'Lay the piece flat on a dry towel, in the shade. Sun and heaters can fade colour and stiffen the yarn. Never hang a wet or heavy knit.',
      },
      {
        heading: 'Looking after faux fur',
        content: 'Brush gently in the direction of the fur with a soft brush or wide-tooth comb to lift it and keep it from matting. Keep it away from heat.',
      },
    ],
  },
  {
    slug: 'how-to-choose-your-size',
    title: 'How to choose your size for winter knitwear and coats',
    description: 'A simple way to pick the right size online: compare with a garment you already own, allow room for layering, and when to choose the larger size.',
    lead: 'Sizes differ from brand to brand, so the safest method is to compare with something you already wear and like. Here is how, in about two minutes.',
    sections: [
      {
        heading: 'Compare with a garment you already own',
        content: 'Lay a sweater, cardigan or coat that fits you well on a flat surface and measure it with a tape across chest, shoulder, sleeve and body length.',
      },
      {
        heading: 'Think about what goes underneath',
        content: 'Winter pieces are worn over other layers. If you plan to wear a coat over a thick sweater, choose one size up.',
      },
      {
        heading: 'Knitwear and coats fit differently',
        content: 'Knit sweaters and cardigans stretch and soften with wear. Tailored coats do not stretch, so check shoulder and sleeve measurements.',
      },
    ],
  },
  {
    slug: 'what-to-wear-winter-pakistan',
    title: 'What to wear for winter across Pakistan: a layering guide',
    description: 'How cold it gets in Lahore, Islamabad, Karachi, Peshawar, Quetta and the northern hills, and how to layer knitwear and a coat for each.',
    lead: 'Winter in Pakistan is not one climate. The plains are cool and foggy, Quetta is freezing at night, and the northern hills are well below zero.',
    sections: [
      {
        heading: 'How to layer',
        content: 'Three layers handle almost every winter day: a breathable base layer, a warm knit cardigan or sweater as mid-layer, and a protective coat as outer shell.',
      },
      {
        heading: 'Plains & Hills Climate Advice',
        content: 'Lahore, Islamabad, and northern hill stations require varied warmth tiers. A pure knit cardigan is ideal for daytime, switching to a suede or faux-fur coat for cool evenings.',
      },
    ],
  },
];
