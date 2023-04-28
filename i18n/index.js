import { i18n } from '@lingui/core';
import { en, zh } from 'make-plural/plurals';
i18n.loadLocaleData('en', { plurals: en });
i18n.loadLocaleData('zh', { plurals: zh });

export async function activatei18n(locale) {
  const { messages } = await import(`../locale/${locale}/messages.js`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
