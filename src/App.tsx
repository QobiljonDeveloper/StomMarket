import { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
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
      <div className="min-h-screen bg-slate-50/30 font-sans text-slate-900 flex flex-col selection:bg-sky-100 selection:text-sky-900">
        <Navbar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div id="catalog" className="scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 px-1">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                {selectedCategory === "Barchasi" ? "Barcha mahsulotlar" : selectedCategory}
              </h2>
            </div>

            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 items-stretch"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
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
                className="text-center py-32 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-slate-100 shadow-sm"
              >
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                  <span className="text-slate-300 text-4xl">📦</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Mahsulot topilmadi</h3>
                <p className="text-slate-500 max-w-sm text-lg">
                  Ushbu turkumda hozircha mahsulotlar yo'q. Boshqa turkumni tanlab ko'ring.
                </p>
                <button
                  onClick={() => setSelectedCategory("Barchasi")}
                  className="mt-10 font-bold text-sky-600 hover:text-sky-700 hover:bg-sky-50 px-10 py-4 rounded-full transition-all border border-sky-100 shadow-sm"
                >
                  Barcha mahsulotlarni ko'rish
                </button>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
