import { ArrowRight, Minus, Plus, ShoppingBag, Sparkles, Trash2, Truck, X } from 'lucide-react'

const formatINR = (value) => `₹${value.toLocaleString('en-IN')}`

export default function CartDrawer({ open, items, subtotal, delivery, total, onClose, onChangeQuantity, onRemove, onCheckout }) {
  if (!open) return null
  return (
    <div className="drawer-layer" role="presentation" onClick={onClose}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-head"><div><span className="section-kicker">YOUR COASTAL SPREAD</span><h2 id="cart-title">Your thali <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Close cart"><X size={21} /></button></div>
        {items.length === 0 ? (
          <div className="empty-cart"><div className="empty-icon"><ShoppingBag size={28} /></div><h3>Your thali is waiting.</h3><p>Add a few coastal favourites and we’ll bring the Konkan home.</p><button className="button button-primary" onClick={onClose}>Browse the menu <ArrowRight size={17} /></button></div>
        ) : (
          <>
            <div className="free-delivery"><Truck size={16} /><span>{subtotal >= 499 ? 'You’ve unlocked free delivery!' : `Add ${formatINR(499 - subtotal)} more for free delivery`}</span></div>
            <div className="cart-items">{items.map(({ product, quantity }) => <div className="cart-item" key={product.id}><div className="cart-item-photo" style={{ backgroundImage: `url(${product.image || '/images/konkan-feast-collage.png'})`, backgroundPosition: product.position }} /><div className="cart-item-main"><div className="cart-item-top"><div><h3>{product.name}</h3><span>{formatINR(product.price)} each</span></div><button className="remove-button" onClick={() => onRemove(product.id)} aria-label={`Remove ${product.name}`}><Trash2 size={15} /></button></div><div className="cart-item-bottom"><div className="mini-quantity"><button onClick={() => onChangeQuantity(product.id, -1)} aria-label={`Decrease ${product.name}`}><Minus size={13} /></button><span>{quantity}</span><button onClick={() => onChangeQuantity(product.id, 1)} aria-label={`Increase ${product.name}`}><Plus size={13} /></button></div><strong>{formatINR(product.price * quantity)}</strong></div></div></div>)}</div>
            <div className="cart-summary"><div><span>Subtotal</span><strong>{formatINR(subtotal)}</strong></div><div><span>Delivery</span><strong className={delivery === 0 ? 'free-text' : ''}>{delivery === 0 ? 'FREE' : formatINR(delivery)}</strong></div><div className="summary-total"><span>Total to pay</span><strong>{formatINR(total)}</strong></div></div>
            <button className="checkout-button" onClick={onCheckout}>Continue to checkout <ArrowRight size={17} /></button><p className="cart-note"><Sparkles size={14} /> No real payment is processed in this prototype.</p>
          </>
        )}
      </aside>
    </div>
  )
}
