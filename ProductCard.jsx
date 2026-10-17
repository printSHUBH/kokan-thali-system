import { Check, Heart, Minus, Plus, Star } from 'lucide-react'

const formatINR = (value) => `₹${value}`

export default function ProductCard({ product, quantity, favorite, onFavorite, onAdd, onChangeQuantity }) {
  return (
    <article className="product-card">
      <div className="product-photo-wrap">
        <div className="product-photo" role="img" aria-label={`${product.name} food photograph`} style={{ backgroundImage: `url(${product.image || '/images/konkan-feast-collage.png'})`, backgroundPosition: product.position }} />
        <div className="photo-overlay" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={() => onFavorite(product.id)} aria-label={`${favorite ? 'Remove' : 'Add'} ${product.name} ${favorite ? 'from' : 'to'} favourites`}>
          <Heart size={17} fill={favorite ? 'currentColor' : 'none'} />
        </button>
        <span className={`diet-marker ${product.veg ? 'veg' : 'nonveg'}`} title={product.veg ? 'Vegetarian' : 'Non-vegetarian'}>{product.veg ? 'V' : 'N'}</span>
      </div>
      <div className="product-body">
        <div className="product-title-row"><h3>{product.name}</h3><span className="product-time">{product.time}</span></div>
        <p>{product.description}</p>
        <div className="product-meta"><span className="product-rating"><Star size={13} fill="currentColor" /> {product.rating}</span><span className="product-price">{formatINR(product.price)}</span></div>
        {quantity > 0 ? (
          <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
            <button onClick={() => onChangeQuantity(product.id, -1)} aria-label={`Decrease ${product.name}`}><Minus size={15} /></button>
            <span>{quantity} in your thali</span>
            <button onClick={() => onChangeQuantity(product.id, 1)} aria-label={`Increase ${product.name}`}><Plus size={15} /></button>
          </div>
        ) : (
          <button className="add-button" onClick={() => onAdd(product)}><span>Add to thali</span><Plus size={17} /></button>
        )}
        {quantity > 0 && <span className="added-note"><Check size={13} /> Added to your thali</span>}
      </div>
    </article>
  )
}
