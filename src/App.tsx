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
      <div className="min-h-screen bg-[#0a1219] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,211,238,0.1),rgba(10,18,25,1))] font-sans text-slate-200 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-50">
        <Navbar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div id="catalog" className="scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 px-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
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
                className="text-center py-32 flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.2)]"
              >
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                  <span className="text-slate-400 text-4xl">📦</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-wide drop-shadow-md">Mahsulot topilmadi</h3>
                <p className="text-slate-400 max-w-sm text-lg font-light">
                  Ushbu turkumda hozircha mahsulotlar yo'q. Boshqa turkumni tanlab ko'ring.
                </p>
                <button
                  onClick={() => setSelectedCategory("Barchasi")}
                  className="mt-10 font-medium text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 px-8 py-3 rounded-full transition-all border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
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
