<script>
  import { t } from 'svelte-i18n';
</script>

<div class="hero-visual">
  <div class="code-window">
    <div class="window-header">
      <div class="window-controls">
        <span class="control close"></span>
        <span class="control minimize"></span>
        <span class="control maximize"></span>
      </div>
      <div class="window-title">{$t('home.code_window.title')}</div>
    </div>
    <div class="window-content">
      <pre class="code-block"><code><span class="keyword">{$t('home.code_window.const')}</span> <span
              class="variable">{$t('home.code_window.developer')}</span> = &#123;
  <span class="property">{$t('home.code_window.name_prop')}</span>: <span class="string">'{$t('home.name')}',</span>
  <span class="property">{$t('home.code_window.role_prop')}</span>: <span class="string">'{$t('home.code_window.role')}',</span>
  <span class="property">{$t('home.code_window.skills_prop')}</span>: [<span class="string">'Angular',</span> <span
                  class="string">'ASP.NET',</span> <span class="string">'Svelte'</span>]<span class="punctuation">,</span>
  <span class="property">{$t('home.code_window.passion_prop')}</span>: <span
                  class="string">'{$t('home.code_window.passion')}'</span>
&#125;;

<span class="keyword">{$t('home.code_window.function')}</span> <span
                  class="function">{$t('home.code_window.get_in_touch')}</span>() &#123;
  <span class="keyword">{$t('home.code_window.return')}</span> <span class="string">'{$t('home.code_window.message')}'</span>;
&#125;</code></pre>
    </div>
  </div>
</div>

<style>
  .hero-visual {
    z-index: 2;
    opacity: 0;
    transform: translateX(30px);
    animation: slideInRight 0.8s ease-out 0.8s forwards;
  }

  .code-window {
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow-xl);
    max-width: 500px;
  }

  .window-header {
    background: var(--color-bg-tertiary);
    padding: var(--spacing-sm) var(--spacing-md);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    border-bottom: 1px solid var(--color-border);
  }

  .window-controls {
    display: flex;
    gap: var(--spacing-xs);
  }

  .control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .control.close {
    background: #ff5f56;
  }

  .control.minimize {
    background: #ffbd2e;
  }

  .control.maximize {
    background: #27ca3f;
  }

  .window-title {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    font-family: var(--font-main), sans-serif;
  }

  .window-content {
    padding: var(--spacing-lg);
  }

  .code-block {
    margin: 0;
    font-family: var(--font-main), sans-serif;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--color-text);
    white-space: pre;
    overflow-x: auto;
    text-align: left;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .code-block::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  .code-block code {
    display: block;
    padding: 0;
    background: transparent;
    border: none;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    text-align: left;
  }

  .keyword {
    color: #ff6b35;
    font-weight: 600;
  }

  .variable {
    color: #00d4aa;
    font-weight: 500;
  }

  .property {
    color: #6366f1;
    font-weight: 500;
  }

  .string {
    color: #f7931e;
  }

  .function {
    color: #ff6b35;
    font-weight: 600;
  }

  @keyframes slideInRight {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    .hero-visual {
      order: -1;
      width: 100vw;
      margin-left: calc(50% - 50vw);
    }

    .code-window {
      max-width: 100%;
      width: 100%;
    }

    /* Mostrar scrollbar sólo en móviles */
    .code-block {
      scrollbar-width: thin; /* Firefox */
      -ms-overflow-style: auto; /* IE/Edge */
    }

    .code-block::-webkit-scrollbar {
      display: block; /* WebKit */
      height: 8px;
    }

    .code-block::-webkit-scrollbar-track {
      background: var(--color-bg-tertiary);
    }

    .code-block::-webkit-scrollbar-thumb {
      background: var(--color-accent);
      border-radius: 4px;
    }
  }
</style>
