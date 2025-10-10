# 🛍️ **Shopify APIs — Concepts & Examples**

> Concise explanations with sample requests and code snippets.  
> This guide covers key Shopify API concepts — REST, GraphQL, Store Data, Inventory, Orders, Webhooks, and the Cart API.

---

## ⚙️ **Understanding Shopify’s REST and GraphQL APIs**

Shopify exposes two primary APIs for apps and integrations:

- **REST Admin API** — Resource-centered endpoints.  
- **Storefront & Admin GraphQL APIs** — Single endpoint with flexible queries.

---

### 🔹 **REST Admin API**
- Familiar pattern: `GET / POST / PUT / DELETE` resource URLs  
- Great for simple CRUD operations and fixed endpoints  
- Example:  


<!-- ============================================================ -->
<!-- 🔹 GraphQL Admin / Storefront API Section -->
<!-- ============================================================ -->

<section style="font-family: 'Poppins', sans-serif; background: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0;">

  <h3 style="color:#0b5cff; font-size:22px; margin-bottom:12px;">🔹 <strong>GraphQL Admin / Storefront API</strong></h3>

  <ul style="line-height:1.8; color:#333; font-size:15px; margin-left:20px;">
    <li>Single endpoint — clients request <em>only</em> the data they need.</li>
    <li>More efficient for nested data (e.g., <strong>Product → Variants → Inventory</strong>).</li>
    <li>Example: Fetch product title and variants in one query.</li>
  </ul>

  <hr style="margin:20px 0; border:0; border-top:1px solid #cbd5e1;">

  <div style="background-color:#1e293b; color:#e2e8f0; padding:16px; border-radius:10px; font-family:'Courier New', monospace; font-size:14px; overflow-x:auto;">
    <p><strong># REST Example</strong></p>
    <pre style="margin:0;">
curl -X GET "https://{shop}.myshopify.com/admin/api/2025-07/products.json" \
-H "X-Shopify-Access-Token: {access_token}"
    </pre>

    <p style="margin-top:14px;"><strong># GraphQL Example</strong></p>
    <pre style="margin:0;">
curl -X POST "https://{shop}.myshopify.com/admin/api/2025-07/graphql.json" \
-H "X-Shopify-Access-Token: {access_token}" \
-H "Content-Type: application/json" \
-d '{"query":"{ product(id: \"gid://shopify/Product/1234567890\") { title variants(first:5){ edges{ node{ id title } } } } }"}'
    </pre>
  </div>

  <h4 style="color:#0b5cff; margin-top:25px;">🧭 Retrieving and Modifying Store Data</h4>
  <p style="color:#374151; line-height:1.7; font-size:15px;">
    Using authenticated requests (<strong>API key / Access token</strong>), you can read or modify data such as 
    <strong>products</strong>, <strong>customers</strong>, <strong>metafields</strong>, and <strong>orders</strong>.<br>
    Use <strong>REST</strong> for direct updates, and <strong>GraphQL</strong> for bundled read/write operations.
  </p>

</section>




<!-- ============================================================ -->
<!-- 🛠️ Shopify API — Product Updates and Inventory Management -->
<!-- ============================================================ -->

<section style="font-family: 'Poppins', sans-serif; background: #f9fafb; padding: 30px; border-radius: 12px; border: 1px solid #e5e7eb;">

  <h2 style="color:#0b5cff; font-size:24px; margin-bottom:20px;">🛠️ Update Product Data — REST & GraphQL</h2>

  <h3 style="color:#16a34a; font-size:18px;">✅ REST — Update Product Title</h3>

  <div style="background-color:#1e293b; color:#e2e8f0; padding:16px; border-radius:10px; font-family:'Courier New', monospace; font-size:14px; overflow-x:auto;">
    <pre style="margin:0;">
curl -X PUT "https://{shop}.myshopify.com/admin/api/2025-07/products/123456789.json" \
 -H "X-Shopify-Access-Token: {access_token}" \
 -H "Content-Type: application/json" \
 -d '{"product": {"id":123456789, "title":"New Product Title"}}'
    </pre>
  </div>

  <h3 style="color:#16a34a; font-size:18px; margin-top:24px;">✅ GraphQL — Update Product Title</h3>

  <div style="background-color:#1e293b; color:#e2e8f0; padding:16px; border-radius:10px; font-family:'Courier New', monospace; font-size:14px; overflow-x:auto;">
    <pre style="margin:0;">
mutation {
  productUpdate(input:{
    id:"gid://shopify/Product/1234567890", 
    title:"New Product Title"
  }) {
    product { id title }
    userErrors { field message }
  }
}
    </pre>
  </div>

  <hr style="margin:30px 0; border:0; border-top:1px solid #cbd5e1;">

  <h2 style="color:#0b5cff; font-size:22px;">📦 Managing Inventory, Products, and Collections</h2>

  <h4 style="color:#111827; margin-top:16px; font-size:17px;">🔑 <strong>Key Concepts</strong></h4>
  
  <ul style="line-height:1.8; color:#374151; font-size:15px; margin-left:25px;">
    <li><strong>Products & Variants:</strong> A product contains one or more variants — each variant has its own <code>SKU</code>, <code>price</code>, and <code>inventory link</code>.</li>
    <li><strong>Inventory:</strong> Inventory data is managed via <code>InventoryItem</code> and <code>InventoryLevel</code>, which connect inventory quantities to a <strong>location</strong>.</li>
    <li><strong>Collections:</strong> Collections group products together — they can be 
      <strong>Smart Collections</strong> (rule-based, auto-updated) or 
      <strong>Custom Collections</strong> (manually curated).
    </li>
  </ul>

  <p style="color:#334155; font-size:15px; margin-top:12px;">
    Shopify’s Admin and Storefront APIs allow seamless access to manage and sync inventory, 
    product metadata, and pricing data — ideal for building automation tools or eCommerce dashboards.
  </p>

</section>

<!-- ============================================================ -->
<!-- ⚙️ Shopify API — Inventory, Collections & Orders Management -->
<!-- ============================================================ -->

<section style="font-family:'Poppins', sans-serif; background:#f9fafb; padding:30px; border-radius:12px; border:1px solid #e5e7eb;">

  <h2 style="color:#0b5cff; font-size:24px; margin-bottom:20px;">⚙️ Inventory, Collections & Orders Management</h2>

  <!-- 🧮 Adjust Inventory -->
  <h3 style="color:#16a34a; font-size:18px;">🧮 Adjust Inventory Level (REST)</h3>

  <div style="background-color:#1e293b; color:#e2e8f0; padding:16px; border-radius:10px; font-family:'Courier New', monospace; font-size:14px; overflow-x:auto;">
    <pre style="margin:0;">
curl -X POST "https://{shop}.myshopify.com/admin/api/2025-07/inventory_levels/adjust.json" \
 -H "X-Shopify-Access-Token: {access_token}" \
 -H "Content-Type: application/json" \
 -d '{"location_id": 12345, "inventory_item_id": 678901, "available_adjustment": 5 }'
    </pre>
  </div>

  <p style="color:#374151; font-size:15px; margin-top:10px;">
    This API call adjusts available inventory for a given product variant at a specific <strong>location</strong>.
    Positive values increase stock, negative values decrease it.
  </p>

  <hr style="margin:25px 0; border:0; border-top:1px solid #cbd5e1;">

  <!-- 🪄 Custom Collection -->
  <h3 style="color:#16a34a; font-size:18px;">🪄 Create a Custom Collection (REST)</h3>

  <div style="background-color:#1e293b; color:#e2e8f0; padding:16px; border-radius:10px; font-family:'Courier New', monospace; font-size:14px; overflow-x:auto;">
    <pre style="margin:0;">
curl -X POST "https://{shop}.myshopify.com/admin/api/2025-07/custom_collections.json" \
 -H "X-Shopify-Access-Token: {access_token}" \
 -H "Content-Type: application/json" \
 -d '{"custom_collection": {"title":"Spring Sale"}}'
    </pre>
  </div>

  <p style="color:#374151; font-size:15px; margin-top:10px;">
    Custom collections are manually created groups of products, useful for curated categories like <em>"Spring Sale"</em> or <em>"Featured Items"</em>.
  </p>

  <hr style="margin:25px 0; border:0; border-top:1px solid #cbd5e1;">

  <!-- 💰 Orders and Payments -->
  <h2 style="color:#0b5cff; font-size:22px;">💰 Processing Orders and Payments Programmatically</h2>

  <p style="color:#334155; line-height:1.8; font-size:15px;">
    Orders can be created, retrieved, and updated using the <strong>Admin API</strong>.  
    Payment operations are handled via <strong>Shopify Payments</strong> or third-party gateways.  
    Apps can authorize, capture, or refund payments depending on their permissions and payment provider settings.
  </p>

  <h3 style="color:#16a34a; font-size:18px; margin-top:15px;">🧾 Create an Order (REST)</h3>

  <div style="background-color:#1e293b; color:#e2e8f0; padding:16px; border-radius:10px; font-family:'Courier New', monospace; font-size:14px; overflow-x:auto;">
    <pre style="margin:0;">
curl -X POST "https://{shop}.myshopify.com/admin/api/2025-07/orders.json" \
 -H "X-Shopify-Access-Token: {access_token}" \
 -H "Content-Type: application/json" \
 -d '{"order": {"line_items":[{"variant_id":1111,"quantity":1}], "customer": {"id":2222}} }'
    </pre>
  </div>

  <p style="color:#374151; font-size:15px; margin-top:10px;">
    The above request creates a new order for a customer by specifying <strong>variant IDs</strong> and <strong>quantities</strong>.  
    You can later manage fulfillment, invoices, and payment capture through the same API.
  </p>

</section>

<!-- ============================================================ -->
<!-- 💸 Shopify API — Refunds, Webhooks, Cart API & Best Practices -->
<!-- ============================================================ -->

<section style="font-family:'Poppins', sans-serif; background:#f9fafb; padding:30px; border-radius:12px; border:1px solid #e5e7eb;">

  <h2 style="color:#0b5cff; font-size:24px; margin-bottom:20px;">💸 Refund an Order</h2>

  <div style="background-color:#1e293b; color:#e2e8f0; padding:16px; border-radius:10px; font-family:'Courier New', monospace; font-size:14px; overflow-x:auto;">
    <pre style="margin:0;">
curl -X POST "https://{shop}.myshopify.com/admin/api/2025-07/orders/{order_id}/refunds.json" \
 -H "X-Shopify-Access-Token: {access_token}" \
 -H "Content-Type: application/json" \
 -d '{"refund": {"shipping": {"amount":"5.00"}, "refund_line_items":[ ... ] }}'
    </pre>
  </div>

  <p style="color:#374151; font-size:15px; margin-top:10px;">
    Use this endpoint to issue partial or full refunds for an order.  
    Refunds include optional <strong>shipping refunds</strong> and <strong>line item adjustments</strong>.
  </p>

  <hr style="margin:25px 0; border:0; border-top:1px solid #cbd5e1;">

  <h2 style="color:#0b5cff; font-size:22px;">🔔 Webhooks and Event-Driven Integration</h2>

  <p style="color:#334155; font-size:15px; line-height:1.7;">
    Webhooks notify your app when key events occur — for example:  
    <code>orders/create</code>, <code>products/update</code>, or <code>app/uninstalled</code>.  
    Always verify HMAC signatures, handle retries safely, and respond quickly with <strong>HTTP 200 OK</strong>.
  </p>

  <h3 style="color:#16a34a; font-size:18px;">📨 Register a Webhook (REST)</h3>

  <div style="background-color:#1e293b; color:#e2e8f0; padding:16px; border-radius:10px; font-family:'Courier New', monospace; font-size:14px; overflow-x:auto;">
    <pre style="margin:0;">
curl -X POST "https://{shop}.myshopify.com/admin/api/2025-07/webhooks.json" \
 -H "X-Shopify-Access-Token: {access_token}" \
 -H "Content-Type: application/json" \
 -d '{"webhook": {"topic":"orders/create","address":"https://your-app.com/webhooks/orders_create","format":"json"}}'
    </pre>
  </div>

  <h3 style="color:#16a34a; font-size:18px; margin-top:25px;">⚙️ Webhook Handler (Node.js / Express Example)</h3>

  <div style="background-color:#1e293b; color:#e2e8f0; padding:16px; border-radius:10px; font-family:'Courier New', monospace; font-size:14px; overflow-x:auto;">
    <pre style="margin:0;">
// Verify HMAC, parse JSON, then process
app.post('/webhooks/orders_create', (req, res) => {
  const hmac = req.headers['x-shopify-hmac-sha256'];
  // Compute local HMAC with your app secret and compare
  // Process order payload
  res.status(200).send('OK');
});
    </pre>
  </div>

  <hr style="margin:30px 0; border:0; border-top:1px solid #cbd5e1;">

  <h2 style="color:#0b5cff; font-size:22px;">🛒 Working with the Cart API</h2>

  <p style="color:#374151; line-height:1.7; font-size:15px;">
    The Cart API lets you dynamically manage the shopping cart on the storefront — without reloading the page.  
    Ideal for implementing <strong>AJAX carts</strong>, <strong>dynamic add-to-cart</strong> features, and <strong>custom checkout flows</strong>.
  </p>

  <h3 style="color:#16a34a; font-size:18px;">➕ Add Item to Cart (AJAX)</h3>

  <div style="background-color:#1e293b; color:#e2e8f0; padding:16px; border-radius:10px; font-family:'Courier New', monospace; font-size:14px; overflow-x:auto;">
    <pre style="margin:0;">
// POST /cart/add.js
fetch('/cart/add.js', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ items: [{ id: 123456789, quantity: 1 }] })
})
.then(r => r.json())
.then(cartItem => console.log('Added:', cartItem));
    </pre>
  </div>

  <h3 style="color:#16a34a; font-size:18px; margin-top:25px;">📋 Get Cart JSON</h3>

  <div style="background-color:#1e293b; color:#e2e8f0; padding:16px; border-radius:10px; font-family:'Courier New', monospace; font-size:14px; overflow-x:auto;">
    <pre style="margin:0;">
fetch('/cart.js')
  .then(r => r.json())
  .then(cart => {
    console.log(cart.items, cart.total_price);
  });
    </pre>
  </div>

  <hr style="margin:30px 0; border:0; border-top:1px solid #cbd5e1;">

  <h2 style="color:#0b5cff; font-size:22px;">💡 Quick Best-Practice Tips</h2>

  <ul style="line-height:1.8; color:#374151; font-size:15px; margin-left:25px;">
    <li>✅ Always secure API calls — use OAuth or private app tokens with HTTPS.</li>
    <li>✅ Verify webhooks with HMAC to prevent spoofed requests.</li>
    <li>⚡ Use GraphQL to minimize API calls and fetch nested data efficiently.</li>
    <li>📊 Respect rate limits (<strong>REST</strong> = call-based, <strong>GraphQL</strong> = cost-based).</li>
    <li>🔁 Design idempotent webhook handlers — Shopify may retry failed ones.</li>
  </ul>

  <hr style="margin:30px 0; border:0; border-top:1px solid #cbd5e1;">

  <h2 style="color:#0b5cff; font-size:22px;">📘 Prepared for Shopify API Learners</h2>

  <p style="color:#334155; font-size:15px; line-height:1.8;">
    Use this README as a concise reference guide to understand, test, and build Shopify integrations efficiently.  
    Perfect for developers exploring <strong>Shopify App</strong> or <strong>Theme Development</strong> with <strong>REST</strong> and <strong>GraphQL</strong> APIs.  
    Includes real-world examples for products, orders, inventory, collections, webhooks, and carts.
  </p>

</section>
