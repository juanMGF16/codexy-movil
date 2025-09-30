// src/types/quagga.d.ts
declare module '@ericblade/quagga2' {
  export interface CodeResult {
    code: string;
    format: string;
    start: number;
    end: number;
  }

  export interface Result {
    codeResult: CodeResult | null;
    // Puedes agregar más propiedades si las usas
  }

  export interface InputStreamConfig {
    name: string;
    type: string;
    target: HTMLElement;
    constraints: {
      facingMode: string;
      width?: { min: number };
      height?: { min: number };
    };
  }

  export interface DecoderConfig {
    readers: string[];
  }

  export interface QuaggaConfig {
    inputStream: InputStreamConfig;
    decoder: DecoderConfig;
    locate?: boolean;
    numOfWorkers?: number;
    frequency?: number;
  }

  export function init(config: QuaggaConfig, callback: (err: any) => void): void;
  export function start(): void;
  export function stop(): void;
  export function onDetected(callback: (result: Result) => void): void;
  export function offDetected(callback: (result: Result) => void): void;
}