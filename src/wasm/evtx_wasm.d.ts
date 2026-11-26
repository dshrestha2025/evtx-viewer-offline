/* tslint:disable */
/* eslint-disable */

/**
 * One chunk as a single-batch Arrow IPC stream, plus per-record parse errors.
 */
export class ArrowChunkIPC {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    readonly errors: string[];
    readonly ipc: Uint8Array;
    readonly rows: number;
}

export class EvtxWasmParser {
    free(): void;
    [Symbol.dispose](): void;
    chunk_arrow_ipc(chunk_index: number): ArrowChunkIPC;
    constructor(data: Uint8Array | number[]);
    /**
     * Nonempty chunk count; empty slots are skipped, so a malformed nonempty chunk keeps
     * its logical index.
     */
    readonly total_chunks: number;
}

export function main(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_arrowchunkipc_free: (a: number, b: number) => void;
    readonly __wbg_evtxwasmparser_free: (a: number, b: number) => void;
    readonly arrowchunkipc_errors: (a: number) => [number, number];
    readonly arrowchunkipc_ipc: (a: number) => any;
    readonly arrowchunkipc_rows: (a: number) => number;
    readonly evtxwasmparser_chunk_arrow_ipc: (a: number, b: number) => [number, number, number];
    readonly evtxwasmparser_new: (a: number, b: number) => [number, number, number];
    readonly evtxwasmparser_total_chunks: (a: number) => number;
    readonly main: () => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __externref_drop_slice: (a: number, b: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
