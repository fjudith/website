import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
// Généré au build par le plugin blog : liste des billets, triés du plus
// récent au plus ancien (titre, permalink, date). Alias @generated fourni
// par Docusaurus. Le contenu vit dans .docusaurus/ (généré, gitignoré).
import blogPostList from '@generated/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';

import styles from './index.module.css';

type BlogPostRef = {
  title: string;
  permalink: string;
  date: string;
  unlisted?: boolean;
};

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.subtitle">Engineering Director</Translate>
        </p>
        <p className={styles.tagline}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/blog">
            <Translate id="homepage.cta.articles">Lire les articles</Translate>
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/decks"
          >
            <Translate id="homepage.cta.decks">
              Voir les présentations
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

function LatestArticles() {
  const posts = (blogPostList.items as BlogPostRef[])
    .filter((post) => !post.unlisted)
    .slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const dateFormatter = new Intl.DateTimeFormat(currentLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className={styles.latest}>
      <div className="container">
        <Heading as="h2" className={styles.latestHeading}>
          <Translate id="homepage.latest.title">Derniers articles</Translate>
        </Heading>
        <div className="row">
          {posts.map((post) => (
            <div key={post.permalink} className="col col--4">
              <Link to={post.permalink} className={styles.card}>
                <time className={styles.cardDate} dateTime={post.date}>
                  {dateFormatter.format(new Date(post.date))}
                </time>
                <Heading as="h3" className={styles.cardTitle}>
                  {post.title}
                </Heading>
                <span className={styles.cardLink}>
                  <Translate id="homepage.card.read">Lire →</Translate>
                </span>
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.latestMore}>
          <Link to="/blog">
            <Translate id="homepage.latest.all">Tous les articles →</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <LatestArticles />
      </main>
    </Layout>
  );
}
