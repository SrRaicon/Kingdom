import { motion } from 'motion/react';
import { Crown, Medal, Trophy, Swords, Shield, Star } from 'lucide-react';

export default function HallOfFame() {
  const topPlayers = [
    {
      rank: 2,
      name: "Sir Lancelot",
      title: "La Espada Veloz",
      kingdom: "Reino de Ávalon",
      victories: 1350,
      level: 95,
      color: "zinc",
      height: "md:h-[28rem]",
      icon: <Medal className="w-12 h-12 text-zinc-300 drop-shadow-[0_0_10px_rgba(212,212,216,0.5)]" />,
      border: "border-zinc-400/50",
      bg: "bg-gradient-to-t from-zinc-900 to-zinc-800/40",
      text: "text-zinc-300",
      glow: "shadow-[0_0_30px_rgba(212,212,216,0.1)]",
      delay: 0.2
    },
    {
      rank: 1,
      name: "Rey Arturo",
      title: "El Invicto",
      kingdom: "Reino de Ávalon",
      victories: 1540,
      level: 99,
      color: "amber",
      height: "md:h-[32rem]",
      icon: <Crown className="w-16 h-16 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />,
      border: "border-amber-400/60",
      bg: "bg-gradient-to-t from-amber-950/80 to-amber-900/30",
      text: "text-amber-400",
      glow: "shadow-[0_0_50px_rgba(251,191,36,0.2)]",
      delay: 0.4
    },
    {
      rank: 3,
      name: "Lord Ragnar",
      title: "El Rompeescudos",
      kingdom: "Horda del Norte",
      victories: 1210,
      level: 92,
      color: "orange",
      height: "md:h-[24rem]",
      icon: <Trophy className="w-10 h-10 text-orange-600 drop-shadow-[0_0_10px_rgba(234,88,12,0.5)]" />,
      border: "border-orange-700/50",
      bg: "bg-gradient-to-t from-orange-950/80 to-orange-900/20",
      text: "text-orange-500",
      glow: "shadow-[0_0_20px_rgba(234,88,12,0.1)]",
      delay: 0.6
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-6"
        >
          <Star className="w-4 h-4" />
          Los Más Grandes Héroes
        </motion.div>
        <h2 className="font-medieval text-4xl md:text-6xl text-amber-50 mb-4">Salón de la Fama</h2>
        <div className="w-24 h-1 bg-amber-800/50 mx-auto mb-6"></div>
        <p className="text-zinc-400 max-w-2xl mx-auto font-light text-lg">
          Contempla a los tres guerreros más formidables de todo el reino. Sus nombres resonarán en la eternidad.
        </p>
      </div>

      {/* Podium Layout */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6 mt-24 md:mt-32">
        {topPlayers.map((player) => (
          <motion.div
            key={player.rank}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: player.delay, type: "spring", bounce: 0.4 }}
            className={`w-full md:w-1/3 relative flex flex-col items-center ${player.rank === 1 ? 'order-first md:order-none z-10' : ''}`}
          >
            {/* Player Card */}
            <div className={`w-full ${player.height} ${player.bg} border-t-2 border-l border-r ${player.border} rounded-t-2xl p-6 flex flex-col items-center text-center relative overflow-hidden ${player.glow}`}>
              
              {/* Background Glow Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-white/5 blur-[50px] rounded-full pointer-events-none"></div>

              {/* Rank Icon */}
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-current opacity-20 blur-xl rounded-full"></div>
                {player.icon}
              </div>

              {/* Rank Number */}
              <span className={`font-medieval text-6xl font-bold ${player.text} opacity-20 absolute top-4 right-6 pointer-events-none`}>
                #{player.rank}
              </span>

              {/* Player Info */}
              <h3 className="font-medieval text-3xl text-white mb-1">{player.name}</h3>
              <p className={`text-sm font-semibold uppercase tracking-widest mb-6 ${player.text}`}>
                {player.title}
              </p>

              <div className="w-full space-y-4 mt-auto">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-zinc-400 text-xs uppercase tracking-wider">Reino</span>
                  <span className="text-zinc-200 text-sm font-medium flex items-center gap-2">
                    <Shield className="w-3 h-3 text-zinc-500" />
                    {player.kingdom}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-zinc-400 text-xs uppercase tracking-wider">Nivel</span>
                  <span className="text-zinc-200 text-sm font-mono">{player.level}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-zinc-400 text-xs uppercase tracking-wider">Victorias</span>
                  <span className={`text-sm font-mono font-bold flex items-center gap-2 ${player.text}`}>
                    <Swords className="w-3 h-3" />
                    {player.victories.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Pedestal Base */}
            <div className={`w-full h-8 bg-zinc-950 border-t border-b ${player.border} relative`}>
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
            </div>
            <div className={`w-[105%] h-4 bg-zinc-900 border-t border-b ${player.border} rounded-b-sm`}></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
