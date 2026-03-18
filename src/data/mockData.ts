import type { Product } from "../types";

export const products: Product[] = [
    {
        id: "p1",
        name: "Filtek Z250 (3M) - Geliokompozit plomba",
        price: "350 000 UZS",
        priceValue: 350000,
        category: "Plombalar",
        status: "In Stock",
        isNew: true,
        image: "https://images.unsplash.com/photo-1606283627043-4ce4bf0a3597?w=500&q=80"
    },
    {
        id: "p2",
        name: "NSK Pana-Max2 - Turbinali nasadka",
        price: "680 000 UZS",
        priceValue: 680000,
        category: "Nasadkalar",
        status: "Bestseller",
        isNew: false,
        image: "https://images.unsplash.com/photo-1599861642953-27e1d51c0993?w=500&q=80"
    },
    {
        id: "p3",
        name: "Kofferdam to'plami (To'liq)",
        price: "450 000 UZS",
        priceValue: 450000,
        category: "Izolyatsiya",
        status: "In Stock",
        isNew: false,
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&q=80"
    },
    {
        id: "p4",
        name: "Sariq va qizil apekso-lokator file'lari",
        price: "120 000 UZS",
        priceValue: 120000,
        category: "Endodontiya",
        status: "Few left",
        isNew: false,
        image: "https://images.unsplash.com/photo-1527613426406-3843f55050f2?w=500&q=80"
    },
    {
        id: "p5",
        name: "Woodpecker UDS-J Ultrashtovushli skeyler",
        price: "1 200 000 UZS",
        priceValue: 1200000,
        category: "Uskunalar",
        status: "In Stock",
        isNew: true,
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&q=80"
    },
    {
        id: "p6",
        name: "Nitril qo'lqoplar (100 dona, Qora/Binafsha)",
        price: "85 000 UZS",
        priceValue: 85000,
        category: "Sarflov",
        status: "In Stock",
        isNew: false,
        image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=500&q=80"
    }
];

export const CATEGORIES = [
    "Barchasi",
    "Plombalar",
    "Nasadkalar",
    "Jarrohlik",
    "Ortodontiya",
    "Endodontiya",
    "Izolyatsiya",
    "Uskunalar",
    "Sarflov"
];
