import type { Product } from "../types";

export const products: Product[] = [
    {
        id: "p1",
        name: "Filtek Z250 Geliokompozit plomba",
        brand: "3M",
        price: "350 000 UZS",
        priceValue: 350000,
        category: "Plombalar",
        variants: "Цвета: A1; A2-2; A3; B1; B2; OA2",
        status: "Omborda bor",
        isNew: true,
        image: "https://images.unsplash.com/photo-1606283627043-4ce4bf0a3597?w=500&q=80",
        description: "Universal mikro-gibrid kompozit materiali. Old va orqa tishlarni restavratsiya qilish uchun mukammal estetik natijani ta'minlaydi. Oson jilolanadi va uzoq vaqt rangini yo'qotmaydi.",
        specs: [
            { label: "Material", value: "Mikrogibrid kompozit" },
            { label: "Polimerizatsiya turi", value: "Yorug'lik bilan qotuvchi" },
            { label: "Og'irligi", value: "4g (shprits)" },
            { label: "Ishlab chiqaruvchi", value: "AQSH" }
        ]
    },
    {
        id: "p2",
        name: "Pana-Max2 Turbinali nasadka",
        brand: "NSK",
        price: "680 000 UZS",
        priceValue: 680000,
        category: "Nasadkalar",
        variants: "В упаковке: 1 dona",
        status: "Bestseller",
        isNew: false,
        image: "https://images.unsplash.com/photo-1599861642953-27e1d51c0993?w=500&q=80",
        description: "Yuqori tezlikli turbinali nasadka. O'ta mustahkam keramik podshipniklar bilan jihozlangan. Autoklavda 135°C gacha bemalol sterilizatsiya qilish mumkin.",
        specs: [
            { label: "Tezlik aylanishi", value: "350,000 - 450,000 r/min" },
            { label: "Bosh hajmi", value: "Standart (12.1 mm)" },
            { label: "Sovutish tizimi", value: "Bitta nuqtali suv purkagich" },
            { label: "Ulanish", value: "Midwest 4 teshikli" }
        ]
    },
    {
        id: "p3",
        name: "Kofferdam to'plami (To'liq)",
        brand: "Sanctuary",
        price: "450 000 UZS",
        priceValue: 450000,
        category: "Izolyatsiya",
        status: "Omborda bor",
        isNew: false,
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&q=80",
        description: "Tishlarni to'liq izolyatsiya qilish uchun kerakli bo'lgan barcha asboblarni o'z ichiga olgan professional to'plam. Latex varaqlar uchun yuqori sifatli klamerlar to'plami.",
        specs: [
            { label: "To'plam tarkibi", value: "Pansher, Qisqich, Klamerlar (10 ta), Ramka" },
            { label: "Material", value: "Zanglamaydigan po'lat" },
            { label: "Sterilizatsiya", value: "Mavjud (Avtoklav)" }
        ]
    },
    {
        id: "p4",
        name: "Sariq va qizil apekso-lokator filelari",
        brand: "Dentsply Sirona",
        price: "120 000 UZS",
        priceValue: 120000,
        category: "Endodontiya",
        status: "Sanoqli qoldi",
        isNew: false,
        image: "https://images.unsplash.com/photo-1527613426406-3843f55050f2?w=500&q=80",
        description: "Kanal uzunligini o'lchash va kengaytirish uchun mo'ljallangan endodontik asboblar. NiTi xotirasiga ega va sinish ehtimoli minimal.",
        specs: [
            { label: "Material", value: "Nikel-Titanium (NiTi)" },
            { label: "Uzunligi", value: "25 mm" },
            { label: "Qadoq", value: "6 ta / paket" }
        ]
    },
    {
        id: "p5",
        name: "UDS-J Ultrashtovushli skeyler",
        brand: "Woodpecker",
        price: "1 200 000 UZS",
        priceValue: 1200000,
        category: "Uskunalar",
        status: "Omborda bor",
        isNew: true,
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&q=80",
        description: "Tish toshlarini samarali tozalash va parodontologik muolajalar uchun sifatli avtonom ultratovushli apparat. Qo'lda sozlanadigan quvvat.",
        specs: [
            { label: "Chastota", value: "28kHz ± 3kHz" },
            { label: "Suv bosimi", value: "0.01MPa - 0.5MPa" },
            { label: "O'lchamlari", value: "137mm × 95mm × 213mm" },
            { label: "Og'irligi", value: "1.7 kg" }
        ]
    },
    {
        id: "p6",
        name: "Nitril qo'lqoplar (100 dona)",
        brand: "SafiMed",
        price: "85 000 UZS",
        priceValue: 85000,
        category: "Jarrohlik",
        variants: "Размеры: XS; S; M; L; XL",
        status: "Omborda bor",
        isNew: false,
        image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=500&q=80",
        description: "Texnik jihatdan mustahkam pudrasiz nitril qo'lqoplar. Yuqori sezuvchanlikni talab qiladigan mikroskopik stomatologik ishlarda qo'llash tavsiya etiladi.",
        specs: [
            { label: "Material", value: "100% Nitril (pudrasiz)" },
            { label: "Miqdor", value: "100 dona (50 juft)" },
            { label: "Qalinligi", value: "0.12 mm" }
        ]
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
