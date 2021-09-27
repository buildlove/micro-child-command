declare global {
  interface Window {
    _IS_RUN_MICRO_BASIC: boolean;
    _IS_RUN_MICRO_MODULE: boolean;
  }
  namespace NodeJS {
    interface ProcessEnv {
      ROUTE_PERFIX: string;
    }
  }
}

export {};
