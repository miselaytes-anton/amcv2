import React from 'react';

const Project = ({title, body, url}) => (<div>
  <h3><a href={url}>{title}</a></h3>
  <p>{body}</p>
</div>);

const Article = ({title, url}) => (<li>
  <a href={url}>{title}</a>
</li>);

export default ({pageContext: {projects, articles}}) => (
  <div style={{margin: '2rem auto', maxWidth: 800}}>
    <h1>About</h1>
    <p> Hi! I'm Anton, yet another web developer. Lately I do a lot of <strong>music & audio</strong> related projects.
            You can check my code at <a href="https://github.com/miselaytes-anton" title="code">GitHub </a>
            and read some of my web audio articles at <a href="https://medium.com/@a.miselaytes" title="articles">Medium</a>.
    </p>
    <h1>Articles</h1>
    <ul> {articles.map(article => <Article {...article} />)} </ul>
    <h1>Projects</h1>
    {projects.map(project => <Project {...project} />)}

  </div>
);
