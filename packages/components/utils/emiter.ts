export default class Emiter {
  private listeners: Record<string, Set<Function>> = {}

  constructor() {
    this.listeners = {}
  }

  public on(event: string, listener: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set<Function>()
    }
    this.listeners[event].add(listener)
  }

  public off(event: string, listener: Function) {
    this.listeners[event]?.delete(listener)
  }

  public dispatch(event: string, ...args: any[]) {
    setTimeout(() => {
      this.listeners[event]?.forEach((listener) => listener(...args))
    }, 0)
  }
}
