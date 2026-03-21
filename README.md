# placeholder-image-api

Self-hosted dynamic placeholder image generator. Pure SVG output — zero native image dependencies.

## Quick Start

```bash
npm install
npm start          # http://localhost:4700
```

## Endpoints

| Route | Description |
|---|---|
| `GET /api/v1/:width/:height` | Basic placeholder |
| `GET /api/v1/:width/:height/:text` | Placeholder with custom text |
| `GET /api/v1/avatar/:initials` | Circle avatar with initials |
| `GET /api/v1/pattern/:width/:height` | Pattern background (dots, lines, grid, crosshatch) |
| `GET /health` | Health check |

### Query Parameters

| Param | Description | Example |
|---|---|---|
| `bg` | Background color (hex, no #) | `bg=3498db` |
| `fg` | Text / foreground color | `fg=ffffff` |
| `text` | Custom text (basic endpoint) | `text=Hello` |
| `rounded` | Border radius in px | `rounded=16` |
| `font` | Font size override | `font=32` |
| `gradient` | Gradient `dir-color1-color2` | `gradient=h-3498db-2ecc71` |
| `pattern` | Pattern type (pattern endpoint) | `pattern=dots` |
| `size` | Avatar size in px | `size=256` |

### Examples

```
http://localhost:4700/api/v1/400/300?bg=3498db&fg=ffffff
http://localhost:4700/api/v1/800/400/Hello%20World?bg=e74c3c&fg=fff&rounded=20
http://localhost:4700/api/v1/avatar/DK?bg=9b59b6&size=200
http://localhost:4700/api/v1/pattern/600/400?pattern=dots&bg=f5f5f5&fg=999999
http://localhost:4700/api/v1/500/300?gradient=h-667eea-764ba2&fg=ffffff
```

## Docker

```bash
docker build -t placeholder-image-api .
docker run -p 4700:4700 placeholder-image-api
```

## License

MIT
