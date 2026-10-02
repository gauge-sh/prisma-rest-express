# Article preview rollout

The web and mobile teams are implementing article previews while the backend endpoint remains a 501 stub. The agreed contract and success/error examples are in api/openapi.json. The web client's configurable adapter is frontend/client.mjs; `API_BASE_URL=http://localhost:PORT node frontend/preview.mjs` exercises it. Mobile consumes the same HTTP contract. Distributed developers and QA need consistent example responses. No mock tool or hosting approach has been selected.
