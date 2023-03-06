import type {ActionTree, GetterTree, MutationTree} from 'vuex'
import {CapabilitiesList} from '@/lib/capabilities-list'
import {ElementsList} from '@/lib/elements-list'
import capabilitiesData from '@/data/capabilities.json'
import elementsData from '@/data/elements.json'

export interface IDataState {
  capabilities: CapabilitiesList | null,
  elements: ElementsList | null
}

const state: IDataState = {
  capabilities: null,
  elements: null
}

const getters: GetterTree<IDataState, never> = {}

const mutations: MutationTree<IDataState> = {
  loadCapabilities(state: IDataState): void {
    state.capabilities = new CapabilitiesList()
    state.capabilities.fromArray(capabilitiesData)
  },

  loadElements(state: IDataState): void {
    state.elements = new ElementsList()
    state.elements.capabilities = state.capabilities
    state.elements.fromArray(elementsData)
  }
}

const actions: ActionTree<IDataState, never> = {
  async loadCapabilities ({ commit }): Promise<void> {
    commit('loadCapabilities')
  },

  async loadElements ({ commit }): Promise<void> {
    commit('loadElements')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
