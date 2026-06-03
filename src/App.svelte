<script>
    import {locale} from 'svelte-i18n';
    import Navbar from './components/Navbar.svelte';
    import Footer from './components/Footer.svelte';
    import Home from './pages/Home.svelte';
    import Services from './pages/Services.svelte';
    import Projects from './pages/Projects.svelte';
    import About from './pages/About.svelte';
    import TechStack from './components/TechStack.svelte';
    import ContactForm from './components/ContactForm.svelte';
    import Journal from './pages/Journal.svelte';

    let showJournal = $state(false);

    function checkHash() {
        const hash = window.location.hash;
        showJournal = hash === '#!/journal';
    }

    $effect(() => {
        document.documentElement.lang = $locale;
        checkHash();
        window.addEventListener('hashchange', checkHash);
        return () => window.removeEventListener('hashchange', checkHash);
    });
</script>

{#if showJournal}
    <Journal/>
{:else}
    <Navbar/>
    <main>
        <Home/>
        <Services/>
        <Projects/>
        <About/>
        <TechStack/>
        <ContactForm/>
    </main>
    <Footer/>
{/if}
