# Banners - End User

Public endpoint for front-end:
- GET /banners/search -> returns active banners

Returned banner object:
- id: string
- title: array of { language, value }
- link: string

UI notes:
- Show banners carousel or list using `title` in user's language.
- Use `link` for CTA when provided.


