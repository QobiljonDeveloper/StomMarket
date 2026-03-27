import { useState, useMemo, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { products } from './data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { TelegramAuthDebug } from './components/TelegramAuthDebug';
import { useAuth } from './hooks/useAuth';

// Hardcoded to true for temporary debugging per requirements.
const DEV_MODE = true;

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const { mutate: syncUser, isPending } = useAuth();

  // Local state to track if we have initialized
  useEffect(() => {
    // Safety check and Telegram initialization
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      tg.ready();

      const user = tg.initDataUnsafe.user;
      const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "Foydalanuvchi";

      syncUser({
        telegramId: user.id,
        fullName: fullName,
        username: user.username || "",
        language: 0
      });
      return;
    }
  }, [syncUser]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Barchasi") return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <CartProvider>
      {/* Subtle Loading Banner in the Header Area */}
      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 w-full z-[100] bg-[#007AFF] text-white text-[11px] font-bold uppercase tracking-widest py-1.5 flex items-center justify-center gap-2 shadow-md"
          >
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Bog'lanmoqda...
          </motion.div>
        )}
      </AnimatePresence>

      <Layout>
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div id="catalog" className="scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 px-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 drop-shadow-sm">
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
                className="text-center py-32 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 shadow-sm"
              >
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100 shadow-inner">
                  <span className="text-slate-400 text-4xl">📦</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-wide drop-shadow-sm">Mahsulot topilmadi</h3>
                <p className="text-slate-500 max-w-sm text-lg font-medium">
                  Ushbu turkumda hozircha mahsulotlar yo'q. Boshqa turkumni tanlab ko'ring.
                </p>
                <button
                  onClick={() => setSelectedCategory("Barchasi")}
                  className="mt-10 font-medium text-[#007AFF] hover:text-[#005bb5] bg-[#007AFF]/5 hover:bg-[#007AFF]/10 px-8 py-3 rounded-full transition-all border border-[#007AFF]/20"
                >
                  Barcha mahsulotlarni ko'rish
                </button>
              </motion.div>
            )}
          </div>
        </main>
      </Layout>
      <TelegramAuthDebug devMode={DEV_MODE} />
    </CartProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          className: 'font-[Inter] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100',
          style: { background: '#ffffff', color: '#0f172a' }
        }}
      />
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
