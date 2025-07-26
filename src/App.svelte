<script>
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import Home from './pages/Home.svelte';
  import Projects from './pages/Projects.svelte';
  import About from './pages/About.svelte';
  import TechStack from './components/TechStack.svelte';
  import ContactForm from './components/ContactForm.svelte';
</script>

<Navbar />
<main>
  <Home />
  <Projects />
  <About />
  <TechStack />
  <ContactForm />
</main>
<Footer />
