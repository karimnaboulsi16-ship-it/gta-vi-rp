/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, ShieldCheck, Zap, Code, 
  Terminal, DollarSign, CheckCircle2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Star, 
  Users, Trophy, ArrowRight, Lock, Sparkles, HelpCircle, AlertCircle,
  Clock, Flame, Check, CreditCard, X, MessageSquare, Timer, ShoppingBag, Radio,
  MoreVertical, CheckCheck, Eye, Gift
} from 'lucide-react';
import courseModuleAiImg from './assets/images/course_module_ai_1793160202557.jpg';
import gta6HeroBannerImg from './assets/images/gta6_hero_banner_1793160202521.jpg';
import gta6CdEditionImg from './assets/images/gta6_cd_edition_1794940953257.jpg';

export default function App() {
  // VSL State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(342); // 5:42 video duration
  const [showTranscript, setShowTranscript] = useState(false);
  const [viewerCount, setViewerCount] = useState(3425);

  // Dynamic live buyers count (starts around 3421 and increments)
  const [lifeChangedCount, setLifeChangedCount] = useState(3421);

  // Recent buyer popup toast state
  const [recentBuyer, setRecentBuyer] = useState({ name: "Lucas Mendes (SP)", time: "Há 12 segundos" });
  const [showBuyerToast, setShowBuyerToast] = useState(true);

  // Black Friday Countdown Timer State (e.g. 11 hours 42 mins 15 secs)
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 42, seconds: 15 });


  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', paymentMethod: 'pix' });

  // Simulated VSL timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Randomize viewer count and life changed count to simulate active purchases
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 7) - 3);
      if (Math.random() > 0.4) {
        setLifeChangedCount(prev => prev + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Cycle recent buyers every 7 seconds
  useEffect(() => {
    const buyersList = [
      { name: "Lucas Mendes (SP)", time: "Há alguns segundos" },
      { name: "Matheus Rodrigues (RJ)", time: "Há 1 minuto" },
      { name: "Gabriel Souza (MG)", time: "Há 45 segundos" },
      { name: "João Victor (PR)", time: "Há 2 minutos" },
      { name: "Felipe Azevedo (SC)", time: "Há 30 segundos" },
      { name: "Carlos Eduardo (BA)", time: "Há 1 minuto" },
      { name: "Rafael Silveira (RS)", time: "Há 10 segundos" },
    ];

    const buyerInterval = setInterval(() => {
      setShowBuyerToast(false);
      setTimeout(() => {
        const randomBuyer = buyersList[Math.floor(Math.random() * buyersList.length)];
        setRecentBuyer(randomBuyer);
        setShowBuyerToast(true);
      }, 500);
    }, 7000);

    return () => clearInterval(buyerInterval);
  }, []);

  // Black Friday countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainSecs = secs % 60;
    return `${mins}:${remainSecs < 10 ? '0' : ''}${remainSecs}`;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Por favor, preencha seu nome e e-mail.');
      return;
    }
    setCheckoutStep('success');
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 selection:bg-rose-500 selection:text-white overflow-x-hidden relative pb-16">
      

      {/* TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800 px-4 md:px-8 py-3.5 flex items-center justify-center">
        {/* Zone 1: Brand wordmark centered */}
        <a href="#" className="flex items-center justify-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ec4899] via-[#8b5cf6] to-[#06b6d4] flex items-center justify-center font-black text-white text-sm tracking-wider shadow-lg shadow-pink-500/25 border border-pink-400/40 group-hover:scale-105 transition-transform duration-200">
            GTA
          </div>
          <span className="text-lg sm:text-xl font-black tracking-tight text-white whitespace-nowrap">
            Mestres do <span className="text-amber-400">GTA VI RP</span>
          </span>
        </a>
      </header>

      {/* HERO SECTION WITH VSL */}
      <section id="vsl" className="relative pt-8 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        
        {/* GTA VI CD Showcase Image above Headline */}
        <div className="flex justify-center mb-6">
          <div className="relative w-64 sm:w-72 md:w-80 rounded-2xl overflow-hidden border border-pink-500/30 bg-zinc-950 shadow-2xl shadow-pink-500/15">
            <img
              src={gta6CdEditionImg}
              alt="GTA VI Edição Física e Disco"
              className="w-full h-auto object-cover block"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Live Online Count Badge above Headline */}
        <div className="flex items-center justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] sm:text-xs font-medium text-zinc-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span><strong className="text-white font-mono">{viewerCount.toLocaleString('pt-BR')}</strong> pessoas online agora</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="font-['Sora',sans-serif] text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-[-0.03em] text-white mb-6 leading-[1.14] antialiased">
            Saia do <span className="text-rose-500 font-extrabold">CLT</span> faturando de <span className="text-amber-400">R$ 5.000 a R$ 30.000 ainda no primeiro mês</span> Programando Mapas para o GTA VI RP Usando Apenas IA
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Já perdeu todas as ondas, vai perder mais uma?
            <br />
            Assista o vídeo que preparei para você
          </p>
        </div>

        {/* VSL VIDEO PLAYER CONTAINER */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
          
          {/* Live Viewer badge in RED */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-rose-500/40 text-xs font-medium text-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-rose-500 font-bold">🔴 {viewerCount} pessoas assistindo agora</span>
          </div>

          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 bg-rose-500 text-white font-bold backdrop-blur-md rounded-full text-xs uppercase tracking-wider shadow-md">
            🔥 Black Friday Ativa
          </div>

          {/* Video Screen / Poster */}
          <div className="relative aspect-video w-full bg-zinc-900 group cursor-pointer overflow-hidden" onClick={() => setIsPlaying(!isPlaying)}>
            <img 
              src={gta6HeroBannerImg} 
              alt="GTA VI RP Map Maker Preview" 
              className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 opacity-90' : 'group-hover:scale-105'}`}
            />
            
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 flex flex-col items-center justify-center">
              {!isPlaying && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-rose-500 hover:bg-rose-400 text-white flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 animate-pulse">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
                </div>
              )}

              {!isPlaying && (
                <div className="mt-4 text-center px-4">
                  <p className="text-white font-bold text-lg sm:text-xl drop-shadow-md">CLIQUE PARA ASSISTIR À APRESENTAÇÃO SECRETA</p>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">Descubra o segredo por trás do mercado bilionário do GTA RP</p>
                </div>
              )}
            </div>
          </div>

          {/* Video Controls Bar */}
          <div className="bg-zinc-900 px-4 py-3 border-t border-zinc-800 flex flex-col gap-2">
            {/* Progress bar */}
            <div className="relative w-full h-1.5 bg-zinc-800 rounded-full cursor-pointer overflow-hidden" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              setCurrentTime(Math.floor(pos * duration));
            }}>
              <div 
                className="absolute top-0 left-0 h-full bg-rose-500 transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-rose-500 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-rose-500 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="hover:text-white transition-colors underline underline-offset-4"
                >
                  {showTranscript ? 'Ocultar Transcrição' : 'Ver Transcrição'}
                </button>
                <button 
                  onClick={() => {
                    const el = document.documentElement;
                    if (!document.fullscreenElement) el.requestFullscreen();
                    else document.exitFullscreen();
                  }}
                  className="text-white hover:text-rose-500 transition-colors"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Transcript Drawer */}
          {showTranscript && (
            <div className="bg-zinc-950 p-6 border-t border-zinc-800 text-sm text-zinc-300 max-h-60 overflow-y-auto space-y-3 font-sans">
              <h4 className="font-bold text-white mb-2">Transcrição do Vídeo Exclusivo:</h4>
              <p><strong>[0:00]</strong> "Se você acha que precisa passar 5 anos na faculdade de Ciência da Computação para ganhar dinheiro com jogos, você está completamente errado..."</p>
              <p><strong>[1:15]</strong> "Com a chegada explosiva do ecossistema do GTA VI RP e o avanço das IAs generativas, qualquer pessoa pode criar mapas personalizados de alto padrão em questão de minutos."</p>
              <p><strong>[2:30]</strong> "Donos de servidores estão pagando entre R$ 1.500 e R$ 5.000 por cada mapa ou sistema otimizado. Aproveite o preço de <span className="text-rose-500 font-bold">Black Friday</span> porque essa condição vai sair do ar em breve..."</p>
            </div>
          )}
        </div>

        {/* Highlights directly below VSL */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="flex items-center justify-center gap-2.5 bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-semibold text-zinc-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Não precisa de experiência</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-semibold text-zinc-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Não precisa saber programar</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-semibold text-zinc-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Não precisa de muito tempo</span>
            </div>
          </div>

          <p className="text-center text-base sm:text-lg text-zinc-300 font-medium mt-5">
            Essa pode ser sua <span className="text-white font-bold">renda extra</span> ou até sua <span className="text-amber-400 font-bold">renda principal!</span>
          </p>
        </div>

      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="border-y border-zinc-800 bg-[#0c0c0e] py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">+R$ 2.4 Milhões</div>
            <div className="text-xs text-zinc-400 mt-1">Faturados por alunos no último ano</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">+1.250</div>
            <div className="text-xs text-zinc-400 mt-1">Servidores de GTA RP usando nossos mapas</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">Zero</div>
            <div className="text-xs text-zinc-400 mt-1">Conhecimento prévio em programação necessário</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100% com IA</div>
            <div className="text-xs text-zinc-400 mt-1">Metodologia 100% validada e prática</div>
          </div>
        </div>
      </section>

      {/* FAMOUS STREAMERS SECTION (GTA RP & GTA VI) */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Os Maiores Streamers de GTA RP Já se Preparam para o GTA VI
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto text-sm sm:text-base">
            Os maiores ícones das transmissões do Brasil dominam o cenário de Roleplay e movimentam milhões de fãs. Quem criar os melhores mapas para eles vai faturar alto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Streamer 1: Cerol */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-zinc-700 transition-all group">
            <div className="aspect-square relative overflow-hidden bg-zinc-950">
              <img 
                src="/assets/aistudio/images__2__eb194e58.jpg" 
                alt="Cerol" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-white">Cerol</h3>
            </div>
          </div>

          {/* Streamer 2: Paulinho O Loko */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-zinc-700 transition-all group">
            <div className="aspect-square relative overflow-hidden bg-zinc-950">
              <img 
                src="/assets/aistudio/images_aca61ee6.jpg" 
                alt="Paulinho O Loko" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-white">Paulinho O Loko</h3>
            </div>
          </div>

          {/* Streamer 3: Coringa */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-zinc-700 transition-all group">
            <div className="aspect-square relative overflow-hidden bg-zinc-950">
              <img 
                src="/assets/aistudio/images__1__1b5fff10.jpg" 
                alt="Coringa" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-white">Coringa</h3>
            </div>
          </div>

          {/* Streamer 4: Luquet4 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-zinc-700 transition-all group">
            <div className="aspect-square relative overflow-hidden bg-zinc-950">
              <img 
                src="/assets/aistudio/images__3__481fe476.jpg" 
                alt="Luquet4" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-white">Luquet4</h3>
            </div>
          </div>
        </div>
      </section>

      {/* WHY GTA VI RP + AI IS THE BIGGEST GOLDMINE */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 leading-tight">
              Veja o que o próprio <span className="text-emerald-400">ChatGPT</span> falou sobre o <span className="text-amber-400">GTA VI RP</span>:
            </h2>
            <p className="text-zinc-300 italic text-sm sm:text-base border-l-2 border-emerald-500 pl-3.5 mb-6">
              "O ChatGPT, a maior inteligência artificial do mundo, não mente."
            </p>

            {/* Conversa com o ChatGPT */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl mb-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-zinc-200 tracking-wide">ChatGPT</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-medium">Análise de Mercado</span>
              </div>

              {/* Pergunta do Usuário */}
              <div className="flex justify-end">
                <div className="bg-zinc-800 text-zinc-100 text-sm px-4 py-3 rounded-2xl rounded-tr-sm max-w-[90%] border border-zinc-700/60 leading-relaxed">
                  <span className="block text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-1">Você</span>
                  ChatGPT, me fala a verdade: dá mesmo pra qualquer iniciante ganhar muita grana criando mapas pro GTA VI RP usando IA, mesmo sem saber nada de programação?
                </div>
              </div>

              {/* Resposta do ChatGPT */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="bg-zinc-950/80 border border-zinc-800/90 text-zinc-200 text-sm px-4 py-3.5 rounded-2xl rounded-tl-sm leading-relaxed space-y-2.5">
                  <span className="block text-[10px] uppercase tracking-wider text-emerald-400 font-bold">ChatGPT</span>
                  <p>
                    <strong className="text-white">Sim, e é muito mais fácil do que parece.</strong> O GTA VI vai gerar uma corrida do ouro nos servidores de Roleplay — e donos de cidades pagam de <strong className="text-amber-400">R$ 1.500 a R$ 5.000 por mapa exclusivo</strong>.
                  </p>
                  <p>
                    Antes isso exigia meses e uma equipe inteira. Hoje, <strong className="text-white">a própria IA faz todo o trabalho pesado em minutos.</strong> Basta copiar os comandos certos, colar e entregar pronto — mesmo começando do absoluto zero.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-200"><strong className="text-white">Extremamente fácil:</strong> copie e cole nossos prompts prontos direto na IA.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-200"><strong className="text-white">Zero programação:</strong> você não precisa escrever uma única linha de código.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-200"><strong className="text-white">Alta margem e escala:</strong> fature de casa em Reais ou Dólares antes mesmo do jogo lançar.</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl">
              <img 
                src={courseModuleAiImg} 
                alt="AI Code Generator Dashboard" 
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>


      {/* SOCIAL PROOF SECTION: Pessoas que já começaram antes de lançar o GTA VI */}
      <section id="provas-sociais" className="py-20 px-2 sm:px-4 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-10 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] sm:text-xs font-medium text-zinc-300 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span><strong className="text-white font-mono">{viewerCount.toLocaleString('pt-BR')}</strong> pessoas online agora</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Pessoas que já começaram antes de lançar o GTA VI
          </h2>
          <p className="text-zinc-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Veja conversas reais de alunos que não esperaram o jogo sair: já estão fechando parcerias, vendendo acessos, criando servidores e faturando alto com IA.
          </p>
        </div>

        {/* Automatic Continuous Slow Marquee Container (No manual buttons, advances smoothly on its own) */}
        <div className="relative w-full overflow-hidden select-none py-2">
          {/* Subtle side fade gradients for smooth entering and exiting cards */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-zinc-950 via-zinc-950/70 to-transparent z-10" />

          {/* Continuous slow-scrolling track */}
          <div className="animate-marquee-slow flex items-center gap-5 sm:gap-6">
            {[1, 2].map((cycle) => (
              <React.Fragment key={`cycle-${cycle}`}>
                {/* Card 1: Print real 1 enviado pelo usuário (Servidor Pronto) */}
                <div className="bg-[#111b21] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] w-[330px] sm:w-[370px] flex-shrink-0">
                  <div className="relative w-full h-full bg-[#0b141a] overflow-hidden">
                    <img 
                      src="/assets/aistudio/Conversa_WhatsApp_em_Tema_Escuro_e052e497.png" 
                      alt="Conversa WhatsApp aluno com servidor pronto" 
                      className="w-full h-full object-cover object-top select-none"
                    />
                  </div>
                </div>

                {/* Card 2: Print real 2 enviado pelo usuário (Contratos e Parcerias) */}
                <div className="bg-[#111b21] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] w-[330px] sm:w-[370px] flex-shrink-0">
                  <div className="relative w-full h-full bg-[#0b141a] overflow-hidden">
                    <img 
                      src="/assets/aistudio/Conversa_sobre_o_lan_amento_do_GTA_6_36bb1bb8.png" 
                      alt="Conversa WhatsApp contratos e pagamentos com IA" 
                      className="w-full h-full object-cover object-top select-none"
                    />
                  </div>
                </div>

                {/* Card 3: Gabriel Alcântara (Dev Freelancer de Mapas) */}
                <div className="bg-[#111b21] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] w-[330px] sm:w-[370px] flex-shrink-0">
                  <div className="p-4 bg-[#0b141a] space-y-2.5 flex-1 flex flex-col justify-between text-[13px] leading-relaxed select-none overflow-y-auto">
                    <div className="space-y-2.5">
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Irmão do céu, tu não vai acreditar kkkkk</p>
                        <p className="mt-1">Fechei com uma facção do servidor Complexo pra criar a favela deles no GTA VI RP!</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">14:22</span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Usei a IA do método pra renderizar o mapa 3D completo em menos de 1 hora.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">14:23</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2.5 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Caraca Gabriel!! Quanto você cobrou deles? 👏</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          14:25 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[92%] shadow-sm">
                        <p>Mandei proposta de R$ 3.800,00 e aceitaram na hora! Já caiu 50% de entrada no PIX (R$ 1.900,00)!</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1.5">14:27</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Sensacional demais irmão! Recuperou 20x o curso antes do jogo sair! 🔥</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          14:28 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4: Matheus Vinicius (Dono de Servidor - Pré-Vendas) */}
                <div className="bg-[#111b21] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] w-[330px] sm:w-[370px] flex-shrink-0">
                  <div className="p-4 bg-[#0b141a] space-y-2.5 flex-1 flex flex-col justify-between text-[13px] leading-relaxed select-none overflow-y-auto">
                    <div className="space-y-2.5">
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Fala mestre! Passando pra deixar meu feedback da consultoria e do pack.</p>
                        <p className="mt-1">Abri a pré-venda de VIPs e mansões personalizadas pro servidor que montei com os scripts da IA.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">18:04</span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Bateu mais de 1.800 membros no Discord em 4 dias só com os teasers que a IA gerou.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">18:06</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2.5 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Que massa Matheus! E a galera já comprou antes de lançar o GTA VI?</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          18:08 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[92%] shadow-sm">
                        <p>Demais! Já vendemos 47 passes VIPs Antecipados. Já bateu mais de R$ 7.050,00 na semana!</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1.5">18:10</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Visão pura! Enquanto muitos esperam, vocês já estão faturando alto! 🚀</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          18:11 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 5: Felipe Andrade (Saiu do CLT) */}
                <div className="bg-[#111b21] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] w-[330px] sm:w-[370px] flex-shrink-0">
                  <div className="p-4 bg-[#0b141a] space-y-2.5 flex-1 flex flex-col justify-between text-[13px] leading-relaxed select-none overflow-y-auto">
                    <div className="space-y-2.5">
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Mano, preciso te agradecer de coração.</p>
                        <p className="mt-1">Eu trabalhava 10h por dia no mercado ganhando 1 salário mínimo no <span className="text-rose-400 font-bold">CLT</span> e sem tempo pra nada.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">10:15</span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Fiz o primeiro mapa de concessionária pra um servidor usando a IA semana passada.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">10:17</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2.5 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Que orgulho irmão! E como foram os outros projetos?</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          10:19 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[92%] shadow-sm">
                        <p>Me indicaram pra mais 2 servidores de streamers. Fechei R$ 6.200 em 15 dias!</p>
                        <p className="mt-1 font-bold text-rose-400">Hoje entreguei minha demissão do CLT. Vou viver 100% de IA no GTA VI RP! 🚀</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1.5">10:22</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Essa liberdade não tem preço! Parabéns por largar o CLT irmão! 🦅</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          10:24 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 6: Lucas Henrique (Mods e Carros com IA) */}
                <div className="bg-[#111b21] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] w-[330px] sm:w-[370px] flex-shrink-0">
                  <div className="p-4 bg-[#0b141a] space-y-2.5 flex-1 flex flex-col justify-between text-[13px] leading-relaxed select-none overflow-y-auto">
                    <div className="space-y-2.5">
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Olha esse teste com o gerador de texturas e física que você ensinou no módulo 3...</p>
                        <p className="mt-1">Criei um pack com 12 viaturas da ROTA e BOPE customizadas pro GTA VI RP.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">16:40</span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm">
                        <p>Coloquei pra vender num fórum gringo e nos grupos de RP brasileiros.</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1">16:42</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2.5 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>E a procura foi boa, Lucas?</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          16:44 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                      <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-2xl rounded-tl-none max-w-[92%] shadow-sm">
                        <p>Vendeu 23 cópias em 48h a R$ 120 cada! Mais de R$ 2.760 no bolso sem esforço!</p>
                        <span className="text-[10px] text-zinc-400 block text-right mt-1.5">16:46</span>
                      </div>
                      <div className="bg-[#005c4b] text-slate-100 p-2 rounded-2xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
                        <p>Quem souber usar IA agora vai monopolizar o mercado do GTA VI! 🚀</p>
                        <span className="text-[10px] text-emerald-300 flex items-center justify-end gap-1 mt-1">
                          16:48 <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>


      {/* PRICING & BLACK FRIDAY OFFER SECTION (Main Checkout Button at Bottom) */}
      <section id="pricing-section" className="pt-8 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <p className="text-sm sm:text-base text-zinc-200 bg-zinc-900/90 border border-zinc-800 rounded-2xl px-6 py-4 max-w-2xl text-center leading-relaxed shadow-lg">
            Você não precisa nem ter o <strong className="text-white">GTA VI</strong> instalado nem ter um <strong className="text-white">PS5</strong>, <span className="text-amber-400 font-semibold">apenas o método certo para começar a fazer dinheiro.</span>
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 p-8 sm:p-12 shadow-2xl">
          
          <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-extrabold px-6 py-2 rounded-bl-2xl uppercase tracking-widest shadow-md">
            ⚡ <span className="underline">BLACK FRIDAY</span>: 80% OFF
          </div>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] sm:text-xs font-medium text-zinc-300 mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span><strong className="text-white font-mono">{viewerCount.toLocaleString('pt-BR')}</strong> pessoas online agora</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Bora sair do <span className="text-rose-500 font-extrabold">CLT</span> aproveitando esse mega <span className="text-rose-500 font-extrabold underline">desconto</span> da <span className="text-rose-500">Black Friday</span>.
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base font-semibold">
              Essa é uma oportunidade única da sua vida e nunca mais vai aparecer, então aproveite.
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-8 text-center">
            
            {/* Preço Riscado (Âncora de R$ 235) */}
            <div className="flex items-center justify-center gap-2 mb-2 text-zinc-400 text-sm">
              <span>De</span>
              <span className="text-zinc-500 text-lg sm:text-xl font-bold line-through">R$ 235</span>
              <span>por apenas</span>
            </div>

            {/* Installment Price LARGER as primary, Cash Price smaller underneath (R$ 47) */}
            <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Parcelado no Cartão em até 4x</div>
            <div className="text-4xl sm:text-6xl lg:text-7xl font-black text-rose-500 tracking-tight drop-shadow-[0_0_35px_rgba(244,63,94,0.35)] mb-2 flex items-baseline justify-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-300">4x de</span>
              <span className="bg-gradient-to-r from-rose-400 via-rose-500 to-red-500 bg-clip-text text-transparent">R$ 11</span>
            </div>
            <div className="text-zinc-400 text-sm mb-6 flex items-center justify-center gap-1.5 font-medium">
              <span>ou</span>
              <span className="text-white font-bold bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-md text-base">R$ 47</span>
              <span>à vista</span>
            </div>

            <div className="space-y-3 text-left mb-8 border-t border-zinc-800 pt-6">
              {/* Itens inclusos (brancos) */}
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <Check className="w-5 h-5 text-rose-500 shrink-0" />
                <span>Acesso Vitalício a Todos os Módulos Práticos do Zero ao Avançado</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <Check className="w-5 h-5 text-rose-500 shrink-0" />
                <span>Pack com +100.000 Prompts Prontos para IA Gerar Mapas e Códigos</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <Check className="w-5 h-5 text-rose-500 shrink-0" />
                <span>Comunidade VIP no Discord com Donos de Servidores</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <Check className="w-5 h-5 text-rose-500 shrink-0" />
                <span>Aprenda todos os métodos que podem te fazer ganhar dinheiro com GTA VI</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <Check className="w-5 h-5 text-rose-500 shrink-0" />
                <span>10.000 vídeos prontos sobre GTA VI para postar nas redes sociais e monetizar</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <Check className="w-5 h-5 text-rose-500 shrink-0" />
                <span>Aprenda onde divulgar seu mapa e como</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <Check className="w-5 h-5 text-rose-500 shrink-0" />
                <span>Aprenda como precificar seu trabalho</span>
              </div>

              {/* Bônus exclusivos (rosas abaixo dos brancos) */}
              <div className="pt-2 space-y-3 border-t border-zinc-800/70">
                <div className="flex items-center gap-3 text-sm">
                  <Gift className="w-5 h-5 text-rose-400 shrink-0" />
                  <span className="font-bold text-rose-400">50 IAs grátis para usar</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Gift className="w-5 h-5 text-rose-400 shrink-0" />
                  <span className="font-bold text-rose-400">Ferramentas secretas de mapeamento 3D</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Gift className="w-5 h-5 text-rose-400 shrink-0" />
                  <span className="font-bold text-rose-400">Suporte direto com especialistas</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Gift className="w-5 h-5 text-rose-400 shrink-0" />
                  <span className="font-bold text-rose-400">Chamada de vídeo direta com especialistas</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Gift className="w-5 h-5 text-rose-400 shrink-0" />
                  <span className="font-bold text-rose-400">Garantia incondicional de 30 dias</span>
                </div>
              </div>
            </div>

            {/* MAIN CHECKOUT BUTTON AT BOTTOM (Pulsing) */}
            <a 
              href="https://pay.kirvano.com/e5337846-5d0d-4b85-9aba-9a3911e13492"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-6 bg-rose-500 hover:bg-rose-400 text-white font-black text-xl rounded-2xl shadow-xl shadow-rose-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-3 animate-pulse text-center"
            >
              <Zap className="w-6 h-6 fill-white" />
              <span>QUERO GANHAR DINHEIRO COM GTA VI</span>
            </a>
          </div>

          {/* Guarantee Badge */}
          <div className="flex items-center justify-center gap-4 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-rose-500 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-white text-sm">Garantia Incondicional de 30 Dias</h4>
              <p className="text-xs text-zinc-400">Se você não gostar ou achar que não é para você, devolvemos 100% do seu dinheiro e ainda te damos mais R$ 100 sem burocracia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>Dúvidas Frequentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-zinc-300">
            Tudo o que você precisa saber antes de dar o próximo passo.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Preciso saber programar ou ter experiência anterior?",
              a: "Absolutamente não! O treinamento foi desenhado exatamente para quem é iniciante absoluto. A inteligência artificial faz todo o trabalho pesado de programação; você só precisa saber direcionar com os comandos certos que ensinamos."
            },
            {
              q: "Por que o preço está tão baixo (<span class='text-rose-500'>Black Friday</span>)?",
              a: "Esta é nossa campanha anual de <span className='text-rose-500 font-bold'>Black Friday</span> com 80% de desconto. Decidimos liberar o treinamento completo de R$ 235 por apenas R$ 47 à vista ou 4x de R$ 11 para formar a maior turma de programadores de GTA VI RP do Brasil antes do lançamento oficial do GTA VI."
            },
            {
              q: "Como vou receber o acesso ao treinamento?",
              a: "Imediatamente após a confirmação do pagamento (via PIX ou cartão), você receberá os dados de acesso em seu e-mail cadastrado."
            },
            {
              q: "O mercado de GTA RP realmente paga bem?",
              a: "Sim. Donos de servidores de GTA RP movimentam milhares de reais mensalmente com doações e VIPs. Eles investem pesado em mapas exclusivos e otimizados para atrair jogadores."
            },
            {
              q: "E se eu não gostar do curso?",
              a: "Você tem 30 dias de garantia total. Basta nos enviar um único e-mail e devolveremos 100% do seu investimento e ainda te damos mais R$ 100, sem perguntas."
            }
          ].map((item, idx) => (
            <div key={idx} className="border border-zinc-800 bg-zinc-900 rounded-xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm sm:text-base"
              >
                <span dangerouslySetInnerHTML={{ __html: item.q }}></span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-rose-500" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-0 text-zinc-300 text-sm leading-relaxed border-t border-zinc-800 pt-3" dangerouslySetInnerHTML={{ __html: item.a }}>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-12 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center font-extrabold text-white text-xs">
              GTA
            </div>
            <span className="text-sm font-bold text-zinc-300">Mestres do GTA VI RP com IA — Edição <span className="text-rose-500 font-bold">Black Friday</span></span>
          </div>
          <p>© 2026 Mestres do GTA RP. Todos os direitos reservados. Rockstar Games.</p>
          <div className="flex justify-center gap-6 text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
        </div>
      </footer>

      {/* FLOATING RECENT BUYER TOAST (Bottom fixed banner) */}
      {showBuyerToast && (
        <div className="fixed bottom-4 left-4 z-50 bg-zinc-900/95 border border-rose-500/40 backdrop-blur-md rounded-xl p-3.5 shadow-2xl flex items-center gap-3 animate-bounce max-w-xs">
          <div className="w-9 h-9 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-white">{recentBuyer.name}</span>
            <p className="text-rose-500 font-semibold">comprou e aproveitou a <span className="underline">Black Friday</span>!</p>
            <span className="text-[10px] text-zinc-400">{recentBuyer.time}</span>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button 
              onClick={() => { setIsCheckoutOpen(false); setCheckoutStep('form'); }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {checkoutStep === 'form' ? (
              <div>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 border border-rose-500/30 text-rose-500 text-xs font-semibold mb-2">
                    <Lock className="w-3 h-3" /> Checkout <span className="text-rose-500 font-bold">Black Friday</span> Seguro
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">Finalizar Inscrição</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    De <span className="line-through text-zinc-500 font-semibold">R$ 235</span> por <strong className="text-white">4x de R$ 11</strong> ou <strong className="text-rose-400">R$ 47 à vista</strong> (80% OFF — Economia de R$ 188)
                  </p>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">E-mail (para envio dos dados)</label>
                    <input 
                      type="email" 
                      required
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">WhatsApp / Telefone</label>
                    <input 
                      type="text" 
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-2">Forma de Pagamento</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        type="button"
                        onClick={() => {}}
                        className={`p-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all border-rose-500 bg-rose-500/10 text-white`}
                      >
                        <Zap className="w-4 h-4 text-rose-500" /> PIX (Aprovação Imediata)
                      </button>
                      <button 
                        type="button"
                        onClick={() => {}}
                        className={`p-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all border-zinc-800 bg-zinc-950 text-zinc-400`}
                      >
                        <CreditCard className="w-4 h-4 text-zinc-400" /> Cartão 4x
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a 
                      href="https://pay.kirvano.com/e5337846-5d0d-4b85-9aba-9a3911e13492"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full py-4 bg-rose-500 hover:bg-rose-400 text-white font-extrabold rounded-xl shadow-lg shadow-rose-500/30 transition-all text-sm animate-pulse"
                    >
                      GARANTIR PREÇO DE BLACK FRIDAY (R$ 47)
                    </a>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center ry-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Inscrição Pré-Confirmada!</h3>
                <p className="text-zinc-300 text-sm mb-6">
                  Parabéns, <strong>{formData.name}</strong>! Sua vaga de <span className="text-rose-500 font-bold">Black Friday</span> foi garantida e as instruções foram enviadas para <span className="text-rose-500">{formData.email}</span>.
                </p>
                <button 
                  onClick={() => { setIsCheckoutOpen(false); setCheckoutStep('form'); }}
                  className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs uppercase"
                >
                  Fechar Janela
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
