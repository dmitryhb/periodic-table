export interface IItemsList<T, D> {
  get items(): T[]
  set items(value: T[])
  fromArray(data: D[]): void
}
