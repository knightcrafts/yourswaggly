/*
 * <buy-now-button data-variant-id="123"> ... <button>Buy Now</button> ... </buy-now-button>
 * Adds the given variant to the cart, then redirects to checkout.
 * Used by product cards for the "Buy Now" CTA (single-variant, available products only).
 */
if (!customElements.get('buy-now-button')) {
  customElements.define(
    'buy-now-button',
    class BuyNowButton extends HTMLElement {
      constructor() {
        super();
        this.button = this.querySelector('button');
        this.spinner = this.querySelector('.loading-overlay__spinner');
        if (this.button) {
          this.button.addEventListener('click', this.onClick.bind(this));
        }
      }

      onClick(event) {
        event.preventDefault();
        if (this.loading) return;
        const variantId = this.dataset.variantId;
        if (!variantId) return;
        this.setLoading(true);

        const body = new FormData();
        body.append('id', variantId);
        body.append('quantity', '1');

        const addUrl = (window.routes && window.routes.cart_add_url) || '/cart/add';

        fetch(addUrl, {
          method: 'POST',
          headers: { Accept: 'application/javascript', 'X-Requested-With': 'XMLHttpRequest' },
          body: body,
        })
          .then((response) => response.json())
          .then((data) => {
            // On error (e.g. just sold out) Shopify returns a `status` field — bail so the
            // shopper can fall back to Add to Cart rather than being sent to an empty checkout.
            if (data && data.status) {
              this.setLoading(false);
              return;
            }
            const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
            window.location.href = (root === '/' ? '' : root.replace(/\/$/, '')) + '/checkout';
          })
          .catch(() => this.setLoading(false));
      }

      setLoading(state) {
        this.loading = state;
        if (this.button) {
          this.button.classList.toggle('loading', state);
          this.button.setAttribute('aria-busy', state ? 'true' : 'false');
        }
        if (this.spinner) this.spinner.classList.toggle('hidden', !state);
      }
    }
  );
}
