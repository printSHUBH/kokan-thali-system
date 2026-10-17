import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ChefHat, ChevronDown, Clock3, Heart, Leaf, Quote, Sparkles, UtensilsCrossed } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryFilter from './components/CategoryFilter'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import Checkout from './components/Checkout'
import Footer from './components/Footer'
import { categories, products } from './data/products'

const formatINR = (value) => `₹${value.toLocaleString('en-IN')}`

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kokan-favorites') || '[]') } catch { return [] }
  })
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kokan-cart') || '[]') } catch { return [] }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [menuReady, setMenuReady] = useState(false)
  const [menuError, setMenuError] = useState(false)

  useEffect(() => { const timer = window.setTimeout(() => { if (Array.isArray(products) && products.length) setMenuReady(true); else setMenuError(true) }, 250); return () => window.clearTimeout(timer) }, [])
  useEffect(() => { localStorage.setItem('kokan-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('kokan-favorites', JSON.stringify(favorites)) }, [favorites])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 49
  const total = subtotal + delivery

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    const result = products.filter((product) => {
      const categoryMatch = activeCategory === 'all' || product.category === activeCategory
      const searchMatch = !normalizedSearch || `${product.name} ${product.description}`.toLowerCase().includes(normalizedSearch)
      return categoryMatch && searchMatch
    })
    if (sort === 'price-low') return [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') return [...result].sort((a, b) => b.price - a.price)
    if (sort === 'rating') return [...result].sort((a, b) => b.rating - a.rating)
    return result
  }, [activeCategory, search, sort])

  const addToCart = (product) => setCart((current) => {
    const existing = current.find((item) => item.product.id === product.id)
    if (existing) return current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
    return [...current, { product, quantity: 1 }]
  })
  const changeQuantity = (id, amount) => setCart((current) => current.map((item) => item.product.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0))
  const removeFromCart = (id) => setCart((current) => current.filter((item) => item.product.id !== id))
  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const beginCheckout = () => { if (cart.length) { setCartOpen(false); setCheckoutOpen(true) } }
  const scrollToMenu = () => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })

  return <div className="app-shell">
    <Navbar cartCount={cartCount} search={search} setSearch={setSearch} onCart={() => setCartOpen(true)} />
    <main>
      <Hero onExplore={scrollToMenu} />

      <section className="taste-strip" aria-label="Kokan Thali highlights"><div className="container taste-strip-inner"><span>COCONUT</span><i>✦</i><span>KOKUM</span><i>✦</i><span>MALVANI MASALA</span><i>✦</i><span>SEA SALT</span><i>✦</i><span>FAMILY RECIPES</span></div></section>

      <section className="menu-section section-pad" id="menu">
        <div className="container">
          <div className="section-heading menu-heading"><div><span className="section-kicker">FROM OUR KITCHEN</span><h2>Find your <em>coastal craving.</em></h2></div><p>Every dish starts with a story, a handful of spices and the kind of patience you can taste.</p></div>
          <CategoryFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />
          <div className="menu-toolbar"><span>{menuReady ? `${filteredProducts.length} dishes to savour` : 'Setting the table…'}</span><label className="sort-control">Sort by <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort menu"><option value="featured">Featured</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><ChevronDown size={15} /></label></div>
          {menuError ? <div className="empty-results"><div className="empty-icon"><UtensilsCrossed size={25} /></div><h3>Our menu needs another minute.</h3><p>Something interrupted the kitchen list. Try loading it again.</p><button className="button button-outline" onClick={() => { setMenuError(false); setMenuReady(false); window.setTimeout(() => setMenuReady(true), 350) }}>Try again <ArrowRight size={16} /></button></div> : !menuReady ? <div className="loading-grid" aria-label="Loading menu"><span /><span /><span /><span /></div> : filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} quantity={cart.find((item) => item.product.id === product.id)?.quantity || 0} favorite={favorites.includes(product.id)} onFavorite={toggleFavorite} onAdd={addToCart} onChangeQuantity={changeQuantity} />)}</div> : <div className="empty-results"><div className="empty-icon"><UtensilsCrossed size={25} /></div><h3>No dish quite matches that craving.</h3><p>Try a different search or browse all our coastal favourites.</p><button className="button button-outline" onClick={() => { setSearch(''); setActiveCategory('all') }}>Show all dishes <ArrowRight size={16} /></button></div>}
        </div>
      </section>

      <section className="story-section section-pad" id="story"><div className="container story-grid"><div className="story-visual"><div className="story-image" role="img" aria-label="Coastal Konkan ingredients and food served on banana leaves" /><div className="story-note"><span>कोकणातून प्रेमाने</span><small>With love from Konkan</small></div><div className="story-vertical">RATNAGIRI · 16°59′N</div></div><div className="story-copy"><span className="section-kicker">OUR STORY · 1987</span><h2>Some flavours<br /><em>feel like home.</em></h2><p className="story-lede">In our corner of the Konkan, food is never just food. It is a neighbour dropping off a bowl of curry, a grandmother grinding masala on a stone, and the first mango of summer shared around the table.</p><p>We cook with the generous spirit of coastal Maharashtra — bright kokum, creamy coconut, fragrant Malvani spices and the freshest catch the day brings. Each recipe is rooted in family, then finished with a little bit of our own wanderlust.</p><a className="text-link" href="#contact">Meet the people behind the plate <ArrowRight size={16} /></a><div className="story-stats"><div><strong>36+</strong><span>family recipes</span></div><div><strong>4.9</strong><span>average rating</span></div><div><strong>100%</strong><span>coastal soul</span></div></div></div></div></section>

      <section className="values-section section-pad"><div className="container"><div className="section-heading centered"><span className="section-kicker">WHY IT TASTES DIFFERENT</span><h2>Good food has <em>good roots.</em></h2><p>Thoughtful ingredients, generous portions and the warmth of a kitchen that wants you to stay a little longer.</p></div><div className="values-grid"><article className="value-card"><span className="value-number">01</span><div className="value-icon"><Leaf size={22} /></div><h3>Fresh from the coast</h3><p>Seasonal produce, fragrant herbs and responsibly sourced seafood, chosen for flavour first.</p></article><article className="value-card featured"><span className="value-number">02</span><div className="value-icon"><ChefHat size={22} /></div><h3>Recipes with memory</h3><p>Slow-ground masalas and family techniques that turn everyday meals into little celebrations.</p></article><article className="value-card"><span className="value-number">03</span><div className="value-icon"><Clock3 size={22} /></div><h3>Made when you order</h3><p>No shortcuts, no holding trays. Your thali starts its journey when you say “let’s eat”.</p></article></div></div></section>

      <section className="offer-section"><div className="container offer-card"><div className="offer-art"><span>क</span><span>O</span><span>क</span></div><div><span className="section-kicker light">WEEKEND SPECIAL · UNTIL SUNDAY</span><h2>Bring home a little<br /><em>more Konkan.</em></h2><p>Get a complimentary Kokum Sharbat with every order above ₹799 this weekend.</p><button className="button button-light" onClick={scrollToMenu}>Build your thali <ArrowRight size={17} /></button></div><div className="offer-stamp">FREE<br /><strong>KOKUM</strong><br />SHARBAT</div></div></section>

      <section className="reviews-section section-pad" id="reviews"><div className="container"><div className="section-heading"><div><span className="section-kicker">A FEW KIND WORDS</span><h2>Passed around<br /><em>with love.</em></h2></div><div className="review-score"><span className="stars">★★★★★</span><strong>4.9</strong><span>from 2,000+ thali lovers</span></div></div><div className="reviews-grid"><article className="review-card"><Quote size={24} /><p>“The fish thali tasted like a Sunday at my ajji’s house. That sol kadhi! I ordered again before I finished the first meal.”</p><div><strong>Meera P.</strong><span>Mumbai · regular since ’23</span></div></article><article className="review-card accent"><Quote size={24} /><p>“Finally a place that gets Malvani spice right. Everything arrived warm, fragrant and beautifully packed.”</p><div><strong>Rohan K.</strong><span>Pune · verified foodie</span></div></article><article className="review-card"><Quote size={24} /><p>“The veg thali is generous and comforting. You can feel the care in every little bowl.”</p><div><strong>Anushka S.</strong><span>Nashik · first-time order</span></div></article></div></div></section>

      <section className="final-cta"><div className="container final-cta-inner"><div><span className="section-kicker">READY WHEN YOU ARE</span><h2>Your table is<br /><em>waiting.</em></h2></div><button className="button button-primary" onClick={scrollToMenu}>Explore the menu <ArrowRight size={17} /></button><div className="final-sparkle"><Sparkles size={26} /></div></div></section>
    </main>
    <Footer />
    <CartDrawer open={cartOpen} items={cart} subtotal={subtotal} delivery={delivery} total={total} onClose={() => setCartOpen(false)} onChangeQuantity={changeQuantity} onRemove={removeFromCart} onCheckout={beginCheckout} />
    {checkoutOpen && <Checkout items={cart} subtotal={subtotal} delivery={delivery} total={total} onClose={() => setCheckoutOpen(false)} onClear={() => setCart([])} />}
  </div>
}
