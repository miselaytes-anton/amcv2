import React from 'react';
import Meta from '../components/meta';
import Canvas from '../components/canvas';
import GitHubIcon from '../components/gitHubIcon';

const ItemWithBody = ({title, body, url}) => (<div>
  <h3><a href={url}>{title}</a></h3>
  <p>{body}</p>
</div>);

const ListItem = ({title, url}) => (<li>
  <a href={url}>{title}</a>
</li>);

export default ({pageContext: {projects, articles, meta, urls, talks}}) => (
  <div >
    <Meta {...meta} />
    <Canvas />
    <section style={{margin: '1rem auto', maxWidth: 600}}>
      <h1>About</h1>
      <p> Hi! I'm Anton, a web developer with an interest in music, audio and hardware.</p>
      <p><a href={urls.github} target="_blanc" title="code" style={{marginTop: '10px'}}><GitHubIcon /> </a></p>
      <h1>Projects</h1>
      {projects.map(project => <ItemWithBody key={project.url} {...project} />)}
      <h1>Articles & Talks</h1>
      <ul>
        {articles.map(article => <ListItem key={article.url} {...article} />)}
        {talks.map(talk => <ListItem key={talk.url} {...talk} />)}
      </ul>
    </section>
  </div>
);
