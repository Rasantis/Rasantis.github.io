# Portfólio — Rafael De Santis

Aplicação **React + TypeScript + Vite** com os projetos reais de visão computacional, IA e full-stack. Em inglês, voltada para recrutador internacional. Todos os números batem com os CVs ATS de `cv_atualizado/`.

O próprio código deste repositório é vitrine: React, TypeScript, componentes, dados tipados — a stack declarada nos CVs.

## Estrutura

```
portfolio/
├── index.html              ← entry do Vite (meta tags, fontes)
├── src/
│   ├── main.tsx            ← bootstrap React
│   ├── App.tsx             ← composição das seções
│   ├── data.ts             ← TODO o conteúdo (projetos, skills, timeline) — edite aqui
│   ├── styles.css          ← tema completo
│   └── components/         ← Nav, Hero, Stats, Projects, Demos, Skills, Experience, Contact, Footer, Reveal
├── public/
│   ├── profile.png
│   ├── Rafael_Santis_CV_EN.pdf   ← link "Download CV" (atualize ao regenerar o CV)
│   ├── weight_estimation_demo.mp4 ← demo Promeat (peso em tempo real, 98.5%)
│   ├── pharmacy_detection_demo.mp4 ← demo ShopGuard (farmácia, tracking + re-ID)
│   ├── furto_vd8_processado.mp4   ← demos ShopGuard (H.264 web-safe)
│   ├── furto_vd15_processado.mp4
│   ├── pipe_monitoring.mp4        ← demo Pix Force (inspeção de rosqueamento)
│   ├── crowd_counting_demo.mp4    ← demo drone (contagem de pessoas em multidão)
│   └── vehicle_counting_demo.mp4  ← demo contagem de veículos (webcam pública Coldwater, MI)
└── .github/workflows/deploy.yml  ← deploy automático no GitHub Pages
```

> ℹ️ **Vídeos:** os arquivos originais saíram do pipeline OpenCV com codec `mpeg4`, que navegadores não reproduzem — por isso "não apareciam". Foram re-encodados para **H.264 + faststart** (e ficaram ~3× menores). Originais preservados em `..\videos_originais\`. Para adicionar vídeo novo no futuro:
> ```powershell
> ffmpeg -i entrada.mp4 -c:v libx264 -crf 23 -pix_fmt yuv420p -movflags +faststart -an public\saida.mp4
> ```

> ℹ️ Os vídeos de demo são de sistemas construídos pelo autor; identificadores de terceiros foram anonimizados nas versões publicadas. Checklist interno de publicação: ver `..\NOTAS_PRIVADAS.md` (fora deste repositório).

## Desenvolvimento local

```powershell
npm install      # primeira vez
npm run dev      # abre em http://localhost:5173 com hot reload
npm run build    # gera dist/ para produção
npm run preview  # serve o build local
```

## Publicar no GitHub Pages (deploy automático já configurado)

1. Crie o repositório **`Rasantis.github.io`** (público) no GitHub.
2. No repositório → Settings → Pages → Source: **GitHub Actions**.
3. Na pasta `portfolio/`:
   ```powershell
   git init
   git add .
   git commit -m "Portfolio React v1"
   git branch -M main
   git remote add origin https://github.com/Rasantis/Rasantis.github.io.git
   git push -u origin main
   ```
4. O workflow `.github/workflows/deploy.yml` builda e publica sozinho a cada push. Site em `https://rasantis.github.io` em ~2 minutos.

## Depois de publicar

1. **Adicionar a URL nos 4 CVs ATS** (linha de contato) e regenerar os PDFs.
2. **LinkedIn**: URL no campo "Website".
3. **GitHub**: o repositório do portfólio em React/TS já resolve o problema do perfil vazio — fixe-o (pin) no perfil.

## Performance & UX (otimizações aplicadas)

- **Poster frames** (`public/posters/*.jpg`, ~100 KB cada) em todos os vídeos → a grade mostra thumbnails reais, não retângulos pretos.
- **`preload="none"`** nos vídeos → a página carrega leve; cada vídeo (alguns dezenas de MB) só baixa quando o visitante clica em play.
- **Grade de demos com `aspect-ratio: 16/9`** → cards uniformes; vídeos verticais (ex.: rosqueamento) ficam com letterbox limpo em vez de quebrar o layout.
- **Responsividade**: testada em mobile / tablet / desktop. Grids usam `minmax(0,1fr)` + `min-width:0` para nunca estourar a largura; `overflow-x:hidden` como rede de segurança. Sem scroll horizontal.
- **Conteúdo result-first**: cada projeto lidera com o número alcançado (90% menos furtos, 98.5% acurácia, 25.000+/dia, etc.).
- Badge "Available — remote worldwide" + cidadania UE no topo (o que recrutador procura primeiro).

### Regenerar um poster (se trocar um vídeo)
```powershell
ffmpeg -y -ss <segundos> -i public\<video>.mp4 -frames:v 1 -vf "scale=800:-2" -q:v 4 public\posters\<video>.jpg
```

## Conteúdo

- **Hero**: posicionamento + foto + badge UE + CTAs
- **Stats**: 25k+/dia · 150 lojas/4.500 streams · 90% menos furtos · 98.5% acurácia
- **Projects** (7): ShopGuard · Plataforma Promeat · **Estimativa de peso 98.5%** · Multi-Agent Engine · Drone governo · Pix Force · rPPG
- **Demos** (7): estimativa de peso · tracking + re-ID em farmácia · detecção de furto (2 streams) · inspeção de rosqueamento · contagem por drone · contagem de veículos
- **Skills** (6 grupos) · **Experience** (timeline) · **Contact**
