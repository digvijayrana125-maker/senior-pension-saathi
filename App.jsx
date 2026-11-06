import React, { useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured } from './lib/supabaseClient'
import { loadPunjabSchemes } from './data'

const copy = {
  en: {
    tagline: 'Pension information, made simpler',
    nav: ['Home', 'Pension schemes', 'Eligibility guide', 'Documents', 'Get help'],
    heroEyebrow: 'PUNJAB FIRST • INDIA NEXT',
    heroTitle: 'Clear pension information. A little more peace of mind.',
    heroText: 'Find scheme information, understand documents and learn where to apply — in simple language.',
    browse: 'Explore pension schemes', learn: 'How this website works',
    trust: 'Independent information guide • Not a government website',
    quickTitle: 'Start with what you need',
    quick: [
      ['Find a scheme', 'Browse pension scheme information for Punjab.'],
      ['Understand eligibility', 'See what to verify before starting an application.'],
      ['Prepare documents', 'Use a simple checklist before visiting a service centre.']
    ],
    featured: 'Punjab pension information',
    featuredText: 'The official Punjab service document explains application routes and document categories for the Old Age Pension Scheme.',
    view: 'View scheme details',
    statusTitle: 'Pension status',
    statusText: 'Live individual pension tracking is not connected. Use the official Punjab service channel for application-specific status.',
    official: 'Open Punjab Connect Portal',
    schemesTitle: 'Pension schemes',
    schemesIntro: 'Start with Punjab. We will add other states after verifying their official scheme information.',
    search: 'Search schemes',
    noResults: 'No matching schemes found.',
    eligibilityTitle: 'Eligibility guide',
    eligibilityIntro: 'This page helps you prepare questions. It does not decide whether someone qualifies.',
    eligibilityWarning: 'The Punjab government service document linked here lists documents and application routes, but the copy reviewed does not state the full age and income eligibility rules. Please confirm the current criteria with the official department or Punjab Connect before applying.',
    eligibilitySteps: ['Confirm the scheme is available in your area.', 'Ask the department or Sewa Kendra for the current age, income and residence conditions.', 'Confirm whether receiving another pension affects eligibility.', 'Keep original documents available for official verification.'],
    docsTitle: 'Document checklist',
    docsIntro: 'The following categories are listed in the Punjab government Old Age Pension service document. The official department may ask for additional or updated documents.',
    docsCaution: 'Do not upload or send Aadhaar, bank details, OTPs or identity documents to this demo website.',
    applyTitle: 'How to apply in Punjab',
    applyIntro: 'The Punjab service document lists these routes. Confirm the current process before travelling or submitting documents.',
    helpTitle: 'Get help',
    helpIntro: 'Use official channels for personal applications and verified status. Senior Pension Saathi is an information guide, not an application portal.',
    helpLine: 'Punjab service helpline',
    source: 'Official source document',
    sourceLabel: 'Punjab Government — Old Age Pension Scheme service information',
    updated: 'Source reviewed for this prototype: November 2026',
    footer: 'Senior Pension Saathi is an independent information project. It is not affiliated with any government department.',
    backend: 'Supabase is not connected yet. Showing verified starter information locally.',
    backendConnected: 'Supabase connected. Scheme data is being loaded from the database.',
    loading: 'Loading scheme information…',
    lang: 'हिन्दी',
    textSmaller: 'A−', textLarger: 'A+',
    sourceNote: 'Always verify details on the official government service before acting.'
  },
  hi: {
    tagline: 'पेंशन की जानकारी, आसान भाषा में',
    nav: ['होम', 'पेंशन योजनाएँ', 'पात्रता मार्गदर्शिका', 'दस्तावेज़', 'मदद लें'],
    heroEyebrow: 'पहले पंजाब • फिर पूरा भारत',
    heroTitle: 'पेंशन की स्पष्ट जानकारी। थोड़ी और निश्चिंतता।',
    heroText: 'योजनाओं की जानकारी पाएँ, दस्तावेज़ समझें और आवेदन का सही तरीका जानें — सरल भाषा में।',
    browse: 'पेंशन योजनाएँ देखें', learn: 'यह वेबसाइट कैसे काम करती है',
    trust: 'स्वतंत्र जानकारी सेवा • सरकारी वेबसाइट नहीं',
    quickTitle: 'अपनी ज़रूरत से शुरुआत करें',
    quick: [['योजना खोजें', 'पंजाब की पेंशन योजनाओं की जानकारी देखें।'], ['पात्रता समझें', 'आवेदन से पहले किन बातों की पुष्टि करनी है, जानें।'], ['दस्तावेज़ तैयार करें', 'सेवा केंद्र जाने से पहले सरल सूची देखें।']],
    featured: 'पंजाब पेंशन जानकारी',
    featuredText: 'पंजाब का आधिकारिक सेवा दस्तावेज़ वृद्धावस्था पेंशन योजना के आवेदन के तरीकों और दस्तावेज़ श्रेणियों की जानकारी देता है।',
    view: 'योजना की जानकारी देखें',
    statusTitle: 'पेंशन स्थिति',
    statusText: 'व्यक्तिगत लाइव पेंशन ट्रैकिंग अभी जुड़ी नहीं है। आवेदन की स्थिति के लिए पंजाब की आधिकारिक सेवा का उपयोग करें।',
    official: 'पंजाब कनेक्ट पोर्टल खोलें',
    schemesTitle: 'पेंशन योजनाएँ',
    schemesIntro: 'शुरुआत पंजाब से। अन्य राज्यों की योजनाएँ आधिकारिक जानकारी जाँचने के बाद जोड़ी जाएँगी।',
    search: 'योजनाएँ खोजें', noResults: 'कोई योजना नहीं मिली।',
    eligibilityTitle: 'पात्रता मार्गदर्शिका',
    eligibilityIntro: 'यह पेज तैयारी में मदद करता है। यह पात्रता का अंतिम निर्णय नहीं देता।',
    eligibilityWarning: 'यहाँ दिया गया पंजाब सरकार का सेवा दस्तावेज़ दस्तावेज़ों और आवेदन के तरीकों की जानकारी देता है, लेकिन इसमें पूरी आयु और आय संबंधी पात्रता शर्तें नहीं दी गई हैं। आवेदन से पहले विभाग या पंजाब कनेक्ट से वर्तमान नियमों की पुष्टि करें।',
    eligibilitySteps: ['पुष्टि करें कि योजना आपके क्षेत्र में उपलब्ध है।', 'विभाग या सेवा केंद्र से वर्तमान आयु, आय और निवास की शर्तें पूछें।', 'पूछें कि दूसरी पेंशन मिलने से पात्रता पर असर पड़ता है या नहीं।', 'आधिकारिक जाँच के लिए मूल दस्तावेज़ तैयार रखें।'],
    docsTitle: 'दस्तावेज़ सूची',
    docsIntro: 'नीचे दी गई श्रेणियाँ पंजाब सरकार के वृद्धावस्था पेंशन सेवा दस्तावेज़ में सूचीबद्ध हैं। विभाग अतिरिक्त या नए दस्तावेज़ माँग सकता है।',
    docsCaution: 'इस डेमो वेबसाइट पर आधार, बैंक विवरण, OTP या पहचान दस्तावेज़ अपलोड न करें।',
    applyTitle: 'पंजाब में आवेदन कैसे करें',
    applyIntro: 'पंजाब सेवा दस्तावेज़ में ये तरीके दिए गए हैं। जाने या दस्तावेज़ जमा करने से पहले वर्तमान प्रक्रिया की पुष्टि करें।',
    helpTitle: 'मदद लें',
    helpIntro: 'व्यक्तिगत आवेदन और सत्यापित स्थिति के लिए आधिकारिक माध्यमों का उपयोग करें। Senior Pension Saathi जानकारी देने वाली वेबसाइट है, आवेदन पोर्टल नहीं।',
    helpLine: 'पंजाब सेवा हेल्पलाइन',
    source: 'आधिकारिक स्रोत दस्तावेज़',
    sourceLabel: 'पंजाब सरकार — वृद्धावस्था पेंशन योजना सेवा जानकारी',
    updated: 'इस प्रोटोटाइप के लिए स्रोत की समीक्षा: नवंबर 2026',
    footer: 'Senior Pension Saathi एक स्वतंत्र जानकारी परियोजना है। यह किसी सरकारी विभाग से संबद्ध नहीं है।',
    backend: 'Supabase अभी जुड़ा नहीं है। सत्यापित शुरुआती जानकारी स्थानीय रूप से दिखाई जा रही है।',
    backendConnected: 'Supabase जुड़ा है। योजना की जानकारी डेटाबेस से लोड हो रही है।',
    loading: 'योजना की जानकारी लोड हो रही है…',
    lang: 'English', textSmaller: 'A−', textLarger: 'A+',
    sourceNote: 'कोई कदम उठाने से पहले आधिकारिक सरकारी सेवा पर जानकारी की पुष्टि करें।'
  }
}

function App() {
  const [lang, setLang] = useState('en')
  const [page, setPage] = useState('Home')
  const [fontSize, setFontSize] = useState(17)
  const [schemes, setSchemes] = useState([])
  const [dataSource, setDataSource] = useState('loading')
  const [search, setSearch] = useState('')
  const t = copy[lang]
  const pages = ['Home', 'Pension schemes', 'Eligibility guide', 'Documents', 'Get help']
  const activeIndex = pages.indexOf(page)

  useEffect(() => {
    let active = true
    loadPunjabSchemes().then(result => {
      if (!active) return
      setSchemes(result.data)
      setDataSource(result.source)
    })
    return () => { active = false }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const filteredSchemes = useMemo(() => schemes.filter(s =>
    `${s.name} ${s.summary} ${s.category}`.toLowerCase().includes(search.toLowerCase())
  ), [schemes, search])

  function navigate(next) {
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function renderHome() {
    return <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-lead">{t.heroText}</p>
          <div className="hero-actions">
            <button className="button primary" onClick={() => navigate('Pension schemes')}>{t.browse}</button>
            <button className="button secondary" onClick={() => navigate('Eligibility guide')}>{t.learn}</button>
          </div>
          <p className="trust-note"><span>✓</span> {t.trust}</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-sun"></div><div className="art-plant plant-one"></div><div className="art-plant plant-two"></div>
          <div className="art-card"><span className="art-check">✓</span><b>Simple. Clear. Accessible.</b><small>ਸਰਲ ਜਾਣਕਾਰੀ • आसान जानकारी</small></div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading"><div><p className="eyebrow">START HERE</p><h2>{t.quickTitle}</h2></div></div>
        <div className="quick-grid">
          {t.quick.map((item, i) => <button className="quick-card" key={item[0]} onClick={() => navigate(pages[i + 1])}>
            <span className="quick-number">0{i + 1}</span><h3>{item[0]}</h3><p>{item[1]}</p><span className="card-arrow">→</span>
          </button>)}
        </div>
      </section>

      <section className="feature-layout">
        <article className="feature-panel">
          <span className="pill">PUNJAB</span><h2>{t.featured}</h2><p>{t.featuredText}</p>
          <button className="text-button" onClick={() => navigate('Pension schemes')}>{t.view} <span>→</span></button>
        </article>
        <article className="status-panel">
          <div className="status-icon">i</div><div><h2>{t.statusTitle}</h2><p>{t.statusText}</p>
          <a className="text-button" href="https://connect.punjab.gov.in/" target="_blank" rel="noreferrer">{t.official} ↗</a></div>
        </article>
      </section>
    </>
  }

  function renderSchemes() {
    return <section className="content-page">
      <p className="eyebrow">PUNJAB • SCHEME DIRECTORY</p><h1>{t.schemesTitle}</h1><p className="page-intro">{t.schemesIntro}</p>
      <label className="search-label"><span>{t.search}</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search + '…'} /></label>
      {dataSource === 'loading' ? <p>{t.loading}</p> : <div className="scheme-list">
        {filteredSchemes.length ? filteredSchemes.map(s => <article className="scheme-card" key={s.id}>
          <div className="scheme-top"><span className="pill">PUNJAB</span><span className="verified-dot">● Official source linked</span></div>
          <h2>{s.name}</h2><p>{s.summary}</p><p className="department">{s.department}</p>
          <button className="button primary small" onClick={() => navigate('Documents')}>{t.docsTitle}</button>
          <a className="text-button source-link" href={s.source_url} target="_blank" rel="noreferrer">{t.source} ↗</a>
        </article>) : <p>{t.noResults}</p>}
      </div>}
      <p className="source-note">{t.sourceNote}</p>
    </section>
  }

  function renderEligibility() {
    return <section className="content-page">
      <p className="eyebrow">CHECK BEFORE YOU APPLY</p><h1>{t.eligibilityTitle}</h1><p className="page-intro">{t.eligibilityIntro}</p>
      <div className="warning-card"><span className="warning-icon">!</span><p>{t.eligibilityWarning}</p></div>
      <div className="steps-card"><h2>Before applying</h2><ol>{t.eligibilitySteps.map(x => <li key={x}>{x}</li>)}</ol></div>
      <p className="source-note">{t.sourceNote}</p>
    </section>
  }

  function renderDocuments() {
    const docs = schemes[0]?.required_documents ?? []
    const routes = schemes[0]?.application_routes ?? []
    return <section className="content-page">
      <p className="eyebrow">PREPARE WITH CONFIDENCE</p><h1>{t.docsTitle}</h1><p className="page-intro">{t.docsIntro}</p>
      <div className="document-list">{docs.map((d, i) => <div className="document-item" key={d}><span>{i + 1}</span><p>{d}</p></div>)}</div>
      <div className="warning-card"><span className="warning-icon">!</span><p>{t.docsCaution}</p></div>
      <h2 className="subheading">{t.applyTitle}</h2><p className="page-intro">{t.applyIntro}</p>
      <div className="route-grid">{routes.map((r, i) => <article className="route-card" key={r}><span>0{i + 1}</span><p>{r}</p></article>)}</div>
      <a className="button primary inline-button" href="https://connect.punjab.gov.in/" target="_blank" rel="noreferrer">{t.official} ↗</a>
    </section>
  }

  function renderHelp() {
    return <section className="content-page">
      <p className="eyebrow">WE ARE HERE TO GUIDE</p><h1>{t.helpTitle}</h1><p className="page-intro">{t.helpIntro}</p>
      <div className="help-grid">
        <article className="help-card"><span className="help-symbol">☎</span><h2>{t.helpLine}</h2><a href="tel:1100">1100</a><p>Confirm the current helpline and service hours before calling.</p></article>
        <article className="help-card"><span className="help-symbol">↗</span><h2>Punjab Connect</h2><a href="https://connect.punjab.gov.in/" target="_blank" rel="noreferrer">connect.punjab.gov.in</a><p>Official Punjab service portal.</p></article>
        <article className="help-card"><span className="help-symbol">⌂</span><h2>Sewa Kendra</h2><p>Visit a nearby centre and ask staff to confirm the latest documents and application process.</p></article>
      </div>
      <div className="warning-card"><span className="warning-icon">!</span><p>Never share an OTP, bank password, UPI PIN or full identity details with anyone claiming to provide pension help through this website.</p></div>
    </section>
  }

  const pageContent = page === 'Home' ? renderHome()
    : page === 'Pension schemes' ? renderSchemes()
    : page === 'Eligibility guide' ? renderEligibility()
    : page === 'Documents' ? renderDocuments()
    : renderHelp()

  return <div className="app-shell" style={{ '--base-size': `${fontSize}px` }}>
    <header className="site-header">
      <button className="brand" onClick={() => navigate('Home')} aria-label="Senior Pension Saathi home">
        <span className="brand-mark">S<span>+</span></span><span className="brand-copy"><b>Senior Pension Saathi</b><small>{t.tagline}</small></span>
      </button>
      <div className="header-tools">
        <button className="tool-button" onClick={() => setFontSize(v => Math.max(15, v - 1))} aria-label="Decrease text size">{t.textSmaller}</button>
        <button className="tool-button" onClick={() => setFontSize(v => Math.min(22, v + 1))} aria-label="Increase text size">{t.textLarger}</button>
        <button className="language-button" onClick={() => setLang(v => v === 'en' ? 'hi' : 'en')}>{t.lang}</button>
      </div>
    </header>
    <nav className="main-nav" aria-label="Main navigation">
      {t.nav.map((label, i) => <button key={pages[i]} className={activeIndex === i ? 'nav-link active' : 'nav-link'} onClick={() => navigate(pages[i])}>{label}</button>)}
    </nav>
    <main>
      {pageContent}
      <div className="data-status"><span className={dataSource === 'supabase' ? 'status-led live' : 'status-led'}></span>{dataSource === 'supabase' ? t.backendConnected : t.backend}</div>
    </main>
    <footer className="site-footer">
      <div className="footer-brand"><span className="brand-mark small-mark">S<span>+</span></span><b>Senior Pension Saathi</b></div>
      <p>{t.footer}</p>
      <div className="footer-meta"><a href="https://punjab.gov.in/wp-content/uploads/2025/09/Old-Age-Pension-Scheme.pdf" target="_blank" rel="noreferrer">{t.sourceLabel} ↗</a><span>{t.updated}</span></div>
    </footer>
  </div>
}

export default App
