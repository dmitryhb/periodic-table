import type {ActionTree, GetterTree, MutationTree} from 'vuex'
import {CapabilitiesList} from '@/lib/capabilities-list'
import {ElementsList} from '@/lib/elements-list'
import {ICapability} from '@/lib/capability'
import {IElement} from '@/lib/element'
import {PlatformsList} from '@/lib/platforms-list'
import capabilitiesData from '@/data/capabilities.json'
import elementsData from '@/data/elements.json'
import platformsData from '@/data/platforms.json'

export interface IDataState {
  capabilities: CapabilitiesList | null
  elements: ElementsList | null
  platforms: PlatformsList | null
}

const state: IDataState = {
  capabilities: null,
  elements: null,
  platforms: null
}

const getters: GetterTree<IDataState, never> = {}

const mutations: MutationTree<IDataState> = {
  loadCapabilities(state: IDataState): void {
    state.capabilities = new CapabilitiesList()
    state.capabilities.fromArray(capabilitiesData as ICapability[])
  },

  loadElements(state: IDataState): void {
    state.elements = new ElementsList()
    state.elements.capabilities = state.capabilities
    state.elements.fromArray(elementsData as IElement[])
  },

  loadPlatforms(state: IDataState): void {
    state.platforms = new PlatformsList()
    state.platforms.fromArray(platformsData)
  }
}

const actions: ActionTree<IDataState, never> = {
  async loadCapabilities ({ commit }): Promise<void> {
    commit('loadCapabilities')
  },

  async loadElements ({ commit }): Promise<void> {
    commit('loadElements')
  },

  async loadPlatforms ({ commit }): Promise<void> {
    commit('loadPlatforms')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
