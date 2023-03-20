import { i18n } from '@lingui/core';
import { en, zh } from 'make-plural/plurals';
i18n.loadLocaleData('en', { plurals: en });
i18n.loadLocaleData('zh', { plurals: zh });

/**
 * Load messages for requested locale and activate it.
 * This function isn't part of the LinguiJS library because there're
 * many ways how to load messages — from REST API, from file, from cache, etc.
 */
/*
*
* 载特定语言环境的翻译消息，并将其激活，以便在应用程序中使用该语言。它通过调用i18n.loadLocaleData()函数来加载语言环境的复数规则，然后通过i18n.load()函数加载特定语言环境的翻译消息，最后通过i18n.activate()函数激活该语言环境。

要使这段代码发挥作用，需要将翻译消息存储在../locale/${locale}/messages.js文件中，其中${locale}是要加载的语言环境名称。例如，如果要加载英文环境，则需要将翻译消息存储在../locale/en/messages.js文件中。并在需要使用翻译的组件中导入{ Trans } 组件，使用<Trans /> 标签包裹需要翻译的文本内容。然后LinguiJS库会自动根据当前激活的语言环境提供正确的翻译。
* */
export async function activatei18n(locale) {
  const { messages } = await import(`../locale/${locale}/messages.js`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
