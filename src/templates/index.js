import React from 'react';
import speach from '../audio/speech.mp3';
import Meta from '../components/meta';
import Canvas from '../components/canvas';

const Project = ({title, body, url}) => (<div>
  <h3><a href={url}>{title}</a></h3>
  <p>{body}</p>
</div>);

const Article = ({title, url}) => (<li>
  <a href={url}>{title}</a>
</li>);

export default ({pageContext: {projects, articles, meta, urls}}) => (
  <div >
    <Meta {...meta} />
    <Canvas />
    <section style={{margin: '1rem auto', maxWidth: 600}}>
      <h1>About</h1>
      <p> Hi! I'm Anton, a web developer. Lately I do a lot of <strong>music & audio</strong> related projects.
        You can check my code at <a href={urls.github} target="_blanc" title="code">GitHub </a>
        and read some of my articles at <a href={urls.medium} target="_blanc" title="articles">Medium</a>.
        The visualization above is generated from a <a href={speach} target="_blanc">robot voice</a> reading this paragraph.
      </p>
      <h1>Articles</h1>
      <ul> {articles.map(article => <Article key={article.url} {...article} />)} </ul>
      <h1>Projects</h1>
      {projects.map(project => <Project key={project.url} {...project} />)}
    </section>
  </div>
);
