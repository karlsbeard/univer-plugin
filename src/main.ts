import type { UniverPluginSettings } from '@/types/setting'
import { createNewFile } from '@/utils/file'
import { defu } from 'defu'
import { addIcon, Plugin } from 'obsidian'
import { ChooseTypeModal } from './modals/chooseType'
import { SettingTab } from './modals/settingTab'
import { univerIconSvg } from './utils/common'
import { Type as UDocType, UDocView } from './views/udoc'
import { Type as USheetType, USheetView } from './views/usheet'
import './style/univer.css'

export type ViewType = typeof USheetType | typeof UDocType
export default class UniverPlugin extends Plugin {
  settings: UniverPluginSettings
  async onload() {
    await this.loadSettings()

    addIcon('univer', univerIconSvg)

    // ribbon icon & the class
    this.addRibbonIcon('univer', 'Univer', () => {
      const modal = new ChooseTypeModal(this.app, this.settings)
      modal.open()
    })

    this.addCommand({
      id: 'univer-sheet',
      name: 'Create Univer Sheet',
      callback: () => {
        createNewFile(this.app, 'usheet')
      },
    })

    this.addCommand({
      id: 'univer-doc',
      name: 'Create Univer Doc',
      callback: () => {
        createNewFile(this.app, 'udoc')
      },
    })

    // add the setting tab
    this.addSettingTab(new SettingTab(this.app, this))
    // register view
    this.registerView(USheetType, leaf => new USheetView(leaf, this.settings))
    this.registerExtensions(['usheet'], USheetType)

    this.registerView(UDocType, leaf => new UDocView(leaf, this.settings))
    this.registerExtensions(['udoc'], UDocType)
  }

  async loadSettings() {
    const loadedSettings = await this.loadData()
    this.settings = defu(loadedSettings, {
      language: 'EN',
    })
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }

  async onunload() {}
}
