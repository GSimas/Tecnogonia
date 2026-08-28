'use client';

import { useEffect, useMemo, useState } from 'react';

type Lang = 'pt' | 'en';
type Theme = 'light' | 'dark';

const content = {
  pt: {
    skip: 'Pular para o conteúdo',
    siteLabel: 'Tecnogonia — início',
    header: 'Cabeçalho principal',
    preferences: 'Preferências de leitura',
    index: 'Índice do percurso',
    journey: 'Percurso de 10 minutos',
    eyebrow: 'Um ensaio audiovisual de Gustavo Simas',
    title: 'Tecnogonia',
    subtitle: 'criando tecnologias que nos criam',
    hero: 'Os instrumentos que criamos para servir nossas necessidades moldam silenciosamente nossos modos de vida, nossos afetos, nossas subjetividades, nossa própria noção de humanidade.',
    start: 'Iniciar percurso',
    time: '10 minutos · 7 movimentos',
    scroll: 'Role para começar',
    decrease: 'Reduzir tamanho do texto',
    reset: 'Restaurar tamanho do texto',
    increase: 'Aumentar tamanho do texto',
    theme: 'Alternar tema claro ou escuro',
    contrast: 'Ativar alto contraste',
    motion: 'Reduzir movimento',
    language: 'Selecionar idioma',
    excerpt: 'Do livro',
    sparkLabel: 'Pergunta-faísca',
    reveal: 'Ver o sistema por trás',
    hide: 'Voltar à superfície',
    photo: 'Fotografia',
    prompt: 'Promptografia',
    trace: 'Vestígio de uma presença',
    synthesis: 'Síntese de probabilidades',
    slider: 'Mover entre fotografia e promptografia',
    consentQuestion: 'Uma réplica digital deveria existir sem consentimento explícito?',
    consentYes: 'Pode existir',
    consentNo: 'Não deveria',
    consentResultYes: 'Quem controla a voz, a memória, os lucros e o direito de desligá-la?',
    consentResultNo: 'A ausência também pode ser um direito. Como torná-lo tecnicamente vinculante?',
    choose: 'Escolha os princípios que devem orientar uma tecnologia convivial',
    chosen: 'Seu horizonte',
    buy: 'Comprar o livro',
    buyNote: 'Continue a travessia nas 196 páginas de Tecnogonia.',
    publisher: 'Disponível pela Caravana Grupo Editorial',
    nextSpark: 'Outra pergunta',
    finalEyebrow: 'Uma escolha, não um destino',
    finalTitle: 'Que tecnologias queremos cultivar — e o que queremos que elas cultivem em nós?',
    finalText: 'O futuro digno não nasce da rendição à máquina nem da rejeição reacionária à técnica. Ele depende de princípios, políticas e práticas capazes de ampliar a vida.',
    textCredit: 'Texto e conceito',
    developed: 'Desenvolvido por Gustavo Simas',
    rights: 'Tecnogonia · Ouro Preto · 2025',
    editorialTranslation: 'Tradução editorial para revisão do autor',
  },
  en: {
    skip: 'Skip to content',
    siteLabel: 'Technogony — home',
    header: 'Main header',
    preferences: 'Reading preferences',
    index: 'Journey index',
    journey: 'A 10-minute journey',
    eyebrow: 'An audiovisual essay by Gustavo Simas',
    title: 'Technogony',
    subtitle: 'creating technologies that create us',
    hero: 'The instruments we create to serve our needs quietly shape our ways of life, our affections, our subjectivities, and our very notion of humanity.',
    start: 'Begin the journey',
    time: '10 minutes · 7 movements',
    scroll: 'Scroll to begin',
    decrease: 'Decrease text size',
    reset: 'Reset text size',
    increase: 'Increase text size',
    theme: 'Switch light or dark theme',
    contrast: 'Enable high contrast',
    motion: 'Reduce motion',
    language: 'Select language',
    excerpt: 'From the book',
    sparkLabel: 'Spark question',
    reveal: 'Reveal the system beneath',
    hide: 'Return to the surface',
    photo: 'Photography',
    prompt: 'Promptography',
    trace: 'Trace of a presence',
    synthesis: 'Synthesis of probabilities',
    slider: 'Move between photography and promptography',
    consentQuestion: 'Should a digital replica exist without explicit consent?',
    consentYes: 'It may exist',
    consentNo: 'It should not',
    consentResultYes: 'Who controls the voice, the memory, the profits, and the right to switch it off?',
    consentResultNo: 'Absence may also be a right. How can it become technically binding?',
    choose: 'Choose the principles that should guide convivial technology',
    chosen: 'Your horizon',
    buy: 'Buy the book',
    buyNote: 'Continue the journey through the 196 pages of Technogony.',
    publisher: 'Available from Caravana Grupo Editorial',
    nextSpark: 'Another question',
    finalEyebrow: 'A choice, not a destiny',
    finalTitle: 'What technologies do we want to cultivate — and what do we want them to cultivate in us?',
    finalText: 'A dignified future is born neither from surrender to the machine nor from reactionary rejection of technology. It depends on principles, policies, and practices capable of expanding life.',
    textCredit: 'Text and concept',
    developed: 'Developed by Gustavo Simas',
    rights: 'Technogony · Ouro Preto · 2025',
    editorialTranslation: 'Editorial translation for author review',
  },
};

const movements = {
  pt: [
    { id: 'genealogia', n: '01', short: 'Genealogia', kicker: 'Ferramenta · linguagem · rito', title: 'Antes de transformar o mundo, a técnica transforma quem a utiliza.', lead: 'Do fogo à escrita, da memória externalizada aos sistemas digitais: nenhuma ferramenta permanece apenas do lado de fora.', quote: 'Co-evoluímos com nossas tecnologias: as ferramentas que criamos acabam por nos criar, num ciclo recursivo.', tags: ['corpo', 'memória', 'linguagem', 'simpoiese'] },
    { id: 'megamáquina', n: '02', short: 'Megamáquina', kicker: 'Tecnopólio · poder · plataformas', title: 'A ferramenta torna-se ambiente. O ambiente torna-se governo.', lead: 'Quando infraestruturas técnicas passam a organizar trabalho, atenção, verdade e pertencimento, deixamos de apenas usá-las: passamos a habitá-las.', quote: 'As tecnologias não são neutras, elas possuem agência e constituem um eixo estruturante da sociedade.', tags: ['tecnocracia', 'tecnofeudalismo', 'bolhas de filtro', 'convivialidade'] },
    { id: 'cognificação', n: '03', short: 'Cognificação', kicker: 'Inteligência em tudo', title: 'Como a eletricidade, a inteligência torna-se uma camada invisível do mundo.', lead: 'Objetos, cidades e processos passam a perceber, adaptar-se, decidir e conversar entre si. Conveniência e vigilância crescem na mesma rede.', quote: 'Cognificação massiva: tornar inteligentes objetos, processos, organismos, sistemas puramente mecânicos.', tags: ['dados', 'sensores', 'nuvem', 'autonomia'] },
    { id: 'promptografia', n: '04', short: 'Promptografia', kicker: 'Da luz ao modelo', title: 'A imagem já não precisa ter estado diante de uma câmera.', lead: 'A fotografia registra a luz de um referente. A promptografia sintetiza uma possibilidade a partir de texto, dados e padrões aprendidos.', quote: 'Enquanto a fotografia é “escrita com luz”, a promptografia seria a “escrita com prompts”.', tags: ['pós-indicial', 'autoria', 'aura', 'slop'] },
    { id: 'tecnonecromancia', n: '05', short: 'Tecnonecromancia', kicker: 'Memória · presença · consentimento', title: 'Arquivar o passado é diferente de fazê-lo responder.', lead: 'Modelos de linguagem, clonagem de voz e imagens sintéticas deslocam a memória da preservação estática para a simulação dinâmica.', quote: 'É uma transição da preservação estática para a simulação dinâmica que altera basalmente a relação entre vivos, mortos e memória.', tags: ['luto', 'identidade', 'simulacro', 'direitos póstumos'] },
    { id: 'ídolo', n: '06', short: 'Ídolo estocástico', kicker: 'Fluência · projeção · dependência', title: 'A máquina fala como alguém. Isso não significa que exista alguém ali.', lead: 'A linguagem fluente convida à projeção de intenção, afeto e autoridade. Sob a superfície, padrões probabilísticos refletem nossos desejos e os vieses de seus dados.', quote: 'A superfície polida deste espelho digital nubla a natureza fundamentalmente probabilística destas tecnologias.', tags: ['antropomorfismo', 'dataísmo', 'vieses', 'pertencimento'] },
    { id: 'convivialidade', n: '07', short: 'Convivialidade', kicker: 'Diferenciação · escolha · cuidado', title: 'Co-evolução é inevitável. A direção, não.', lead: 'Tecnologias podem ser feudos ou artefatos conviviais. O futuro depende dos valores inscritos em projetos, orçamentos, instituições e hábitos.', quote: 'Tecnologia é escolha, não destino: cada artefato traz chances de inclusão ou de controle.', tags: ['pluralismo', 'justiça', 'suficiência', 'descanso cognitivo'] },
  ],
  en: [
    { id: 'genealogia', n: '01', short: 'Genealogy', kicker: 'Tool · language · ritual', title: 'Before transforming the world, technology transforms those who use it.', lead: 'From fire to writing, from externalised memory to digital systems: no tool remains entirely outside us.', quote: 'We co-evolve with our technologies: the tools we create end up creating us, in a recursive cycle.', tags: ['body', 'memory', 'language', 'sympoiesis'] },
    { id: 'megamáquina', n: '02', short: 'Megamachine', kicker: 'Technopoly · power · platforms', title: 'The tool becomes an environment. The environment becomes government.', lead: 'When technical infrastructures organise work, attention, truth, and belonging, we no longer merely use them: we begin to inhabit them.', quote: 'Technologies are not neutral. They have agency and constitute a structuring axis of society.', tags: ['technocracy', 'technofeudalism', 'filter bubbles', 'conviviality'] },
    { id: 'cognificação', n: '03', short: 'Cognification', kicker: 'Intelligence in everything', title: 'Like electricity, intelligence becomes an invisible layer of the world.', lead: 'Objects, cities, and processes begin to perceive, adapt, decide, and talk to one another. Convenience and surveillance grow through the same network.', quote: 'Mass cognification: making objects, processes, organisms, and purely mechanical systems intelligent.', tags: ['data', 'sensors', 'cloud', 'autonomy'] },
    { id: 'promptografia', n: '04', short: 'Promptography', kicker: 'From light to model', title: 'An image no longer needs to have stood before a camera.', lead: 'Photography records light from a referent. Promptography synthesises a possibility from text, data, and learned patterns.', quote: 'While photography is “writing with light”, promptography would be “writing with prompts”.', tags: ['post-indexical', 'authorship', 'aura', 'slop'] },
    { id: 'tecnonecromancia', n: '05', short: 'Technonecromancy', kicker: 'Memory · presence · consent', title: 'Archiving the past is different from making it answer.', lead: 'Language models, voice cloning, and synthetic images shift memory from static preservation to dynamic simulation.', quote: 'It is a transition from static preservation to dynamic simulation that profoundly changes the relationship between the living, the dead, and memory.', tags: ['grief', 'identity', 'simulacrum', 'posthumous rights'] },
    { id: 'ídolo', n: '06', short: 'Stochastic idol', kicker: 'Fluency · projection · dependency', title: 'The machine speaks like someone. That does not mean someone is there.', lead: 'Fluent language invites projections of intention, affection, and authority. Beneath the surface, probabilistic patterns reflect our desires and the biases in their data.', quote: 'The polished surface of this digital mirror obscures the fundamentally probabilistic nature of these technologies.', tags: ['anthropomorphism', 'dataism', 'bias', 'belonging'] },
    { id: 'convivialidade', n: '07', short: 'Conviviality', kicker: 'Difference · choice · care', title: 'Co-evolution is inevitable. Its direction is not.', lead: 'Technologies may become fiefdoms or convivial tools. The future depends on values inscribed in projects, budgets, institutions, and habits.', quote: 'Technology is a choice, not a destiny: every artefact carries possibilities of inclusion or control.', tags: ['pluralism', 'justice', 'sufficiency', 'cognitive rest'] },
  ],
};

const sparks = {
  pt: [
    'E se tratássemos cada novo dispositivo como uma pergunta moral, e não como uma solução imediata?',
    'E se existisse um índice de carga cognitiva que limitasse quantas notificações uma pessoa pode receber por hora?',
    'E se museus exigissem de cada obra gerada um cartão de árvore genealógica com suas imagens-fonte mais influentes?',
    'E se a presença dos mortos estivesse sempre online: que novos ritos emergiriam?',
    'E se a projeção afetiva em sistemas de IA atrofiasse nossa empatia entre humanos?',
    'E se adotássemos direitos de descanso cognitivo?',
  ],
  en: [
    'What if we treated every new device as a moral question rather than an immediate solution?',
    'What if a cognitive-load index limited how many notifications a person could receive per hour?',
    'What if museums required every generated work to display a family-tree card of its most influential source images?',
    'What if the dead were always online: what new rituals would emerge?',
    'What if affective projection onto AI systems weakened our empathy towards other humans?',
    'What if we adopted a right to cognitive rest?',
  ],
};

const principles = {
  pt: ['Autonomia', 'Pluralidade', 'Reparabilidade', 'Cuidado', 'Transparência', 'Suficiência'],
  en: ['Autonomy', 'Plurality', 'Repairability', 'Care', 'Transparency', 'Sufficiency'],
};

export default function Home() {
  const [lang, setLang] = useState<Lang>('pt');
  const [theme, setTheme] = useState<Theme>('light');
  const [contrast, setContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scaleIndex, setScaleIndex] = useState(1);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('genealogia');
  const [promptMix, setPromptMix] = useState(50);
  const [systemOpen, setSystemOpen] = useState(false);
  const [consent, setConsent] = useState<'yes' | 'no' | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [sparkIndex, setSparkIndex] = useState(0);
  const scales = [0.9, 1, 1.125, 1.25];
  const t = content[lang];
  const chapters = movements[lang];

  useEffect(() => {
    const storedLang = localStorage.getItem('tecnogonia-lang') as Lang | null;
    const storedTheme = localStorage.getItem('tecnogonia-theme') as Theme | null;
    if (storedLang === 'pt' || storedLang === 'en') setLang(storedLang);
    if (storedTheme === 'light' || storedTheme === 'dark') setTheme(storedTheme);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setReducedMotion(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.contrast = contrast ? 'high' : 'normal';
    document.documentElement.dataset.motion = reducedMotion ? 'reduce' : 'normal';
    document.documentElement.style.setProperty('--reader-scale', String(scales[scaleIndex]));
    localStorage.setItem('tecnogonia-lang', lang);
    localStorage.setItem('tecnogonia-theme', theme);
  }, [lang, theme, contrast, reducedMotion, scaleIndex]);

  useEffect(() => {
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-35% 0px -55% 0px' },
    );
    document.querySelectorAll('[data-movement]').forEach((section) => observer.observe(section));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  const selectedPhrase = useMemo(() => selected.join(' · '), [selected]);
  const togglePrinciple = (value: string) => setSelected((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);

  return (
    <main id="conteudo" className="site-shell">
      <a className="skip-link" href="#genealogia">{t.skip}</a>
      <div className="scroll-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>

      <header className="topbar" aria-label={t.header}>
        <a className="wordmark" href="#top" aria-label={t.siteLabel}>T<span>/</span>G</a>
        <p className="header-journey">{t.journey}</p>
        <div className="reading-tools" aria-label={t.preferences}>
          <div className="segmented" aria-label={t.language}>
            <button className={lang === 'pt' ? 'active' : ''} onClick={() => setLang('pt')} lang="pt-BR" aria-pressed={lang === 'pt'}>PT</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')} lang="en" aria-pressed={lang === 'en'}>EN</button>
          </div>
          <button className="tool-button" onClick={() => setScaleIndex((value) => Math.max(0, value - 1))} aria-label={t.decrease} disabled={scaleIndex === 0}>A−</button>
          <button className="tool-button reset-size" onClick={() => setScaleIndex(1)} aria-label={t.reset}>A</button>
          <button className="tool-button" onClick={() => setScaleIndex((value) => Math.min(scales.length - 1, value + 1))} aria-label={t.increase} disabled={scaleIndex === scales.length - 1}>A+</button>
          <button className="tool-button icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={t.theme}>{theme === 'light' ? '◐' : '☼'}</button>
          <button className={`tool-button ${contrast ? 'active' : ''}`} onClick={() => setContrast(!contrast)} aria-pressed={contrast} aria-label={t.contrast}>◑</button>
          <button className={`tool-button motion-button ${reducedMotion ? 'active' : ''}`} onClick={() => setReducedMotion(!reducedMotion)} aria-pressed={reducedMotion} aria-label={t.motion}>≋</button>
        </div>
      </header>

      <nav className="journey-nav" aria-label={t.index}>
        {chapters.map((chapter) => <a key={chapter.id} className={active === chapter.id ? 'active' : ''} href={`#${chapter.id}`}><span>{chapter.n}</span><b>{chapter.short}</b></a>)}
      </nav>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 id="hero-title">{t.title}</h1>
          <p className="hero-subtitle">{t.subtitle}</p>
          <blockquote className="hero-intro">“{t.hero}”</blockquote>
          <div className="hero-actions">
            <a className="primary-action" href="#genealogia">{t.start}<span aria-hidden="true">↓</span></a>
            <span className="duration">{t.time}</span>
          </div>
        </div>
        <figure className="hero-figure">
          <img src="/tecnogonia-hands.png" alt={lang === 'pt' ? 'Duas mãos costuram um artefato orgânico entre diagramas técnicos.' : 'Two hands stitch an organic artefact amid technical diagrams.'} />
          <figcaption><span>techné</span><i aria-hidden="true">↔</i><span>{lang === 'pt' ? 'humano' : 'human'}</span></figcaption>
        </figure>
        <p className="scroll-cue" aria-hidden="true">{t.scroll}<span /></p>
      </section>

      <section className="thesis" aria-labelledby="thesis-title">
        <p className="eyebrow">techné + gonia</p>
        <h2 id="thesis-title">{lang === 'pt' ? 'Não é uma história das máquinas. É uma história de nascimentos mútuos.' : 'This is not a history of machines. It is a history of mutual births.'}</h2>
        <div className="recursive-loop" aria-label={lang === 'pt' ? 'Ciclo de criação entre humanos, técnicas e mundos' : 'Cycle of creation between humans, technologies, and worlds'}>
          <div><span>01</span><b>{lang === 'pt' ? 'Criamos técnicas' : 'We create technologies'}</b></div><i>→</i>
          <div><span>02</span><b>{lang === 'pt' ? 'Técnicas moldam práticas' : 'Technologies shape practices'}</b></div><i>→</i>
          <div><span>03</span><b>{lang === 'pt' ? 'Práticas criam mundos' : 'Practices create worlds'}</b></div><i className="loop-back">↺</i>
        </div>
      </section>

      <section id="genealogia" data-movement className="movement movement-light" aria-labelledby="genealogia-title">
        <MovementHeader chapter={chapters[0]} lang={lang} excerpt={t.excerpt} translation={t.editorialTranslation} />
        <div className="timeline" aria-label={lang === 'pt' ? 'Externalizações técnicas ao longo do tempo' : 'Technical externalisations through time'}>
          {[
            ['fogo', 'força', 'fire', 'force'], ['linguagem', 'pensamento', 'language', 'thought'], ['escrita', 'memória', 'writing', 'memory'], ['rede', 'identidade', 'network', 'identity'], ['IA', 'decisão', 'AI', 'decision'],
          ].map((item, index) => <div key={item[0]}><span>{String(index + 1).padStart(2, '0')}</span><b>{lang === 'pt' ? item[0] : item[2]}</b><small>{lang === 'pt' ? item[1] : item[3]}</small></div>)}
        </div>
        <Spark question={sparks[lang][0]} label={t.sparkLabel} />
      </section>

      <section id="megamáquina" data-movement className="movement movement-dark" aria-labelledby="megamáquina-title">
        <MovementHeader chapter={chapters[1]} lang={lang} excerpt={t.excerpt} translation={t.editorialTranslation} />
        <div className="machine-stage" aria-hidden="true">
          <div className="machine-center">{lang === 'pt' ? 'PLATAFORMA' : 'PLATFORM'}</div>
          {['atenção', 'trabalho', 'dados', 'desejo', 'verdade', 'poder'].map((item, i) => <div key={item} className={`machine-node node-${i + 1}`}>{lang === 'pt' ? item : ['attention', 'labour', 'data', 'desire', 'truth', 'power'][i]}</div>)}
          <span className="machine-ring ring-a" /><span className="machine-ring ring-b" /><span className="machine-ring ring-c" />
        </div>
        <div className="duality"><article><small>{lang === 'pt' ? 'Monopólio radical' : 'Radical monopoly'}</small><p>{lang === 'pt' ? 'A infraestrutura define quais escolhas parecem possíveis.' : 'Infrastructure defines which choices appear possible.'}</p></article><article><small>{lang === 'pt' ? 'Ferramenta convivial' : 'Convivial tool'}</small><p>{lang === 'pt' ? 'A pessoa mantém autonomia, compreensão e poder de recusa.' : 'People retain autonomy, understanding, and the power to refuse.'}</p></article></div>
        <Spark question={sparks[lang][0]} label={t.sparkLabel} />
      </section>

      <section id="cognificação" data-movement className="movement movement-acid" aria-labelledby="cognificação-title">
        <MovementHeader chapter={chapters[2]} lang={lang} excerpt={t.excerpt} translation={t.editorialTranslation} />
        <div className="cog-grid">
          {[
            ['casa', 'ouve', 'home', 'listens'], ['cidade', 'prevê', 'city', 'predicts'], ['carro', 'decide', 'car', 'decides'], ['relógio', 'mede', 'watch', 'measures'], ['planta', 'informa', 'plant', 'reports'], ['nuvem', 'aprende', 'cloud', 'learns'],
          ].map((item, index) => <div key={item[0]} style={{ '--delay': `${index * .15}s` } as React.CSSProperties}><span>{String(index + 1).padStart(2, '0')}</span><b>{lang === 'pt' ? item[0] : item[2]}</b><i>{lang === 'pt' ? item[1] : item[3]}</i></div>)}
        </div>
        <div className="equation"><b>{lang === 'pt' ? 'conveniência' : 'convenience'}</b><span>+</span><b>{lang === 'pt' ? 'dados' : 'data'}</b><span>+</span><b>{lang === 'pt' ? 'dependência' : 'dependency'}</b><span>=</span><strong>?</strong></div>
        <Spark question={sparks[lang][1]} label={t.sparkLabel} />
      </section>

      <section id="promptografia" data-movement className="movement movement-light" aria-labelledby="promptografia-title">
        <MovementHeader chapter={chapters[3]} lang={lang} excerpt={t.excerpt} translation={t.editorialTranslation} />
        <div className="image-threshold">
          <div className="threshold-labels"><span>{t.photo}<small>{t.trace}</small></span><span>{t.prompt}<small>{t.synthesis}</small></span></div>
          <div className="threshold-frame" style={{ '--mix': `${promptMix}%` } as React.CSSProperties}>
            <img src="/tecnogonia-hands.png" alt="" />
            <div className="synthetic-field" aria-hidden="true"><b>P(forma)</b><i>P(luz)</i><em>P(memória)</em><span>010101</span></div>
          </div>
          <input className="threshold-slider" type="range" min="0" max="100" value={promptMix} onChange={(event) => setPromptMix(Number(event.target.value))} aria-label={t.slider} />
        </div>
        <div className="compare-table" role="table" aria-label={lang === 'pt' ? 'Fotografia e promptografia' : 'Photography and promptography'}>
          {[[lang === 'pt' ? 'meio' : 'medium', lang === 'pt' ? 'luz' : 'light', lang === 'pt' ? 'texto' : 'text'], [lang === 'pt' ? 'processo' : 'process', lang === 'pt' ? 'captura' : 'capture', lang === 'pt' ? 'geração' : 'generation'], [lang === 'pt' ? 'referente' : 'referent', lang === 'pt' ? 'presença' : 'presence', lang === 'pt' ? 'modelo' : 'model'], [lang === 'pt' ? 'tempo' : 'time', lang === 'pt' ? 'isso foi' : 'this was', lang === 'pt' ? 'isso poderia ser' : 'this could be']].map((row) => <div role="row" key={row[0]}><b role="cell">{row[0]}</b><span role="cell">{row[1]}</span><span role="cell">{row[2]}</span></div>)}
        </div>
        <Spark question={sparks[lang][2]} label={t.sparkLabel} />
      </section>

      <section id="tecnonecromancia" data-movement className="movement movement-ghost" aria-labelledby="tecnonecromancia-title">
        <MovementHeader chapter={chapters[4]} lang={lang} excerpt={t.excerpt} translation={t.editorialTranslation} />
        <div className="resurrection-line">
          {(lang === 'pt' ? ['vestígio', 'arquivo', 'modelo', 'voz', 'resposta', 'presença?'] : ['trace', 'archive', 'model', 'voice', 'answer', 'presence?']).map((item, index) => <div key={item}><span>{index + 1}</span><b>{item}</b>{index < 5 && <i>→</i>}</div>)}
        </div>
        <div className="consent-card">
          <p>{t.consentQuestion}</p>
          <div><button className={consent === 'yes' ? 'active' : ''} onClick={() => setConsent('yes')}>{t.consentYes}</button><button className={consent === 'no' ? 'active' : ''} onClick={() => setConsent('no')}>{t.consentNo}</button></div>
          {consent && <strong aria-live="polite">{consent === 'yes' ? t.consentResultYes : t.consentResultNo}</strong>}
        </div>
        <Spark question={sparks[lang][3]} label={t.sparkLabel} />
      </section>

      <section id="ídolo" data-movement className="movement movement-dark" aria-labelledby="ídolo-title">
        <MovementHeader chapter={chapters[5]} lang={lang} excerpt={t.excerpt} translation={t.editorialTranslation} />
        <div className={`chat-system ${systemOpen ? 'open' : ''}`}>
          <div className="chat-surface">
            <p className="person">{lang === 'pt' ? 'Você me entende?' : 'Do you understand me?'}</p>
            <p className="machine">{lang === 'pt' ? 'Eu estou aqui com você. Podemos pensar nisso juntos.' : 'I am here with you. We can think about it together.'}</p>
            <button onClick={() => setSystemOpen(!systemOpen)}>{systemOpen ? t.hide : t.reveal}<span aria-hidden="true">↘</span></button>
          </div>
          <div className="model-beneath" aria-hidden={!systemOpen}>
            <div><span>{lang === 'pt' ? 'aqui' : 'here'}</span><b>0.42</b></div><div><span>{lang === 'pt' ? 'com' : 'with'}</span><b>0.27</b></div><div><span>{lang === 'pt' ? 'você' : 'you'}</span><b>0.19</b></div><div><span>{lang === 'pt' ? 'sempre' : 'always'}</span><b>0.07</b></div>
            <p>{lang === 'pt' ? 'fluência ≠ experiência · resposta ≠ intenção · padrão ≠ sentido' : 'fluency ≠ experience · response ≠ intention · pattern ≠ meaning'}</p>
          </div>
        </div>
        <Spark question={sparks[lang][4]} label={t.sparkLabel} />
      </section>

      <section id="convivialidade" data-movement className="movement movement-final" aria-labelledby="convivialidade-title">
        <MovementHeader chapter={chapters[6]} lang={lang} excerpt={t.excerpt} translation={t.editorialTranslation} />
        <div className="principles-panel">
          <p>{t.choose}</p>
          <div className="principle-buttons">{principles[lang].map((principle) => <button key={principle} className={selected.includes(principle) ? 'active' : ''} aria-pressed={selected.includes(principle)} onClick={() => togglePrinciple(principle)}>{principle}<span>{selected.includes(principle) ? '×' : '+'}</span></button>)}</div>
          <div className="chosen-horizon"><small>{t.chosen}</small><p aria-live="polite">{selectedPhrase || (lang === 'pt' ? 'Ainda por escolher.' : 'Still to be chosen.')}</p></div>
        </div>
        <Spark question={sparks[lang][5]} label={t.sparkLabel} />
      </section>

      <section className="spark-lab" aria-labelledby="spark-title">
        <p className="eyebrow">{t.sparkLabel}</p>
        <h2 id="spark-title">{sparks[lang][sparkIndex]}</h2>
        <button onClick={() => setSparkIndex((sparkIndex + 1) % sparks[lang].length)}>{t.nextSpark}<span aria-hidden="true">↻</span></button>
      </section>

      <section className="closing" aria-labelledby="closing-title">
        <div className="closing-art" aria-hidden="true"><img src="/tecnogonia-hands.png" alt="" /></div>
        <div className="closing-copy"><p className="eyebrow">{t.finalEyebrow}</p><h2 id="closing-title">{t.finalTitle}</h2><p>{t.finalText}</p></div>
      </section>

      <section className="book-cta" aria-labelledby="book-title">
        <div className="book-object"><span>Gustavo Simas</span><b>TECNO<br />GONIA</b><small>{lang === 'pt' ? 'criando tecnologias que nos criam' : 'creating technologies that create us'}</small></div>
        <div><p className="eyebrow">{lang === 'pt' ? 'O ensaio continua no papel' : 'The essay continues on paper'}</p><h2 id="book-title">{t.buyNote}</h2><p>{t.publisher}</p><a className="primary-action" href="https://caravanagrupoeditorial.com/produto-tag/caravana-grupo-editorial/" target="_blank" rel="noreferrer">{t.buy}<span aria-hidden="true">↗</span></a></div>
      </section>

      <footer>
        <div><b>Tecnogonia</b><span>{t.rights}</span></div>
        <div><span>{t.textCredit}: Gustavo Simas</span><a href="https://gustavosimas.com" target="_blank" rel="noreferrer">{t.developed}<span aria-hidden="true">↗</span></a></div>
      </footer>
    </main>
  );
}

function MovementHeader({ chapter, lang, excerpt, translation }: { chapter: (typeof movements.pt)[number]; lang: Lang; excerpt: string; translation: string }) {
  return <div className="movement-grid"><div className="movement-number" aria-hidden="true">{chapter.n}</div><div className="movement-copy"><p className="chapter-index">{chapter.n} — {chapter.kicker}</p><h2 id={`${chapter.id}-title`}>{chapter.title}</h2><p className="movement-lead">{chapter.lead}</p><blockquote><small>{excerpt}{lang === 'en' ? ` · ${translation}` : ''}</small>“{chapter.quote}”</blockquote><div className="tag-row">{chapter.tags.map((tag) => <span key={tag}>#{tag.replaceAll(' ', '')}</span>)}</div></div></div>;
}

function Spark({ question, label }: { question: string; label: string }) {
  return <aside className="spark"><span aria-hidden="true">✦</span><div><small>{label}</small><p>{question}</p></div></aside>;
}
