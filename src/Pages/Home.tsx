import { motion } from 'motion/react';
import { Sword, Scroll, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative py-32 px-6 flex flex-col items-center text-center border-b border-zinc-800/50 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-900/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-8">
            <Scroll className="w-4 h-4" />
            Temporada I: El Despertar
          </div>
          
          <h2 className="font-medieval text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-none">
            Forja tu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">
              Leyenda
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/wiki" className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-zinc-950 font-semibold rounded-sm transition-all flex items-center gap-2 uppercase tracking-wider text-sm">
              <Sword className="w-4 h-4" />
              Explorar el Mundo
            </Link>
            <Link to="/clasificacion" className="px-8 py-4 bg-transparent border border-zinc-700 hover:border-amber-500/50 hover:text-amber-400 text-zinc-300 font-medium rounded-sm transition-all uppercase tracking-wider text-sm">
              Ver Clasificación
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h3 className="font-medieval text-3xl md:text-4xl text-amber-50 mb-4">El Reino te Aguarda</h3>
          <div className="w-24 h-1 bg-amber-800/50 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="w-8 h-8 text-amber-500" />,
              title: "Facciones en Guerra",
              desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
            },
            {
              icon: <Scroll className="w-8 h-8 text-amber-500" />,
              title: "Lore Profundo",
              desc: "Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium."
            },
            {
              icon: <Sword className="w-8 h-8 text-amber-500" />,
              title: "Combate Épico",
              desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem."
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-zinc-900/40 border border-zinc-800/50 p-8 rounded-lg hover:border-amber-500/30 transition-colors group"
            >
              <div className="mb-6 p-4 bg-zinc-950 inline-block rounded-full border border-zinc-800 group-hover:border-amber-500/50 transition-colors">
                {feature.icon}
              </div>
              <h4 className="font-medieval text-2xl text-amber-50 mb-4">{feature.title}</h4>
              <p className="text-zinc-400 font-light leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
