FROM node:lts-slim AS base

FROM base AS deps
WORKDIR /tmp

COPY package.json package-lock.json /tmp/
RUN --mount=type=cache,target=/tmp/.npm npm ci --cache=/tmp/.npm

FROM base AS builder
WORKDIR /tmp
COPY --from=deps /tmp/node_modules /tmp/node_modules
COPY . /tmp

ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_ENV_CHECK="true"

RUN npm run build

FROM gcr.io/distroless/nodejs22-debian12:nonroot AS runner
WORKDIR /app/runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder --chown=nonroot:nonroot /tmp/public /app/runner/public
COPY --from=builder --chown=nonroot:nonroot /tmp/.next/standalone /app/runner/
COPY --from=builder --chown=nonroot:nonroot /tmp/.next/static /app/runner/.next/static

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["server.js"]
