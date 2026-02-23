import { motion } from 'motion/react';
import { BookOpen, Map, Users, Shield, Search } from 'lucide-react';
import { useState } from 'react';

export default function Wiki() {
  const [activeTab, setActiveTab] = useState('reinos');

  const tabs = [
    { id: 'reinos', label: 'Reinos', icon: <Map className="w-4 h-4" /> },
    { id: 'razas', label: 'Razas', icon: <Users className="w-4 h-4" /> },
    { id: 'objetos', label: 'Objetos Míticos', icon: <Shield className="w-4 h-4" /> },
    { id: 'historia', label: 'Historia', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const content = {
    reinos: [
      { title: "Reino de Ávalon", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
      { title: "Imperio Draconis", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
    ],
    razas: [
      { title: "Humanos", desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
      { title: "Elfos del Bosque Oscuro", desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt." }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="sticky top-28">
          <div className="mb-8 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar en la wiki..." 
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md py-2 pl-10 pr-4 text-sm text-zinc-300 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>

          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Categorías</h3>
          <nav className="flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors text-left ${
                  activeTab === tab.id 
                    ? 'bg-amber-900/20 text-amber-400 border border-amber-500/30' 
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow">
        <div className="mb-10 pb-6 border-b border-zinc-800/50">
          <h2 className="font-medieval text-4xl text-amber-50 mb-4 capitalize">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <p className="text-zinc-400 font-light">
            Explora el conocimiento antiguo acumulado por los sabios durante milenios.
          </p>
        </div>

        <div className="space-y-8">
          {/* @ts-ignore */}
          {(content[activeTab] || content.reinos).map((item, idx) => (
            <motion.article 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900/20 border border-zinc-800/50 rounded-xl p-8"
            >
              <h3 className="font-medieval text-2xl text-amber-200 mb-4">{item.title}</h3>
              <div className="prose prose-invert prose-zinc max-w-none">
                <p className="text-zinc-400 leading-relaxed font-light">
                  {item.desc}
                </p>
                <p className="text-zinc-400 leading-relaxed font-light mt-4">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
