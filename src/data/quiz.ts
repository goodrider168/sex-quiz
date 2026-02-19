// Quiz Types and Data

export type Dimension = 'dominant' | 'sadist' | 'submissive' | 'masochist';

export type Theme = 'power' | 'pain' | 'emotion' | 'curiosity';

export interface Archetype {
  id: string;
  name: string;
  nameEn: string;
  theme: Theme;
  dimension: Dimension;
  rarity: number; // percentage
  description: string;
  traits: string[];
  partnerMatch: string[];
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  scores: Record<Dimension, number>;
}

export interface RadarData {
  dimension: string;
  value: number;
  fullMark: number;
}

export interface QuizResult {
  archetype: Archetype;
  scores: Record<Dimension, number>;
  radarData: RadarData[];
  badges: Badge[];
  rarityRank: RarityRank;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export type RarityRank = 'top' | 'rare' | 'evolved' | 'unique' | 'typical' | 'common' | 'ordinary';

// Archetypes Database
export const archetypes: Archetype[] = [
  // Theme A: Power & Control
  { id: 'disciplinarian', name: '紀律者', nameEn: 'Disciplinarian', theme: 'power', dimension: 'dominant', rarity: 1.0, description: '追求嚴格的結構化環境', traits: ['組織性', '權威性', '紀律'], partnerMatch: ['臣服者', '寵物'] },
  { id: 'switch', name: '切換者', nameEn: 'Switch', theme: 'power', dimension: 'dominant', rarity: 1.9, description: '流動且適應性強，能在不同角色間變換', traits: ['靈活性', '適應性', '平衡'], partnerMatch: ['切換者', '冒險家'] },
  { id: 'dominant', name: '支配者', nameEn: 'Dominant', theme: 'power', dimension: 'dominant', rarity: 2.3, description: '自信且具指揮性', traits: ['領導力', '自信', '控制'], partnerMatch: ['臣服者', '順從者'] },
  { id: 'submissive', name: '臣服者', nameEn: 'Submissive', theme: 'power', dimension: 'submissive', rarity: 3.3, description: '完全順從，將控制權交予對方', traits: ['服從', '信任', ' surrender'], partnerMatch: ['支配者', '紀律者'] },
  
  // Theme B: Pain & Sensation
  { id: 'sadist', name: '施虐者', nameEn: 'Sadist', theme: 'pain', dimension: 'sadist', rarity: 0.2, description: '強烈且不妥協', traits: ['強度', '主導', '徹底'], partnerMatch: ['受虐者', '束縛者'] },
  { id: 'rigger', name: '束縛者', nameEn: 'Rigger', theme: 'pain', dimension: 'sadist', rarity: 0.3, description: '享受無助地被束縛的感覺', traits: ['創造性', '控制', '安全感'], partnerMatch: ['寵物', '臣服者'] },
  { id: 'masochist', name: '受虐者', nameEn: 'Masochist', theme: 'pain', dimension: 'masochist', rarity: 0.9, description: '接受並享受痛苦帶來的快感', traits: ['耐受力', '深度', ' intensity'], partnerMatch: ['施虐者', '支配者'] },
  { id: 'primal', name: '原始者', nameEn: 'Primal', theme: 'pain', dimension: 'masochist', rarity: 2.9, description: '野性且充滿本能', traits: ['野性', '本能', '激情'], partnerMatch: ['原始者', '冒險家'] },
  
  // Theme C: Emotion & Connection
  { id: 'caretaker', name: '照顧者', nameEn: 'Caretaker', theme: 'emotion', dimension: 'submissive', rarity: 0.9, description: '提供安全且可靠的連結', traits: ['關懷', '奉獻', '安全'], partnerMatch: ['寵物', '臣服者'] },
  { id: 'romantic', name: '浪漫主義者', nameEn: 'Romantic', theme: 'emotion', dimension: 'submissive', rarity: 1.9, description: '追求深情且感性的互動', traits: ['感性', '熱情', '浪漫'], partnerMatch: ['浪漫主義者', '靈性者'] },
  { id: 'pet', name: '寵物', nameEn: 'Pet', theme: 'emotion', dimension: 'submissive', rarity: 2.7, description: '渴望被寵愛、被馴服', traits: ['依賴', '可愛', '信任'], partnerMatch: ['照顧者', '支配者'] },
  { id: 'spiritual', name: '靈性者', nameEn: 'Spiritual', theme: 'emotion', dimension: 'submissive', rarity: 3.3, description: '追求靈魂層面的深度連結', traits: ['深度', '靈性', '連接'], partnerMatch: ['浪漫主義者', '神秘主義者'] },
  
  // Theme D: Curiosity & Exploration
  { id: 'rebel', name: '反叛者', nameEn: 'Rebel', theme: 'curiosity', dimension: 'sadist', rarity: 0.3, description: '狂野且反叛，挑戰禁忌', traits: ['自由', '反叛', '大膽'], partnerMatch: ['反叛者', '冒險家'] },
  { id: 'sapiosexual', name: '智性戀', nameEn: 'Sapiosexual', theme: 'curiosity', dimension: 'dominant', rarity: 1.1, description: '追求冷靜且具分析性的刺激', traits: ['智慧', '理性', '好奇心'], partnerMatch: ['智性戀', '神秘主義者'] },
  { id: 'adventurer', name: '冒險家', nameEn: 'Adventurer', theme: 'curiosity', dimension: 'sadist', rarity: 1.9, description: '不斷尋求新鮮與冒險的刺激', traits: ['冒險', '新鮮', '勇氣'], partnerMatch: ['反叛者', '切換者'] },
  { id: 'mystic', name: '神秘主義者', nameEn: 'Mystic', theme: 'curiosity', dimension: 'masochist', rarity: 2.1, description: '黑暗且神秘，充滿未知吸引力', traits: ['神秘', '深度', '吸引力'], partnerMatch: ['靈性者', '智性戀'] },
];

// Quiz Questions
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: '在親密關係中，你更傾向於？',
    options: [
      { id: 'a', text: '主導節奏，引導伴侶', scores: { dominant: 3, sadist: 1, submissive: 0, masochist: 0 } },
      { id: 'b', text: '完全放手，讓伴侶帶領', scores: { dominant: 0, sadist: 0, submissive: 3, masochist: 1 } },
      { id: 'c', text: '享受被疼痛或強烈刺激的感覺', scores: { dominant: 0, sadist: 0, submissive: 1, masochist: 3 } },
      { id: 'd', text: '享受控制和支配的快感', scores: { dominant: 1, sadist: 3, submissive: 0, masochist: 0 } },
    ],
  },
  {
    id: 2,
    text: '什麼樣的氛圍最能激發你的慾望？',
    options: [
      { id: 'a', text: '充滿權威和控制力的氛圍', scores: { dominant: 3, sadist: 1, submissive: 0, masochist: 0 } },
      { id: 'b', text: '完全服從和信任的氛圍', scores: { dominant: 0, sadist: 0, submissive: 3, masochist: 1 } },
      { id: 'c', text: '神秘、黑暗、充滿未知', scores: { dominant: 0, sadist: 1, submissive: 0, masochist: 3 } },
      { id: 'd', text: '野性、本能、充滿激情', scores: { dominant: 1, sadist: 3, submissive: 0, masochist: 0 } },
    ],
  },
  {
    id: 3,
    text: '你對「疼痛」的看法是？',
    options: [
      { id: 'a', text: '完全無法接受', scores: { dominant: 1, sadist: 0, submissive: 2, masochist: 0 } },
      { id: 'b', text: '可以接受適度的痛感', scores: { dominant: 1, sadist: 1, submissive: 1, masochist: 1 } },
      { id: 'c', text: '在疼痛中找到快感', scores: { dominant: 0, sadist: 0, submissive: 0, masochist: 3 } },
      { id: 'd', text: '享受施加疼痛的快感', scores: { dominant: 0, sadist: 3, submissive: 0, masochist: 0 } },
    ],
  },
  {
    id: 4,
    text: '在關係中，你需要什麼樣的安全感？',
    options: [
      { id: 'a', text: '完全的掌控權', scores: { dominant: 3, sadist: 1, submissive: 0, masochist: 0 } },
      { id: 'b', text: '被完全保護和照顧', scores: { dominant: 0, sadist: 0, submissive: 3, masochist: 1 } },
      { id: 'c', text: '在混亂中找到平衡', scores: { dominant: 0, sadist: 2, submissive: 1, masochist: 2 } },
      { id: 'd', text: '心靈層面的深度連結', scores: { dominant: 1, sadist: 0, submissive: 2, masochist: 2 } },
    ],
  },
  {
    id: 5,
    text: '你對「角色扮演」的看法？',
    options: [
      { id: 'a', text: '喜歡擔任主導角色', scores: { dominant: 3, sadist: 1, submissive: 0, masochist: 0 } },
      { id: 'b', text: '喜歡臣服和被引導', scores: { dominant: 0, sadist: 0, submissive: 3, masochist: 1 } },
      { id: 'c', text: '可以在不同角色間切換', scores: { dominant: 2, sadist: 1, submissive: 2, masochist: 1 } },
      { id: 'd', text: '喜歡探索新穎和禁忌的角色', scores: { dominant: 0, sadist: 3, submissive: 0, masochist: 1 } },
    ],
  },
  {
    id: 6,
    text: '什麼樣的言語或行為最讓你興奮？',
    options: [
      { id: 'a', text: '命令和指揮', scores: { dominant: 3, sadist: 1, submissive: 0, masochist: 0 } },
      { id: 'b', text: '讚美、寵愛和疼惜', scores: { dominant: 0, sadist: 0, submissive: 3, masochist: 1 } },
      { id: 'c', text: '貶低和羞辱', scores: { dominant: 0, sadist: 2, submissive: 0, masochist: 2 } },
      { id: 'd', text: '控制和束縛', scores: { dominant: 1, sadist: 3, submissive: 1, masochist: 0 } },
    ],
  },
  {
    id: 7,
    text: '在親密時刻，你最在意的是？',
    options: [
      { id: 'a', text: '是否掌握主導權', scores: { dominant: 3, sadist: 1, submissive: 0, masochist: 0 } },
      { id: 'b', text: '是否有情感連結', scores: { dominant: 0, sadist: 0, submissive: 3, masochist: 1 } },
      { id: 'c', text: '是否感受到強烈刺激', scores: { dominant: 0, sadist: 1, submissive: 0, masochist: 3 } },
      { id: 'd', text: '是否突破禁忌', scores: { dominant: 1, sadist: 3, submissive: 0, masochist: 1 } },
    ],
  },
  {
    id: 8,
    text: '你對「束縛」的看法？',
    options: [
      { id: 'a', text: '喜歡束縛他人', scores: { dominant: 1, sadist: 3, submissive: 0, masochist: 0 } },
      { id: 'b', text: '喜歡被束縛', scores: { dominant: 0, sadist: 0, submissive: 2, masochist: 2 } },
      { id: 'c', text: '可以嘗試但不強求', scores: { dominant: 1, sadist: 1, submissive: 1, masochist: 1 } },
      { id: 'd', text: '完全無法接受', scores: { dominant: 1, sadist: 0, submissive: 1, masochist: 0 } },
    ],
  },
  {
    id: 9,
    text: '你的理想親密關係是？',
    options: [
      { id: 'a', text: '充滿權力動態的關係', scores: { dominant: 3, sadist: 1, submissive: 0, masochist: 0 } },
      { id: 'b', text: '溫柔呵護與被照顧的關係', scores: { dominant: 0, sadist: 0, submissive: 3, masochist: 1 } },
      { id: 'c', text: '充滿冒險和新鮮感的關係', scores: { dominant: 1, sadist: 2, submissive: 1, masochist: 1 } },
      { id: 'd', text: '靈魂深度契合的關係', scores: { dominant: 0, sadist: 0, submissive: 2, masochist: 2 } },
    ],
  },
  {
    id: 10,
    text: '面對「禁忌」時，你的反應是？',
    options: [
      { id: 'a', text: '想要挑戰和打破', scores: { dominant: 1, sadist: 3, submissive: 0, masochist: 1 } },
      { id: 'b', text: '感到害怕和抗拒', scores: { dominant: 1, sadist: 0, submissive: 2, masochist: 0 } },
      { id: 'c', text: '想要探索和了解', scores: { dominant: 1, sadist: 1, submissive: 1, masochist: 2 } },
      { id: 'd', text: '遵守但不評論', scores: { dominant: 1, sadist: 0, submissive: 1, masochist: 1 } },
    ],
  },
];

// Badges
export const badges: Badge[] = [
  { id: 'communicator', name: '溝通大師', icon: '💬', description: '在測驗中展現高情感連結' },
  { id: 'popular', name: '最受歡迎', icon: '⭐', description: '測驗結果為常見原型' },
  { id: 'naive', name: '天真易騙', icon: '🌸', description: '展現純真和信任特質' },
  { id: 'player', name: '最大玩家', icon: '🎭', description: '展現多面向特質' },
  { id: 'rare', name: '稀有個性', icon: '💎', description: '測驗結果為罕見原型' },
  { id: 'tease', name: '最大挑逗', icon: '🔥', description: '展現高度吸引力特質' },
];

// Rarity Rankings
export const getRarityRank = (rarity: number): RarityRank => {
  if (rarity <= 0.3) return 'top';
  if (rarity <= 1.0) return 'rare';
  if (rarity <= 2.0) return 'evolved';
  if (rarity <= 3.0) return 'unique';
  if (rarity <= 4.0) return 'typical';
  if (rarity <= 5.0) return 'common';
  return 'ordinary';
};

export const rarityRankLabels: Record<RarityRank, { label: string; color: string }> = {
  top: { label: '頂級排名', color: '#FFD700' },
  rare: { label: '稀有排名', color: '#C0C0C0' },
  evolved: { label: '進化排名', color: '#CD7F32' },
  unique: { label: '獨特排名', color: '#E0115F' },
  typical: { label: '典型排名', color: '#8B008B' },
  common: { label: '一般級別', color: '#4169E1' },
  ordinary: { label: '普通級別', color: '#808080' },
};
