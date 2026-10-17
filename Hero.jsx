import { ArrowDownRight, Leaf, Star, Waves } from 'lucide-react'

export default function Hero({ onExplore }) {
  return (
    <section className="hero" id="home">
      <div className="hero-grain" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> FROM THE SHORES OF MAHARASHTRA <span className="eyebrow-line" /></div>
          <h1>Coastal soul.<br /><span>Thali on</span> your mind.</h1>
          <p className="hero-lede">A little taste of the Konkan coast, made with sun-ripened ingredients, slow-roasted spices and recipes that have travelled through generations.</p>
          <div className="hero-cta-row">
            <button className="button button-primary" onClick={onExplore}>Explore the Menu <ArrowDownRight size={18} /></button>
            <div className="hero-rating"><span className="stars">★★★★★</span><strong>4.9/5</strong><small>Loved by 2,000+ foodies</small></div>
          </div>
          <div className="hero-notes"><span><Leaf size={15} /> Fresh coastal produce</span><span><Waves size={15} /> Delivered with warmth</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame">
            <div className="hero-image" role="img" aria-label="A traditional Konkan fish thali with curry and seafood" />
            <div className="hero-image-shine" />
          </div>
          <div className="hero-stamp"><span>AUTHENTIC</span><strong>कोंकण</strong><span>FLAVOURS</span></div>
          <div className="hero-caption"><span>01</span><span>Made the Konkan way</span><span className="caption-rule" /></div>
        </div>
      </div>
      <div className="hero-bottom container"><span>खाण्यातून घराची आठवण</span><span className="scroll-cue">Scroll to savour <ArrowDownRight size={15} /></span></div>
    </section>
  )
}
