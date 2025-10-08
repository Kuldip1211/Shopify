<h2>📂 <span style="color:#f39c12;">Shopify Theme Folder Structure</span></h2>

<p>This structure follows <strong>Shopify Online Store 2.0</strong> standards, using <strong>Liquid</strong>, <strong>JSON templates</strong>, and modular <strong>sections</strong> for maximum customization and scalability.</p>

<pre>
📦 <span style="color:#e67e22;">your-theme/</span>
├── 📁 <span style="color:#f1c40f;">assets/</span>          
│   ├── 🎨 <strong>base.css</strong> – Global theme styling  
│   ├── ⚙️ <strong>custom.js</strong> – Custom JavaScript functionality  
│   └── 💡 <strong>theme.js</strong> – Shopify theme logic (dynamic scripts)
│
├── 📁 <span style="color:#f1c40f;">config/</span>          
│   ├── 🧩 <strong>settings_schema.json</strong> – Defines theme settings (colors, typography, etc.)  
│   └── 🧾 <strong>settings_data.json</strong> – Stores the current customization options selected by the user
│
├── 📁 <span style="color:#f1c40f;">layout/</span>          
│   ├── 🏗️ <strong>theme.liquid</strong> – Main HTML structure (header, footer, content)  
│   └── 💳 <strong>checkout.liquid</strong> – Checkout layout customization (optional)
│
├── 📁 <span style="color:#f1c40f;">locales/</span>         
│   ├── 🌐 <strong>en.default.json</strong> – Default English translation file  
│   └── 🇫🇷 <strong>fr.json</strong> – Example: French translation file
│
├── 📁 <span style="color:#f1c40f;">sections/</span>        
│   ├── 🧱 <strong>header.liquid</strong> – Reusable header section  
│   ├── 🧱 <strong>footer.liquid</strong> – Reusable footer section  
│   ├── 🛍️ <strong>product-grid.liquid</strong> – Displays product collections  
│   ├── 📦 <strong>product-template.liquid</strong> – Layout for single product details  
│   └── 🧩 <strong>custom-section.liquid</strong> – Example of a custom reusable section
│
├── 📁 <span style="color:#f1c40f;">snippets/</span>        
│   ├── 🧾 <strong>product-card.liquid</strong> – Small reusable component for products  
│   ├── 🔗 <strong>social-links.liquid</strong> – Social media link set  
│   └── 💠 <strong>icons.liquid</strong> – Common SVG icon definitions
│
├── 📁 <span style="color:#f1c40f;">templates/</span>       
│   ├── 🏠 <strong>index.json</strong> – Homepage layout (uses multiple sections)  
│   ├── 🛒 <strong>product.json</strong> – Single product page template  
│   ├── 🗂️ <strong>collection.json</strong> – Collection page layout  
│   ├── 📞 <strong>page.contact.json</strong> – Contact page layout  
│   ├── 🚫 <strong>404.json</strong> – Animated “Not Found” page  
│   └── 📰 <strong>blog.json</strong> – Blog listing page
│
├── 📁 <span style="color:#f1c40f;">customers/</span>       
│   ├── 🔐 <strong>login.json</strong> – Customer login page  
│   ├── 🧾 <strong>register.json</strong> – Registration page  
│   └── 👤 <strong>account.json</strong> – Customer account dashboard
│
└── 📄 <span style="color:#7f8c8d;">README.md</span> – Project documentation and setup guide
</pre>

<hr/>

<h3>✨ Summary</h3>
<ul>
  <li>🧩 <strong>Modular Design:</strong> Build reusable, customizable sections for flexibility.</li>
  <li>⚙️ <strong>JSON Templates:</strong> Enable dynamic page layouts for different store pages.</li>
  <li>🎨 <strong>Customizable:</strong> Fully editable through Shopify Theme Editor (colors, fonts, layout).</li>
  <li>🌍 <strong>Multilingual:</strong> Localized text support with JSON translation files.</li>
</ul>

<p>💡 <em>This structure ensures scalability, reusability, and easy customization for Shopify Online Store 2.0 themes.</em></p>

<h2>🧾 <span style="color:#f39c12;">Shopify JSON Template Structure</span></h2>

<p>Shopify Online Store 2.0 introduced <strong>JSON templates</strong> for flexible page layouts.  
Each template defines which <strong>sections</strong> appear on a page and in what order, allowing easy customization directly from the Shopify theme editor.</p>

<pre>
📁 <span style="color:#f1c40f;">/templates</span>
├── 🏠 <strong>index.json</strong>         → Homepage layout
├── 🛍️ <strong>product.json</strong>       → Product details page
├── 🗂️ <strong>collection.json</strong>    → Collection page
├── 📞 <strong>page.contact.json</strong>  → Contact page layout
├── 🚫 <strong>404.json</strong>           → Error / Not Found page
└── 📰 <strong>blog.json</strong>          → Blog listing page
</pre>

<hr />

<h3>🧩 <span style="color:#27ae60;">JSON Template Example</span></h3>

<p>Here’s an example of a <code>product.json</code> file:</p>

<pre><code class="language-json">
{
  "sections": {
    "main-product": {
      "type": "product-template",
      "settings": {
        "show_vendor": true,
        "enable_zoom": false,
        "show_quantity_selector": true
      }
    },
    "related-products": {
      "type": "product-grid",
      "settings": {
        "heading": "You may also like",
        "product_limit": 4
      }
    }
  },
  "order": ["main-product", "related-products"]
}
</code></pre>

<hr />

<h3>🧠 <span style="color:#2980b9;">Key Parameters Explained</span></h3>

<ul>
  <li>
    <strong>🧱 sections</strong> – Defines all the sections used on this page.  
    Each section is represented by a unique <em>key</em> (like
    <code>main-product</code>) with:
    <ul>
      <li>
        <strong>type</strong>: Refers to a Liquid file inside the
        <code>/sections</code> folder (e.g., <code>product-template.liquid</code>).
      </li>
      <li>
        <strong>settings</strong>: Contains key-value pairs that control that
        section’s behavior (visibility, layout, titles, etc.).
      </li>
    </ul>
  </li>

  <li>
    <strong>📜 order</strong> – Determines the vertical order of sections as
    they appear on the page.  
    It’s an array of section keys (e.g., <code>["main-product", "related-products"]</code>).
  </li>

  <li>
    <strong>🎛️ settings</strong> – Controls customizable options available for
    each section, defined in the corresponding Liquid file using the
    <code>{% schema %}</code> tag.
  </li>

  <li>
    <strong>📦 type</strong> – References the section file name inside the
    <code>/sections</code> directory.  
    For example, <code>"type": "product-grid"</code> →
    <code>sections/product-grid.liquid</code>.
  </li>
</ul>

<hr />

<h3>✨ <span style="color:#9b59b6;">Why JSON Templates Are Powerful</span></h3>

<ul>
  <li>
    ⚙️ <strong>Dynamic Layouts:</strong> Create different layouts for any page
    type.
  </li>
  <li>
    🧩 <strong>Reusable Sections:</strong> The same section can be used across
    multiple templates.
  </li>
  <li>
    🎨 <strong>Visual Customization:</strong> Modify layouts directly from the
    Shopify theme editor — no code required.
  </li>
  <li>
    🚀 <strong>Performance Optimized:</strong> JSON templates load only
    necessary sections for each page.
  </li>
</ul>

<p>
  💡
  <em>
    In short, JSON templates define your page structure, control layout
    flexibility, and make your Shopify theme fully modular.
  </em>
</p>


# <h2>⚙️ <span style="color:#f39c12;">Shopify Theme Settings (settings_schema.json)</span></h2>

<p>
  The <code>settings_schema.json</code> file defines all the <strong>customization options</strong> that appear in the Shopify Theme Editor.
  These settings allow merchants to modify theme styles, colors, fonts, and other configurations visually — without touching any code.
</p>

<pre>
📁 <span style="color:#f1c40f;">/config/settings_schema.json</span>
</pre>

<hr/>

<h3>🧩 <span style="color:#27ae60;">Example: settings_schema.json</span></h3>

<pre><code class="language-json">
[
  {
    "name": "Theme Settings",
    "settings": [
      {
        "type": "color",
        "id": "bg_color",
        "label": "Background Color",
        "default": "#ffffff"
      },
      {
        "type": "font_picker",
        "id": "heading_font",
        "label": "Heading Font",
        "default": "poppins"
      },
      {
        "type": "text",
        "id": "welcome_text",
        "label": "Welcome Message",
        "default": "Welcome to our store!"
      }
    ]
  }
]
</code></pre>

<hr/>

<h3>🧠 <span style="color:#2980b9;">Key Parameters Explained</span></h3>

<ul>
  <li>
    <strong>📛 name</strong> – The title of the settings group that appears in the Shopify Customizer sidebar.
    Example: <code>Theme Settings</code>.
  </li>

  <li>
    <strong>⚙️ type</strong> – Determines the type of input field shown in the editor.
    <br/>
    Common types include:
    <ul>
      <li><code>color</code> → Color picker field</li>
      <li><code>font_picker</code> → Font selector dropdown</li>
      <li><code>text</code> → Single-line text field</li>
      <li><code>textarea</code> → Multi-line text input</li>
      <li><code>image_picker</code> → Upload image field</li>
      <li><code>checkbox</code> → Toggle on/off option</li>
      <li><code>select</code> → Dropdown menu with options</li>
      <li><code>range</code> → Slider for numeric values</li>
    </ul>
  </li>

  <li>
    <strong>🆔 id</strong> – A unique identifier for the setting.
    This is used in Liquid files to retrieve its value (e.g., <code>settings.bg_color</code>).
  </li>

  <li>
    <strong>🏷️ label</strong> – The human-readable name shown in the Shopify theme editor UI.
  </li>

  <li>
    <strong>🎨 default</strong> – The default value applied when the theme is first installed.
  </li>
</ul>

<hr/>

<h3>💻 <span style="color:#8e44ad;">How to Access Settings in Liquid</span></h3>

<p>You can access these settings in any <code>.liquid</code> file using the <strong><code>settings</code></strong> object.</p>

<pre><code class="language-liquid">
<!-- Example: Using values from settings_schema.json -->

<style>
  body {
    background-color: {{ settings.bg_color }};
    font-family: {{ settings.heading_font }};
  }
</style>

<h2 style="font-family: {{ settings.heading_font }};">
  {{ settings.welcome_text }}
</h2>
</code></pre>

<hr/>

<h3>🧩 <span style="color:#16a085;">Connecting Settings to Sections</span></h3>

<p>Settings defined globally in <code>settings_schema.json</code> apply across the entire theme.  
For page-specific or section-level customization, use the <code>{% schema %}</code> tag inside individual <strong>section</strong> files.</p>

<pre><code class="language-liquid">
<!-- Example inside sections/header.liquid -->
{% schema %}
{
  "name": "Header Section",
  "settings": [
    {
      "type": "text",
      "id": "header_title",
      "label": "Header Title",
      "default": "Welcome to Our Store"
    }
  ]
}
{% endschema %}

<!-- Access it in Liquid -->
<h1>{{ section.settings.header_title }}</h1>
</code></pre>

<hr/>

<h3>✨ <span style="color:#9b59b6;">Why settings_schema.json Is Important</span></h3>

<ul>
  <li>🎨 <strong>Visual Editing:</strong> Makes your theme fully editable from the Shopify Theme Editor.</li>
  <li>🧩 <strong>Reusable Design:</strong> Centralized configuration for global theme styles and branding.</li>
  <li>⚙️ <strong>Dynamic Rendering:</strong> Theme instantly adapts when merchants change settings.</li>
  <li>🚀 <strong>User-Friendly:</strong> Empowers non-developers to customize the store design visually.</li>
</ul>

<p>
  💡 <em>In short, <code>settings_schema.json</code> defines all editable theme settings, connects them to Liquid files, and makes your Shopify theme dynamic, customizable, and user-friendly.</em>
</p>

<h1 align="center">🛠️ Shopify Theme Debugging & Troubleshooting Guide</h1>

<p align="center">
  A comprehensive guide on how to effectively debug, analyze, and troubleshoot Shopify themes and Liquid code.
</p>

---

<h2>📘 1. Using Browser Developer Tools Effectively</h2>

<p>
Browser Developer Tools (especially <b>Chrome DevTools</b>) are essential for inspecting, debugging, and testing Shopify themes.
</p>

<ul>
  <li><b>Inspect Elements:</b> Right-click → “Inspect” to view HTML structure and CSS rules.  
    Use <code>Ctrl + Shift + C</code> to quickly select elements on the page.
  </li>
  <li><b>Network Tab:</b> Monitor AJAX calls, API responses, and asset requests.  
    Detect missing files (404) or failed requests (500).
  </li>
  <li><b>Console Tab:</b> Identify JavaScript errors and warnings in real time.  
    Use <code>console.log()</code> inside your <code>theme.js</code> or custom scripts.
  </li>
  <li><b>Sources Tab:</b> Set breakpoints and debug JS step by step.</li>
  <li><b>Lighthouse Audits:</b> Test site performance, accessibility, and SEO using the built-in audit tool.</li>
</ul>

---

<h2>💧 2. Debugging Liquid Code and Theme Issues</h2>

<p>
Liquid is the backbone of Shopify themes. Errors here can cause sections to break or data to not render correctly.
</p>

<ul>
  <li><b>Conditional Debugging:</b>  
    Use Liquid conditionals to isolate code:
    <pre><code>{% if product %}{{ product.title }}{% else %}No product found{% endif %}</code></pre>
  </li>
  <li><b>Output Debug Info:</b>  
    Convert data to JSON for inspection:
    <pre><code>{{ section.settings | json }}</code></pre>
  </li>
  <li><b>Safe Commenting:</b>  
    Liquid comments: <code>{% comment %}...{% endcomment %}</code>  
    HTML comments: <code>&lt;!-- ... --&gt;</code>
  </li>
  <li><b>Fix Missing Sections:</b>  
    JSON templates require valid section references:
    <pre><code>{
  "sections": {
    "main": { "type": "section-file-name" }
  },
  "order": ["main"]
}</code></pre>
  </li>
  <li><b>Use Preview Mode:</b>  
    From Shopify Admin → <b>Online Store → Themes → Customize → Preview</b>.</li>
</ul>

---

<h2>📜 3. Analyzing Error Logs and Console Messages</h2>

<p>
Understanding logs helps trace theme or app conflicts effectively.
</p>

<ul>
  <li><b>Console Errors:</b>  
    JavaScript or Liquid-related issues appear here.  
    Example:
    <pre><code>Uncaught TypeError: Cannot read property 'value' of null</code></pre>
  </li>
  <li><b>Network Tab:</b>  
    Inspect failed requests (404, 500, 403).  
    Check for missing section assets or invalid API calls.
  </li>
  <li><b>Shopify Activity Logs:</b>  
    Navigate to <b>Settings → Notifications → Activity Log</b> for theme or staff activity tracking.</li>
  <li><b>App Logs:</b>  
    Many Shopify apps have internal log pages.  
    Check “Apps → [App Name] → Logs”.</li>
</ul>

---

<h2>🧭 4. Utilizing Shopify’s Built-in Debugging Tools</h2>

<p>
Shopify offers a powerful CLI and static analysis tools to catch errors before deployment.
</p>

<ul>
  <li><b>Shopify CLI (Local Development):</b>  
    Run and preview your theme locally:
    <pre><code>shopify theme dev</code></pre>
    - Displays Liquid and syntax errors in terminal.  
    - Auto-reloads browser on file changes.
  </li>
  <li><b>Theme Check:</b>  
    Scan your code for best practices and syntax issues:
    <pre><code>shopify theme check</code></pre>
    Detects deprecated tags, schema errors, and invalid Liquid syntax.
  </li>
  <li><b>Theme Editor (Customize):</b>  
    Use the live <b>Customize</b> editor to preview and debug sections visually.
  </li>
</ul>

---

<h2>🧩 5. Troubleshooting Common Theme & App Problems</h2>

<p>
Common theme and app-related issues can often be fixed by isolating their causes step by step.
</p>

<table>
  <tr>
    <th>Issue</th>
    <th>Possible Cause</th>
    <th>Fix</th>
  </tr>
  <tr>
    <td>Section not displaying</td>
    <td>Section file not linked in template</td>
    <td>Add <code>{% section 'file-name' %}</code> or update JSON template mapping</td>
  </tr>
  <tr>
    <td>Styles not loading</td>
    <td>Wrong asset path</td>
    <td>Use <code>{{ 'style.css' | asset_url | stylesheet_tag }}</code></td>
  </tr>
  <tr>
    <td>JavaScript not working</td>
    <td>DOM not loaded before execution</td>
    <td>Wrap in <code>DOMContentLoaded</code> event or move script to end of <code>&lt;body&gt;</code></td>
  </tr>
  <tr>
    <td>App block not showing</td>
    <td>App embed not enabled</td>
    <td>Go to “Customize → App Embeds” and enable it</td>
  </tr>
</table>

---

<h2>🚀 Recommended Debugging Workflow</h2>

<ol>
  <li>Open your Shopify store → Launch DevTools → Check Console & Network.</li>
  <li>Run <code>shopify theme dev</code> for local development and live error logging.</li>
  <li>Use <code>shopify theme check</code> before pushing updates.</li>
  <li>Test section visibility in Preview mode.</li>
  <li>Use Lighthouse audits to improve performance and fix accessibility issues.</li>
</ol>

---

<h3 align="center">💡 Pro Tip:</h3>

<p align="center">
Combine DevTools + Shopify CLI + Theme Check for a complete debugging workflow.  
It helps detect both frontend and backend (Liquid) issues quickly and efficiently.
</p>

---

<p align="center">
  <b>Author:</b> Kuldeep Chudasama<br>
  <b>Project:</b> Shopify Theme Development<br>
  <b>Last Updated:</b> October 2025
</p>
