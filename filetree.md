# File Tree: paytm

**Generated:** 2/5/2026, 1:27:06 PM
**Root Path:** `/home/aaditya/workspace/dev/projects/paytm`

```
├── 📁 .github
│   └── 📁 workflows
│       ├── ⚙️ build.yml
│       └── ⚙️ deploy.yml
├── 📁 apps
│   ├── 📁 bank-webhook
│   │   ├── 📁 src
│   │   │   └── 📄 index.ts
│   │   ├── ⚙️ package.json
│   │   ├── ⚙️ tsconfig.json
│   │   └── ⚙️ vercel.json
│   ├── 📁 mock-bank
│   │   ├── 📁 app
│   │   │   ├── 📁 lib
│   │   │   │   └── 📁 actions
│   │   │   │       └── 📄 verifyOnramps.ts
│   │   │   ├── 📁 netbanking
│   │   │   │   └── 📁 [id]
│   │   │   │       └── 📄 page.tsx
│   │   │   ├── 📄 favicon.ico
│   │   │   ├── 🎨 globals.css
│   │   │   ├── 📄 layout.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 components
│   │   │   └── 📄 verifyTpin.tsx
│   │   ├── 📁 public
│   │   │   ├── 🖼️ circles.svg
│   │   │   ├── 🖼️ next.svg
│   │   │   ├── 🖼️ turborepo.svg
│   │   │   └── 🖼️ vercel.svg
│   │   ├── ⚙️ .gitignore
│   │   ├── 📝 README.md
│   │   ├── 📄 eslint.config.js
│   │   ├── 📄 next-env.d.ts
│   │   ├── 📄 next.config.ts
│   │   ├── ⚙️ package.json
│   │   ├── 📄 postcss.config.js
│   │   ├── 📄 tailwind.config.ts
│   │   └── ⚙️ tsconfig.json
│   └── 📁 user-app
│       ├── 📁 app
│       │   ├── 📁 (dashboard)
│       │   │   ├── 📁 account
│       │   │   │   └── 📄 page.tsx
│       │   │   ├── 📁 dashboard
│       │   │   │   └── 📄 page.tsx
│       │   │   ├── 📁 p2p
│       │   │   │   └── 📄 page.tsx
│       │   │   ├── 📁 transfer
│       │   │   │   └── 📄 page.tsx
│       │   │   └── 📄 layout.tsx
│       │   ├── 📁 api
│       │   │   ├── 📁 auth
│       │   │   │   ├── 📁 [...nextauth]
│       │   │   │   │   └── 📄 route.ts
│       │   │   │   └── 📁 signup
│       │   │   │       └── 📄 route.ts
│       │   │   └── 📁 user
│       │   │       └── 📄 route.ts
│       │   ├── 📁 auth
│       │   │   ├── 📁 signin
│       │   │   │   └── 📄 page.tsx
│       │   │   └── 📁 signup
│       │   │       └── 📄 page.tsx
│       │   ├── 📁 lib
│       │   │   ├── 📁 actions
│       │   │   │   ├── 📄 onRampTransaction.ts
│       │   │   │   ├── 📄 p2pTransfer.ts
│       │   │   │   └── 📄 updateAccount.ts
│       │   │   └── 📄 auth.ts
│       │   ├── 📄 Providers.tsx
│       │   ├── 📄 favicon.ico
│       │   ├── 🎨 globals.css
│       │   ├── 📄 layout.tsx
│       │   └── 📄 page.tsx
│       ├── 📁 components
│       │   ├── 📄 AccountCard.tsx
│       │   ├── 📄 AccountCardItem.tsx
│       │   ├── 📄 AccountForm.tsx
│       │   ├── 📄 AddMoneyCard.tsx
│       │   ├── 📄 AppbarClient.tsx
│       │   ├── 📄 BalanceCard.tsx
│       │   ├── 📄 OnRampTransactions.tsx
│       │   ├── 📄 QuickActions.tsx
│       │   ├── 📄 QuickStats.tsx
│       │   ├── 📄 SecureAccCardItem.tsx
│       │   ├── 📄 SendMoneyCard.tsx
│       │   ├── 📄 SidebarItem.tsx
│       │   └── 📄 p2pTransactions.tsx
│       ├── 📁 public
│       │   ├── 🖼️ circles.svg
│       │   ├── 🖼️ next.svg
│       │   ├── 🖼️ turborepo.svg
│       │   └── 🖼️ vercel.svg
│       ├── 📁 utils
│       │   └── 📄 index.ts
│       ├── ⚙️ .gitignore
│       ├── 📝 README.md
│       ├── 📄 eslint.config.js
│       ├── 📄 next-auth.d.ts
│       ├── 📄 next-env.d.ts
│       ├── 📄 next.config.ts
│       ├── ⚙️ package.json
│       ├── 📄 postcss.config.js
│       ├── 📄 tailwind.config.ts
│       └── ⚙️ tsconfig.json
├── 📁 docker
│   ├── ⚙️ .dockerignore
│   ├── 📄 DockerFile.bankWebhook
│   ├── 📄 DockerFile.mockBank
│   └── 📄 DockerFile.userApp
├── 📁 packages
│   ├── 📁 db
│   │   ├── 📁 prisma
│   │   │   ├── 📁 migrations
│   │   │   │   ├── 📁 20250706092652_init
│   │   │   │   │   └── 📄 migration.sql
│   │   │   │   ├── 📁 20250706122213_added_balances_and_onramps
│   │   │   │   │   └── 📄 migration.sql
│   │   │   │   ├── 📁 20250712121125_changed_number_type_in_user_schema
│   │   │   │   │   └── 📄 migration.sql
│   │   │   │   ├── 📁 20250712150716_added_p2p_transfers
│   │   │   │   │   └── 📄 migration.sql
│   │   │   │   ├── 📁 20250719103010_made_number_field_in_user_table_unique
│   │   │   │   │   └── 📄 migration.sql
│   │   │   │   ├── 📁 20250808084311_added_tpin_to_user_table
│   │   │   │   │   └── 📄 migration.sql
│   │   │   │   ├── 📁 20250811124349_added_country_to_users_table
│   │   │   │   │   └── 📄 migration.sql
│   │   │   │   ├── 📁 20250813093610_changed_type_of_tpin_to_string_from_number
│   │   │   │   │   └── 📄 migration.sql
│   │   │   │   └── ⚙️ migration_lock.toml
│   │   │   ├── 📄 schema.prisma
│   │   │   └── 📄 seed.ts
│   │   ├── 📁 src
│   │   │   └── 📄 index.ts
│   │   ├── ⚙️ .gitignore
│   │   ├── ⚙️ package.json
│   │   └── ⚙️ tsconfig.json
│   ├── 📁 eslint-config
│   │   ├── 📝 README.md
│   │   ├── 📄 base.js
│   │   ├── 📄 next.js
│   │   ├── ⚙️ package.json
│   │   └── 📄 react-internal.js
│   ├── 📁 schema
│   │   ├── 📁 src
│   │   │   └── 📄 index.ts
│   │   ├── ⚙️ package.json
│   │   └── ⚙️ tsconfig.json
│   ├── 📁 store
│   │   ├── 📁 src
│   │   │   └── 📄 index.ts
│   │   ├── ⚙️ package.json
│   │   └── ⚙️ tsconfig.json
│   ├── 📁 tailwind-config
│   │   ├── ⚙️ package.json
│   │   ├── 📄 tailwind.config.ts
│   │   └── ⚙️ tsconfig.json
│   ├── 📁 types
│   │   ├── 📁 src
│   │   │   └── 📄 index.ts
│   │   ├── ⚙️ package.json
│   │   └── ⚙️ tsconfig.json
│   ├── 📁 typescript-config
│   │   ├── ⚙️ base.json
│   │   ├── ⚙️ nextjs.json
│   │   ├── ⚙️ package.json
│   │   └── ⚙️ react-library.json
│   └── 📁 ui
│       ├── 📁 src
│       │   ├── 📄 Appbar.tsx
│       │   ├── 📄 Button.tsx
│       │   ├── 📄 Button2.tsx
│       │   ├── 📄 Center.tsx
│       │   ├── 📄 Select.tsx
│       │   ├── 📄 TextInput.tsx
│       │   ├── 📄 card.tsx
│       │   ├── 📄 code.tsx
│       │   └── 🎨 styles.css
│       ├── 📁 turbo
│       │   └── 📁 generators
│       │       ├── 📁 templates
│       │       │   └── 📄 component.hbs
│       │       └── 📄 config.ts
│       ├── 📄 eslint.config.mjs
│       ├── ⚙️ package.json
│       ├── 📄 postcss.config.js
│       ├── 📄 tailwind.config.ts
│       └── ⚙️ tsconfig.json
├── ⚙️ .gitignore
├── ⚙️ .npmrc
├── 📝 README.md
├── ⚙️ docker-compose.yml
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── ⚙️ turbo.json
```

---

_Generated by FileTree Pro Extension_
