import type { App } from 'obsidian'
import type UniverPlugin from '../main'
import { PluginSettingTab, Setting } from 'obsidian'

export class SettingTab extends PluginSettingTab {
  plugin: UniverPlugin

  constructor(app: App, plugin: UniverPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const { containerEl } = this
    containerEl.empty()
    containerEl.createEl('h2', { text: 'Univer Settings' })

    new Setting(containerEl)
      .setName('language')
      .setDesc('choose the language')
      .addDropdown((drop) => {
        drop
          .addOptions({
            EN: 'English',
            ZH: '简体中文',
            RU: 'Русский',
            VN: 'Tiếng Việt',
            TW: '繁體中文',
          })
          .setValue(this.plugin.settings.language)
          .onChange(async (value: 'ZH' | 'EN' | 'RU' | 'TW' | 'VN') => {
            this.plugin.settings.language = value
            await this.plugin.saveSettings()
          })
      })
  }
}
