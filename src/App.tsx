/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import HallOfFame from './pages/HallOfFame';
import Shop from './pages/Shop';
import Wiki from './pages/Wiki';
import News from './pages/News';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="salon-fama" element={<HallOfFame />} />
          <Route path="clasificacion" element={<Leaderboard />} />
          <Route path="tienda" element={<Shop />} />
          <Route path="wiki" element={<Wiki />} />
          <Route path="noticias" element={<News />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
