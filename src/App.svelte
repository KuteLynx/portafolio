<script>
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import Home from './pages/Home.svelte';
  import Projects from './pages/Projects.svelte';
  import About from './pages/About.svelte';
  import TechStack from './components/TechStack.svelte';
  import ContactForm from './components/ContactForm.svelte';
  import {addMessages, getLocaleFromNavigator, init} from 'svelte-i18n';
  import en from './locales/en.json';
  import es from './locales/es.json';

  addMessages('en', en);
    addMessages('es', es);

    init({
        fallbackLocale: 'en',
        initialLocale: getLocaleFromNavigator(),
    });
</script>

<Navbar/>
<main>
    <Home/>
    <Projects/>
    <About/>
    <TechStack/>
    <ContactForm/>
</main>
<Footer/>
