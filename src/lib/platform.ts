export interface IPlatform {
  code: string
  name: string
}

export enum PlatformOptions {
  NotSupported = -1,
  Possible = 0,
  Supported = 1
}

export interface IElementPlatforms {
  sap: PlatformOptions,
  salesforce: PlatformOptions,
  vtex: PlatformOptions
}
