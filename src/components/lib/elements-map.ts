export interface IElementsMap {
  cssClass: string,
  capabilities: string[]
}

export const elementsMap: IElementsMap[] = [
  {
    cssClass: '',
    capabilities: ['quoteManagement', 'restrictions', 'dashboards']
  },
  {
    cssClass: 'gap-1',
    capabilities: ['marketplace', 'returnsWarranty']
  },
  {
    cssClass: 'col-3 gap-3',
    capabilities: ['accountManagement', 'selfService', 'serviceManagement', 'internationalization']
  },
  {
    cssClass: 'col-3 gap-3',
    capabilities: ['salesEnablement', 'productsPricing', 'orderAutomation', 'subscriptions']
  },
  {
    cssClass: 'gap-1',
    capabilities: ['webContent', 'carts']
  },
  {
    cssClass: 'gap-1',
    capabilities: ['orderManagement']
  },
  {
    cssClass: 'gap-1',
    capabilities: ['dataAnalytics', 'legalCompliance', 'invoiceManagement']
  },
  {
    cssClass: '',
    capabilities: ['checkout']
  },
  {
    cssClass: '',
    capabilities: ['searchNavigation']
  }
]
