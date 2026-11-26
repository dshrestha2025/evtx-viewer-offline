# EVTX Viewer (offline build)
Slim copy of evtx-wasm/evtx-viewer from github.com/omerbenamram/evtx (MIT/Apache-2.0).
DuckDB-WASM and the Rust/WASM parser (src/wasm) are bundled; no runtime network calls.
Deployed via Dockerfile (nginx, port 8080).
