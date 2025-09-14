export interface EmailsState {
  current: string[];
  history: Record<
    string,
    {
      timestamp: number;
      dismissedTs?: number;
    }
  >;
}
