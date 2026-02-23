import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins, ShoppingBag, Shield, Sword, FlaskConical, ChevronDown, ChevronRight, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export default function Shop() {
  // Estado del usuario (simulado)
  const [balance, setBalance] = useState(1250);
  const [playerName] = useState("Sir Lancelot"); // Simulación de usuario logueado
  
  // Estado de la tienda
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Arma', 'Defensa', 'Consumible']);
  
  // Estado de notificaciones y modales
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' }>({ 
    visible: false, 
    message: '', 
    type: 'success' 
  });
  const [selectedItem, setSelectedItem] = useState<typeof items[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const items = [
    { id: 1, name: "Espada Larga de Acero", type: "Arma", price: 150, rarity: "Común", icon: <Sword className="w-6 h-6" />, desc: "Un arma confiable forjada en las herrerías de Ávalon." },
    { id: 2, name: "Escudo de Roble Oscuro", type: "Defensa", price: 220, rarity: "Poco Común", icon: <Shield className="w-6 h-6" />, desc: "Madera tratada con magia antigua para resistir impactos fuertes." },
    { id: 3, name: "Poción de Curación Mayor", type: "Consumible", price: 50, rarity: "Común", icon: <FlaskConical className="w-6 h-6" />, desc: "Restaura vitalidad instantáneamente en medio del combate." },
    { id: 4, name: "Armadura de Escamas de Dragón", type: "Defensa", price: 1200, rarity: "Épico", icon: <Shield className="w-6 h-6" />, desc: "Extremadamente rara. Ofrece resistencia al fuego y ataques físicos." },
    { id: 5, name: "Daga Envenenada", type: "Arma", price: 450, rarity: "Raro", icon: <Sword className="w-6 h-6" />, desc: "Imbuida con toxinas de las profundidades del Bosque Oscuro." },
    { id: 6, name: "Elixir de Fuerza", type: "Consumible", price: 180, rarity: "Poco Común", icon: <FlaskConical className="w-6 h-6" />, desc: "Aumenta temporalmente el daño infligido en un 25%." },
  ];

  const categories = ['Todos', 'Arma', 'Defensa', 'Consumible'];

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Función para enviar el webhook a Discord
  const sendDiscordNotification = async (item: typeof items[0]) => {
    // NOTA: En producción, esta URL debe venir de variables de entorno (.env)
    // y la llamada debe hacerse desde un backend para no exponer la URL del webhook en el cliente.
    // Para este prototipo, simularemos el comportamiento.
    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.log("Simulando envío a Discord:", {
        jugador: playerName,
        objeto: item.name,
        precio: item.price,
        rareza: item.rarity
      });
      return true; // Simulamos éxito si no hay URL configurada
    }

    try {
      const rarityColors: Record<string, number> = {
        'Común': 10197915, // Gris
        'Poco Común': 3066993, // Verde
        'Raro': 3447003, // Azul
        'Épico': 10181046 // Morado
      };

      const payload = {
        username: "Mercader del Reino",
        avatar_url: "https://picsum.photos/seed/merchant/200/200",
        embeds: [{
          title: "📜 Nueva Transacción Comercial",
          description: `**${playerName}** ha realizado una compra en el Mercado Negro.`,
          color: rarityColors[item.rarity] || 16766720, // Color por defecto (Dorado)
          fields: [
            { name: "Objeto Adquirido", value: item.name, inline: true },
            { name: "Rareza", value: item.rarity, inline: true },
            { name: "Costo", value: `${item.price} Monedas 🪙`, inline: false },
            { name: "Fondos Restantes", value: `${balance - item.price} Monedas 🪙`, inline: true }
          ],
          footer: { text: "Registro del Mercado Negro • Reino Eterno" },
          timestamp: new Date().toISOString()
        }]
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      return response.ok;
    } catch (error) {
      console.error("Error enviando notificación a Discord:", error);
      return false;
    }
  };

  const confirmPurchase = async () => {
    if (!selectedItem) return;
    
    setIsProcessing(true);
    
    // 1. Descontar saldo (Simulado localmente)
    setBalance(prev => prev - selectedItem.price);
    
    // 2. Enviar notificación a Discord
    await sendDiscordNotification(selectedItem);
    
    // 3. Mostrar éxito y cerrar modal
    setIsProcessing(false);
    setSelectedItem(null);
    showToast(`Has adquirido: ${selectedItem.name}`, 'success');
  };

  const handlePurchaseClick = (item: typeof items[0]) => {
    if (balance >= item.price) {
      setSelectedItem(item); // Abre el modal de confirmación
    } else {
      showToast(`Monedas insuficientes para: ${item.name}`, 'error');
    }
  };

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'Común': return 'text-zinc-400 border-zinc-700';
      case 'Poco Común': return 'text-emerald-400 border-emerald-700';
      case 'Raro': return 'text-blue-400 border-blue-700';
      case 'Épico': return 'text-purple-400 border-purple-700';
      default: return 'text-zinc-400 border-zinc-700';
    }
  };

  const filteredItems = activeCategory === 'Todos' 
    ? items 
    : items.filter(item => item.type === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      
      {/* Header de la Tienda */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-zinc-800/50 pb-8">
        <div>
          <h2 className="font-medieval text-4xl md:text-5xl text-amber-50 mb-4">Mercado Negro</h2>
          <p className="text-zinc-400 max-w-xl font-light">
            Intercambia tus monedas ganadas en misiones por equipamiento superior. Elige sabiamente tus recursos.
          </p>
        </div>
        
        <div className="mt-6 md:mt-0 bg-zinc-900/80 border border-amber-900/50 p-4 rounded-lg flex items-center gap-4 shadow-lg shadow-amber-900/5">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Tus Fondos</p>
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-400" />
              <motion.span 
                key={balance}
                initial={{ scale: 1.2, color: '#fbbf24' }}
                animate={{ scale: 1, color: '#fef3c7' }}
                className="font-mono text-2xl text-amber-50"
              >
                {balance.toLocaleString()}
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Menú Lateral Desplegable */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4 sticky top-28">
            <h3 className="font-medieval text-xl text-amber-50 mb-4 border-b border-zinc-800/50 pb-2">Catálogo</h3>
            
            <button 
              onClick={() => setActiveCategory('Todos')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors mb-2 ${
                activeCategory === 'Todos' ? 'bg-amber-900/20 text-amber-400' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              Mostrar Todos
            </button>

            <div className="space-y-2">
              {categories.filter(c => c !== 'Todos').map(category => (
                <div key={category} className="border border-zinc-800/30 rounded-md overflow-hidden">
                  <button 
                    onClick={() => {
                      toggleCategory(category);
                      setActiveCategory(category);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium transition-colors ${
                      activeCategory === category ? 'bg-amber-900/10 text-amber-400' : 'text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                  >
                    {category}s
                    {expandedCategories.includes(category) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  {/* Lista de productos desplegable */}
                  <AnimatePresence>
                    {expandedCategories.includes(category) && (
                      <motion.ul 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-zinc-950/50 overflow-hidden"
                      >
                        {items.filter(i => i.type === category).map(item => (
                          <li 
                            key={item.id} 
                            className="px-4 py-2 text-xs text-zinc-500 hover:text-amber-300 cursor-pointer border-l-2 border-transparent hover:border-amber-500 transition-colors flex justify-between items-center"
                            onClick={() => setActiveCategory(category)}
                          >
                            <span className="truncate pr-2">{item.name}</span>
                            <span className="font-mono text-amber-500/70">{item.price}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid de Productos */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col group hover:border-amber-700/50 transition-colors relative"
              >
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg border bg-zinc-950/50 ${getRarityColor(item.rarity)}`}>
                      {item.icon}
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded border bg-zinc-950/50 ${getRarityColor(item.rarity)}`}>
                      {item.rarity}
                    </span>
                  </div>
                  
                  <h3 className="font-medieval text-xl text-amber-50 mb-2">{item.name}</h3>
                  <p className="text-sm text-zinc-500 mb-4 line-clamp-2">{item.desc}</p>
                </div>
                
                <div className="p-4 bg-zinc-950/50 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-500" />
                    <span className={`font-mono text-lg ${balance >= item.price ? 'text-amber-100' : 'text-red-400'}`}>
                      {item.price}
                    </span>
                  </div>
                  <button 
                    onClick={() => handlePurchaseClick(item)}
                    className={`px-4 py-2 font-medium rounded text-sm transition-colors flex items-center gap-2 ${
                      balance >= item.price 
                        ? 'bg-zinc-800 hover:bg-amber-600 text-zinc-300 hover:text-zinc-950' 
                        : 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Comprar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Confirmación de Compra */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
              onClick={() => !isProcessing && setSelectedItem(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-zinc-900 border border-amber-900/50 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-800/50 bg-zinc-950/50 flex items-center gap-4">
                <div className={`p-3 rounded-lg border bg-zinc-900 ${getRarityColor(selectedItem.rarity)}`}>
                  {selectedItem.icon}
                </div>
                <div>
                  <h3 className="font-medieval text-2xl text-amber-50">{selectedItem.name}</h3>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${getRarityColor(selectedItem.rarity).split(' ')[0]}`}>
                    {selectedItem.rarity}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start gap-3 mb-6 p-4 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Estás a punto de entregar <strong className="text-amber-400">{selectedItem.price} monedas</strong> al mercader. Esta transacción es definitiva y quedará registrada en los pergaminos del reino.
                  </p>
                </div>
                
                <div className="flex justify-between items-center mb-8 px-2">
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Fondos Actuales</p>
                    <p className="font-mono text-lg text-zinc-300">{balance}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-600" />
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Costo</p>
                    <p className="font-mono text-lg text-red-400">-{selectedItem.price}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-600" />
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Restante</p>
                    <p className="font-mono text-lg text-amber-400">{balance - selectedItem.price}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedItem(null)}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 rounded font-medium transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={confirmPurchase}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-3 bg-amber-600 hover:bg-amber-500 text-zinc-950 rounded font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="animate-pulse">Firmando...</span>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Confirmar Trato
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sistema de Notificaciones (Toast) */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl border backdrop-blur-md ${
              toast.type === 'success' 
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-50' 
                : 'bg-red-950/80 border-red-500/50 text-red-50'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <span className="font-medium text-sm tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
