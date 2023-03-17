export interface IElementsMap {
  cssClass: string,
  capabilities: string[],
  size: number
}

export const elementsMap: IElementsMap[] = [
  {
    cssClass: '',
    capabilities: ['quoteManagement', 'restrictions', 'dashboards'],
    size: 1
  },
  {
    cssClass: 'gap-1',
    capabilities: ['marketplace', 'returnsWarranty'],
    size: 1
  },
  {
    cssClass: 'col-3 gap-3',
    capabilities: ['accountManagement', 'selfService', 'serviceManagement', 'internationalization'],
    size: 3
  },
  {
    cssClass: 'col-3 gap-3',
    capabilities: ['salesEnablement', 'productsPricing', 'orderAutomation', 'subscriptions'],
    size: 3
  },
  {
    cssClass: 'gap-1',
    capabilities: ['webContent', 'carts'],
    size: 1
  },
  {
    cssClass: 'gap-1',
    capabilities: ['orderManagement'],
    size: 1
  },
  {
    cssClass: 'gap-1',
    capabilities: ['dataAnalytics', 'legalCompliance', 'invoiceManagement'],
    size: 1
  },
  {
    cssClass: '',
    capabilities: ['checkout'],
    size: 1
  },
  {
    cssClass: '',
    capabilities: ['searchNavigation'],
    size: 1
  }
]
