import { motion } from 'motion/react';
import { Calendar, ChevronRight } from 'lucide-react';

export default function News() {
  const newsItems = [
    {
      id: 1,
      title: "La Caída de la Fortaleza de Piedra",
      date: "15 de Octubre, Era del Fuego",
      category: "Evento de Mundo",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://picsum.photos/seed/castle/800/400"
    },
    {
      id: 2,
      title: "Actualización del Sistema de Comercio",
      date: "12 de Octubre, Era del Fuego",
      category: "Parche",
      excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://picsum.photos/seed/market/800/400"
    },
    {
      id: 3,
      title: "Nueva Raza Desbloqueada: Los Olvidados",
      date: "05 de Octubre, Era del Fuego",
      category: "Contenido",
      excerpt: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      image: "https://picsum.photos/seed/fantasy/800/400"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-16 text-center">
        <h2 className="font-medieval text-4xl md:text-5xl text-amber-50 mb-4">Noticias del Reino</h2>
        <div className="w-24 h-1 bg-amber-800/50 mx-auto mb-6"></div>
        <p className="text-zinc-400 max-w-2xl mx-auto font-light">
          Mantente informado sobre los últimos acontecimientos, batallas y decretos reales.
        </p>
      </div>

      <div className="space-y-12">
        {newsItems.map((item, idx) => (
          <motion.article 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-zinc-900/30 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-amber-700/50 transition-colors"
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-amber-900/30 text-amber-400 text-xs font-semibold uppercase tracking-wider rounded border border-amber-700/30">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-zinc-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                </div>
                
                <h3 className="font-medieval text-2xl md:text-3xl text-amber-50 mb-4 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-zinc-400 font-light leading-relaxed mb-6 line-clamp-3">
                  {item.excerpt}
                </p>
                
                <button className="flex items-center gap-2 text-amber-500 font-medium text-sm uppercase tracking-wider hover:text-amber-400 transition-colors w-fit">
                  Leer Pergamino Completo
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <button className="px-6 py-3 border border-zinc-700 hover:border-amber-500/50 text-zinc-300 hover:text-amber-400 rounded transition-colors uppercase tracking-wider text-sm font-medium">
          Cargar Archivos Antiguos
        </button>
      </div>
    </div>
  );
}
