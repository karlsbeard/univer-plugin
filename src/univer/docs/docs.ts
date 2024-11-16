import type { UniverPluginSettings } from '@/types/setting'
import type { IUniverUIConfig } from '@univerjs/ui'
import { getLanguage, univerLocales } from '@/utils/common'
import { Univer, UserManagerService } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsHyperLinkUIPlugin } from '@univerjs/docs-hyper-link-ui'
import { UniverDocsThreadCommentUIPlugin } from '@univerjs/docs-thread-comment-ui'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'
import { mockUser } from '../customMentionDataService'

export function docInit(option: IUniverUIConfig, settings: UniverPluginSettings): Univer {
// univer
  const univer = new Univer({
    theme: defaultTheme,
    locale: getLanguage(settings),
    locales: univerLocales,
  })

  // core plugins
  univer.registerPlugin(UniverRenderEnginePlugin)
  univer.registerPlugin(UniverFormulaEnginePlugin)
  univer.registerPlugin(UniverUIPlugin, option)

  univer.registerPlugin(UniverDocsPlugin)
  univer.registerPlugin(UniverDocsUIPlugin, {
    container: 'univerdoc',
    layout: {
      docContainerConfig: {
        innerLeft: false,
      },
    },
  })

  univer.registerPlugin(UniverDocsThreadCommentUIPlugin)
  univer.registerPlugin(UniverDocsHyperLinkUIPlugin)

  const injector = univer.__getInjector()
  const userManagerService = injector.get(UserManagerService)

  userManagerService.setCurrentUser(mockUser)

  return univer
}
