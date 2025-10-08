# Shopify Theme Development

📦 your-theme/
├── 📁 assets/
│   ├── base.css
│   ├── custom.js
│   └── theme.js
│
├── 📁 config/
│   ├── settings_schema.json     # Defines theme settings (colors, typography, etc.)
│   └── settings_data.json       # Stores current settings selected in the editor
│
├── 📁 layout/
│   ├── theme.liquid             # Main HTML structure (header, footer, content_for_layout)
│   └── checkout.liquid          # Checkout page layout (if customized)
│
├── 📁 locales/
│   ├── en.default.json          # Text translations for default language
│   └── fr.json                  # Example: French translations
│
├── 📁 sections/
│   ├── header.liquid            # Reusable header section
│   ├── footer.liquid            # Footer section
│   ├── product-grid.liquid      # Product grid for collections
│   ├── product-template.liquid  # Single product layout
│   └── custom-section.liquid    # Example of a custom section
│
├── 📁 snippets/
│   ├── product-card.liquid      # Small reusable Liquid components
│   ├── social-links.liquid
│   └── icons.liquid
│
├── 📁 templates/
│   ├── index.json               # Homepage layout (uses sections)
│   ├── product.json             # Single product page
│   ├── collection.json          # Collection page
│   ├── page.contact.json        # Contact page template
│   ├── 404.json                 # Error page with animation
│   └── blog.json                # Blog listing page
│
├── 📁 customers/
│   ├── login.json
│   ├── register.json
│   └── account.json
│
└── README.md                    # Project documentation
