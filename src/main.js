import {mount} from 'svelte';
import './styles/global.css';
import App from './App.svelte';
import {getLocaleFromNavigator, init, register, waitLocale} from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));

init({
    fallbackLocale: 'en',
    initialLocale: (getLocaleFromNavigator() || 'en').split('-')[0],
});

// Esperar a que svelte-i18n propague el locale antes de montar
// Evita: "Cannot format a message without first setting the initial locale"
waitLocale().then(() => {
    const app = mount(App, {
        target: document.getElementById('app'),
    });
});
