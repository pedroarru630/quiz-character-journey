import Index from '@/pages/Index';
import Quiz from '@/pages/Quiz';
import Result from '@/pages/Result';
import Start from '@/pages/Start';
import FAQ from '@/pages/FAQ';
import NotFound from '@/pages/NotFound';
import Support from '@/pages/Support';
import Withdraw from '@/pages/Withdraw';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/start" element={<Start />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
