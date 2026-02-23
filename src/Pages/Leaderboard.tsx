import { motion } from 'motion/react';
import { Trophy, Users, Swords, Crown } from 'lucide-react';

export default function Leaderboard() {
  const kingdoms = [
    { rank: 1, name: "Reino de Ávalon", members: 1240, victories: 89, winRate: "72%", color: "text-blue-400", bg: "bg-blue-950/30", border: "border-blue-900/50" },
    { rank: 2, name: "Imperio Draconis", members: 1105, victories: 76, winRate: "68%", color: "text-red-400", bg: "bg-red-950/30", border: "border-red-900/50" },
    { rank: 3, name: "Alianza del Bosque", members: 980, victories: 65, winRate: "61%", color: "text-emerald-400", bg: "bg-emerald-950/30", border: "border-emerald-900/50" },
    { rank: 4, name: "Horda del Norte", members: 1450, victories: 54, winRate: "45%", color: "text-zinc-400", bg: "bg-zinc-900/30", border: "border-zinc-800/50" },
    { rank: 5, name: "Comerciantes Libres", members: 620, victories: 32, winRate: "51%", color: "text-amber-400", bg: "bg-amber-950/30", border: "border-amber-900/50" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <h2 className="font-medieval text-4xl md:text-5xl text-amber-50 mb-4">Tabla de Clasificación</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-900/40 border border-zinc-800/50 p-6 rounded-lg flex items-center gap-4">
          <div className="p-3 bg-amber-900/20 rounded-full border border-amber-500/20">
            <Users className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-zinc-500 uppercase tracking-wider">Total Guerreros</p>
            <p className="text-2xl font-mono text-amber-50">5,395</p>
          </div>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/50 p-6 rounded-lg flex items-center gap-4">
          <div className="p-3 bg-amber-900/20 rounded-full border border-amber-500/20">
            <Swords className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-zinc-500 uppercase tracking-wider">Batallas Libradas</p>
            <p className="text-2xl font-mono text-amber-50">12,480</p>
          </div>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/50 p-6 rounded-lg flex items-center gap-4">
          <div className="p-3 bg-amber-900/20 rounded-full border border-amber-500/20">
            <Crown className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-zinc-500 uppercase tracking-wider">Temporada Actual</p>
            <p className="text-2xl font-medieval text-amber-50">Era del Fuego</p>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/50">
                <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Rango</th>
                <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Reino</th>
                <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Integrantes</th>
                <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Victorias</th>
                <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Tasa de Éxito</th>
              </tr>
            </thead>
            <tbody>
              {kingdoms.map((kingdom, idx) => (
                <motion.tr 
                  key={kingdom.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors ${kingdom.bg}`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {kingdom.rank === 1 && <Trophy className="w-5 h-5 text-amber-400" />}
                      {kingdom.rank === 2 && <Trophy className="w-5 h-5 text-zinc-300" />}
                      {kingdom.rank === 3 && <Trophy className="w-5 h-5 text-amber-700" />}
                      <span className="font-mono text-lg text-zinc-300">#{kingdom.rank}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-medieval text-lg ${kingdom.color}`}>{kingdom.name}</span>
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-zinc-300">{kingdom.members.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right font-mono text-amber-100">{kingdom.victories}</td>
                  <td className="py-4 px-6 text-right font-mono text-zinc-400">{kingdom.winRate}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
