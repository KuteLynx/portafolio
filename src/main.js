import {mount} from 'svelte';
import './app.css';
import './styles/global.css';
import App from './App.svelte';
import {getLocaleFromNavigator, init, register} from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));

init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
});

const app = mount(App, {
    target: document.getElementById('app'),
});

export default app;
