'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import { quizQuestions, archetypes, badges, getRarityRank, rarityRankLabels, QuizResult, RadarData, Badge } from '@/data/quiz';

type QuizState = 'landing' | 'quiz' | 'result';

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>('landing');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleStart = () => {
    setQuizState('quiz');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (optionId: string) => {
    const newAnswers = { ...answers, [currentQuestion]: optionId };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, string>) => {
    const scores = { dominant: 0, sadist: 0, submissive: 0, masochist: 0 };
    
    Object.entries(finalAnswers).forEach(([qIndex, optionId]) => {
      const question = quizQuestions[parseInt(qIndex)];
      const option = question.options.find(o => o.id === optionId);
      if (option) {
        Object.entries(option.scores).forEach(([dim, score]) => {
          scores[dim as keyof typeof scores] += score;
        });
      }
    });

    const maxScore = Math.max(...Object.values(scores));
    const primaryDimension = Object.entries(scores).find(([_, s]) => s === maxScore)?.[0] as keyof typeof scores;
    
    const matchingArchetypes = archetypes
      .filter(a => a.dimension === primaryDimension)
      .sort((a, b) => a.rarity - b.rarity);
    
    const archetype = matchingArchetypes[0] || archetypes[0];

    const radarData: RadarData[] = [
      { dimension: '控制欲', value: scores.dominant, fullMark: 12 },
      { dimension: '施虐傾向', value: scores.sadist, fullMark: 12 },
      { dimension: '順從度', value: scores.submissive, fullMark: 12 },
      { dimension: '痛感耐受', value: scores.masochist, fullMark: 12 },
    ];

    const earnedBadges: Badge[] = [];
    if (scores.submissive >= 8) earnedBadges.push(badges[0]);
    if (archetype.rarity >= 2.5) earnedBadges.push(badges[1]);
    if (scores.submissive >= 6 && scores.masochist >= 6) earnedBadges.push(badges[2]);
    if (Object.values(scores).every(s => s > 3)) earnedBadges.push(badges[3]);
    if (archetype.rarity <= 1.0) earnedBadges.push(badges[4]);
    if (scores.dominant >= 6 || scores.sadist >= 6) earnedBadges.push(badges[5]);

    const rarityRank = getRarityRank(archetype.rarity);

    setResult({
      archetype,
      scores,
      radarData,
      badges: earnedBadges,
      rarityRank,
    });
    setQuizState('result');
  };

  const resetQuiz = () => {
    setQuizState('landing');
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
        <div className="text-[#D4AF37] text-xl">載入中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-romantic bg-stars overflow-hidden relative">
      {/* Glow Orbs */}
      <div className="glow-orb glow-orb--1" />
      <div className="glow-orb glow-orb--2" />
      <div className="glow-orb glow-orb--3" />
      
      {/* Vignette Effect */}
      <div className="vignette" />
      
      {/* Velvet Curtains */}
      <div className="velvet-curtain-top" />
      <div className="velvet-curtain-bottom" />
      
      {/* Lace Patterns */}
      <div className="lace-top" />
      <div className="lace-bottom" />
      
      {/* Ornate Corners */}
      <div className="ornate-corner ornate-corner--top-left" />
      <div className="ornate-corner ornate-corner--top-right" />
      <div className="ornate-corner ornate-corner--bottom-left" />
      <div className="ornate-corner ornate-corner--bottom-right" />
      
      {/* Luxurious Frame */}
      <div className="luxury-frame" />
      <div className="luxury-frame-corners" />
      
      {/* Rose Decorations */}
      <div className="rose-decoration rose-decoration--1" />
      <div className="rose-decoration rose-decoration--2" />
      
      {/* Floating Particles */}
      <div className="particles-container">
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {quizState === 'landing' && (
            <LandingPage key="landing" onStart={handleStart} />
          )}
          {quizState === 'quiz' && (
            <QuizPage 
              key="quiz"
              question={quizQuestions[currentQuestion]}
              current={currentQuestion}
              total={quizQuestions.length}
              onAnswer={handleAnswer}
              selectedAnswer={answers[currentQuestion] ?? ''}
            />
          )}
          {quizState === 'result' && result && (
            <ResultPage key="result" result={result} onRestart={resetQuiz} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          className="mb-8"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-6xl">💋</span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold text-gold gradient-text-animate mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
          你的性怪癖有多罕見？
        </h1>

        <p className="text-lg md:text-xl text-[#F5DEB3] mb-8 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          僅需 10 個問題，透視你的性心理原型，解鎖你最深層的快感來源
        </p>

        <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-10" />

        <p className="text-[#B8A082] mb-12 max-w-lg mx-auto">
          探索你內心深處的慾望地圖，了解你在親密關係中的真實面目。 
          超過數千人已發現他們的性靈魂原型。
        </p>

        <motion.button
          onClick={onStart}
          className="btn-heart px-12 py-4 rounded-full text-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          立即開始深度診斷
        </motion.button>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-[#B8A082] text-sm">
          <div className="flex items-center gap-2">
            <span>🔒</span>
            <span>完全匿名</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⏱️</span>
            <span>約 3 分鐘</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📊</span>
            <span>專業心理測驗</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function QuizPage({ 
  question, 
  current, 
  total, 
  onAnswer, 
  selectedAnswer 
}: { 
  question: typeof quizQuestions[0];
  current: number;
  total: number;
  onAnswer: (optionId: string) => void;
  selectedAnswer?: string;
}) {
  const progress = ((current + 1) / total) * 100;

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-xl">
        <div className="mb-12">
          <div className="flex justify-between text-[#F5DEB3] text-sm mb-2">
            <span>問題 {current + 1} / {total}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <motion.div
          key={question.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl text-[#FFFFF0] font-medium" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {question.text}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <motion.button
              key={option.id}
              onClick={() => onAnswer(option.id)}
              className={`w-full p-5 rounded-xl text-left transition-all duration-300 glass-card card-luxury ${
                selectedAnswer === option.id 
                  ? 'border-[#D4AF37] bg-[rgba(212,175,55,0.1)]' 
                  : 'hover:border-[rgba(212,175,55,0.6)]'
              }`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-[#F5DEB3]">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ResultPage({ result, onRestart }: { result: QuizResult; onRestart: () => void }) {
  const { archetype, radarData, badges, rarityRank } = result;
  const rankInfo = rarityRankLabels[rarityRank];
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const shareText = `我的性原型是「${archetype.name}」！在全台僅 ${archetype.rarity}% 的人與我相同。你呢？`;

  const handleDownloadImage = async () => {
    if (!resultCardRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: '#1A1A2E',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `性原型診斷-${archetype.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('生成圖片失敗:', error);
      alert('生成圖片失敗，請稍後再試');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="min-h-screen overflow-y-auto py-12 px-4"
    >
      <div ref={resultCardRef} className="max-w-2xl mx-auto bg-[#1A1A2E] p-6 rounded-2xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div 
            className="inline-block px-4 py-1 rounded-full text-sm mb-4"
            style={{ backgroundColor: `${rankInfo.color}20`, color: rankInfo.color, border: `1px solid ${rankInfo.color}` }}
          >
            {rankInfo.label}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {archetype.name}
          </h1>
          
          <p className="text-[#F5DEB3] text-xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {archetype.nameEn}
          </p>
          
          <p className="text-[#B8A082]">
            全台僅 {archetype.rarity}% 的人與你相同
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-8 mb-8 gold-border"
        >
          <h3 className="text-[#D4AF37] text-lg mb-4 font-medium">原型描述</h3>
          <p className="text-[#FFFFF0] mb-6 leading-relaxed">
            {archetype.description}
          </p>
          
          <div className="mb-6">
            <h4 className="text-[#D4AF37] text-sm mb-2">核心特質</h4>
            <div className="flex flex-wrap gap-2">
              {archetype.traits.map((trait, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-[rgba(212,175,55,0.1)] text-[#F5DEB3] text-sm border border-[rgba(212,175,55,0.3)]">
                  {trait}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[#D4AF37] text-sm mb-2">理想伴侶匹配</h4>
            <div className="flex flex-wrap gap-2">
              {archetype.partnerMatch.map((match, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-[rgba(224,17,95,0.1)] text-[#E0115F] text-sm border border-[rgba(224,17,95,0.3)]">
                  {match}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-8 mb-8"
        >
          <h3 className="text-[#D4AF37] text-lg mb-6 text-center">心理維度分析</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(212,175,55,0.3)" />
                <PolarAngleAxis 
                  dataKey="dimension" 
                  tick={{ fill: '#F5DEB3', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 12]} 
                  tick={{ fill: '#B8A082', fontSize: 10 }}
                />
                <Radar
                  name="你的分數"
                  dataKey="value"
                  stroke="#D4AF37"
                  fill="#D4AF37"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {badges.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-8 mb-8"
          >
            <h3 className="text-[#D4AF37] text-lg mb-4 text-center">🏆 獲得勳章</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center p-3 rounded-xl bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.2)]"
                >
                  <span className="text-3xl mb-1">{badge.icon}</span>
                  <span className="text-[#F5DEB3] text-sm">{badge.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-[#B8A082] mb-4">保存你的結果</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleDownloadImage}
              disabled={isGenerating}
              className="btn-gold px-6 py-3 rounded-full disabled:opacity-50"
            >
              {isGenerating ? '生成中...' : '下載結果圖片'}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={onRestart}
            className="text-[#B8A082] hover:text-[#F5DEB3] transition-colors underline underline-offset-4"
          >
            重新測驗
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
