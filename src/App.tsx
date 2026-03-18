import { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { products } from './data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Barchasi") return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 flex flex-col selection:bg-sky-100 selection:text-sky-900">
        <Navbar />

        <main className="flex-1">
          <div id="catalog" className="scroll-mt-16">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <div className="container mx-auto px-4 py-8 min-h-[50vh]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  {selectedCategory === "Barchasi" ? "Barcha mahsulotlar" : selectedCategory}
                </h2>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs sm:text-sm font-medium">
                  {filteredProducts.length} ta
                </span>
              </div>

              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 items-stretch"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.25, type: 'spring', bounce: 0.2 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-slate-400 text-2xl">📦</span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-1">Mahsulot topilmadi</h3>
                  <p className="text-slate-500 max-w-sm text-sm sm:text-base">
                    Ushbu turkumda hozircha mahsulotlar yo'q. Boshqa turkumni tanlab ko'ring.
                  </p>
                  <button
                    onClick={() => setSelectedCategory("Barchasi")}
                    className="mt-6 font-medium text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    Barcha mahsulotlarni ko'rish &rarr;
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </main>

        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                StomMarket
              </div>
              <p className="max-w-xs text-sm">
                O'zbekistondagi eng yirik stomatologiya do'koni. Premium materiallar va ishonchli uskunalar kafolati.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Mijozlarga</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#catalog" className="hover:text-white transition-colors">Katalog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Yetkazib berish</a></li>
                <li><a href="#" className="hover:text-white transition-colors">To'lov usullari</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kafolat</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Aloqa</h4>
              <ul className="space-y-2 text-sm">
                <li>+998 71 200 00 00</li>
                <li>info@stommarket.uz</li>
                <li>Toshkent sh, Yunusobod tumani</li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
            &copy; {new Date().getFullYear()} StomMarket. Barcha huquqlar himoyalangan.
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
